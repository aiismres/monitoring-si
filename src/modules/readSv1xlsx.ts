import { nanoid } from 'nanoid';
import ExcelJS from 'exceljs';
import { sameCharEn, sameCharRu } from './constants.js';
// import { saveAs } from 'file-saver';
import { sameChar } from './constants.js';
import { ISiObj1 } from '../app.types.js';

type TOption = 'samechar' | 'string' | ''

export const readSv1xlsx = async (file: File) => {
  // let file = e.target.files.item(0);
  console.log(file);
  alert(`
  Импорт Сверка-1.xlsx 
  
  ${file.name}`);

  const workbook = new ExcelJS.Workbook();

  let res = await new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    let siArray: ISiObj1[] = [];
    reader.onload = async function () {
      if (reader.result instanceof ArrayBuffer)
        await workbook.xlsx.load(reader.result);

      /*/ начало теста fileSaver *************

      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(
        new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
        }),
        "data.xlsx"
      );
    // конец теста fileSaver ****************/

      const ws = workbook.getWorksheet('Лист 1');

      function setValueStatuses(cell: ExcelJS.Cell, option: TOption) {
        let value, status, status2 ,status3;
        // @ts-ignore
        if (cell.style.fill?.fgColor?.argb === 'FFFFFF00') {
          status = 'warning';
          status2 = '';
          status3 = '';
        } else {
          status = '';
          status2 = '';
          status3 = '';
        }
        if (cell.style.font?.color?.argb === 'FFFF0000') {
          status = '';
          status2 = 'incorrect';
          status3 = '';
        } else if (cell.style.font?.color?.argb === 'FF008000') {
          status = '';
          status2 = 'correct';
          status3 = '';
        } else {
          status = '';
          status2 = '';
          status3 = '';
        }
        if (option === 'string') {
          value = cell.value && String(cell.value);
        } else if (option === 'samechar' && cell.value) {
          value = sameChar(String(cell.value));
        } else {
          value = cell.value;
        }
        return { v: String(value), status, status2, status3 };
      }

      let i = 3;

      let row = ws.getRow(i).values;
      let siObj: ISiObj1 = {
        kodTi80: { v: '', status: '', status2: '', status3: '' },
        naimTi80: { v: '', status: '', status2: '', status3: '' },
        tipSch80: { v: '' , status: '', status2: '', status3: ''},
        kanaly80: { v: '' , status: '', status2: '', status3: ''},

        numTiShem60: { v: '', status: '', status2: '', status3: '' },
        tiAiis: { v: true, status: '', status2: '', status3: '' },
        gr: { v: '', status: '', status2: '', status3: '' },
        numTiSop: { v: '', status: '', status2: '', status3: '' },

        naimTiSop: { v: '', status: '', status2: '', status3: '' },
        naimTi60: { v: '', status: '', status2: '', status3: '' },
        naimTi82: { v: '', status: '', status2: '', status3: '' },

        numSchDB: { v: '', status: '', status2: '', status3: '' },
        numSchSop: { v: '', status: '', status2: '', status3: '' },
        numSchSch: { v: '', status: '', status2: '', status3: '' },

        tipSchSop: { v: '', status: '', status2: '', status3: '' },
        tipSch60: { v: '', status: '', status2: '', status3: '' },
        tipSchSch: { v: '', status: '', status2: '', status3: '' },
        tipSchDB: { v: '', status: '', status2: '', status3: '' },

        kttSop: { v: '', status: '', status2: '', status3: '' },
        kttDB: { v: '', status: '', status2: '', status3: '' },
        ktnSop: { v: '', status: '', status2: '', status3: '' },
        ktnDB: { v: '', status: '', status2: '', status3: '' },

        kodTi60: { v: '', status: '', status2: '', status3: '' },
        kanaly60: { v: '', status: '', status2: '', status3: ''},
      };

      while (row.length !== 0) {
        console.log(ws.getCell(`E${i}`).value);
        if (ws.getCell(`E${i}`).value !== 'Нет') {
          // siObj.id = nanoid();
          siObj.kodTi60 = { v: '', status: '', status2: '', status3: '' };
          siObj.numTiShem60 = setValueStatuses(ws.getCell(`C${i}`), '');
          siObj.naimTi60 = setValueStatuses(ws.getCell(`D${i}`), '');
          siObj.tipSch60 = setValueStatuses(ws.getCell(`F${i}`), 'samechar');
          siObj.kanaly60 = setValueStatuses(ws.getCell(`G${i}`), '');
          // siObj.tiAiis = { v: true };
          siObj.gr = setValueStatuses(ws.getCell(`O${i}`), '');
          siObj.numTiSop = setValueStatuses(ws.getCell(`P${i}`), '');
          siObj.naimTiSop = setValueStatuses(ws.getCell(`Q${i}`), '');
          siObj.naimTi80 = setValueStatuses(ws.getCell(`Y${i}`), '');
          siObj.naimTi82 = setValueStatuses(ws.getCell(`AC${i}`), '');
          siObj.numSchDB = setValueStatuses(ws.getCell(`AF${i}`), 'string');
          siObj.numSchSop = setValueStatuses(ws.getCell(`S${i}`), 'string');
          siObj.numSchSch = setValueStatuses(ws.getCell(`AL${i}`), 'string');
          siObj.tipSchSop = setValueStatuses(ws.getCell(`R${i}`), 'samechar');
          siObj.tipSch80 = setValueStatuses(ws.getCell(`Z${i}`), 'samechar');
          siObj.tipSchSch = setValueStatuses(ws.getCell(`AK${i}`), 'samechar');
          siObj.tipSchDB = setValueStatuses(ws.getCell(`AE${i}`), 'samechar');
          siObj.kttSop = setValueStatuses(ws.getCell(`T${i}`), 'string');
          siObj.kttDB = setValueStatuses(ws.getCell(`AG${i}`), 'string');
          siObj.ktnSop = setValueStatuses(ws.getCell(`U${i}`), 'string');
          siObj.ktnDB = setValueStatuses(ws.getCell(`AH${i}`), 'string');
          siObj.kodTi80 = setValueStatuses(ws.getCell(`X${i}`), '');
          siObj.kanaly80 = setValueStatuses(ws.getCell(`AA${i}`), '');

          console.log(siObj);
          siArray.push({ ...siObj });
        }
        i++;
        row = ws.getRow(i).values;
      }
      console.log('readXlsx.js-1', siArray);
      resolve(siArray);
    };
  });

  console.log('readXlsx.js-2', res);
  return res;
};
