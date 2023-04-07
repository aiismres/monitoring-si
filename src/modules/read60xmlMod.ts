import { nanoid } from 'nanoid';
import { sameChar } from './constants';
import { IMesPoint60, ISiObj1 } from '../app.types';

interface IAiisMesChannel {
  [name: string]: string[];
}

interface IAiisMesPointS {
  [name: string]: IMesPoint60[];
  // '1': IMesPoint60[];
  // '2': IMesPoint60[];
}

export async function read60xmlMod(file: File, siAr: ISiObj1[]) {
  // export async function read60xmlMod(event, siAr) {
  // let file = event.target.files.item(0);
  console.log('file.name', file.name, siAr);
  if (!(file.name.includes('60000') || file.name.includes('60002'))) {
    alert('файл не 60000 / 60002');
    return siAr;
  }
  alert(`
  Импорт 60000.XML

  ${file.name}`);

  let encoding = file.name.includes('60002') ? 'UTF-8' : 'Windows-1251';

  let [res, isPre60]: [ISiObj1[], boolean] = await new Promise((resolve) => {
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

      let aupDelivPointS = doc.getElementsByTagName('aup-delivery-point');
      console.log(aupDelivPointS);
      let aiisMesChannel: IAiisMesChannel = {
        1: [],
        2: [],
      };
      for (let aupDelivPoint of aupDelivPointS) {
        let idAiis = aupDelivPoint.getAttribute('id-aiis')!;
        let send = aupDelivPoint.getElementsByTagName('send')[0];
        let receive = aupDelivPoint.getElementsByTagName('receive')[0];

        if (receive) {
          for (let item of receive.children[0].children) {
            aiisMesChannel[idAiis].push(
              item.getAttribute('id-measuring-channel')!
            );
          }
        }

        if (send) {
          for (let item of send.children[0].children) {
            aiisMesChannel[idAiis].push(
              item.getAttribute('id-measuring-channel')!
            );
          }
        }
      }
      console.log('aiisMesChannel', aiisMesChannel);

      let deviceModTagS = doc.getElementsByTagName(
        'measuring-device-modification'
      );
      let deviceNameObj: { [name: string]: string } = {};
      for (let deviceMod of deviceModTagS) {
        let idDevMod = deviceMod.getAttribute('id-device-modification')!;
        let devModName = deviceMod.getAttribute('device-modification-name')!;
        deviceNameObj[idDevMod] = sameChar(devModName);
      }

      let smallMesDeviceTagS = doc.getElementsByTagName(
        'aiis-small-measuring-device'
      );
      let setSmallMesDevices = new Set();
      for (let smallMesDeviceTag of smallMesDeviceTagS) {
        setSmallMesDevices.add(
          smallMesDeviceTag.getAttribute('id-measuring-device')
        );
      }
      console.log(setSmallMesDevices);

      let mesPointTags = doc.getElementsByTagName('measuring-point');
      console.log(mesPointTags);
      let mesPointS = [];
      let mesPointSAiis1 = [];
      let mesPointSAiis2 = [];
      let mesPointSAiis: IAiisMesPointS = {
        '1': [],
        '2': [],
      };

      for (let mesPointTag of mesPointTags) {
        let mesPoint: IMesPoint60 = {
          'ats-code': '',
          schemanum: '',
          naimTi: '',
          deviceMod: '',
          kanaly: '',
          idMesChannelS: [],
        };

        mesPoint['ats-code'] = mesPointTag.getAttribute('ats-code')!;
        mesPoint['schemanum'] = mesPointTag.getAttribute('schemanum')!;
        let nameTag = mesPointTag.getElementsByTagName('name')[0];
        let naimTi = '';

        if (nameTag.getAttribute('power-object-name')) {
          naimTi = nameTag.getAttribute('power-object-name') + ' ';
        }
        if (nameTag.getAttribute('location-description')) {
          naimTi = naimTi + nameTag.getAttribute('location-description') + ' ';
        }
        if (nameTag.getAttribute('connection-name')) {
          naimTi = naimTi + nameTag.getAttribute('connection-name');
        }
        mesPoint['naimTi'] = naimTi.trim();

        let mesDeviceTagS =
          mesPointTag.getElementsByTagName('measuring-device');

        for (let mesDevice of mesDeviceTagS) {
          let idDeviceMod = mesDevice.getAttribute('id-device-modification')!;
          mesPoint = { ...mesPoint, deviceMod: deviceNameObj[idDeviceMod] };

          if (
            setSmallMesDevices.has(
              mesDevice.getAttribute('id-measuring-device')
            )
          )
            break;

          mesPoint.kanaly = '';
          mesPoint.idMesChannelS = [];
          let mesChannelS = mesDevice.getElementsByTagName('measuring-channel');
          let kanaly = '';
          let idMesChannelS: string[] = [];
          for (let mesChannel of mesChannelS) {
            kanaly = kanaly + '0' + mesChannel.getAttribute('type') + ';';
            idMesChannelS.push(
              mesChannel.getAttribute('id-measuring-channel')!
            );
          }
          mesPoint = { ...mesPoint, kanaly, idMesChannelS };
          mesPointS.push(mesPoint);

          if (
            mesPoint.idMesChannelS.some((id) => aiisMesChannel[1].includes(id))
          ) {
            mesPointSAiis['1'].push(mesPoint);
          }

          if (
            mesPoint.idMesChannelS.some((id) => aiisMesChannel[2].includes(id))
          ) {
            mesPointSAiis['2'].push(mesPoint);
          }
        }
      }
      console.log('mesPointS', mesPointS);
      console.log('mesPointSAiis[1]', mesPointSAiis['1']);
      console.log('mesPointSAiis[2]', mesPointSAiis['2']);

      let aiis = doc.getElementsByTagName('aiis');
      console.log(
        aiis,
        'id-aiis-1',
        aiis[0].getAttribute('id-aiis'),
        'id-aiis-2',
        aiis[1]?.getAttribute('id-aiis')
      );

      let gtp = doc.getElementsByTagName('gtpp');
      console.log(gtp, gtp[0]);

      let aiisNum = '1';
      if (aiis[1]) {
        aiisNum =
          prompt(
            `Выберите АИИС:
         1 - ${gtp[0].getAttribute('gtp-name')} ${gtp[0].getAttribute(
              'gtp-code'
            )}
         2 - ${gtp[1]?.getAttribute('gtp-name')} ${gtp[1].getAttribute(
              'gtp-code'
            )}`,
            '1'
          ) ?? '1';
        console.log({ aiisNum });
      } else {
        aiisNum = '1';
        alert(gtp[0].getAttribute('gtp-name'));
      }

      let siAr60: IMesPoint60[] = mesPointSAiis[aiisNum];
      console.log(siAr, siAr60);
      let isPre60 = false;
      let siArMod = structuredClone(siAr) as ISiObj1[];
      siArMod = siArMod.map((siObj: ISiObj1) => {
        if (siObj.naimTi60.v) {
          // console.log(siObj.naimTi60.v)
          isPre60 = true;
          siObj.numTiShem60Pre = {
            ...siObj.numTiShem60,
            // status: '',
            // status2: '',
            // status3: '',
          };
          siObj.kodTi60Pre = {
            ...siObj.kodTi60,
            // status: '',
            // status2: '',
            // status3: '',
          };
          siObj.naimTi60Pre = {
            ...siObj.naimTi60,
            // status: '',
            // status2: '',
            // status3: '',
          };
          siObj.tipSch60Pre = {
            ...siObj.tipSch60,
            // status: '',
            // status2: '',
            // status3: '',
          };
          siObj.kanaly60Pre = {
            ...siObj.kanaly60,
            // status: '',
            // status2: '',
            // status3: '',
          };
          return siObj;
        } else {
          return {
            ...siObj,
            numTiShem60: { v: '', status: '', status2: '', status3: '' },
            kodTi60: { v: '', status: '', status2: '', status3: '' },
            naimTi60: { v: '', status: '', status2: '', status3: '' },
            tipSch60: { v: '', status: '', status2: '', status3: '' },
            kanaly60: { v: '', status: '', status2: '', status3: '' },
          };
        }
      });
      console.log('siAr60:', siAr60, 'siArMod:', siArMod);

      siAr60.forEach((si60) => {
        let indexNumTiShem60Pre: number = siArMod.findIndex(
          (siObj: ISiObj1) => siObj.numTiShem60Pre?.v === si60['schemanum']
        );
        let indexAtsCode: number = siArMod.findIndex(
          (siObj: ISiObj1) => siObj.kodTi80?.v === si60['ats-code']
        );
        console.log({ indexAtsCode }, { indexNumTiShem60Pre });

        if (indexNumTiShem60Pre >= 0) {
          console.log('if (indexNumTiShem60Pre >= 0)');
          // kodTi
          if (siArMod[indexNumTiShem60Pre].kodTi60Pre.v === si60['ats-code']) {
            console.log(
              'if (siArMod[indexNumTiShem60Pre].kodTi60Pre.v === si60[ats-code])'
            );
            siArMod[indexNumTiShem60Pre].kodTi60 = structuredClone(
              siArMod[indexNumTiShem60Pre].kodTi60Pre
            );
          } else {
            console.log(
              siArMod[indexNumTiShem60Pre].kodTi60.v,
              siArMod[indexNumTiShem60Pre].kodTi60Pre.v
            );
            siArMod[indexNumTiShem60Pre].kodTi60 = {
              v: si60['ats-code'],
              status: '',
              status2: '',
              status3: 'changed',
            };
            siArMod[indexNumTiShem60Pre].kodTi60Pre.status3 = 'changed';
          }
          // naimTi
          if (siArMod[indexNumTiShem60Pre].naimTi60Pre.v === si60.naimTi) {
            siArMod[indexNumTiShem60Pre].naimTi60 = {
              ...siArMod[indexNumTiShem60Pre].naimTi60Pre,
              status: '',
            };
            // siArMod[indexNumTiShem60Pre].naimTi60Pre.status = '';
          } else {
            siArMod[indexNumTiShem60Pre].naimTi60 = {
              v: si60.naimTi,
              status: '',
              status2: '',
              status3: 'changed',
            };
            siArMod[indexNumTiShem60Pre].naimTi60Pre.status3 = 'changed';
          }
          // tipSch
          if (siArMod[indexNumTiShem60Pre].tipSch60Pre.v === si60.deviceMod) {
            siArMod[indexNumTiShem60Pre].tipSch60 = {
              ...siArMod[indexNumTiShem60Pre].tipSch60Pre,
              status: '',
            };
            // siArMod[indexNumTiShem60Pre].tipSch60Pre.status = '';
          } else {
            siArMod[indexNumTiShem60Pre].tipSch60 = {
              v: si60.deviceMod,
              status: '',
              status2: '',
              status3: 'changed',
            };
            siArMod[indexNumTiShem60Pre].tipSch60Pre.status3 = 'changed';
          }
          // kanaly
          if (siArMod[indexNumTiShem60Pre].kanaly60Pre.v === si60.kanaly) {
            siArMod[indexNumTiShem60Pre].kanaly60 = {
              ...siArMod[indexNumTiShem60Pre].kanaly60Pre,
              status: '',
            };
            // siArMod[indexNumTiShem60Pre].kanaly60Pre.status = '';
          } else {
            siArMod[indexNumTiShem60Pre].kanaly60 = {
              v: si60.kanaly,
              status: '',
              status2: '',
              status3: 'changed',
            };
            siArMod[indexNumTiShem60Pre].kanaly60Pre.status3 = 'changed';
          }
        } else if (indexAtsCode >= 0 && !isPre60) {
          siArMod[indexAtsCode] = {
            ...siArMod[indexAtsCode],
            numTiShem60: {
              v: si60.schemanum,
              status: '',
              status2: '',
              status3: '',
            },
            kodTi60: {
              v: si60['ats-code'],
              status: '',
              status2: '',
              status3: '',
            },
            naimTi60: { v: si60.naimTi, status: '', status2: '', status3: '' },
            tipSch60: {
              v: si60.deviceMod,
              status: '',
              status2: '',
              status3: '',
            },
            kanaly60: { v: si60.kanaly, status: '', status2: '', status3: '' },
          };
        } else {
          console.log('else');

          const siObj: ISiObj1 = {
            numTiShem60Pre: {
              v: '',
              status: '',
              status2: '',
              status3: '',
            },
            kodTi60Pre: {
              v: '',
              status: '',
              status2: '',
              status3: '',
            },
            naimTi60Pre: {
              v: '',
              status: '',
              status2: '',
              status3: '',
            },
            tipSch60Pre: {
              v: '',
              status: '',
              status2: '',
              status3: '',
            },
            kanaly60Pre: {
              v: '',
              status: '',
              status2: '',
              status3: '',
            },
            numTiShem60: {
              v: si60.schemanum,
              status: '',
              status2: '',
              status3: '',
            },
            kodTi60: {
              v: si60['ats-code'],
              status: '',
              status2: '',
              status3: '',
            },
            naimTi60: { v: si60.naimTi, status: '', status2: '', status3: '' },
            tipSch60: {
              v: si60.deviceMod,
              status: '',
              status2: '',
              status3: '',
            },
            kanaly60: { v: si60.kanaly, status: '', status2: '', status3: '' },

            // id: nanoid(),
            // tiAiis: { v: true },
            gr: { v: '', status: '', status2: '', status3: '' },
            numTiSop: { v: '', status: '', status2: '', status3: '' },

            naimTiSop: { v: '', status: '', status2: '', status3: '' },
            naimTi80: { v: '', status: '', status2: '', status3: '' },
            naimTi82: { v: '', status: '', status2: '', status3: '' },

            numSchDB: { v: '', status: '', status2: '', status3: '' },
            numSchSop: { v: '', status: '', status2: '', status3: '' },
            numSchSch: { v: '', status: '', status2: '', status3: '' },

            tipSchSop: { v: '', status: '', status2: '', status3: '' },
            tipSch80: { v: '', status: '', status2: '', status3: '' },
            tipSchSch: { v: '', status: '', status2: '', status3: '' },
            tipSchDB: { v: '', status: '', status2: '', status3: '' },

            kttSop: { v: '', status: '', status2: '', status3: '' },
            kttDB: { v: '', status: '', status2: '', status3: '' },
            ktnSop: { v: '', status: '', status2: '', status3: '' },
            ktnDB: { v: '', status: '', status2: '', status3: '' },

            kodTi80: { v: '', status: '', status2: '', status3: '' },
            kanaly80: { v: '', status: '', status2: '', status3: '' },
          };
          siArMod.push(siObj);
        }

        /*siArMod = siArMod.map(siObj => {
          if (siObj.kodTi80.v === si60['ats-code']) {
            return {
              ...siObj,
              numTiShem60: {v: si60.schemanum},
              kodTi60: {v: si60['ats-code']},
              naimTi60: {v: si60.naimTi},
              tipSch60: {v: si60.deviceMod},
              kanaly60: {v: si60.kanaly}
            }
          } else {
            return siObj
          }
        }) */
      });
      console.log(siArMod);
      resolve([siArMod, isPre60]);
    };
  });
  return [res, file.name, isPre60];
}
// })

// const found = arr1.some(r=> arr2.includes(r) )
