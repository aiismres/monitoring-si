import { nanoid } from 'nanoid';
import { sameChar } from './constants';
import { IMesPoint80, ISiObj1 } from '../app.types.js';

export async function read82xmlMod(file: File, siAr: ISiObj1[]) {
  // export async function read80xmlMod(event, siAr) {

  // let file = event.target.files.item(0);
  console.log('file.name', file.name);
  if (!file.name.includes('80020')) {
    alert('файл не 80020');
    return siAr;
  }
  alert(`
  Импорт 80020.XML

  ${file.name}`);

  // let encoding = file.name.includes("60002") ? "UTF-8" : "Windows-1251";
  let encoding = 'Windows-1251';

  const [res, areaCode, areaName]: [ISiObj1[], string, string] =
    await new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsText(file, encoding);
      // reader.readAsText(file, "utf-8");
      reader.onload = async function () {
        let parser = new DOMParser();
        let doc = parser.parseFromString(
          String(reader.result),
          'application/xml'
        );
        console.log(doc);

        let aiisTag = doc.getElementsByTagName('aiis')[0];
        const aiisAreaTag = aiisTag.getElementsByTagName('area')[0];
        const areaCode = aiisAreaTag.getAttribute('ats-code')!;
        const areaName = aiisAreaTag.getAttribute('name')!;
        let isCorrect80mx = window.confirm(`area-name:
      ${areaName}
      area-code: ${areaCode}`);
        if (!isCorrect80mx) {
          reject();
        }

        let deviceModTagS = doc.getElementsByTagName(
          'measuring-device-modification'
        );
        let deviceNameObj: { [name: string]: string } = {};
        for (let deviceMod of deviceModTagS) {
          let idDevMod = deviceMod.getAttribute('ats-code')!;
          let devModName = deviceMod.getAttribute('device-modification-name')!;
          deviceNameObj[idDevMod] = sameChar(devModName);
        }

        let mesPointTags = doc.getElementsByTagName('measuring-point');
        console.log(mesPointTags);
        let mesPointS = [];
        let mesPointSAiis1 = [];
        let mesPointSAiis2 = [];
        let mesPointSAiis = {
          1: [],
          2: [],
        };

        for (let mesPointTag of mesPointTags) {
          let mesPoint: IMesPoint80 = {
            'ats-code': '',
            naimTi: '',
            deviceMod: '',
            kanaly: '',
          };

          mesPoint['ats-code'] = mesPointTag.getAttribute('ats-code')!;
          // mesPoint["schemanum"] = mesPointTag.getAttribute("schemanum");
          let nameTag = mesPointTag.getElementsByTagName('name')[0];
          let naimTi = '';

          if (nameTag.getAttribute('power-object-name')) {
            naimTi = nameTag.getAttribute('power-object-name') + ' ';
          }
          if (nameTag.getAttribute('location-description')) {
            naimTi =
              naimTi + nameTag.getAttribute('location-description') + ' ';
          }
          if (nameTag.getAttribute('connection-name')) {
            naimTi = naimTi + nameTag.getAttribute('connection-name');
          }
          mesPoint['naimTi'] = naimTi.trim();

          let mesDeviceTagS =
            mesPointTag.getElementsByTagName('measuring-device');

          let mesDevice = mesDeviceTagS[0];

          let idDeviceMod = mesDevice.getAttribute('device-modification-code')!;
          mesPoint = { ...mesPoint, deviceMod: deviceNameObj[idDeviceMod] };

          mesPoint.kanaly = '';
          // mesPoint.idMesChannelS = [];
          let mesChannelS = mesDevice.getElementsByTagName('measuring-channel');
          let kanaly = '';
          // let idMesChannelS = [];
          for (let mesChannel of mesChannelS) {
            kanaly = kanaly + mesChannel.getAttribute('ats-code') + ';';
            // idMesChannelS.push(mesChannel.getAttribute("ats-code"));
          }
          mesPoint = { ...mesPoint, kanaly };
          // mesPoint = { ...mesPoint, kanaly, idMesChannelS };
          mesPointS.push(mesPoint);

          mesPointS.push(mesPoint);
        }
        console.log('mesPointS', mesPointS);

        let siAr80 = mesPointS;
        console.log(siAr80);

        let siArMod: ISiObj1[] = siAr.map((siObj) => {
          return {
            ...siObj,
            // numTiShem80: {},
            // kodTi80: {},
            naimTi80: { v: '', status: '', status2: '', status3: '' },
            tipSch80: { v: '', status: '', status2: '', status3: '' },
            kanaly80: { v: '', status: '', status2: '', status3: '' },
          };
        });
        console.log(siArMod);
        siAr80.forEach((si80) => {
          let index = siArMod.findIndex(
            (siObj) => siObj.kodTi80.v === si80['ats-code']
          );
          if (index === -1) {
            let siOdjfrom80 = {
              kodTi80: {
                v: si80['ats-code'],
                status: '',
                status2: '',
                status3: '',
              },
              naimTi80: {
                v: si80.naimTi,
                status: '',
                status2: '',
                status3: '',
              },
              tipSch80: {
                v: si80.deviceMod,
                status: '',
                status2: '',
                status3: '',
              },
              kanaly80: {
                v: si80.kanaly,
                status: '',
                status2: '',
                status3: '',
              },

              // id: nanoid(),
              // tiAiis: { v: 'да' },
              numTiShem60: { v: '', status: '', status2: '', status3: '' },
              gr: { v: '', status: '', status2: '', status3: '' },
              numTiSop: { v: '', status: '', status2: '', status3: '' },

              naimTiSop: { v: '', status: '', status2: '', status3: '' },
              naimTi60: { v: '', status: '', status2: '', status3: '' },
              naimTi82: { v: '', status: '', status2: '', status3: '' },

              numSchDB: { v: '', status: '', status2: '', status3: '' },
              numSchSop: { v: '', status: '', status2: '', status3: '' },
              numSchSch: { v: '', status: '', status2: '', status3: '' },

              tipSchSop: { v: '', status: '', status2: '', status3: '' },
              tipSch60: { v: '', status: '', status2: '', status3: '' },
              tipSchSch: { v: '', status: '', status2: '', status3: '' },
              tipSchDB: { v: '', status: '', status2: '', status3: '' },

              kttSop: { v: '', status: '', status2: '', status3: '' },
              kttDB: { v: '', status: '', status2: '', status3: '' },
              ktnSop: { v: '', status: '', status2: '', status3: '' },
              ktnDB: { v: '', status: '', status2: '', status3: '' },

              kodTi60: { v: '', status: '', status2: '', status3: '' },
              kanaly60: { v: '', status: '', status2: '', status3: '' },

              numTiShem60Pre: { v: '', status: '', status2: '', status3: '' },
              naimTi60Pre: { v: '', status: '', status2: '', status3: '' },
              tipSch60Pre: { v: '', status: '', status2: '', status3: '' },
              kodTi60Pre: { v: '', status: '', status2: '', status3: '' },
              kanaly60Pre: { v: '', status: '', status2: '', status3: '' },
            } as ISiObj1;
            siArMod.push(siOdjfrom80);
          } else {
            siArMod[index] = {
              ...siArMod[index],
              // numTiShem80: { v: si80.schemanum, id: nanoid() },
              // kodTi80: { v: si80["ats-code"], id: nanoid() },
              naimTi80: {
                v: si80.naimTi,
                status: '',
                status2: '',
                status3: '',
              },
              tipSch80: {
                v: si80.deviceMod,
                status: '',
                status2: '',
                status3: '',
              },
              kanaly80: {
                v: si80.kanaly,
                status: '',
                status2: '',
                status3: '',
              },
            };
          }

          /*siArMod = siArMod.map(siObj => {
          if (siObj.kodTi80.v === si80['ats-code']) {
            return {
              ...siObj,
              numTiShem80: {v: si80.schemanum},
              kodTi80: {v: si80['ats-code']},
              naimTi80: {v: si80.naimTi},
              tipSch80: {v: si80.deviceMod},
              kanaly80: {v: si80.kanaly}
            }
          } else {
            return siObj
          }
        }) */
        });

        resolve([siArMod, areaCode, areaName]);
      };
    });
  return [res, areaCode, areaName];
}
// })

// const found = arr1.some(r=> arr2.includes(r))
