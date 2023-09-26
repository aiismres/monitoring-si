import { ISiObj1 } from '../app.types';

export function resetStatus3(siArray: ISiObj1[]) {
  const siArrayMod = structuredClone(siArray);
  siArrayMod.forEach((siObj: ISiObj1) => {
    for (const key in siObj) {
      if (key === 'id') {
      } else {
        siObj[key].status3 = '';
      }
    }
  });
  return siArrayMod;
}
