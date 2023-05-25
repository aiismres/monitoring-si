import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import {
  IAppState,
  IPowProfDiff,
  IPowProfSch,
  ISechInfo,
  ISiObj1,
  TStatus,
  TStatus2,
} from '../app.types';
import styles from './sverka2.module.css';
import { table } from 'console';
import { timePeriods } from '../modules/constants';
import Button from '@mui/material/Button';
import { produce } from 'immer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { SpeedDialNav } from '../SpeedDialNav';
import { ReactComponent as IconEdit } from '../Icons/IconEdit.svg';
import { ReactComponent as IconInfo } from '../Icons/IconInfo.svg';
import { SaveBtn } from '../SaveBtn';
import { AlertSucErr } from '../AlertSucErr';

interface IProps {
  siState: ISiObj1[];
  setSiState: Dispatch<SetStateAction<ISiObj1[]>>;
  appState: IAppState;
  setAppState: Dispatch<SetStateAction<IAppState>>;
  sechInfo: ISechInfo;
}

export function Sverka2({
  siState,
  setSiState,
  appState,
  setAppState,
  sechInfo,
}: IProps) {
  // const siArrMutable: ISiObj1[] = structuredClone(siState);
  // console.log(siArrMutable);
  setSiState(
    produce((draft) => {
      draft.forEach((item) => (item.ke = item.ke || { v: '1' }));
    })
  );

  function addStatus(v: number) {
    let status: TStatus | TStatus2;
    if (isNaN(v)) {
      status = 'warning';
    } else if (-1 <= v && v <= 1) {
      status = 'correct';
    } else {
      status = 'incorrect';
    }
    return { v, status };
  }

  function pastPowProfSch(siObj: ISiObj1, i: number) {
    const siArrMutable: ISiObj1[] = structuredClone(siState);
    const powProfSch: IPowProfSch = {
      k01: [],
      k02: [],
      k03: [],
      k04: [],
    };

    const powProfSchKttne: IPowProfSch = {
      k01: [],
      k02: [],
      k03: [],
      k04: [],
    };

    const powProfDiff: IPowProfDiff = {
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
        rows.forEach((row, i30) => {
          let arr30 = row.split('\t').map((item) => item.replace(',', '.'));
          console.log(arr30);

          powProfSch.k01.push(Number(arr30[0]));
          powProfSch.k02.push(Number(arr30[1]));
          powProfSch.k03.push(Number(arr30[2]));
          powProfSch.k04.push(Number(arr30[3]));

          const kttne =
            Number(siObj.kttDB.v || siObj.kttSop.v) *
            Number(siObj.ktnDB.v || siObj.ktnSop.v) *
            Number(siObj.ke.v);

          powProfSchKttne.k01.push(
            Math.round(Number(arr30[0]) * kttne * 10) / 10
          );
          powProfSchKttne.k02.push(
            Math.round(Number(arr30[1]) * kttne * 10) / 10
          );
          powProfSchKttne.k03.push(
            Math.round(Number(arr30[2]) * kttne * 10) / 10
          );
          powProfSchKttne.k04.push(
            Math.round(Number(arr30[3]) * kttne * 10) / 10
          );
          let v =
            Math.round(
              (Number(siObj.powProf82.k01[i30]) - Number(arr30[0]) * kttne) * 10
            ) / 10;
          powProfDiff.k01.push(addStatus(v));

          v =
            Math.round(
              (Number(siObj.powProf82.k02[i30]) - Number(arr30[1]) * kttne) * 10
            ) / 10;
          // let status: TStatus | TStatus2;
          // if (isNaN(v)) {
          //   status = 'warning';
          // } else if (-1 <= v && v <= 1) {
          //   status = 'correct';
          // } else {
          //   status = 'incorrect';
          // }

          powProfDiff.k02.push(
            addStatus(v)
            // Math.round(
            //   (Number(siObj.powProf82.k02[i30]) - Number(arr30[1]) * kttne) * 10
            // ) / 10
          );
          v =
            Math.round(
              (Number(siObj.powProf82.k03[i30]) - Number(arr30[2]) * kttne) * 10
            ) / 10;
          powProfDiff.k03.push(addStatus(v));
          v =
            Math.round(
              (Number(siObj.powProf82.k04[i30]) - Number(arr30[3]) * kttne) * 10
            ) / 10;
          powProfDiff.k04.push(addStatus(v));
        });
        console.log(powProfSch);
        siObj = { ...siObj, powProfSch, powProfSchKttne, powProfDiff };
        siArrMutable[i] = siObj;
        console.log(siObj, siArrMutable);
        setSiState(siArrMutable);
      })
      .catch((err) => {
        console.error('Failed to read clipboard contents: ', err);
      });
  }

  function changeKe(
    e: ChangeEvent<HTMLInputElement>,
    siObj: ISiObj1,
    i: number
  ) {
    const kttne =
      Number(siObj.kttDB.v || siObj.kttSop.v) *
      Number(siObj.ktnDB.v || siObj.ktnSop.v) *
      Number(e.target.value);
    setSiState(
      produce((draft) => {
        draft[i].ke.v = e.target.value;
        if (draft[i].powProfSchKttne) {
          draft[i].powProfSchKttne.k01 = siObj.powProfSch.k01.map(
            (item) => Math.round(item * kttne * 10) / 10
          );
          draft[i].powProfSchKttne.k02 = siObj.powProfSch.k02.map(
            (item) => Math.round(item * kttne * 10) / 10
          );
          draft[i].powProfSchKttne.k03 = siObj.powProfSch.k03.map(
            (item) => Math.round(item * kttne * 10) / 10
          );
          draft[i].powProfSchKttne.k04 = siObj.powProfSch.k04.map(
            (item) => Math.round(item * kttne * 10) / 10
          );

          draft[i].powProfDiff.k01 = siObj.powProfDiff.k01.map((item, i30) => {
            const v =
              Math.round(
                (draft[i].powProfSchKttne.k01[i30] - siObj.powProf82.k01[i30]) *
                  10
              ) / 10;
            return addStatus(v);
          });
          draft[i].powProfDiff.k02 = siObj.powProfDiff.k02.map((item, i30) => {
            const v =
              Math.round(
                (draft[i].powProfSchKttne.k02[i30] - siObj.powProf82.k02[i30]) *
                  10
              ) / 10;
            // let status: TStatus | TStatus2;
            // if (isNaN(v)) {
            //   status = 'warning';
            // } else if (-1 <= v && v <= 1) {
            //   status = 'correct';
            // } else {
            //   status = 'incorrect';
            // }
            // return { v, status };
            return addStatus(v);
          });
          draft[i].powProfDiff.k03 = siObj.powProfDiff.k03.map((item, i30) => {
            const v =
              Math.round(
                (draft[i].powProfSchKttne.k03[i30] - siObj.powProf82.k03[i30]) *
                  10
              ) / 10;
            return addStatus(v);
          });
          draft[i].powProfDiff.k04 = siObj.powProfDiff.k04.map((item, i30) => {
            const v =
              Math.round(
                (draft[i].powProfSchKttne.k04[i30] - siObj.powProf82.k04[i30]) *
                  10
              ) / 10;
            return addStatus(v);
          });
        }
      })
    );
  }

  const actions = [
    {
      icon: <IconInfo />,
      name: '',
      do: () => {
        setAppState({ ...appState, isInfoOpen: true });
      },
    },

    {
      icon: <IconEdit />,
      name: '',
      do: () =>
        setAppState({
          ...appState,
          isEdit: !appState.isEdit,
          isSiStateSave: !appState.isSiStateSave,
        }),
    },
  ];

  async function saveSiData() {
    try {
      // if (!siStateMod.current[0]) {
      //   siStateMod.current = siState;
      // }

      let res = await fetch(`/api/savesidata`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          siState: siState,
          sechInfo,
          sechID: appState.sechID,
        }),
      });
      // siStateMod.current = [];
      console.log(`/api/savesidata, res:`, res, 'res.ok:', res.ok);
      if (res.ok) {
        setAppState((st) => ({
          ...st,
          isSiStateSave: true,
          isEdit: false,
          isMsgOpen: true,
          isSuccess: true,
        }));
      } else {
        setAppState((st) => ({
          ...st,
          isSiStateSave: true,
          isEdit: false,
          isMsgOpen: true,
          isSuccess: false,
        }));
      }
    } catch (err) {
      setAppState((st) => ({
        ...st,
        isSiStateSave: true,
        isEdit: false,
        isMsgOpen: true,
        isSuccess: false,
      }));
    }
  }

  return (
    <>
      <div>Страница Сверка-2</div>
      {siState.map((siObj, i) => {
        // {siArrMutable.map((siObj, i) => {
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
                  <th className={appState.isEdit ? styles.warning : ''}>
                    Выгрузка Сч
                  </th>
                  <td>---</td>
                  <td>---</td>
                  <td>
                    <input
                      type="text"
                      readOnly={!appState.isEdit}
                      value={siObj.numSchSch.v}
                      onChange={(e) =>
                        setSiState(
                          produce((draft) => {
                            draft[i].numSchSch.v = e.target.value;
                          })
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      readOnly={!appState.isEdit}
                      value={siObj.tipSchSch.v}
                      onChange={(e) =>
                        setSiState(
                          produce((draft) => {
                            draft[i].tipSchSch.v = e.target.value;
                          })
                        )
                      }
                    />
                  </td>
                  <td>Ke=</td>
                  <td>
                    <input
                      type="text"
                      style={{ width: 50 }}
                      readOnly={!appState.isEdit}
                      value={siObj.ke?.v}
                      onChange={(e) => changeKe(e, siObj, i)}
                    />
                  </td>
                  <td>---</td>
                  <td>---</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <Button
              variant="contained"
              disabled={!appState.isEdit}
              color="success"
              onClick={() => {
                pastPowProfSch(siObj, i);
              }}
            >
              paste Профиль сч
            </Button>

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
                  console.log({ i });
                  return (
                    <tr>
                      <td>{timePeriod}</td>
                      <td>{siObj.powProfSch && siObj.powProfSch.k01[i]}</td>
                      <td>{siObj.powProfSch && siObj.powProfSch.k02[i]}</td>
                      <td>{siObj.powProfSch && siObj.powProfSch.k03[i]}</td>
                      <td>{siObj.powProfSch && siObj.powProfSch.k04[i]}</td>
                      <td>
                        {siObj.powProfSchKttne && siObj.powProfSchKttne.k01[i]}
                      </td>
                      <td>
                        {siObj.powProfSchKttne && siObj.powProfSchKttne.k02[i]}
                      </td>
                      <td>
                        {siObj.powProfSchKttne && siObj.powProfSchKttne.k03[i]}
                      </td>
                      <td>
                        {siObj.powProfSchKttne && siObj.powProfSchKttne.k04[i]}
                      </td>
                      <td>{siObj.powProf82 && siObj.powProf82.k01[i]}</td>
                      <td>{siObj.powProf82 && siObj.powProf82.k02[i]}</td>
                      <td>{siObj.powProf82 && siObj.powProf82.k03[i]}</td>
                      <td>{siObj.powProf82 && siObj.powProf82.k04[i]}</td>

                      <td className={styles[siObj.powProfDiff?.k01[i]?.status]}>
                        {siObj.powProfDiff && siObj.powProfDiff.k01[i]?.v}
                      </td>
                      <td className={styles[siObj.powProfDiff?.k02[i]?.status]}>
                        {siObj.powProfDiff && siObj.powProfDiff.k02[i]?.v}
                      </td>
                      <td className={styles[siObj.powProfDiff?.k03[i]?.status]}>
                        {siObj.powProfDiff && siObj.powProfDiff.k03[i]?.v}
                      </td>
                      <td className={styles[siObj.powProfDiff?.k04[i]?.status]}>
                        {siObj.powProfDiff && siObj.powProfDiff.k04[i]?.v}
                      </td>
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
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ mr: 5 }}>
            {appState.naimSechShort}
          </Typography>

          {/* <SpeedDialNav
            btnExportSv1={btnExportSv1}
            // inputFileSv2={inputFileSv2}
            btnEdit={btnEdit}
            appState={appState}
            setAppState={setAppState}
          /> */}
          <SpeedDialNav actions={actions} />
        </Toolbar>
      </AppBar>
      <SaveBtn appState={appState} onClick={saveSiData} />
      <AlertSucErr appState={appState} setAppState={setAppState} />
    </>
  );
}
