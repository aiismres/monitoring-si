import React, { Dispatch, SetStateAction } from 'react';
import { IPowProfSch, ISiObj1 } from '../app.types';
import styles from './sverka2.module.css';
import { table } from 'console';
import { timePeriods } from '../modules/constants';

interface IProps {
  siState: ISiObj1[];
  setSiState: Dispatch<SetStateAction<ISiObj1[]>>;
}

export function Sverka2({ siState, setSiState }: IProps) {
  const siArrMutable: ISiObj1[] = structuredClone(siState);
  console.log(siArrMutable);

  function pastPowProfSch(siObj: ISiObj1, i: number) {
    const powProfSch: IPowProfSch = {
      k01: [],
      k02: [],
      k03: [],
      k04: [],
    };

    navigator.clipboard
      .readText()
      .then((text) => {
        console.log('Pasted content: ');
        const rows = text.split('\r\n');
        rows.pop(); // удаляется последний элемент '', к. непонятно откуда берется
        rows.forEach((row) => {
          let arr30 = row.split('\t');
          console.log(arr30);
          powProfSch.k01.push(Number(arr30[0]));
          powProfSch.k02.push(Number(arr30[1]));
          powProfSch.k03.push(Number(arr30[2]));
          powProfSch.k04.push(Number(arr30[3]));
        });
        console.log(powProfSch);
        siObj = { ...siObj, powProfSch };
        siArrMutable[i] = siObj;
        console.log(siObj, siArrMutable);
        setSiState(siArrMutable);
      })
      .catch((err) => {
        console.error('Failed to read clipboard contents: ', err);
      });
  }

  return (
    <>
      <div>Страница Сверка-2</div>
      {siArrMutable.map((siObj, i) => {
        return (
          <>
            <table className={styles.pivotTable}>
              <thead>
                <tr>
                  <th>Источник данных</th>
                  <th>№ ТИ</th>
                  <th>Наименование ТИ</th>
                  <th>№ Сч</th>
                  <th>Тип Сч</th>
                  <th>Ктт</th>
                  <th>Ктн</th>
                  <th>Каналы</th>
                  <th>Код ТИ</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>80020 xml</th>
                  <td>--</td>
                  <td>{siObj.naimTi82.v}</td>
                  <td>---</td>
                  <td>---</td>
                  <td>---</td>
                  <td>---</td>
                  <td></td>
                  <td></td>
                  <td>{siObj.powProf82.date}</td>
                </tr>
                <tr>
                  <th>80000 xml</th>
                  <td>--</td>
                  <td>{siObj.naimTi80.v}</td>
                  <td>---</td>
                  <td>{siObj.tipSch80.v}</td>
                  <td>---</td>
                  <td>---</td>
                  <td>{siObj.kanaly80.v}</td>
                  <td>{siObj.kodTi80.v}</td>
                  <td>---</td>
                </tr>
                <tr>
                  <th>60000 xml</th>
                  <td>{siObj.numTiShem60.v}</td>
                  <td>{siObj.naimTi60.v}</td>
                  <td>---</td>
                  <td>{siObj.tipSch60.v}</td>
                  <td>---</td>
                  <td>---</td>
                  <td>{siObj.kanaly60.v}</td>
                  <td>{siObj.kodTi60.v}</td>
                  <td>---</td>
                </tr>
                <tr>
                  <th>СОП АИИС</th>
                  <td>{siObj.numTiSop.v}</td>
                  <td>{siObj.naimTiSop.v}</td>
                  <td>{siObj.numSchSop.v}</td>
                  <td>{siObj.tipSchSop.v}</td>
                  <td>{siObj.kttSop.v}</td>
                  <td>{siObj.ktnSop.v}</td>
                  <td>---</td>
                  <td>---</td>
                  <td>---</td>
                </tr>
                <tr>
                  <th>БД</th>
                  <td>---</td>
                  <td>---</td>
                  <td>{siObj.numSchDB.v}</td>
                  <td>{siObj.tipSchDB.v}</td>
                  <td>{siObj.kttDB.v}</td>
                  <td>{siObj.ktnDB.v}</td>
                  <td>---</td>
                  <td>---</td>
                  <td>---</td>
                </tr>
                <tr>
                  <th>Выгрузка Сч</th>
                  <td>---</td>
                  <td>---</td>
                  <td>{siObj.numSchSch.v}</td>
                  <td>{siObj.tipSchDB.v}</td>
                  <td>Ke=</td>
                  <td></td>
                  <td></td>
                  <td>---</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={() => {
                pastPowProfSch(siObj, i);
              }}
            >
              paste Профиль сч
            </button>

            <table>
              <thead>
                <tr>
                  <th>Время</th>
                  <th colSpan={4}>Счетчик</th>
                  <th colSpan={4}>Пересчет</th>
                  <th colSpan={4}>80020</th>
                  <th colSpan={4}>Расхождения</th>
                </tr>
                <tr>
                  <th>Москва</th>
                  <th>A+</th>
                  <th>A-</th>
                  <th>R+</th>
                  <th>R-</th>
                  <th>A+</th>
                  <th>A-</th>
                  <th>R+</th>
                  <th>R-</th>
                  <th>A+</th>
                  <th>A-</th>
                  <th>R+</th>
                  <th>R-</th>
                  <th>A+</th>
                  <th>A-</th>
                  <th>R+</th>
                  <th>R-</th>
                </tr>
              </thead>
              <tbody>
                {timePeriods.map((timePeriod, i) => {
                  return (
                    <tr>
                      <td>{timePeriod}</td>
                      <td>{siObj.powProfSch && siObj.powProfSch.k01[i]}</td>
                      <td>{siObj.powProfSch && siObj.powProfSch.k02[i]}</td>
                      <td>{siObj.powProfSch && siObj.powProfSch.k03[i]}</td>
                      <td>{siObj.powProfSch && siObj.powProfSch.k04[i]}</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>{siObj.powProf82 && siObj.powProf82.k01[i]}</td>
                      <td>{siObj.powProf82 && siObj.powProf82.k02[i]}</td>
                      <td>{siObj.powProf82 && siObj.powProf82.k03[i]}</td>
                      <td>{siObj.powProf82 && siObj.powProf82.k04[i]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        );
      })}
      {/* <button onClick={pastPowProfSch}>paste Профиль сч</button> */}
      {/* <input
            type="text"
            onPaste={(e) => {
              console.log(e.clipboardData.getData('Text'));
              console.log(e.clipboardData.getData('text/plain'));
              console.log(e.clipboardData.getData('text/html'));
              console.log(e.clipboardData.getData('text/rtf'));
            }}
          /> */}
    </>
  );
}
