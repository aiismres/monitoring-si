export interface IAppState {
  // selectedCell: {},
    colOrderOpt: string;
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

export interface IResReadSiData {
  si: ISiObj2[];
  sechInfo?: ISechInfo
}


export interface IResReadSiData1 {
  si: ISiObj1[];
  sechInfo?: ISechInfo
}

export interface ISechInfo {
  sechID?: string;
  naimSechShort?: string;
  areaCode?: string;
  areaName?: string;
  sourceDB?: string;
  source60?: string;
  amountTi?: number
}

export interface ISiObjNested {
  v: string;
  status: string;
  status2: string;
  status3: string;
  selected: string;
}

export interface ISiObj2 {
  [name: string]: ISiObjNested 
}


export interface IStringString {
  [name: string]: {[name: string]: string} 
}

export interface ISiObj1 extends IStringString {
  // id?: string;
  tiAiis: {
    v: string;
    // status: string;
    // status2: string;
    // status3: string;
  };
  numTiShem60Pre: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  kodTi60Pre: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  naimTi60Pre: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  tipSch60Pre: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  kanaly60Pre: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  numTiShem60: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  kodTi60: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  naimTi60: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  tipSch60: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  kanaly60: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  gr: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  numTiSop: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  naimTiSop: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  naimTi80: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  naimTi82: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  numSchDB: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  numSchSop: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  numSchSch: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  tipSchSop: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  tipSch80: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  tipSchSch: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  tipSchDB: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  kttSop: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  kttDB: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  ktnSop: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  ktnDB: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  kodTi80: {
    v: string;
    status: string;
    status2: string;
    status3: string;
  };
  kanaly80: {
    v: string;
    status: string;
    status2: string;
    status3: string;
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