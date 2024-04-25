let secheniya = [];
let Ot = [];
async function read() {
  let responseSech = await fetch('/api/readsech');

  if (responseSech.ok) {
    // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
    secheniya = await responseSech.json();
    console.log('secheniya', secheniya);
  } else {
    alert('Ошибка HTTP: ' + response.status);
  }

  let responseOt = await fetch('/api/readot');

  if (responseOt.ok) {
    // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
    Ot = await responseOt.json();
    console.log('Ot', Ot);
  } else {
    alert('Ошибка HTTP: ' + responseOt.status);
  }

  let table1 = document.getElementById('table1');
  //let tbody = document.createElement('tbody');
  secheniya.sort(function (a, b) {
    if (a.planPodachi && !b.planPodachi) {
      return new Date(a.planPodachi) - new Date(b.krSrokPodachi);
    } else if (b.planPodachi && !a.planPodachi) {
      return new Date(a.krSrokPodachi) - new Date(b.planPodachi);
    } else if (a.planPodachi && b.planPodachi) {
      return new Date(a.planPodachi) - new Date(b.planPodachi);
    } else {
      return new Date(a.krSrokPodachi) - new Date(b.krSrokPodachi);
    }
  });
  let tbody = document.createElement('tbody');
  tbody.id = 'table1body';
  secheniya.forEach(function (sech) {
    console.log('sech', sech);

    let tr = document.createElement('tr');
    /*
		let td1 = document.createElement('td');
		td1.innerHTML = sech.kodGtp;
		tr.appendChild(td1);

		let td2 = document.createElement('td');
		td2.innerHTML = sech.kodSech;
		tr.appendChild(td2);
		*/
    let td3 = document.createElement('td');

    //td3.style.verticalAlign = "middle";
    //td3.style.position = "relative";
    let td3001 = document.createElement('div');
    //td3001.style.backgroundColor = "white";
    td3001.classList.add('noactive');
    td3001.classList.add('shadow');
    td3001.classList.add('firstcolum-div');
    td3001.style.borderColor = 'black';
    td3001.style.position = 'absolute';
    td3001.style.left = '0';
    td3001.style.top = '0';
    td3001.style.height = '100%';
    td3001.style.width = '190px';
    td3001.style.verticalAlign = 'bottom';
    let td3002 = document.createElement('p');
    //td3002.style.position = "absolute";
    //td3002.style.top = "50%";

    td3.classList.add('naimSechShort');
    td3001.innerHTML = sech.naimSechShort;
    //td3002.innerHTML = sech.naimSechShort;
    //td3001.append(td3002);
    td3.append(td3001);
    tr.appendChild(td3);

    let td4 = document.createElement('td');
    td4.classList.add('vidRabot');
    td4.innerHTML = sech.vidRabot;
    tr.appendChild(td4);

    let td5 = document.createElement('td');
    td5.classList.add('soglGtp');
    td5.innerHTML = sech.soglGtp;
    tr.appendChild(td5);

    let td55 = document.createElement('td');
    td55.classList.add('dopusk');
    td55.innerHTML = sech.dopusk;
    tr.appendChild(td55);

    let td6 = document.createElement('td');
    td6.classList.add('sdAs');
    td6.innerHTML =
      sech.sdAs +
      '<br>' +
      '<span style="color: #808080;">' +
      sech.sdPas +
      '</span>';
    tr.appendChild(td6);

    /*/ вычисление крайнего срока подачи док-в на УС

		if (sech.dopusk) {sech.krSrokPodachi = formatDate(Date.parse(sech.dopusk) + 3888000000)}
			else if (sech.sdAs) {sech.krSrokPodachi = formatDate(Date.parse(sech.sdAs) -  3888000000)}
			else {sech.krSrokPodachi = formatDate(Date.parse(sech.sdPas) -  3888000000)};
		// конец вычисление крайнего срока подачи док-в на УС
		*/
    let td7 = document.createElement('td');
    td7.classList.add('krSrokPodachi');
    if (Date.parse(sech.krSrokPodachi) < new Date()) {
      td7.innerHTML =
        '<span style="color: #CC0605;">' + sech.krSrokPodachi + '</span>';
    } else if (Date.parse(sech.krSrokPodachi) - 7776000000 < new Date()) {
      td7.innerHTML =
        '<span style="color: #C04000;">' + sech.krSrokPodachi + '</span>';
    } else {
      td7.innerHTML = sech.krSrokPodachi;
    }
    tr.appendChild(td7);

    let td8 = document.createElement('td');
    td8.classList.add('planPodachi');
    td8.innerHTML = sech.planPodachi;
    tr.appendChild(td8);

    let td81 = document.createElement('td');
    td81.classList.add('metrologyKomm');
    td81.innerHTML = sech.metrologyKomm;
    tr.appendChild(td81);

    let td9 = document.createElement('td');
    td9.classList.add('gr');
    td9.innerHTML = '';
    tr.appendChild(td9);

    let td99 = document.createElement('td');
    td99.classList.add('naimAiis2');
    td99.innerHTML = '';
    tr.appendChild(td99);

    td10 = document.createElement('td');
    td10.classList.add('sdSop');
    tr.appendChild(td10);

    td11 = document.createElement('td');
    td11.classList.add('izmAiis');
    tr.appendChild(td11);

    td1101 = document.createElement('td');
    td1101.classList.add('tipIzmOt');
    tr.appendChild(td1101);

    td12 = document.createElement('td');
    td12.classList.add('neobhRab');
    tr.appendChild(td12);

    td13 = document.createElement('td');
    td13.classList.add('rabZaplan');
    tr.appendChild(td13);

    td133 = document.createElement('td');
    td133.classList.add('dogPlan');
    tr.appendChild(td133);

    td14 = document.createElement('td');
    td14.classList.add('smrPlan');
    tr.appendChild(td14);

    td15 = document.createElement('td');
    td15.classList.add('vyezdPlan');
    tr.appendChild(td15);

    td16 = document.createElement('td');
    td16.classList.add('vniimsPlan');
    tr.appendChild(td16);

    td17 = document.createElement('td');
    td17.classList.add('rstPlan');
    tr.appendChild(td17);

    td18 = document.createElement('td');
    td18.classList.add('prikazPlan');
    tr.appendChild(td18);

    td19 = document.createElement('td');
    td19.classList.add('oforSopPlan');
    tr.appendChild(td19);

    td199 = document.createElement('td');
    td199.classList.add('kommOt');
    tr.appendChild(td199);

    let ot1 = [];
    sech.metrology.forEach((item, i) => {
      let ot11 = Ot.find((ot) => ot._id == item);
      ot1.push(ot11);
    });
    //console.log('ot1', ot1);

    // если нет АС но есть ПАС то СДАС = СДПАС (для мониторинга сроков оформления СОП и выделения соотв-м цветом)
    if (!sech.sdAs) {
      sech.sdAs = sech.sdPas;
    }

    ot1.sort(function (a, b) {
      return new Date(a.sdSop) - new Date(b.sdSop);
    });
    console.log('ot1', ot1);
    ot1.forEach((ot, i) => {
      //let ot = Ot.find((ot) => ot._id == item);
      //if (ot) {

      td9.innerHTML = td9.innerHTML + ot.gr + '<br>';
      td99.innerHTML = td99.innerHTML + ot.naimAiis2 + '<br>';

      if (Date.parse(ot.sdSop) < Date.parse(sech.sdAs) + 2592000000) {
        td10.innerHTML =
          td10.innerHTML +
          '<span style="color: #FF0000;">' +
          ot.sdSop +
          '</span>' +
          '<br>';
      } else if (Date.parse(ot.sdSop) < +new Date() + 39312000000) {
        td10.innerHTML =
          td10.innerHTML +
          '<span style="color: #C04000;">' +
          ot.sdSop +
          '</span>' +
          '<br>';
      } else {
        td10.innerHTML = td10.innerHTML + ot.sdSop + '<br>';
      }

      td11.innerHTML = td11.innerHTML + ot.izmAiis + '<br>';
      if (ot.tipIzmOt.indexOf('<br>') == -1) {
        td1101.innerHTML = td1101.innerHTML + ot.tipIzmOt + '<br>';
      } else {
        td1101.innerHTML = td1101.innerHTML + ot.tipIzmOt;
      }
      td12.innerHTML = td12.innerHTML + ot.neobhRab + '<br>';
      if (ot.rabZaplan == 'нет') {
        td13.innerHTML =
          td13.innerHTML +
          '<span style="color: #FF4500;">' +
          ot.rabZaplan +
          '</span>' +
          '<br>';
      } else {
        td13.innerHTML = td13.innerHTML + ot.rabZaplan + '<br>';
      }

      if (ot.dogFact || ot.dogPlan) {
        if (ot.dogFact) {
          td133.innerHTML =
            td133.innerHTML +
            '<span style="color: #228B22;">' +
            ot.dogFact +
            '</span>' +
            '<br>';
        } else {
          td133.innerHTML = td133.innerHTML + ot.dogPlan + '<br>';
        }
      } else {
        td133.innerHTML = td133.innerHTML + '--' + '<br>';
      }
      if (ot.smrFact || ot.smrPlan) {
        if (ot.smrFact) {
          td14.innerHTML =
            td14.innerHTML +
            '<span style="color: #228B22;">' +
            ot.smrFact +
            '</span>' +
            '<br>';
        } else if (Date.parse(ot.smrPlan) < new Date()) {
          td14.innerHTML =
            td14.innerHTML +
            '<span style="color: #FF8C00;">' +
            ot.smrPlan +
            '</span>' +
            '<br>';
        } else {
          td14.innerHTML = td14.innerHTML + ot.smrPlan + '<br>';
        }
      } else {
        td14.innerHTML = td14.innerHTML + '--' + '<br>';
      }

      let vyezd = '';
      let vniims = '';
      let rst = '';
      let prikaz = '';
      let sop = '';

      if (ot.vyezdPlan || ot.vyezdFact) {
        if (ot.vyezdFact) {
          td15.innerHTML =
            td15.innerHTML +
            '<span style="color: #228B22;">' +
            ot.vyezdFact +
            '</span>' +
            '<br>';
          vyezd = ot.vyezdFact;
        } else if (Date.parse(ot.vyezdPlan) < new Date()) {
          td15.innerHTML =
            td15.innerHTML +
            '<span style="color: #FF8C00;">' +
            ot.vyezdPlan +
            '</span>' +
            '<br>';
          vyezd = ot.vyezdPlan;
        } else {
          td15.innerHTML = td15.innerHTML + ot.vyezdPlan + '<br>';
          vyezd = ot.vyezdPlan;
        }
      } else {
        td15.innerHTML = td15.innerHTML + '--' + '<br>';
      }

      if (ot.neobhRab == 'поверка') {
        td16.innerHTML = td16.innerHTML + '--' + '<br>';
        td17.innerHTML = td17.innerHTML + '--' + '<br>';
        td18.innerHTML = td18.innerHTML + '--' + '<br>';
        if (ot.oforSopFact) {
          td19.innerHTML =
            td19.innerHTML +
            '<span class="textGreen">' +
            ot.oforSopFact +
            '</span>' +
            '<br>';
        } else if (vyezd) {
          sop = formatDate(Date.parse(vyezd) + 1209600000);
          //td19.innerHTML = td19.innerHTML + sop + '<br>';
          if (
            Date.parse(sop) > Date.parse(sech.krSrokPodachi) &&
            Date.parse(ot.sdSop) < Date.parse(sech.sdAs) + 2592000000
          ) {
            td19.innerHTML =
              td19.innerHTML +
              '<span style="color: #FF0000;">' +
              sop +
              '</span>' +
              '<br>';
          } else {
            td19.innerHTML = td19.innerHTML + sop + '<br>';
          }
        } else {
          td19.innerHTML = td19.innerHTML + '--' + '<br>';
        }
      } else {
        if (ot.vniimsFact) {
          td16.innerHTML =
            td16.innerHTML +
            '<span style="color: #228B22;">' +
            ot.vniimsFact +
            '</span>' +
            '<br>';
          vniims = ot.vniimsFact;
        } else if (vyezd) {
          vniims = formatDate(Date.parse(vyezd) + 3456000000);
          if (Date.parse(vniims) < new Date()) {
            td16.innerHTML =
              td16.innerHTML +
              '<span style="color: #FF8C00;">' +
              vniims +
              '</span>' +
              '<br>';
          } else {
            td16.innerHTML = td16.innerHTML + vniims + '<br>';
          }
        } else {
          td16.innerHTML = td16.innerHTML + '--' + '<br>';
        }

        if (ot.rstFact) {
          td17.innerHTML =
            td17.innerHTML +
            '<span style="color: #228B22;">' +
            ot.rstFact +
            '</span>' +
            '<br>';
          rst = ot.rstFact;
        } else if (vniims) {
          rst = formatDate(Date.parse(vniims) + 1987200000);
          if (Date.parse(rst) < new Date()) {
            td17.innerHTML =
              td17.innerHTML +
              '<span style="color: #FF8C00;">' +
              rst +
              '</span>' +
              '<br>';
          } else {
            td17.innerHTML = td17.innerHTML + rst + '<br>';
          }
        } else {
          td17.innerHTML = td17.innerHTML + '--' + '<br>';
        }

        if (ot.prikazFact) {
          td18.innerHTML =
            td18.innerHTML +
            '<span style="color: #228B22;">' +
            ot.prikazFact +
            '</span>' +
            '<br>';
          prikaz = ot.prikazFact;
        } else if (rst) {
          prikaz = formatDate(Date.parse(rst) + 3456000000);
          if (Date.parse(prikaz) < new Date()) {
            td18.innerHTML =
              td18.innerHTML +
              '<span style="color: #FF8C00;">' +
              prikaz +
              '</span>' +
              '<br>';
          } else {
            td18.innerHTML = td18.innerHTML + prikaz + '<br>';
          }
        } else {
          td18.innerHTML = td18.innerHTML + '--' + '<br>';
        }

        if (ot.oforSopFact) {
          td19.innerHTML =
            td19.innerHTML +
            '<span style="color: #228B22;">' +
            ot.oforSopFact +
            '</span>' +
            '<br>';
        } else if (prikaz) {
          sop = formatDate(Date.parse(prikaz) + 1728000000);
          if (
            Date.parse(sop) > Date.parse(sech.krSrokPodachi) &&
            Date.parse(ot.sdSop) < Date.parse(sech.sdAs) + 2592000000
          ) {
            td19.innerHTML =
              td19.innerHTML +
              '<span style="color: #FF0000;">' +
              sop +
              '</span>' +
              '<br>';
          } else if (
            Date.parse(sop) > Date.parse(sech.krSrokPodachi) - 2592000000 &&
            Date.parse(ot.sdSop) < Date.parse(sech.sdAs) + 2592000000
          ) {
            td19.innerHTML =
              td19.innerHTML +
              '<span style="color: #C04000;">' +
              sop +
              '</span>' +
              '<br>';
          } else if (
            Date.parse(sop) > Date.parse(sech.krSrokPodachi) &&
            sech.vidRabot != 'продление'
          ) {
            td19.innerHTML =
              td19.innerHTML +
              '<span style="color: #FF0000;">' +
              sop +
              '</span>' +
              '<br>';
          } else if (Date.parse(sop) < new Date()) {
            td19.innerHTML =
              td19.innerHTML +
              '<span style="color: #FF8C00;">' +
              sop +
              '</span>' +
              '<br>';
          } else {
            td19.innerHTML = td19.innerHTML + sop + '<br>';
          }
        } else {
          td19.innerHTML = td19.innerHTML + '--' + '<br>';
        }
      }

      if (ot.kommOt) {
        td199.innerHTML = td199.innerHTML + ot.kommOt + '<br>';
      } else {
        td199.innerHTML = td199.innerHTML + '--' + '<br>';
      }
      //}
    });
    /*
	 	let td32 = document.createElement('td');
		td32.innerHTML = sech.naimSechShort;
		td32.classList.add("naimSechShort2");
		tr.appendChild(td32);
		*/
    let td20 = document.createElement('td');
    td20.classList.add('codirovkaActual');

    if (sech.codirovkaActual == 'не проверялась') {
      td20.innerHTML =
        '<span class="textOrange">' + sech.codirovkaActual + '</span>';
    } else if (sech.codirovkaActual == 'актуальна') {
      td20.innerHTML =
        '<span class="textGreen">' + sech.codirovkaActual + '</span>';
    } else if (sech.codirovkaActual == 'Не актуальна') {
      td20.innerHTML =
        '<span class="textRed">' + sech.codirovkaActual + '</span>';
      if (sech.sogl4v) {
        td20.innerHTML = td20.innerHTML + '<br>' + '4В согл-н: ' + sech.sogl4v;
      } else if (sech.otprav4v) {
        td20.innerHTML =
          td20.innerHTML + '<br>' + '4В отправл: ' + sech.otprav4v;
      } else if (sech.sogl60SmezhSogl) {
        td20.innerHTML =
          td20.innerHTML + '<br>' + 'Смеж согл-л: ' + sech.sogl60SmezhSogl;
      } else if (sech.sogl60SmezhOtpr) {
        td20.innerHTML =
          td20.innerHTML + '<br>' + 'Смеж-у направл: ' + sech.sogl60SmezhOtpr;
      } else if (sech.sogl60Dku) {
        td20.innerHTML =
          td20.innerHTML + '<br>' + 'ДКУ согл-л: ' + sech.sogl60Dku;
      } else if (sech.zaprosPerecod) {
        td20.innerHTML =
          td20.innerHTML + '<br>' + 'Запросил перекод: ' + sech.zaprosPerecod;
      }
    }
    // else {td20.innerHTML = '<span class="textRed">' + sech.codirovkaActual + '</span>'}
    //}

    // else {td20.innerHTML = '<span class="textGreen">' + sech.codirovkaActual + '</span>'};
    tr.appendChild(td20);

    let td201 = document.createElement('td');
    td201.classList.add('tipIzmCodirovki');
    td201.innerHTML = sech.tipIzmCodirovki;
    tr.appendChild(td201);

    let td21 = document.createElement('td');
    td21.classList.add('sverkiKomm');
    td21.innerHTML = sech.sverkiKomm;
    tr.appendChild(td21);

    let td22 = document.createElement('td');
    td22.classList.add('sv1');
    td22.innerHTML = sech.sv1;
    tr.appendChild(td22);

    let td23 = document.createElement('td');
    td23.classList.add('sv2');
    td23.innerHTML = sech.sv2;
    tr.appendChild(td23);

    let td24 = document.createElement('td');
    td24.classList.add('sv3');
    td24.innerHTML = sech.sv3;
    tr.appendChild(td24);

    let td25 = document.createElement('td');
    td25.classList.add('pi');
    td25.innerHTML = sech.pi;
    tr.appendChild(td25);

    let td26 = document.createElement('td');
    td26.classList.add('textOt');
    td26.innerHTML = sech.textOt;
    tr.appendChild(td26);

    let td27 = document.createElement('td');
    td27.classList.add('gotovnostUs');
    td27.innerHTML = sech.gotovnostUs;
    tr.appendChild(td27);

    let td28 = document.createElement('td');
    td28.classList.add('zakluchenie');
    td28.innerHTML = sech.zakluchenie;
    tr.appendChild(td28);

    let td29 = document.createElement('td');
    td29.classList.add('osobenAiis');
    td29.innerHTML = sech.osobenAiis;
    tr.appendChild(td29);

    let td30 = document.createElement('td');
    td30.classList.add('kolTi');
    td30.innerHTML = sech.kolTi;
    tr.appendChild(td30);

    let td31 = document.createElement('td');
    td31.classList.add('sobstvAiis');
    td31.innerHTML = sech.sobstvAiis;
    tr.appendChild(td31);

    let td33 = document.createElement('td');
    td33.classList.add('_id');
    td33.innerHTML = sech._id;
    tr.appendChild(td33);

    tbody.appendChild(tr);
    //table1.appendChild(tr);
  });
  table1.appendChild(tbody);
}
read();

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}

