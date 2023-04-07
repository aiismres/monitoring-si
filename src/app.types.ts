export interface IStringNumber {
  [name: string]: number;
}

// type TColOrderOpt = 'opt1' | 'opt2' | 'opt3';

// export interface IAppState extends IStringString2 {
export interface IAppState {
  // selectedCell: {},
  // colOrderOpt: TColOrderOpt;
  colOrder: string[];
  sechID: string;
  naimSechShort: string;
  isEdit: boolean;
  classSSDBtn: string;
  classEditBtn: string;
  isSiStateSave: boolean;
  isMsgOpen: boolean;
  isSuccess: boolean;
  isInfoOpen: boolean;
}

export interface IResReadSiData1 {
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
export type TStatus3 = '' | 'changed';

export interface IStringString {
  [name: string]: {
    [name: string]: string | TStatus | TStatus2 | TStatus3 | 'да' | 'нет';
  };
}

export interface ISiObj1 extends IStringString {
  // id?: string;
  // tiAiis: {
  //   v: 'да' | 'нет';
  // };
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
