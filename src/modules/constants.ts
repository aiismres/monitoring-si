import {
  // ColOrderPlanRabObj,
  IColOrderObj,
  IStringNumber,
  IStringString,
} from '../app.types';

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
    'sv2',
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
  sv2: 'Св-2',
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

export const timePeriods = [
  '00:00 - 00:30',
  '00:30 - 01:00',
  '01:00 - 01:30',
  '01:30 - 02:00',
  '02:00 - 02:30',
  '02:30 - 03:00',
  '03:00 - 03:30',
  '03:30 - 04:00',
  '04:00 - 04:30',
  '04:30 - 05:00',
  '05:00 - 05:30',
  '05:30 - 06:00',
  '06:00 - 06:30',
  '06:30 - 07:00',
  '07:00 - 07:30',
  '07:30 - 08:00',
  '08:00 - 08:30',
  '08:30 - 09:00',
  '09:00 - 09:30',
  '09:30 - 10:00',
  '10:00 - 10:30',
  '10:30 - 11:00',
  '11:00 - 11:30',
  '11:30 - 12:00',
  '12:00 - 12:30',
  '12:30 - 13:00',
  '13:00 - 13:30',
  '13:30 - 14:00',
  '14:00 - 14:30',
  '14:30 - 15:00',
  '15:00 - 15:30',
  '15:30 - 16:00',
  '16:00 - 16:30',
  '16:30 - 17:00',
  '17:00 - 17:30',
  '17:30 - 18:00',
  '18:00 - 18:30',
  '18:30 - 19:00',
  '19:00 - 19:30',
  '19:30 - 20:00',
  '20:00 - 20:30',
  '20:30 - 21:00',
  '21:00 - 21:30',
  '21:30 - 22:00',
  '22:00 - 22:30',
  '22:30 - 23:00',
  '23:00 - 23:30',
  '23:30 - 24:00',
];

// export const colOrderPlanRabObj: ColOrderPlanRabObj = {
//   opt1: [
//     'naimSechShort',
//     'vidRabot',
//     'soglGtp',
//     'dopusk',
//     'sdAs',
//     'krSrokPodachi',
//     'planPodachi',
//     'metrologyKomm',
//     'gr',
//   ],
// };
