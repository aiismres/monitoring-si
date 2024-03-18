import fs from 'fs';
import express from 'express';
import * as path from 'node:path';
import bodyParser from 'body-parser';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import mongodb, { MongoClient } from 'mongodb';
import ExcelJS from 'exceljs';
import http from 'http';
import https from 'https';

dotenv.config();

const client = new MongoClient(
  'mongodb+srv://q:q@cluster0.ijjfn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
);
// import mongodb from 'mongodb';
let ObjectId = mongodb.ObjectId;

(async () => {
  await client.connect();
})();

const app = express();

let httpsServer;

if (process.env.NODE_ENV === 'production') {
  console.log('process.env.NODE_ENV === production');
  const privateKey = fs.readFileSync(
    '/etc/letsencrypt/live/80-78-248-80.cloudvps.regruhosting.ru/privkey.pem',
    'utf8'
  );
  const certificate = fs.readFileSync(
    '/etc/letsencrypt/live/80-78-248-80.cloudvps.regruhosting.ru/fullchain.pem',
    'utf8'
  );
  httpsServer = https.createServer({ key: privateKey, cert: certificate }, app);
}

app.use(express.json({ limit: '50mb' }));
app.use(express.static('./'));
app.use(express.static(path.resolve('./build')));
app.use(cookieParser());
// app.use(express.urlencoded({ limit: '50mb' }));

const db = client.db(process.env.DB);
const secheniyaDb = db.collection('secheniya');
const OtDb = db.collection('ot');
const usersDb = db.collection('users');

function toHash(x) {
  let hash1 = crypto.createHash('sha256');
  hash1.update(x);
  let hash = hash1.digest('hex');
  return hash;
}

const auth = () => (req, res, next) => {
  console.log('req.cookies', req.cookies);
  if (!req.cookies?.['sessionID']) {
    console.log('нет req.cookies?.[sessionID]');
    // res.status(401).send('no auth');
    return next();
  } else {
    console.log('req.cookies.sessionID', req.cookies.sessionID, sessionIDObj);
    // let user = DB.users.find(
    //   (item) => item.sessionID == req.cookies['sessionID']
    // );
    let sessionID = req.cookies['sessionID'];
    let user = sessionIDObj[sessionID];
    if (!user) {
      res.clearCookie('sessionID');
      return next();
      // res.clear;
    }
    req.user = user;
    console.log('req.user', req.user);
    next();
  }
};

app.get('/', (req, res) => {
  res.sendfile('index.html');
});

app.get('/addsech', auth(), (req, res) => {
  if (req.user) {
    res.sendfile('addSech.html');
  } else {
    res.sendfile('readSech.html');
  }
});

app.get('/readsech', auth(), (req, res) => {
  if (req.user === 'qqq') {
    res.sendfile('readEditSech.html');
  } else {
    res.sendfile('readSech.html');
  }
});

app.get('/monitoringsi/', auth(), (req, res) => {
  res.sendFile(path.resolve('./build/index.html'));
  // if (req.user) {
  // } else {
  //   res.sendFile(path.resolve('./monitoringsireadonly.html'));
  // }
});
app.get('/monitoringsi/sverka2', auth(), (req, res) => {
  res.sendFile(path.resolve('./build/index.html'));
});

app.get('/planrabot/:company?', auth(), (req, res) => {
  res.sendFile(path.resolve('./build/index.html'));
});

app.post('/api/savesidata', auth(), async (req, res) => {
  console.log('/api/savesidata');
  if (['qqq', 'fae', 'sns'].includes(req.user)) {
    console.log('req.user', req.user);
    console.log('данные СИ', req.body.siState, 'id Сечения', req.body.sechID);
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
  } else {
    console.log('req.user (no auth):', req.user);
    res.status(401).send({ error: 'пользователь не авторизован' });
  }
});

app.post('/api/readsidata', async (req, res) => {
  console.log('id Сечения', req.body.id);
  let o_id = new ObjectId(req.body.id);
  let resDb = await secheniyaDb.find({ _id: o_id }).toArray();
  console.log('readsidata=', resDb);
  // if (resDb[0].si) {
  res.send(resDb[0]);
  // } else {
  //   res.send([]);
  // }
});

let sessionIDObj = {};
app.get('/login', (req, res) => {
  res.sendfile('login.html');
});

app.post(
  '/api/login',
  bodyParser.urlencoded({ extended: false }),
  async (req, res) => {
    console.log('req.body', req.body);
    const { username, password } = req.body;
    let passwordhash = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');
    // console.log({ passwordhash });
    let users = await usersDb.find().toArray();
    console.log(users, username);
    let user = users.find((item) => item.username == username);
    console.log(user);
    // let user = usersDb.users.find((item) => item.username == username);
    if (!user) {
      res.send('нет такого пользователя');
    }
    // let hash = toHash(password);
    // if (hash != user.password) {
    if (passwordhash != user.password) {
      res.send('пароль неверный');
    }
    let sessionID = nanoid();
    sessionIDObj[sessionID] = username;
    console.log('sessionIDs', sessionIDObj);
    // user.sessionID = sessionID;
    // usersDb.sessions.push(sessionID);
    res.cookie('sessionID', sessionID).redirect('/readsech');
  }
);

app.get('/metrology', (req, res) => {
  res.sendFile(path.resolve('./build/index.html'));
});

app.post('/api/addsech', async (req, res) => {
  let resultAddsech = await secheniyaDb.insertOne(req.body);
  console.log('/api/addsech', resultAddsech);
  res.send(resultAddsech);
});

