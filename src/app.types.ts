export interface IStringNumber {
  [name: string]: number;
}

export interface IStringString {
  [key: string]: string;
}

// type TColOrderOpt = 'opt1' | 'opt2' | 'opt3';

// export interface IAppState extends IStringString2 {
export interface IAppState {
  // selectedCell: {},
  // colOrderOpt: TColOrderOpt;
  sechID: string;
  naimSechShort: string;
  colOrder: TColShortNames[];
  // colOrderPlanRab: ColPlanRab[];
  // classSSDBtn: string;
  // classEditBtn: string;
  isEdit: boolean;
  isEdit2: boolean;
  isSiStateSave: boolean;
  isMsgOpen: boolean;
  isSuccess: boolean;
  isInfoOpen: boolean;
  editableCell: { index: number | null; param: string | null };
  isLoggedin: boolean;
}

export interface IResReadSiData1 {
  naimSechShort: string;
  si: ISiObj1[];
  sechInfo?: ISechInfo;
}

export interface ISechInfo {
  sechID?: string;
  naimSechShort?: string;
  areaCode?: string;
  areaName?: string;
  sourceDB?: string;
  source60?: string;
  amountTi?: number;
}

export type TStatus = '' | 'warning';
export type TStatus2 = '' | 'correct' | 'incorrect';
export type TStatus3 = '' | 'changed' | 'selected';
export type Sv2V = 'success' | 'error' | 'warning' | 'noCheck' | 'noCarryOut';
// export type TStatus4 = true | false | undefined;

// export interface IStringObj {
//   [name: string]: {
//     [name: string]:
//       | string
//       | TStatus
//       | TStatus2
//       | TStatus3
//       // | TStatus4
//       | 'да'
//       | 'нет'
//       | number[]
//       | { v: number; status: TStatus | TStatus2 }[];
//   };
// }

interface IStringStringNumber {
  [N: string]: string | number[];
}

interface IStringObj2 {
  [N: string]: number[] | { v: number; status: TStatus | TStatus2 }[];
}

export interface IPowProfSch extends IStringStringNumber {
  k01: number[];
  k02: number[];
  k03: number[];
  k04: number[];
}

export interface IPowProfDiff extends IStringObj2 {
  k01: { v: number; status: TStatus | TStatus2 }[];
  // k01: number[];
  k02: { v: number; status: TStatus | TStatus2 }[];
  k03: { v: number; status: TStatus | TStatus2 }[];
  // k03: number[];
  k04: { v: number; status: TStatus | TStatus2 }[];
  // k04: number[];
}

interface BigObject<I1, I2> {
  [index: string]: I1 | I2;
}

// export interface ISiObj1 extends IStringObj {
export interface ISiObj1 {
  id: string;
  // tiAiis: {
  //   v: 'да' | 'нет';
  // };
  powProf82: {
    date: string;
    k01: number[];
    k02: number[];
    k03: number[];
    k04: number[];
  };
  powProfSch: {
    k01: number[];
    k02: number[];
    k03: number[];
    k04: number[];
  };
  powProfSchKttne: {
    k01: number[];
    k02: number[];
    k03: number[];
    k04: number[];
  };
  powProfDiff: {
    // k01: number[];
    k01: { v: number; status: TStatus | TStatus2 }[];
    // k02: number[];
    k02: { v: number; status: TStatus | TStatus2 }[];
    k03: { v: number; status: TStatus | TStatus2 }[];
    // k03: number[];
    k04: { v: number; status: TStatus | TStatus2 }[];
    // k04: number[];
  };
  numTiShem60Pre: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  kodTi60Pre: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  naimTi60Pre: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  tipSch60Pre: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  kanaly60Pre: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  numTiShem60: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  kodTi60: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  naimTi60: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  tipSch60: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  kanaly60: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  gr: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  numTiSop: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  naimTiSop: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
    // status4?: TStatus4;
  };
  naimTi80: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  naimTi82: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  numSchDB: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  numSchSop: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  numSchSch: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  tipSchSop: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  tipSch80: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  tipSchSch: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  tipSchDB: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  kttSop: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  kttDB: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  ktnSop: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  ktnDB: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  ke: {
    v: string;
  };
  kodTi80: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  kanaly80: {
    v: string;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
  sv2: {
    v: Sv2V;
    status: TStatus;
    status2: TStatus2;
    status3: TStatus3;
  };
}

