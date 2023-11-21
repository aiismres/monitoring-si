import { ISiObj1 } from '../app.types';

export function checkData(siArray: ISiObj1[]) {
  console.log('export function compareDate() ', siArray);

  function markTipSchWarning(siObj: ISiObj1) {
    if (siObj.tipSchSop.v) siObj.tipSchSop.status = 'warning';
    if (siObj.tipSch80.v) siObj.tipSch80.status = 'warning';
    if (siObj.tipSch60.v) siObj.tipSch60.status = 'warning';
    if (siObj.tipSchSch.v) siObj.tipSchSch.status = 'warning';
    if (siObj.tipSchDB.v) siObj.tipSchDB.status = 'warning';
  }

  const siArrayMod = structuredClone(siArray);

  siArrayMod.forEach((siObj: ISiObj1) => {
    siObj.tipSchSop.status = '';
    siObj.tipSch80.status = '';
    siObj.tipSch60.status = '';
    siObj.tipSchSch.status = '';
    siObj.tipSchDB.status = '';

    siObj.numSchSop.status = '';
    siObj.numSchSch.status = '';
    siObj.numSchDB.status = '';

    siObj.kttSop.status = '';
    siObj.kttDB.status = '';

    siObj.ktnSop.status = '';
    siObj.ktnDB.status = '';

    siObj.naimTi60.status = '';
    siObj.kanaly60.status = '';

    // siObj.tipSchSop.status3 = '';
    // siObj.tipSch80.status3 = '';
    // siObj.tipSch60.status3 = '';
    // siObj.tipSchSch.status3 = '';
    // siObj.tipSchDB.status3 = '';

    // siObj.numSchSop.status3 = '';
    // siObj.numSchSch.status3 = '';
    // siObj.numSchDB.status3 = '';

    // siObj.kttSop.status3 = '';
    // siObj.kttDB.status3 = '';

    // siObj.ktnSop.status3 = '';
    // siObj.ktnDB.status3 = '';

    // siObj.naimTi60.status3 = '';
    // siObj.kanaly60.status3 = '';

    if (
      siObj.naimTi80.v &&
      siObj.naimTi60.v &&
      siObj.naimTi60.v !== siObj.naimTi80.v
    ) {
      siObj.naimTi60.status = 'warning';
    }

    if (
      siObj.kanaly80.v &&
      siObj.kanaly60.v &&
      siObj.kanaly60.v !== siObj.kanaly80.v
    ) {
      siObj.kanaly60.status = 'warning';
    }

    const setTypeSch = new Set<string>();
    if (siObj.tipSchSop.v) setTypeSch.add(siObj.tipSchSop.v);
    if (siObj.tipSch80.v) setTypeSch.add(siObj.tipSch80.v);
    if (siObj.tipSch60.v) setTypeSch.add(siObj.tipSch60.v);

    if (setTypeSch.size === 0) {
    } else if (setTypeSch.size > 1) {
      console.log('check-1', setTypeSch);
      markTipSchWarning(siObj);
    } else if (setTypeSch.size === 1) {
      let [typeSch1] = setTypeSch;
      console.log(typeSch1.slice(0, 3));
      let typeSchBegin = typeSch1.slice(0, 3);
      if (siObj.tipSchSch.v) {
        if (typeSchBegin === 'СЭТ') {
          console.log(setTypeSch);
          if (siObj.tipSchSch.v !== typeSch1) {
            console.log('check-2-1');
            markTipSchWarning(siObj);
          }
        } else if (typeSchBegin === 'А18') {
          // if (typeSchBegin !== siObj.tipSchSch.v.slice(0, 3)) {
          if (siObj.tipSchSch.v !== 'А1800R') {
            console.log('check-2-2');
            markTipSchWarning(siObj);
          }
        } else if (typeSchBegin === 'Мер') {
          let tipSchSchMercMod = typeSch1.replace('Меркурий ', 'Меркурий-');
          if (tipSchSchMercMod.at(-1) === 'R') {
            tipSchSchMercMod = tipSchSchMercMod.slice(0, -1);
          }
          console.log('tipSchSchMercMod:', tipSchSchMercMod);
          if (tipSchSchMercMod !== siObj.tipSchSch.v) {
            console.log('check-2-3', tipSchSchMercMod, siObj.tipSchSch.v);
            markTipSchWarning(siObj);
          }
        } else if (typeSchBegin === 'ЕА0') {
          console.log('typeSchBegin === "ЕА0"');
          if (siObj.tipSchSch.v !== 'ЕвроАльфа 1.1') {
            console.log('check-2-4');
            markTipSchWarning(siObj);
          }
        }
      }
      if (siObj.tipSchDB.v) {
        if (typeSchBegin === 'СЭТ') {
          if (siObj.tipSchDB.v !== 'СЭТ-4ТМ') {
            console.log('check-3-1');
            markTipSchWarning(siObj);
          }
        } else if (typeSchBegin === 'А18') {
          if (siObj.tipSchDB.v !== 'А1800') {
            console.log('check-3-2');
            markTipSchWarning(siObj);
          }
        } else if (typeSchBegin === 'Мер') {
          if (siObj.tipSchDB.v !== 'Меркурий-23Х') {
            console.log('check-3-3');
            markTipSchWarning(siObj);
          }
        } else if (typeSchBegin === 'ЕА0') {
          if (siObj.tipSchDB.v !== 'ЕвроАльфа 1.1') {
            console.log('check-3-4');
            markTipSchWarning(siObj);
          }
        }
      }
    }

    const setNumSch = new Set();
    if (siObj.numSchSop.v) setNumSch.add(siObj.numSchSop.v.replace(/^0+/, ''));
    if (siObj.numSchDB.v) setNumSch.add(siObj.numSchDB.v);
    if (siObj.numSchSch.v) setNumSch.add(siObj.numSchSch.v);

    if (setNumSch.size > 1) {
      console.log('check-4-1', setNumSch);
      siObj.numSchSop.status = 'warning';
      siObj.numSchDB.status = 'warning';
      siObj.numSchSch.status = 'warning';
    } else if (setNumSch.size === 1) {
      if (!siObj.numSchDB.v && !siObj.numSchSch.v) {
        console.log('check-4-2 нет данных о № по Сч в БД и в Сч');
        siObj.numSchSop.status = 'warning';
      }
    }
    const setKtt = new Set([siObj.kttSop.v, siObj.kttDB.v]);
    if (setKtt.size > 1) {
      siObj.kttSop.status = 'warning';
      siObj.kttDB.status = 'warning';
    }
    const setKtn = new Set([siObj.ktnSop.v, siObj.ktnDB.v]);
    if (setKtn.size > 1) {
      siObj.ktnSop.status = 'warning';
      siObj.ktnDB.status = 'warning';
    }
  });
  return siArrayMod;
}
