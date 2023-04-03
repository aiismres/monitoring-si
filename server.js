const express = require('express');
const path = require('path');
// const webpack = require("webpack");
// const webpackDevMiddleware = require("webpack-dev-middleware");
// const webpackHotMiddleware = require("webpack-hot-middleware");
// const webpackConfig = require("./webpack.config.js");
const { MongoClient } = require('mongodb');
const mongodb = require('mongodb');
const cookieParser = require('cookie-parser');
const ExcelJS = require('exceljs');
const dotenv = require('dotenv').config();

const app = express();
// const compiler = webpack(webpackConfig);
// app.use(
//   webpackDevMiddleware(compiler, {
//     publicPath: webpackConfig.output.publicPath,
//   })
// );
// app.use(webpackHotMiddleware(compiler));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.resolve('./public')));
// для теста бандла create-react-app в папке build
app.use(express.static(path.resolve('./build')));
app.use(express.static(path.resolve('./planrabot')));
app.use(cookieParser());
// app.use(express.urlencoded({ limit: "50mb" }));

const client = new MongoClient(process.env.DB_URI);

let ObjectId = mongodb.ObjectId;
(async () => {
  await client.connect();
})();

const db = client.db(process.env.DB);
const secheniyaDb = db.collection('secheniya');
const OtDb = db.collection('ot');
const usersDb = db.collection('users');

const auth = () => (req, res, next) => {
  console.log('req.cookies', req.cookies);
  if (!req.cookies['sessionID']) {
    console.log('нет req.cookies?.[sessionID]');
    return next();
  } else {
    console.log('req.cookies.sessionID', req.cookies.sessionID, sessionIDObj);
    // let user = DB.users.find(
    //   (item) => item.sessionID == req.cookies['sessionID']
    // );
    let sessionID = req.cookies['sessionID'];
    let user = sessionIDObj[sessionID];
    if (!user) {
      return next();
    }
    req.user = user;
    console.log('req.user', req.user);
    next();
  }
};

app.get('/', (req, res) => {
  res.sendfile('index.html');
});

app.get('/readsech', auth(), (req, res) => {
  res.sendFile(path.resolve('./planrabot/readSech.html'));
});

app.get('/monitoringsi', (req, res) => {
  res.sendFile(path.resolve('./monitoringsi.html'));
});

// тест бандла create-react-app
app.get('/monitoringsibandle', (req, res) => {
  res.sendFile(path.resolve('./build/index.html'));
});

app.post('/api/savesidata', async (req, res) => {
  console.log(
    '/api/savesidata, данные СИ',
    req.body.siState,
    'id Сечения',
    req.body.sechID
  );
  let o_id = new ObjectId(req.body.sechID);
  let resDb = await secheniyaDb.updateOne(
    { _id: o_id },
    {
      $set: {
        si: req.body.siState,
        sechInfo: req.body.sechInfo,
      },
    }
  );
  console.log('СИ', resDb);
  res.send(resDb);
});

app.post('/api/readsidata', async (req, res) => {
  console.log('id Сечения', req.body.id);
  let o_id = new ObjectId(req.body.id);
  let resDb = await secheniyaDb.find({ _id: o_id }).toArray();
  console.log('readsidata=', resDb);
  // if (resDb[0]?.si) {
  res.send(resDb[0]);
  // } else {
  // res.send([]);
  // }
});

app.get('/api/readsech', async (req, res) => {
  let x = await secheniyaDb.find().toArray();
  //console.log('readsech=', x);
  res.send(x);
});

app.get('/api/readot', async (req, res) => {
  let x = await OtDb.find().toArray();
  //console.log('readot=', x);
  res.send(x);
});

app.post('/api/exportsv1', async (req, res) => {
  const siState = req.body;
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('templateSv1.xlsx');
  const ws = workbook.getWorksheet('Лист 1');
  console.log(ws.getCell('A3').value);

  function writeCell(cellAdress, siParam) {
    let cell = ws.getCell(cellAdress);
    cell.value = siParam.v;
    if (siParam.status2 === 'incorrect') {
      cell.style = {
        ...cell.style,
        font: { ...cell.font, color: { argb: 'FFFF0000' } },
      };
    } else if (siParam.status2 === 'correct') {
      cell.style = {
        ...cell.style,
        font: { ...cell.font, color: { argb: 'FF008000' } },
      };
    }
    if (siParam.status === 'warning') {
      console.log('siParam.status === "warning"', siParam.v);
      cell.style = {
        ...cell.style,
        fill: {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFF00' },
        },
      };
    }
  }

  siState.forEach((siObj, index) => {
    ws.getCell(`B${index + 3}`).value = index + 1;
    writeCell(`C${index + 3}`, siObj.numTiShem60);
    writeCell(`D${index + 3}`, siObj.naimTi60);
    writeCell(`F${index + 3}`, siObj.tipSch60);
    writeCell(`G${index + 3}`, siObj.kanaly60);
    writeCell(`O${index + 3}`, siObj.gr);
    writeCell(`P${index + 3}`, siObj.numTiSop);
    writeCell(`Q${index + 3}`, siObj.naimTiSop);
    writeCell(`R${index + 3}`, siObj.tipSchSop);
    writeCell(`S${index + 3}`, siObj.numSchSop);
    writeCell(`T${index + 3}`, siObj.kttSop);
    writeCell(`U${index + 3}`, siObj.ktnSop);
    writeCell(`X${index + 3}`, siObj.kodTi80);
    writeCell(`Y${index + 3}`, siObj.naimTi80);
    writeCell(`Z${index + 3}`, siObj.tipSch80);
    writeCell(`AA${index + 3}`, siObj.kanaly80);
    writeCell(`AC${index + 3}`, siObj.naimTi82);
    writeCell(`AE${index + 3}`, siObj.tipSchDB);
    writeCell(`AF${index + 3}`, siObj.numSchDB);
    writeCell(`AG${index + 3}`, siObj.kttDB);
    writeCell(`AH${index + 3}`, siObj.ktnDB);
    writeCell(`AK${index + 3}`, siObj.tipSchSch);
    writeCell(`AL${index + 3}`, siObj.numSchSch);
  });

  await workbook.xlsx.writeFile('resultSv1.xlsx');

  console.log('/api/exportsv1, req.body end', __dirname + '\\templateSv1.xlsx');
  res.json({ a: 'resultSv1.xlsx' });
});

app.get('/api/downloadsv1', async (req, res) => {
  res.download('resultSv1.xlsx');
});

// const os = require("os");
// console.log("os.hostname()", String(os.hostname()));
// console.log("os.networkInterfaces()", os.networkInterfaces());
// var ip = require("ip");
// console.log("ip.address():", ip.address());

app.listen(process.env.PORT, function () {
  console.log(`Server listening on port ${process.env.PORT}!\n`);
});