export interface IMesPoint60 {
  'ats-code': string;
  schemanum: string;
  naimTi: string;
  deviceMod: string;
  kanaly: string;
  idMesChannelS: string[];
}

export interface IMesPoint80 {
  'ats-code': string;
  naimTi: string;
  deviceMod: string;
  kanaly: string;
}

export interface IStringHtml {
  [N: string]: HTMLElement;
}

export type TColShortNames =
  | 'numTiShem60Pre'
  | 'kodTi60Pre'
  | 'naimTi60Pre'
  | 'tipSch60Pre'
  | 'kanaly60Pre'
  | 'numTiShem60'
  | 'kodTi60'
  | 'naimTi60'
  | 'tipSch60'
  | 'kanaly60'
  // "tiAiis"|
  | 'gr'
  | 'numTiSop'
  | 'naimTiSop'
  | 'numSchSop'
  | 'tipSchSop'
  | 'kttSop'
  | 'ktnSop'
  | 'kodTi80'
  | 'naimTi80'
  | 'tipSch80'
  | 'kanaly80'
  | 'naimTi82'
  | 'numSchSch'
  | 'tipSchSch'
  | 'tipSchDB'
  | 'numSchDB'
  | 'kttDB'
  | 'ktnDB'
  | 'sv2';

export interface IColOrderObj {
  [N: string]: TColShortNames[];
}

// export type ColPlanRab =
//   | '_id'
//   | 'kodGtp'
//   | 'kodSech'
//   | 'naimSechShort'
//   | 'vidRabot'
//   | 'soglGtp'
//   | 'dopusk'
//   | 'sdAs'
//   | 'sdPas'
//   | 'krSrokPodachi'
//   | 'planPodachi'
//   | 'metrologyKomm'
//   | 'codirovkaActual'
//   | 'tipIzmCodirovki'
//   | 'sogl60Dku'
//   | 'sogl60SmezhOtpr'
//   | 'sogl60SmezhSogl'
//   | 'otprav4v'
//   | 'sogl4v'
//   | 'sverkiKomm'
//   | 'sv1'
//   | 'sv2'
//   | 'sv3'
//   | 'pi'
//   | 'textOt'
//   | 'gotovnostUs'
//   | 'zakluchenie'
//   | 'osobenAiis'
//   | 'kolTi'
//   | 'sobstvAiis'
//   | 'metrology'
//   | 'gr'
//   | 'zaprosPerecod';

// export interface ColOrderPlanRabObj {
//   [N: string]: ColPlanRab[];
// }

export interface SechData {
  _id: string;
  kodGtp: string;
  kodSech: string;
  naimSechShort: string;
  vidRabot: string;
  soglGtp: string;
  dopusk: string;
  sdAs: string;
  sdPas: string;
  krSrokPodachi: string;
  planPodachi: string;
  metrologyKomm: string;
  codirovkaActual: string;
  tipIzmCodirovki: string;
  sogl60Dku: string;
  sogl60SmezhOtpr: string;
  sogl60SmezhSogl: string;
  otprav4v: string;
  sogl4v: string;
  sverkiKomm: string;
  sv1: string;
  sv2: string;
  sv3: string;
  pi: string;
  textOt: string;
  gotovnostUs: string;
  zakluchenie: string;
  osobenAiis: string;
  kolTi: string;
  sobstvAiis: string;
  metrology: string[];
  zaprosPerecod: string;
}

export interface Ot {
  _id: string;
  gr: string;
  sdSop: string;
  naimAiis1: string;
  naimAiis2: string;
  izmAiis: string;
  tipIzmOt: string;
  neobhRab: string;
  rabZaplan: string;
  dogPlan: string;
  dogFact: string;
  smrPlan: string;
  smrFact: string;
  vyezdPlan: string;
  vyezdFact: string;
  vniimsPlan: string;
  vniimsFact: string;
  rstPlan: string;
  rstFact: string;
  prikazPlan: string;
  prikazFact: string;
  oforSopPlan: string;
  oforSopFact: string;
  kommOt: string;
}