// фильтр таблицы
$(document).ready(function () {
  $('#myInput').on('keyup', function () {
    var value = $(this).val().toLowerCase();
    $('#table1body tr').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

let i = 0; //номер строки в таблице
let j = 0; // номер ячейки в таблице
let sechId1 = 0;
let cell = '';
let naimSechShort3 = '';
document.querySelector('table').onclick = (event) => {
  let cell = event.target;
  if (cell.tagName.toLowerCase() != 'td') return;

  i = cell.parentNode.rowIndex;
  j = cell.cellIndex;

  console.log(i, j, cell.className, event.pageX, event.pageY);
  console.log(document.getElementById('table1').rows[i].cells[36].innerHTML);
  sechId1 = document.getElementById('table1').rows[i].cells[36].innerHTML;
  naimSechShort3 =
    document.getElementById('table1').rows[i].cells[0].firstChild.textContent;
  document.getElementById('table1').rows[i].cells[36].innerHTML;
  if (document.querySelector('.active')) {
    document.querySelector('.active').classList.remove('active');
    document.querySelector('.active').classList.add('noactive');
  }
  if (document.querySelector('.active')) {
    document.querySelector('.active').classList.remove('active');
    //document.querySelector('.active').classList.add('noactive');
  }
  document.getElementById('table1').rows[i].classList.add('active');
  document
    .getElementById('table1')
    .rows[i].cells[0].firstChild.classList.remove('noactive');
  document
    .getElementById('table1')
    .rows[i].cells[0].firstChild.classList.add('active');
  document.getElementById('futer1').innerHTML =
    document.getElementById('table1').rows[i].cells[0].firstChild.innerHTML;
};

async function delSech() {
  let agree = confirm('удалить сечение?');
  if (agree) {
    document.getElementById('table1').rows[i].remove();

    let sechId = {};
    sechId.id = sechId1;
    console.log(`sechId`, sechId);

    let delSech = await fetch(`/api/delsech`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sechId),
    });

    delSech.json();
    console.log(`/api/delsech`, delSech);

    responseSech = await fetch('/api/readsech');
    if (responseSech.ok) {
      // если HTTP-статус в диапазоне 200-299
      // получаем тело ответа (см. про этот метод ниже)
      secheniya = await responseSech.json();
      console.log('secheniya', secheniya);
    } else {
      alert('Ошибка HTTP: ' + response.status);
    }

    responseOt = await fetch('/api/readot');
    if (responseOt.ok) {
      // если HTTP-статус в диапазоне 200-299
      // получаем тело ответа (см. про этот метод ниже)
      Ot = await responseOt.json();
      console.log('Ot', Ot);
    } else {
      alert('Ошибка HTTP: ' + responseOt.status);
    }
  }
}

// скрыть столбцы
function hideSt() {
  //$('td:nth-child(12),th:nth-child(12),td:nth-child(13),th:nth-child(13),td:nth-child(14),th:nth-child(14),td:nth-child(15),th:nth-child(15),td:nth-child(16),th:nth-child(16),td:nth-child(17),th:nth-child(17),td:nth-child(18),th:nth-child(18)').hide();
  $('#table1').css({ width: '1900' });
  // $('.vidRabot, .soglGtp, .dopusk, .sdAs, .krSrokPodachi, .planPodachi, .metrologyKomm, .gr, .naimAiis2, .sdSop, .izmAiis, .neobhRab, .rabZaplan, .dogPlan, .smrPlan, .vyezdPlan, .vniimsPlan, .rstPlan, .prikazPlan, .oforSopPlan, .kommOt, .naimSechShort2, .codirovkaActual, .tipIzmCodirovki, .sverkiKomm, .sv1, .sv2, .sv3, .pi, .textOt, .gotovnostUs, .zakluchenie, .osobenAiis, .kolTi, .sobstvAiis, ._id').hide();
  $(
    '.soglGtp, .dopusk, .sdAs, .planPodachi, .gr, .izmAiis, .tipIzmOt, .dogPlan, .smrPlan, .vyezdPlan, .vniimsPlan, .rstPlan, .prikazPlan, .kommOt, .naimSechShort2, .sverkiKomm, .tipIzmCodirovki, .sv1, .sv3, .textOt, .sobstvAiis, ._id'
  ).hide();
}

function openSi() {
  // window.open(`monitoringsi?sechID=${sechId1}&naimsechshort=${naimSechShort3}`);
  window.open(`monitoringsi?sechID=${sechId1}&naimsechshort=${naimSechShort3}`);
}

const chbx1 = document.getElementById('chbx-1');
chbx1.addEventListener('change', function () {
  if (!this.checked) {
    // $("#table1").css({"width": "2900"});
    $(
      '.izmAiis, .tipIzmOt, .neobhRab, .rabZaplan, .dogPlan, .smrPlan, .vyezdPlan, .vniimsPlan, .rstPlan, .prikazPlan, .oforSopPlan'
    ).hide();
  } else {
    // $("#table1").css({"width": "3800"});
    $(
      '.soglGtp, .dopusk, .sdAs, .planPodachi, .gr, .izmAiis, .tipIzmOt, .neobhRab, .rabZaplan, .dogPlan, .smrPlan, .vyezdPlan, .vniimsPlan, .rstPlan, .prikazPlan, .oforSopPlan, .naimSechShort2, .sverkiKomm, .tipIzmCodirovki, .sv1, .sv3, .textOt, .sobstvAiis, ._id'
    ).show();
  }
});

const chbx2 = document.getElementById('chbx-2');
chbx2.addEventListener('change', function () {
  if (!this.checked) {
    // $("#table1").css({"width": "3800"});
    $('.sverkiKomm, .sv1, .sv2, .sv3, .pi').hide();
  } else {
    // $("#table1").css({"width": "3800"});
    $('.sverkiKomm, .sv1, .sv2, .sv3, .pi').show();
  }
});

// всплывающее окно:
let hint = document.querySelector('.hint');
//    hint.className = "hint"; // изначально невидимый клаcc
//document.body.appendChild(hint);

//let i;
//let j;
//let cell;
document.querySelector('table').ondblclick = (event) => {
  if (event.target.tagName.toLowerCase() != 'td') return;

  cell = event.target;
  i = cell.parentNode.rowIndex;
  j = cell.cellIndex;

  /*if (cell.className == "sdSop") {
		hint.style.display = 'inline-block';
		hint.style.position = 'absolute';
		hint.style.top = event.pageY - 100 + 'px';
		hint.style.left = '10px' //event.pageX - 10 + 'px';
	}
	else */
  console.log('cell.className', cell.className);
  if (
    cell.className == 'metrologyKomm' ||
    cell.className == 'sverkiKomm' ||
    cell.className == 'sv1' ||
    cell.className == 'sv2' ||
    cell.className == 'sv3' ||
    cell.className == 'pi' ||
    cell.className == 'textOt' ||
    cell.className == 'gotovnostUs' ||
    cell.className == 'zakluchenie' ||
    cell.className == 'osobenAiis' ||
    cell.className == 'kolTi' ||
    cell.className == 'sobstvAiis'
  ) {
    cell.setAttribute('contenteditable', 'true');
  }
};

let statusUS;

function openEditSech() {
  hint.style.display = 'inline-block';
  hint.style.position = 'absolute';
  hint.style.top = event.pageY - 700 + 'px';
  hint.style.left = '10px'; //event.pageX - 10 + 'px';
  console.log(i, j, cell.className, event.pageX, event.pageY);
  console.log(document.getElementById('table1').rows[i].cells[36].innerHTML);
  let sechId1 = document.getElementById('table1').rows[i].cells[36].innerHTML;
  //let sechNaim = document.getElementById('table1').rows[i].cells[0].innerHTML;
  //let stolbNaim = document.getElementById('table1').rows[0].cells[j].innerHTML;
  //hint.innerHTML = sechId1 + '<br>' + sechNaim + '<br>' + stolbNaim + '<br>' + cell.innerHTML;
  /*if (document.querySelector('.active'))
	  {document.querySelector('.active').classList.remove('active')};
	document.getElementById('table1').rows[i].classList.add('active');
  document.getElementById('futer1').innerHTML = document.getElementById('table1').rows[i].cells[0].innerHTML;
  */
  let sechEdit = secheniya.find((item) => item._id == sechId1);
  console.log(sechEdit);
  statusUS = sechEdit.statusUS;
  let table2 = document.getElementById('table2');

  table2.querySelector('[name="naimSechShort"]').value = sechEdit.naimSechShort;
  table2.querySelector('[name="vidRabot"]').value = sechEdit.vidRabot;
  table2.querySelector('[name="soglGtp"]').value = sechEdit.soglGtp;
  table2.querySelector('[name="dopusk"]').value = sechEdit.dopusk;
  table2.querySelector('[name="sdAs"]').value = sechEdit.sdAs;
  table2.querySelector('[name="sdPas"]').value = sechEdit.sdPas;
  table2.querySelector('[name="krSrokPodachi"]').value = sechEdit.krSrokPodachi;
  table2.querySelector('[name="planPodachi"]').value = sechEdit.planPodachi;
  table2.querySelector('[name="metrologyKomm"]').innerHTML =
    sechEdit.metrologyKomm;
  table2.querySelector('[name="codirovkaActual"]').value =
    sechEdit.codirovkaActual;
  table2.querySelector('[name="tipIzmCodirovki"]').innerHTML =
    sechEdit.tipIzmCodirovki;
  table2.querySelector('[name="zaprosPerecod"]').value = sechEdit.zaprosPerecod;
  table2.querySelector('[name="60SoglDku"]').value = sechEdit.sogl60Dku;
  table2.querySelector('[name="60SoglSmezhOtpr"]').value =
    sechEdit.Sogl60SmezhOtpr;
  table2.querySelector('[name="4vOtprav"]').value = sechEdit.otprav4v;
  table2.querySelector('[name="sverkiKomm"]').innerHTML = sechEdit.sverkiKomm;
  table2.querySelector('[name="sv1"]').innerHTML = sechEdit.sv1;
  table2.querySelector('[name="sv2"]').innerHTML = sechEdit.sv2;
  table2.querySelector('[name="sv3"]').innerHTML = sechEdit.sv3;
  table2.querySelector('[name="pi"]').innerHTML = sechEdit.pi;
  table2.querySelector('[name="textOt"]').innerHTML = sechEdit.textOt;
  table2.querySelector('[name="gotovnostUs"]').innerHTML = sechEdit.gotovnostUs;
  table2.querySelector('[name="zakluchenie"]').innerHTML = sechEdit.zakluchenie;
  table2.querySelector('[name="osobenAiis"]').innerHTML = sechEdit.osobenAiis;
  table2.querySelector('[name="kolTi"]').value = sechEdit.kolTi;
  table2.querySelector('[name="sobstvAiis"]').value = sechEdit.sobstvAiis;
  table2.querySelector('[name="kodGtp"]').value = sechEdit.kodGtp;
  table2.querySelector('[name="kodSech"]').value = sechEdit.kodSech;
  table2.querySelector('[name="sechId"]').value = sechEdit._id;

  sechEdit.metrology.forEach((item) => {
    let OtEdit = Ot.find((itemOt) => itemOt._id == item);
    console.log('OtEdit', OtEdit);

    //let tr = document.createElement("tr");
    //tr.innerHTML = '<td><input name="gr"></td> <td><input name="naimAiis1" ></td> <td><input name="naimAiis2" ></td><td><input name="sdsop" type=\'date\'></td>  <td><select  name="izmAiis"> <option value="нет">нет</option> <option value="да">да</option></td>  <td contenteditable="true"> </td> <td> <select name="neobhRab"><option value="не проверялась">не проверялась</option> <option value="не требуется">не требуется</option><option value="поверка">поверка</option> <option value="переаттестация">переаттестация</option> </td><td><select  name="rabZaplan"> <option value="нет">нет</option> <option value="да">да</option></td> <td><input name="dogPlan" type=\'date\'> <input name="dogFact" type=\'date\'></td><td><input name="smrPlan" type=\'date\'> <input name="smrFact" type=\'date\'></td> <td><input name="vyezdPlan" type=\'date\'> <input name="vyezdFact" type=\'date\'></td> <td><input name="vniimsPlan" type=\'date\'> <input name="vniimsFact" type=\'date\'></td> <td><input name="rstPlan" type=\'date\'> <input name="rstFact" type=\'date\'></td> <td><input name="prikazPlan" type=\'date\'> <input name="prikazFact" type=\'date\'></td> <td><input name="oforSopPlan" type=\'date\'> <input name="oforSopFact" type=\'date\'></td> <td contenteditable="true"> </td>'
    //table.appendChild(tr);
    let table3tbody = document.getElementById('table3tbody');

    let tr2 = document.createElement('tr');
    let td101 = document.createElement('td');
    td101.innerHTML = `<input name="gr" value="${OtEdit.gr}">`;
    tr2.append(td101);

    let td102 = document.createElement('td');
    td102.innerHTML = `<input name="naimAiis1" value="${OtEdit.naimAiis1}">`;
    tr2.append(td102);

    let td103 = document.createElement('td');
    td103.innerHTML = `<input name="naimAiis2" value="${OtEdit.naimAiis2}">`;
    tr2.append(td103);

    let td104 = document.createElement('td');
    td104.innerHTML = `<input name="sdsop" type='date' value="${OtEdit.sdSop}">`;
    tr2.append(td104);

    let td105 = document.createElement('td');
    if (OtEdit.izmAiis == 'да') {
      td105.innerHTML = `<select  name="izmAiis">
			<option value="нет">нет</option>
			<option value="да" selected >да</option>`;
    } else if (OtEdit.izmAiis == 'нет') {
      td105.innerHTML = `<select  name="izmAiis">
			<option value="нет" selected >нет</option>
			<option value="да" >да</option>`;
    }
    tr2.append(td105);

    let td106 = document.createElement('td');
    td106.setAttribute('name', 'tipIzmOt');
    td106.setAttribute('contenteditable', 'true');
    td106.innerHTML = OtEdit.tipIzmOt;
    tr2.append(td106);

    let td107 = document.createElement('td');
    if (OtEdit.neobhRab == 'не проверялась') {
      td107.innerHTML = `<select name="neobhRab">
			<option value="не проверялась" selected>не проверялась</option>
			<option value="не требуется">не требуется</option>
			<option value="поверка">поверка</option>
			<option value="переаттестация">переаттестация</option>`;
    } else if (OtEdit.neobhRab == 'не требуется') {
      td107.innerHTML = `<select name="neobhRab">
			<option value="не проверялась" >не проверялась</option>
			<option value="не требуется" selected>не требуется</option>
			<option value="поверка">поверка</option>
			<option value="переаттестация">переаттестация</option>`;
    } else if (OtEdit.neobhRab == 'поверка') {
      td107.innerHTML = `<select name="neobhRab">
			<option value="не проверялась" >не проверялась</option>
			<option value="не требуется" >не требуется</option>
			<option value="поверка" selected>поверка</option>
			<option value="переаттестация">переаттестация</option>`;
    } else if (OtEdit.neobhRab == 'переаттестация') {
      td107.innerHTML = `<select name="neobhRab">
			<option value="не проверялась" >не проверялась</option>
			<option value="не требуется" >не требуется</option>
			<option value="поверка" >поверка</option>
			<option value="переаттестация" selected>переаттестация</option>`;
    }
    tr2.append(td107);

    let td108 = document.createElement('td');
    if (OtEdit.rabZaplan == 'да') {
      td108.innerHTML = `<select  name="rabZaplan">
      		<option value="нет">нет</option>
      		<option value="да" selected>да</option>
			<option value="--">--</option>`;
    } else if (OtEdit.rabZaplan == 'нет') {
      td108.innerHTML = `<select  name="rabZaplan">
      		<option value="нет" selected>нет</option>
      		<option value="да" >да</option>
			<option value="--">--</option>`;
    } else if (OtEdit.rabZaplan == '--') {
      td108.innerHTML = `<select  name="rabZaplan">
      		<option value="нет" >нет</option>
      		<option value="да" >да</option>
			<option value="--" selected>--</option>`;
    }
    tr2.append(td108);

    let td109 = document.createElement('td');
    td109.innerHTML = `<input name="dogPlan" type='date' value="${OtEdit.dogPlan}"> <br> <input name="dogFact" type='date' value="${OtEdit.dogFact}">`;
    tr2.append(td109);

    let td110 = document.createElement('td');
    td110.innerHTML = `<input name="smrPlan" type='date' value="${OtEdit.smrPlan}"> <br> <input name="smrFact" type='date' value="${OtEdit.smrFact}">`;
    tr2.append(td110);

    let td111 = document.createElement('td');
    td111.innerHTML = `<input name="vyezdPlan" type='date' value="${OtEdit.vyezdPlan}"> <br> <input name="vyezdFact" type='date' value="${OtEdit.vyezdFact}">`;
    tr2.append(td111);

    let td112 = document.createElement('td');
    td112.innerHTML = `<input name="vniimsFact" type='date' value="${OtEdit.vniimsFact}">`;
    tr2.append(td112);

    let td113 = document.createElement('td');
    td113.innerHTML = `<input name="rstFact" type='date' value="${OtEdit.rstFact}">`;
    tr2.append(td113);

    let td114 = document.createElement('td');
    td114.innerHTML = `<input name="prikazFact" type='date' value="${OtEdit.prikazFact}">`;
    tr2.append(td114);

    let td115 = document.createElement('td');
    td115.innerHTML = `<input name="oforSopFact" type='date' value="${OtEdit.oforSopFact}">`;
    tr2.append(td115);

    let td116 = document.createElement('td');
    td116.setAttribute('name', 'kommOt');
    td116.setAttribute('contenteditable', 'true');
    td116.innerHTML = OtEdit.kommOt;
    tr2.append(td116);

    let td117 = document.createElement('td');
    td117.innerHTML = `<input name="idOt" value="${OtEdit._id}" readonly>`;
    tr2.append(td117);

    table3tbody.append(tr2);
  });
}

document.addEventListener('keydown', async function (event) {
  if (event.code == 'KeyS' && (event.altKey || event.metaKey)) {
    console.log('cell', cell);
    cell.setAttribute('contenteditable', 'false');
    let cellObj = {};
    cellObj._id = document.getElementById('table1').rows[i].cells[36].innerHTML;
    cellObj.field = cell.className;
    cellObj.fieldValue =
      document.getElementById('table1').rows[i].cells[j].innerHTML;
    let x6 = await fetch(`/api/editcell`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cellObj),
    });
    console.log('x6', x6);
  }
});

