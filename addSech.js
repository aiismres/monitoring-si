async function addSech() {
  //let openRequest = indexedDB.open("db", 3);
  const form = document.getElementById('form2');
  console.log(form)
  let x1 = $('form').serializeArray();
  console.log('form', x1);



  // чтение данных  из таблицы план работ
  let t = document.getElementById('table1');
  let tra = t.children;
  let trs = tra[0].children;
  //console.log('trs', trs)
  let tds = null;
  let sum = [];

  for (let i=0; i<trs.length; i++)  {
      tds = trs[i].children;
    //  console.log('tds', tds)
      for (var n=0; n<tds.length;n++)  {
          sum.push(tds[n].innerHTML);
        //  console.log('innerHTML', tds[n].innerHTML);
      }
  }
  console.log('table1', sum);

  // конец чтение данных из таблицы план работ

  // вычисление крайнего срока подачи док-в на УС
    let vidRabot = x1.find(item => item.name == "vidRabot").value;
    let dopusk = x1.find(item => item.name == "dopusk").value;
    let sdAs = x1.find(item => item.name == "sdAs").value;
    let sdPas = x1.find(item => item.name == "sdPas").value;
    let krSrokPodachi = '';
  if (vidRabot == "изменения") {
    krSrokPodachi = formatDate(Date.parse(dopusk) + 3888000000);
    console.log("vidRabot = изменения");
  }
  else if (vidRabot == "продление") {
    if (sdAs) {
      krSrokPodachi = formatDate(Date.parse(sdAs) -  3888000000);
      console.log("vidRabot = продление sdAs");
    }
    else if (sdPas) {
      krSrokPodachi = formatDate(Date.parse(sdPas) -  3888000000);
      console.log("vidRabot = продление sdPas");
    }
  }
  else if (vidRabot == "новое") {
    krSrokPodachi = x1.find(item => item.name == "krSrokPodachi").value
    console.log("vidRabot = новое");
  };
    
  // конец вычисление крайнего срока подачи док-в на УС


  let sechenie = {
    //id: x1.find(item => item.name == "kodSech").value,
    kodGtp: x1.find(item => item.name == "kodGtp").value,
    kodSech: x1.find(item => item.name == "kodSech").value,
    naimSechShort: x1.find(item => item.name == "naimSechShort").value,
    vidRabot: x1.find(item => item.name == "vidRabot").value,
    soglGtp: x1.find(item => item.name == "soglGtp").value,
    dopusk: x1.find(item => item.name == "dopusk").value,
    sdAs:  x1.find(item => item.name == "sdAs").value,
    sdPas:  x1.find(item => item.name == "sdPas").value,
    krSrokPodachi: krSrokPodachi,
    planPodachi:  x1.find(item => item.name == "planPodachi").value,
    metrologyKomm: sum[36],
    codirovkaActual:  x1.find(item => item.name == "codirovkaActual").value,
    tipIzmCodirovki: sum[38],
    sogl60Dku:  x1.find(item => item.name == "60SoglDku").value,
    sogl60SmezhOtpr:  x1.find(item => item.name == "60SoglSmezhOtpr").value,
    sogl60SmezhSogl:  x1.find(item => item.name == "60SoglSmezhSogl").value,
    otprav4v:  x1.find(item => item.name == "4vOtprav").value,
    sogl4v:  x1.find(item => item.name == "4vSogl").value,
    sverkiKomm: sum[43],
    sv1: sum[44],
    sv2: sum[45],
    sv3: sum[46],
    pi: sum[47],
    textOt: sum[48],
    gotovnostUs: sum[49],
    zakluchenie: sum[50],
    osobenAiis: sum[51],
    kolTi:  x1.find(item => item.name == "kolTi").value,
    sobstvAiis:  x1.find(item => item.name == "sobstvAiis").value
  };

  //  чтение данных из таблицы метрология


  let OT = [];
  let t2 = document.getElementById('table2');
  //console.log('(t2.rows.length', t2.rows.length);
  //let gr =  x1.filter(item => item.name == "gr")
  //console.log('neobhRab', x1.filter(item => item.name == "neobhRab"));

  for (let i2=0; i2<t2.rows.length; i2++)  {
    
    let ot2 = {};
    //console.log('i2', i2);
    //console.log(t2.rows[i2].cells[3].innerHTML, t2.rows[i2].cells[12].innerHTML);
    if (i2 < t2.rows.length - 1) {
      //console.log('gr[i2]', gr[i2].value);
      /*
      ot1.gr = x1.filter(item => item.name == "gr")[i2].value;
      ot1.sdSop = x1.filter(item => item.name == "sdsop")[i2].value;
      */
      ot2.gr = x1.filter(item => item.name == "gr")[i2].value;
      ot2.sdSop = x1.filter(item => item.name == "sdsop")[i2].value;
      ot2.naimAiis1 = x1.filter(item => item.name == "naimAiis1")[i2].value;
      ot2.naimAiis2 = x1.filter(item => item.name == "naimAiis2")[i2].value;
      ot2.izmAiis = x1.filter(item => item.name == "izmAiis")[i2].value;
      ot2.tipIzmOt = t2.rows[i2+1].cells[5].innerHTML;
      ot2.neobhRab = x1.filter(item => item.name == "neobhRab")[i2].value;
      ot2.rabZaplan = x1.filter(item => item.name == "rabZaplan")[i2].value;
      ot2.dogPlan = x1.filter(item => item.name == "dogPlan")[i2].value;
      ot2.dogFact = x1.filter(item => item.name == "dogFact")[i2].value;
      ot2.smrPlan = x1.filter(item => item.name == "smrPlan")[i2].value;
      ot2.smrFact = x1.filter(item => item.name == "smrFact")[i2].value;
      ot2.vyezdPlan = x1.filter(item => item.name == "vyezdPlan")[i2].value;
      ot2.vyezdFact = x1.filter(item => item.name == "vyezdFact")[i2].value;
      ot2.vniimsPlan = x1.filter(item => item.name == "vniimsPlan")[i2].value;
      ot2.vniimsFact = x1.filter(item => item.name == "vniimsFact")[i2].value;
      ot2.rstPlan = x1.filter(item => item.name == "rstPlan")[i2].value;
      ot2.rstFact = x1.filter(item => item.name == "rstFact")[i2].value;
      ot2.prikazPlan = x1.filter(item => item.name == "prikazPlan")[i2].value;
      ot2.prikazFact = x1.filter(item => item.name == "prikazFact")[i2].value;
      ot2.oforSopPlan = x1.filter(item => item.name == "oforSopPlan")[i2].value;
      ot2.oforSopFact = x1.filter(item => item.name == "oforSopFact")[i2].value;
      ot2.kommOt = t2.rows[i2+1].cells[15].innerHTML;
      OT.push(ot2);
    };
  };
  //console.log('metrology', metrology);

  // конец чтения данных из таблицы метрология

  let x2 = await fetch(`/api/addot`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(OT)
  });

  let idOt = await x2.json()
  console.log(`/api/addot`,idOt);

  let metrology = [];

  for (let key in idOt) {
   // let ot1 = {};
    console.log(`key`,key, 'idOt[key]', idOt[key]);
   // ot1.idOt = idOt[key];
   // ot1.vSdSop = 0;
    metrology.push(idOt[key]);
    console.log(`metrology`,metrology);
  };


  sechenie.metrology = metrology;


  console.log('sechenie= ', sechenie);

  let resAddsech = await fetch(`/api/addsech`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sechenie)
  });
  if (resAddsech) {
    window.location.href = '/readsech';
  }

};



