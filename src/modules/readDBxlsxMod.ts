import { nanoid } from "nanoid";
import ExcelJS from "exceljs";
import { sameChar } from "./constants";
import { ISiObj1 } from "../app.types.js";

export const readDBxlsxMod = async (file: File, siArray: ISiObj1[]) => {
  // let file = e.target.files.item(0);
  console.log(file.name);
  alert(`
  Импорт Базы данных.xlsx

  ${file.name}`);

  const workbook = new ExcelJS.Workbook();
  let res = await new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    // let siArray = [];
    reader.onload = async function () {
      if (reader.result instanceof ArrayBuffer)
      await workbook.xlsx.load(reader.result);
      const worksheet = workbook.getWorksheet("table1");
      // let row = worksheet.getRow(5).values;
      // console.log(row[17])
      console.log(siArray);
      let siArrayMod = siArray.map((siObj) => {
        return {
          ...siObj,
          numSchDB: {},
          tipSchDB: {},
          kttDB: {},
          ktnDB: {},
        };
      });
      console.log(siArrayMod);

      let i = 2;
      let row = worksheet.getRow(i).values as ExcelJS.CellValue[];
      // let siArrayMod = [];
      let siObj = {};

      // while (String(row) !== '') {
      while (row.length !== 0) {
        // console.log(i, row, String(row) == '', row[16]);
        // if (row[6]) {
        //   row[6] = sameChar(row[6]);
        // }
        // if (row[18]) {
        //   row[18] = sameChar(row[18]);
        // }
        // if (row[26]) {
        //   row[26] = sameChar(row[26]);
        // }
        // if (row[31]) {
        //   row[31] = sameChar(row[31]);
        // }
        // if (row[37]) {
        //   row[37] = sameChar(row[37]);
        // }
        let kodTiDb = row[15];
        let numSchDB = row[9];
        let tipSchDB = row[10] && sameChar(String(row[10]));
        let kttDB = row[13];
        let ktnDB = row[14];
        siArrayMod = siArrayMod.map((siObj) => {
          if (kodTiDb === siObj.kodTi80.v || kodTiDb === siObj.kodTi60.v) {
            return {
              ...siObj,
              numSchDB: { v: numSchDB, id: nanoid() },
              tipSchDB: { v: tipSchDB, id: nanoid() },
              kttDB: { v: kttDB, id: nanoid() },
              ktnDB: { v: ktnDB, id: nanoid() },
            };
          } else {
            return siObj;
          }
        });
        /*
        siObj = {
          id: nanoid(),
          numTiShem60: { v: row[3], id: nanoid() },
          kodTi60: { v: 0, id: nanoid() },
          naimTi60: { v: row[4], id: nanoid() },
          tipSch60: { v: row[6], id: nanoid() },
          kanaly60: { v: row[7], id: nanoid() },
          tiAiis: { v: true, id: nanoid() },

          gr: { v: row[15], id: nanoid() },
          numTiSop: { v: row[16], id: nanoid() },

          naimTiSop: { v: row[17], id: nanoid() },
          naimTi80: { v: row[25], id: nanoid() },
          naimTi82: { v: row[29], id: nanoid() },

          numSchDB: { v: String(row[32]), id: nanoid() },
          numSchSop: { v: String(row[19]), id: nanoid() },
          numSchSch: { v: String(row[38]), id: nanoid() },

          tipSchSop: { v: row[18], id: nanoid() },
          tipSch80: { v: row[26], id: nanoid() },
          tipSchSch: { v: row[37], id: nanoid() },
          tipSchDB: { v: row[31], id: nanoid() },

          kttSop: { v: String(row[20]), id: nanoid() },
          kttDB: { v: String(row[33]), id: nanoid() },
          ktnSop: { v: String(row[21]), id: nanoid() },
          ktnDB: { v: String(row[34]), id: nanoid() },

          kodTi80: { v: row[24], id: nanoid() },
          kanaly80: { v: row[27], id: nanoid() },
        };
        */

        i++;
        row = worksheet.getRow(i).values as ExcelJS.CellValue[];
      }

      /* сверка данных начало (теперь вып-я в другом модуле)
      siArrayMod = siArrayMod.map((siObj) => {
        let setX = new Set([
          siObj.tipSchSop.v,
          siObj.tipSch80.v,
          // siObj.tipSchDB.v,
          // siObj.tipSchSch.v,
        ]);
        console.log(setX, setX.size);
        if (setX.size == 1) {
          siObj.tipSchSop.status = "correct";
          siObj.tipSch80.status = "correct";
          // siObj.tipSchDB.status = 'correct';
          // siObj.tipSchSch.status = 'correct';
        } else {
          siObj.tipSchSop.status = "warning";
          siObj.tipSch80.status = "warning";
          // siObj.tipSchDB.status = 'warning';
          // siObj.tipSchSch.status = 'warning';
        }

        setX = new Set([
          siObj.tipSchSop.v,
          siObj.tipSch80.v,
          siObj.tipSchSch.v,
        ]);
        console.log(setX, setX.size);
        if (setX.size == 1) {
          siObj.tipSchSch.status = 'correct';
        } else {
          siObj.tipSchSch.status = 'warning';
        }

        setX = new Set([
          siObj.numSchSop.v,
          siObj.numSchDB.v,
          siObj.numSchSch.v,
        ]);
        console.log(setX, setX.size);
        if (setX.size == 1) {
          siObj.numSchSop.status = 'correct';
          siObj.numSchDB.status = 'correct';
          siObj.numSchSch.status = 'correct';
        } else {
          siObj.numSchSop.status = 'warning';
          siObj.numSchDB.status = 'warning';
          siObj.numSchSch.status = 'warning';
        }
        setX = new Set([siObj.ktnSop.v, siObj.ktnDB.v]);
        console.log(setX, setX.size);
        if (setX.size == 1) {
          siObj.ktnSop.status = 'correct';
          siObj.ktnDB.status = 'correct';
        } else {
          siObj.ktnSop.status = 'warning';
          siObj.ktnDB.status = 'warning';
        }
        setX = new Set([siObj.kttSop.v, siObj.kttDB.v]);
        console.log(setX, setX.size);
        if (setX.size == 1) {
          siObj.kttSop.status = 'correct';
          siObj.kttDB.status = 'correct';
        } else {
          siObj.kttSop.status = 'warning';
          siObj.kttDB.status = 'warning';
        }
        return siObj;
      });
           
      сверка данных конец (теперь вып-я в другом модуле) 
      */
      console.log("readXlsx.js-1", siArrayMod);

      resolve(siArrayMod);
    };
  });

  console.log("readXlsx.js-2", res);
  return [res, file.name];
};