async function editSech() {
  let form3 = document.getElementById('form3');
  console.log('form3', form3);
  let x1 = $('form').serializeArray();
  console.log('arrayform3', x1);

  // вычисление крайнего срока подачи док-в на УС
  let vidRabot = x1.find((item) => item.name == 'vidRabot').value;
  let dopusk = x1.find((item) => item.name == 'dopusk').value;
  let sdAs = x1.find((item) => item.name == 'sdAs').value;
  let sdPas = x1.find((item) => item.name == 'sdPas').value;
  let krSrokPodachi = '';
  if (vidRabot == 'изменения') {
    krSrokPodachi = formatDate(Date.parse(dopusk) + 3888000000);
    //console.log("vidRabot = изменения");
  } else if (vidRabot == 'продление') {
    if (sdAs) {
      krSrokPodachi = formatDate(Date.parse(sdAs) - 3888000000);
      //console.log("vidRabot = продление sdAs");
    } else if (sdPas) {
      krSrokPodachi = formatDate(Date.parse(sdPas) - 3888000000);
      //console.log("vidRabot = продление sdPas");
    }
  } else if (vidRabot == 'новое') {
    krSrokPodachi = x1.find((item) => item.name == 'krSrokPodachi').value;
    //console.log("vidRabot = новое");
  }
  // конец вычисление крайнего срока подачи док-в на УС

  let sechenie = {
    _id: x1.find((item) => item.name == 'sechId').value,
    naimSechShort: x1.find((item) => item.name == 'naimSechShort').value,
    vidRabot: x1.find((item) => item.name == 'vidRabot').value,
    soglGtp: x1.find((item) => item.name == 'soglGtp').value,
    dopusk: x1.find((item) => item.name == 'dopusk').value,
    sdAs: x1.find((item) => item.name == 'sdAs').value,
    sdPas: x1.find((item) => item.name == 'sdPas').value,
    krSrokPodachi: krSrokPodachi,
    planPodachi: x1.find((item) => item.name == 'planPodachi').value,
    //metrologyKomm: table2.rows[1].cells[8].innerHTML,
    metrologyKomm: table2.rows[1].querySelector('[name="metrologyKomm"]')
      .innerHTML,
    codirovkaActual: x1.find((item) => item.name == 'codirovkaActual').value,
    //tipIzmCodirovki: table2.rows[1].cells[10].innerHTML,
    tipIzmCodirovki: table2.rows[1].querySelector('[name="tipIzmCodirovki"]')
      .innerHTML,
    zaprosPerecod: x1.find((item) => item.name == 'zaprosPerecod').value,
    sogl60Dku: x1.find((item) => item.name == '60SoglDku').value,
    sogl60SmezhOtpr: x1.find((item) => item.name == '60SoglSmezhOtpr').value,
    sogl60SmezhSogl: x1.find((item) => item.name == '60SoglSmezhSogl').value,
    otprav4v: x1.find((item) => item.name == '4vOtprav').value,
    sogl4v: x1.find((item) => item.name == '4vSogl').value,
    //sverkiKomm: table2.rows[1].cells[14].innerHTML,
    sverkiKomm: table2.rows[1].querySelector('[name="sverkiKomm"]').innerHTML,
    // sv1: table2.rows[1].cells[15].innerHTML,
    sv1: table2.rows[1].querySelector('[name="sv1"]').innerHTML,
    sv2: table2.rows[1].querySelector('[name="sv2"]').innerHTML,
    sv3: table2.rows[1].querySelector('[name="sv3"]').innerHTML,
    pi: table2.rows[1].querySelector('[name="pi"]').innerHTML,
    textOt: table2.rows[1].querySelector('[name="textOt"]').innerHTML,
    gotovnostUs: table2.rows[1].querySelector('[name="gotovnostUs"]').innerHTML,
    zakluchenie: table2.rows[1].querySelector('[name="zakluchenie"]').innerHTML,
    osobenAiis: table2.rows[1].querySelector('[name="osobenAiis"]').innerHTML,
    kolTi: x1.find((item) => item.name == 'kolTi').value,
    sobstvAiis: x1.find((item) => item.name == 'sobstvAiis').value,
    kodGtp: x1.find((item) => item.name == 'kodGtp').value,
    kodSech: x1.find((item) => item.name == 'kodSech').value,
    statusUS,
  };
  //console.log('Измененное сечение', sechenie);

  let x5 = await fetch(`/api/editsech`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sechenie),
  });
  //console.log('изм сеч', sechenie._id, x5);
  //  чтение данных из таблицы метрология

  let OT = [];
  let t3 = document.getElementById('table3');
  //console.log('(t2.rows.length', t2.rows.length);
  //let gr =  x1.filter(item => item.name == "gr")
  //console.log('neobhRab', x1.filter(item => item.name == "neobhRab"));

  for (let i2 = 0; i2 < t3.rows.length; i2++) {
    let ot2 = {};
    //console.log('i2', i2);
    //console.log(t2.rows[i2].cells[3].innerHTML, t2.rows[i2].cells[12].innerHTML);
    if (i2 < t3.rows.length - 1) {
      //console.log('gr[i2]', gr[i2].value);
      /*
			ot1.gr = x1.filter(item => item.name == "gr")[i2].value;
			ot1.sdSop = x1.filter(item => item.name == "sdsop")[i2].value;
			*/
      ot2._id = x1.filter((item) => item.name == 'idOt')[i2].value;
      ot2.gr = x1.filter((item) => item.name == 'gr')[i2].value;
      ot2.sdSop = x1.filter((item) => item.name == 'sdsop')[i2].value;
      ot2.naimAiis1 = x1.filter((item) => item.name == 'naimAiis1')[i2].value;
      ot2.naimAiis2 = x1.filter((item) => item.name == 'naimAiis2')[i2].value;
      ot2.izmAiis = x1.filter((item) => item.name == 'izmAiis')[i2].value;
      ot2.tipIzmOt = t3.rows[i2 + 1].cells[5].innerHTML;
      ot2.neobhRab = x1.filter((item) => item.name == 'neobhRab')[i2].value;
      ot2.rabZaplan = x1.filter((item) => item.name == 'rabZaplan')[i2].value;
      ot2.dogPlan = x1.filter((item) => item.name == 'dogPlan')[i2].value;
      ot2.dogFact = x1.filter((item) => item.name == 'dogFact')[i2].value;
      ot2.smrPlan = x1.filter((item) => item.name == 'smrPlan')[i2].value;
      ot2.smrFact = x1.filter((item) => item.name == 'smrFact')[i2].value;
      ot2.vyezdPlan = x1.filter((item) => item.name == 'vyezdPlan')[i2].value;
      ot2.vyezdFact = x1.filter((item) => item.name == 'vyezdFact')[i2].value;
      //ot2.vniimsPlan = x1.filter(item => item.name == "vniimsPlan")[i2].value;
      ot2.vniimsFact = x1.filter((item) => item.name == 'vniimsFact')[i2].value;
      //ot2.rstPlan = x1.filter(item => item.name == "rstPlan")[i2].value;
      ot2.rstFact = x1.filter((item) => item.name == 'rstFact')[i2].value;
      //ot2.prikazPlan = x1.filter(item => item.name == "prikazPlan")[i2].value;
      ot2.prikazFact = x1.filter((item) => item.name == 'prikazFact')[i2].value;
      //ot2.oforSopPlan = x1.filter(item => item.name == "oforSopPlan")[i2].value;
      ot2.oforSopFact = x1.filter((item) => item.name == 'oforSopFact')[
        i2
      ].value;
      ot2.kommOt = t3.rows[i2 + 1].cells[15].innerHTML;
      //console.log('изм ОТ1', ot2._id);
      let x4 = await fetch(`/api/editot`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ot2),
      });
      //console.log('изм ОТ2', ot2._id, x4);
      OT.push(ot2);
    }
  }
  //console.log('Измененные OT', OT)

  location.reload(); // window.location.reload()
}