app.post('/api/addot', async (req, res) => {
  console.log('/api/addot');
  let result = await OtDb.insertMany(req.body);
  console.log('/api/addot many result', result.insertedIds);
  res.send(result.insertedIds);
  /*
req.body.forEach(async (item) => {
  let user = await OtDb
      .find({ gr: item.gr })
      .toArray();
      console.log(user)
  if (user[0]) {
    console.log('такое ОТ уже есть в БД ОТ')
    }
  else {
    OtDb.insertOne(item);
      };
});
*/
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

app.delete('/api/delot', auth(), async (req, res) => {
  console.log('/api/delot', req.body._id);
  let id = req.body._id;
  let o_id = new ObjectId(id);
  let result = await OtDb.deleteOne({ _id: o_id });
  console.log('/api/delot', result);
  res.send(result);
});

app.post('/api/delsech', async (req, res) => {
  console.log('/api/delsech', req.body.id);

  let id = req.body.id;
  let o_id = new ObjectId(id);
  //db.test.find({_id:o_id})
  console.log('o_id', o_id);

  let result = await secheniyaDb.deleteOne({ _id: o_id });
  console.log('/api/delsech', result);
  res.send(result);
});

app.post('/api/editsech', auth(), async (req, res) => {
  console.log('/api/editsech req.body', req.body._id);
  if (['qqq'].includes(req.user)) {
    let id = req.body._id;
    let o_id = new ObjectId(id);
    //req.body._id = o_id;
    //console.log("/api/editsech req.body", req.body._id);
    let y1 = await secheniyaDb.updateOne(
      { _id: o_id },
      {
        $set: {
          naimSechShort: req.body.naimSechShort,
          vidRabot: req.body.vidRabot,
          soglGtp: req.body.soglGtp,
          dopusk: req.body.dopusk,
          sdAs: req.body.sdAs,
          sdPas: req.body.sdPas,
          krSrokPodachi: req.body.krSrokPodachi,
          planPodachi: req.body.planPodachi,
          metrologyKomm: req.body.metrologyKomm,
          codirovkaActual: req.body.codirovkaActual,
          tipIzmCodirovki: req.body.tipIzmCodirovki,
          zaprosPerecod: req.body.zaprosPerecod,
          sogl60Dku: req.body.sogl60Dku,
          sogl60SmezhOtpr: req.body.sogl60SmezhOtpr,
          sogl60SmezhSogl: req.body.sogl60SmezhSogl,
          otprav4v: req.body.otprav4v,
          sogl4v: req.body.sogl4v,
          sverkiKomm: req.body.sverkiKomm,
          sv1: req.body.sv1,
          sv2: req.body.sv2,
          sv3: req.body.sv3,
          pi: req.body.pi,
          textOt: req.body.textOt,
          gotovnostUs: req.body.gotovnostUs,
          zakluchenie: req.body.zakluchenie,
          osobenAiis: req.body.osobenAiis,
          kolTi: req.body.kolTi,
          sobstvAiis: req.body.sobstvAiis,
          statusUS: req.body.statusUS,
        },
      }
    );
    console.log('сечение', y1);
    res.send(y1);
  } else {
    res.status(401).send('ошибка авторизации');
  }
});

app.post('/api/editcell', async (req, res) => {
  console.log('/api/editcell req.body', req.body);
  let id = req.body._id;
  let o_id = new ObjectId(id);
  let field = req.body.field;
  let y2 = await secheniyaDb.updateOne(
    { _id: o_id },
    {
      $set: {
        [field]: req.body.fieldValue,
      },
    }
  );
  console.log('сечение', y2);
  res.send(y2);
});

app.post('/api/editot', auth(), async (req, res) => {
  console.log('/api/editot req.body', req.body);
  let id = req.body._id;
  let o_id = new ObjectId(id);
  //req.body._id = o_id;
  //console.log("/api/editsech req.body", req.body._id);
  let y2 = await OtDb.updateOne(
    { _id: o_id },
    {
      $set: {
        gr: req.body.gr,
        sdSop: req.body.sdSop,
        naimAiis1: req.body.naimAiis1,
        naimAiis2: req.body.naimAiis2,
        izmAiis: req.body.izmAiis,
        tipIzmOt: req.body.tipIzmOt,
        neobhRab: req.body.neobhRab,
        rabZaplan: req.body.rabZaplan,
        dogPlan: req.body.dogPlan,
        dogFact: req.body.dogFact,
        smrPlan: req.body.smrPlan,
        smrFact: req.body.smrFact,
        vyezdPlan: req.body.vyezdPlan,
        vyezdFact: req.body.vyezdFact,
        vniimsFact: req.body.vniimsFact,
        rstFact: req.body.rstFact,
        prikazFact: req.body.prikazFact,
        oforSopFact: req.body.oforSopFact,
        kommOt: req.body.kommOt,
      },
    }
  );
  console.log('ОТ', y2);
  res.send(y2);
});

app.post('/api/exportsv1', async (req, res) => {
  const siState = req.body;
  console.log('/api/exportsv1, req.body', siState);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('templateSv1.xlsx');
  const ws = workbook.getWorksheet('Лист 1');

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
  // console.log('/api/exportsv1, req.body end', __dirname + '\\templateSv1.xlsx');
  res.json({ a: 'resultSv1.xlsx' });
});

app.get('/api/downloadsv1', async (req, res) => {
  res.download('resultSv1.xlsx');
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`  Listening on port:${port}`);
});

if (process.env.NODE_ENV === 'production') {
  httpsServer.listen(443);
}
