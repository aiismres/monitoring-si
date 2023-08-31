import { nanoid } from 'nanoid';
import { sameChar } from './constants';
import { IMesPoint80, ISiObj1 } from '../app.types.js';

type TKanal = 'k01' | 'k02' | 'k03' | 'k04';

export async function read82xmlMod(file: File, siAr: ISiObj1[]) {
  const siArMutable: ISiObj1[] = structuredClone(siAr);

  console.log('file.name', file.name);
  if (!file.name.includes('80020')) {
    alert('файл не 80020');
    return siArMutable;
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

        // let aiisTag = doc.getElementsByTagName('aiis')[0];
        // const aiisAreaTag = aiisTag.getElementsByTagName('area')[0];
        const areaCode = doc.getElementsByTagName('inn')[1].textContent!;
        const areaName = doc.getElementsByTagName('name')[1].textContent!;
        let date82 = doc.getElementsByTagName('day')[0].textContent!;
        date82 =
          date82.substring(6, 8) +
          '.' +
          date82.substring(4, 6) +
          '.' +
          date82.substring(0, 4);
        console.log(areaName);
        let isCorrect82xml = window.confirm(`
        area-code: ${areaCode}
        area-name:
        ${areaName}

        профиль за : ${date82}
        `);
        if (!isCorrect82xml) {
          reject();
        }

        let mesPointTags = doc.getElementsByTagName('measuringpoint');
        console.log(mesPointTags);
        let mesPoints82Arr = [];

        for (let mesPointTag of mesPointTags) {
          let powProf82 = {
            date: date82,
            k01: [],
            k02: [],
            k03: [],
            k04: [],
          };

          const kodTi82 = mesPointTag.getAttribute('code')!;
          const naimTi82v = mesPointTag.getAttribute('name')!;
          console.log(kodTi82, naimTi82v);
          const mesChannelSTag =
            mesPointTag.getElementsByTagName('measuringchannel');

          let siObj1 = siArMutable.find(
            (siObj) =>
              siObj.kodTi80.v === kodTi82 || siObj.kodTi60.v === kodTi82
          )!;

          let indexTi = siArMutable.findIndex(
            (siObj) =>
              siObj.kodTi80.v === kodTi82 || siObj.kodTi60.v === kodTi82
          );

          siArMutable[indexTi] = {
            ...siObj1,
            powProf82,
            naimTi82: { v: naimTi82v, status: '', status2: '', status3: '' },
          };

          for (const mesChannel of mesChannelSTag) {
            const kanal = ('k' + mesChannel.getAttribute('code')!) as TKanal;
            const valueTags = mesChannel.getElementsByTagName('value');

            console.log(kanal);
            for (const value of valueTags) {
              // console.log(value.textContent);
              siArMutable[indexTi].powProf82[kanal].push(
                Number(value.textContent)
              );
            }
          }
        }

        resolve([siArMutable, areaCode, areaName]);
      };
    });
  return [res, areaCode, areaName];
}
// })

// const found = arr1.some(r=> arr2.includes(r))
