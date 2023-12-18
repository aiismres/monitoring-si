import { ISiObj1 } from '../app.types';
import { colOrderObj } from './constants';

export function resetStatus3(siArray: ISiObj1[]) {
  const siArrayMod = structuredClone(siArray);
  siArrayMod.forEach((siObj: ISiObj1) => {
    // for (const key in siObj) {
    //   if (key === 'id') {
    //   } else {
    //     siObj[key].status3 = '';
    //   }
    // }
    colOrderObj.opt3.forEach((colName) => (siObj[colName].status3 = ''));
  });
  return siArrayMod;
}
