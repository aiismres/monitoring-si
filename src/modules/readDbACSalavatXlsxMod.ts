import { nanoid } from 'nanoid';
import ExcelJS from 'exceljs';
import { sameChar } from './constants';
import { ISiObj1 } from '../app.types.js';

export const readDbACSalavatXlsxMod = async (
  file: File,
  siArray: ISiObj1[]
) => {
  // let file = e.target.files.item(0);
  console.log(file.name);
  alert(`
  Импорт Базы данных МИР.xlsx

  ${file.name}`);

  const workbook = new ExcelJS.Workbook();
  let res = await new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    // let siArray = [];
    reader.onload = async function () {
      if (reader.result instanceof ArrayBuffer)
        await workbook.xlsx.load(reader.result);
      const worksheet = workbook.getWorksheet('Отчет');
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

      let i = 4;
      let row = worksheet.getRow(i).values as ExcelJS.CellValue[];
      // let siArrayMod = [];
      let siObj = {};

      // while (String(row) !== '') {
      while (row.length !== 0) {
        let kodTiDb = String(row[16]);
        let numSchDB = row[6];
        let tipSchDB = row[4] && sameChar(String(row[4]));
        let kttDB = row[7];
        let ktnDB = row[8];
        console.log(kodTiDb, numSchDB, tipSchDB, kttDB, ktnDB);
        siArrayMod = siArrayMod.map((siObj) => {
          if (kodTiDb === siObj.kodTi80.v || kodTiDb === siObj.kodTi60.v) {
            console.log(kodTiDb);
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

        i++;
        row = worksheet.getRow(i).values as ExcelJS.CellValue[];
      }

      console.log('readXlsx.js-1', siArrayMod);

      resolve(siArrayMod);
    };
  });

  console.log('readXlsx.js-2', res);
  return [res, file.name];
};