function makeRed() {
  if (window.getSelection() == '') {
    console.log('не выделено');
    return false;
  }
  let range = window.getSelection().getRangeAt(0);
  let selectionContents = range.extractContents();
  let span = document.createElement('span');
  span.appendChild(selectionContents);
  span.setAttribute('class', 'selected');
  //span.style.backgroundColor = "yellow";
  span.style.color = 'red';
  range.insertNode(span);
}

function makeGreen() {
  if (window.getSelection() == '') {
    console.log('не выделено');
    return false;
  }
  let range = window.getSelection().getRangeAt(0);
  let selectionContents = range.extractContents();
  let span = document.createElement('span');
  span.appendChild(selectionContents);
  span.setAttribute('class', 'selected');
  //span.style.backgroundColor = "yellow";
  span.style.color = 'green';
  range.insertNode(span);
}

function makeOrange() {
  if (window.getSelection() == '') {
    console.log('не выделено');
    return false;
  }
  let range = window.getSelection().getRangeAt(0);
  let selectionContents = range.extractContents();
  let span = document.createElement('span');
  span.appendChild(selectionContents);
  span.setAttribute('class', 'selected');
  //span.style.backgroundColor = "yellow";
  span.style.color = 'orange';
  range.insertNode(span);
}

function makeGray() {
  if (window.getSelection() == '') {
    console.log('не выделено');
    return false;
  }
  let range = window.getSelection().getRangeAt(0);
  let selectionContents = range.extractContents();
  let span = document.createElement('span');
  span.appendChild(selectionContents);
  span.setAttribute('class', 'selected');
  //span.style.backgroundColor = "yellow";
  span.style.color = 'gray';
  range.insertNode(span);
}

function makeBlack() {
  if (window.getSelection() == '') {
    console.log('не выделено');
    return false;
  }
  let range = window.getSelection().getRangeAt(0);
  let selectionContents = range.extractContents();
  //console.log('selectionContents', selectionContents);
  //console.log('selectionContents.textContent', selectionContents.textContent);
  let text = document.createTextNode(selectionContents.textContent);
  range.insertNode(text);
}