function addOT() {
  let  table = document.getElementById('table2');
  let tr = document.createElement("tr");
  tr.innerHTML = '<td><input name="gr"></td> <td><input name="naimAiis1" ></td> <td><input name="naimAiis2" ></td><td><input name="sdsop" type=\'date\'></td>  <td><select  name="izmAiis"> <option value="нет">нет</option> <option value="да">да</option></td>  <td contenteditable="true"> </td> <td> <select name="neobhRab"><option value="не проверялась">не проверялась</option> <option value="не требуется">не требуется</option><option value="поверка">поверка</option> <option value="переаттестация">переаттестация</option> </td><td><select  name="rabZaplan"> <option value="нет">нет</option> <option value="да">да</option> <option value="--">--</option> </td> <td><input name="dogPlan" type=\'date\'> <input name="dogFact" type=\'date\'></td><td><input name="smrPlan" type=\'date\'> <input name="smrFact" type=\'date\'></td> <td><input name="vyezdPlan" type=\'date\'> <input name="vyezdFact" type=\'date\'></td> <td><input name="vniimsPlan" type=\'date\'> <input name="vniimsFact" type=\'date\'></td> <td><input name="rstPlan" type=\'date\'> <input name="rstFact" type=\'date\'></td> <td><input name="prikazPlan" type=\'date\'> <input name="prikazFact" type=\'date\'></td> <td><input name="oforSopPlan" type=\'date\'> <input name="oforSopFact" type=\'date\'></td> <td contenteditable="true"> </td>'
  table.appendChild(tr);
  console.log('доб. стрку');
};


function delOT() {
  let agree = confirm('удалить ОТ?')
    if (agree) {
      let  table = document.getElementById('table2');
      let rowCount = table.rows.length;
      table.deleteRow(rowCount -1);
      console.log('удалить. стрку');
    };
  };

function makeRed() {
  if (window.getSelection() == '') {
    console.log('не выделено')
    return false;
  }
  let range = window.getSelection().getRangeAt(0);
  let selectionContents = range.extractContents();
  let span = document.createElement("span");
  span.appendChild(selectionContents);
  span.setAttribute("class", "selected");
  //span.style.backgroundColor = "yellow";
  span.style.color = "red";
  range.insertNode(span);
};

function makeBlack() {
  if (window.getSelection() == '') {
    console.log('не выделено')
    return false;
  }
  let range = window.getSelection().getRangeAt(0);
  let selectionContents = range.extractContents();
  let span = document.createElement("span");
  span.appendChild(selectionContents);
  span.setAttribute("class", "selected");
  //span.style.backgroundColor = "yellow";
  span.style.color = "black";
  range.insertNode(span);
};


function readTable1() {
  let t = document.getElementById('table1');
  let tra = t.children;
  let trs = tra[0].children;
  //console.log('trs', trs)
  let tds = null;
  let sum = [];

  for (let i=0; i<trs.length; i++)  {
      tds = trs[i].children;
    //  console.log('tds', tds)
      for (var n=0; n<tds.length;n++)  {
          sum.push(tds[n].innerHTML);
        //  console.log('innerHTML', tds[n].innerHTML);
      }
  }
  console.log('table1', sum, sum[33]);
};

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
};