import { IColOrderObj, IStringNumber, IStringString } from '../app.types';

export const sameCharEn = [
  'A',
  'a',
  'B',
  'C',
  'c',
  'E',
  'e',
  'H',
  'K',
  'k',
  'M',
  'O',
  'o',
  'P',
  'p',
  'T',
  'X',
  'x',
  'y',
];
export const sameCharRu = [
  'А',
  'а',
  'В',
  'С',
  'с',
  'Е',
  'е',
  'Н',
  'К',
  'к',
  'М',
  'О',
  'о',
  'Р',
  'р',
  'Т',
  'Х',
  'х',
  'у',
];

export function sameChar(str: string) {
  sameCharEn.forEach((item, index) => {
    let re = new RegExp(item, 'g');
    str = str.replace(re, sameCharRu[index]);
  });
  return str;
}

export const colOrderObj: IColOrderObj = {
  opt1: [
    'numTiShem60',
    'kodTi60',
    'naimTi60',
    'tipSch60',
    'kanaly60',
    // "tiAiis",
    'gr',
    'numTiSop',
    'naimTiSop',
    'numSchSop',
    'tipSchSop',
    'kttSop',
    'ktnSop',
    'kodTi80',
    'naimTi80',
    'tipSch80',
    'kanaly80',
    'naimTi82',
    'numSchSch',
    'tipSchSch',
    'tipSchDB',
    'numSchDB',
    'kttDB',
    'ktnDB',
  ],
  opt2: [
    'numTiShem60',
    'naimTi60',
    'naimTiSop',
    'naimTi80',
    'naimTi82',
    'tipSch60',
    'tipSchSop',
    'tipSch80',
    'tipSchSch',
    'tipSchDB',
    // "tiAiis",
    'gr',
    'numTiSop',
    'numSchSop',
    'numSchSch',
    'numSchDB',
    'kttSop',
    'kttDB',
    'ktnSop',
    'ktnDB',
    'kodTi60',
    'kodTi80',
    'kanaly80',
    'kanaly60',
  ],
  opt3: [
    'numTiShem60Pre',
    'kodTi60Pre',
    'naimTi60Pre',
    'tipSch60Pre',
    'kanaly60Pre',
    'numTiShem60',
    'kodTi60',
    'naimTi60',
    'tipSch60',
    'kanaly60',
    // "tiAiis",
    'gr',
    'numTiSop',
    'naimTiSop',
    'numSchSop',
    'tipSchSop',
    'kttSop',
    'ktnSop',
    'kodTi80',
    'naimTi80',
    'tipSch80',
    'kanaly80',
    'naimTi82',
    'numSchSch',
    'tipSchSch',
    'tipSchDB',
    'numSchDB',
    'kttDB',
    'ktnDB',
  ],
};

export const colFullName: IStringString = {
  numTiShem60Pre: '№ТИ Сх60 Пред',
  kodTi60Pre: 'кодТИ60 Пред',
  naimTi60Pre: 'наимТИ60 Пред',
  tipSch60Pre: 'типСч60 Пред',
  kanaly60Pre: 'каналы60 Пред',
  numTiShem60: '№ТИ Сх60',
  kodTi60: 'кодТИ60',
  naimTi60: 'наимТИ60',
  tipSch60: 'типСч60',
  kanaly60: 'каналы 60',
  // tiAiis: "ТИ в АИИС",
  gr: '№ ГР',
  numTiSop: '№ТИ СОП',
  naimTiSop: 'наим ТИ СОП',
  naimTi80: 'наим ТИ 80',
  naimTi82: 'наим ТИ 82',
  numSchDB: '№ Сч БД',
  numSchSop: '№ Сч СОП',
  numSchSch: '№ СЧ Сч',
  tipSchSop: 'типСчСОП',
  tipSch80: 'тип Сч 80',
  tipSchSch: 'типСчСч',
  tipSchDB: 'типСчБД',
  kttSop: 'Ктт СОП',
  kttDB: 'Ктт БД',
  ktnSop: 'Ктн СОП',
  ktnDB: 'Ктн БД',
  kodTi80: 'кодТИ80',
  kanaly80: 'каналы 80',
};

export interface IColsWidth extends IStringNumber {
  numTiShem60Pre: number;
  kodTi60Pre: number;
  naimTi60Pre: number;
  tipSch60Pre: number;
  kanaly60Pre: number;
  numTiShem60: number;
  kodTi60: number;
  naimTi60: number;
  tipSch60: number;
  kanaly60: number;
  // tiAiis: "ТИ в АИИС",
  gr: number;
  numTiSop: number;
  naimTiSop: number;
  naimTi80: number;
  naimTi82: number;
  numSchDB: number;
  numSchSop: number;
  numSchSch: number;
  tipSchSop: number;
  tipSch80: number;
  tipSchSch: number;
  tipSchDB: number;
  kttSop: number;
  kttDB: number;
  ktnSop: number;
  ktnDB: number;
  kodTi80: number;
  kanaly80: number;
}

export const colsWidthInit: IColsWidth = {
  numTiShem60Pre: 55,
  kodTi60Pre: 130,
  naimTi60Pre: 200,
  tipSch60Pre: 80,
  kanaly60Pre: 70,
  numTiShem60: 55,
  kodTi60: 130,
  naimTi60: 200,
  tipSch60: 95,
  kanaly60: 70,
  gr: 95,
  numTiSop: 50,
  naimTiSop: 200,
  naimTi80: 200,
  naimTi82: 150,
  numSchDB: 80,
  numSchSop: 80,
  numSchSch: 80,
  tipSchSop: 80,
  tipSch80: 80,
  tipSchSch: 80,
  tipSchDB: 80,
  kttSop: 40,
  kttDB: 40,
  ktnSop: 40,
  ktnDB: 40,
  kodTi80: 130,
  kanaly80: 70,
};

// export const colGroupOrderObj = {
//   opt1: ["60 xml", "СОП", "80 XML", "82 XML", "Сч", "БД"],
//   opt2: ["60 xml", "СОП", "80 XML", "82 XML", "Сч", "БД"],
// };
