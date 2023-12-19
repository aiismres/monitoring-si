import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useMemo,
} from 'react';
import {
  IAppState,
  IPowProfDiff,
  IPowProfSch,
  ISechInfo,
  ISiObj1,
  Sv2V,
  TStatus,
  TStatus2,
} from '../app.types';
import styles from './sverka2.module.css';
import { table } from 'console';
import { sameChar, timePeriods } from '../modules/constants';
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
import { FileDropZone } from '../FileDropZone';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

interface IProps {
  siState: ISiObj1[];
  setSiState: Dispatch<SetStateAction<ISiObj1[]>>;
  appState: IAppState;
  setAppState: Dispatch<SetStateAction<IAppState>>;
  sechInfo: ISechInfo;
  setSechInfo: Dispatch<SetStateAction<ISechInfo>>;
}

export function Sverka2({
  siState,
  setSiState,
  appState,
  setAppState,
  sechInfo,
  setSechInfo,
}: IProps) {
  // const siArrMutable: ISiObj1[] = structuredClone(siState);
  // console.log(siArrMutable);
  useLayoutEffect(() => {
    setSiState(
      produce((draft) => {
        draft.forEach((item, i) => {
          // const tipSch = item.tipSchSch.v || item.tipSchSop.v;
          draft[i].ke = item.ke || {
            v: defineKe(item.tipSchSch.v),
          };
        });
      })
    );
  }, []);

  function defineKe(tipSch: string) {
    let ke;
    const tipSch3char = sameChar(tipSch.trim()).slice(0, 3);
    console.log(tipSch3char);
    if (tipSch3char === 'СЭТ') {
      ke = 0.0001;
    } else if (tipSch3char === 'А18') {
      ke = 0.000025;
    } else if (tipSch3char === 'Евр') {
      ke = 0.00005;
    } else if (tipSch3char === 'Мер') {
      ke = 0.0001;
    } else ke = 1;
    return String(ke);
  }

  // function addStatus(v: number) {
  //   let status: TStatus | TStatus2;
  //   if (isNaN(v)) {
  //     status = 'warning';
  //   } else if (-1 <= v && v <= 1) {
  //     status = 'correct';
  //   } else {
  //     status = 'incorrect';
  //   }
  //   return { v, status };
  // }

  function defineStatus(v: number) {
    let status: TStatus | TStatus2;
    if (isNaN(v)) {
      status = 'warning';
    } else if (-1 <= v && v <= 1) {
      status = 'correct';
    } else {
      status = 'incorrect';
    }
    return status;
  }

  function pastPowProfSch(siObj: ISiObj1, i: number) {
    const siArrMutable: ISiObj1[] = structuredClone(siState);
    const powProfSch: IPowProfSch = {
      k01: [],
      k02: [],
      k03: [],
      k04: [],
    };

    // const powProfSchKttne: IPowProfSch = {
    //   k01: [],
    //   k02: [],
    //   k03: [],
    //   k04: [],
    // };

    // const powProfDiff: IPowProfDiff = {
    //   k01: [],
    //   k02: [],
    //   k03: [],
    //   k04: [],
    // };

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

          // const kttne =
          //   Number(siObj.kttDB.v || siObj.kttSop.v) *
          //   Number(siObj.ktnDB.v || siObj.ktnSop.v) *
          //   Number(siObj.ke.v);

          // powProfSchKttne.k01.push(
          //   Math.round(Number(arr30[0]) * kttne * 10) / 10
          // );
          // powProfSchKttne.k02.push(
          //   Math.round(Number(arr30[1]) * kttne * 10) / 10
          // );
          // powProfSchKttne.k03.push(
          //   Math.round(Number(arr30[2]) * kttne * 10) / 10
          // );
          // powProfSchKttne.k04.push(
          //   Math.round(Number(arr30[3]) * kttne * 10) / 10
          // );
          // let v =
          //   Math.round(
          //     (Number(siObj.powProf82.k01[i30]) - Number(arr30[0]) * kttne) * 10
          //   ) / 10;
          // powProfDiff.k01.push(addStatus(v));

          // v =
          //   Math.round(
          //     (Number(siObj.powProf82.k02[i30]) - Number(arr30[1]) * kttne) * 10
          //   ) / 10;

          // powProfDiff.k02.push(addStatus(v));
          // v =
          //   Math.round(
          //     (Number(siObj.powProf82.k03[i30]) - Number(arr30[2]) * kttne) * 10
          //   ) / 10;
          // powProfDiff.k03.push(addStatus(v));
          // v =
          //   Math.round(
          //     (Number(siObj.powProf82.k04[i30]) - Number(arr30[3]) * kttne) * 10
          //   ) / 10;
          // powProfDiff.k04.push(addStatus(v));
        });
        // siObj = { ...siObj, powProfSch, powProfSchKttne, powProfDiff };
        siObj = { ...siObj, powProfSch };
        siArrMutable[i] = siObj;
        console.log(siObj, siArrMutable);
        setSiState(siArrMutable);
      })
      .catch((err) => {
        console.error('Failed to read clipboard contents: ', err);
      });
  }

  // function changeKe(
  //   e: ChangeEvent<HTMLInputElement>,
  //   siObj: ISiObj1,
  //   i: number
  // ) {
  //   const kttne =
  //     Number(siObj.kttDB.v || siObj.kttSop.v) *
  //     Number(siObj.ktnDB.v || siObj.ktnSop.v) *
  //     Number(e.target.value);
  //   setSiState(
  //     produce((draft) => {
  //       draft[i].ke.v = e.target.value;
  //       if (draft[i].powProfSchKttne) {
  //         draft[i].powProfSchKttne.k01 = siObj.powProfSch.k01.map(
  //           (item) => Math.round(item * kttne * 10) / 10
  //         );
  //         draft[i].powProfSchKttne.k02 = siObj.powProfSch.k02.map(
  //           (item) => Math.round(item * kttne * 10) / 10
  //         );
  //         draft[i].powProfSchKttne.k03 = siObj.powProfSch.k03.map(
  //           (item) => Math.round(item * kttne * 10) / 10
  //         );
  //         draft[i].powProfSchKttne.k04 = siObj.powProfSch.k04.map(
  //           (item) => Math.round(item * kttne * 10) / 10
  //         );

  //         draft[i].powProfDiff.k01 = siObj.powProfDiff.k01.map((item, i30) => {
  //           const v =
  //             Math.round(
  //               (draft[i].powProfSchKttne.k01[i30] - siObj.powProf82.k01[i30]) *
  //                 10
  //             ) / 10;
  //           return addStatus(v);
  //         });
  //         draft[i].powProfDiff.k02 = siObj.powProfDiff.k02.map((item, i30) => {
  //           const v =
  //             Math.round(
  //               (draft[i].powProfSchKttne.k02[i30] - siObj.powProf82.k02[i30]) *
  //                 10
  //             ) / 10;
  //           return addStatus(v);
  //         });
  //         draft[i].powProfDiff.k03 = siObj.powProfDiff.k03.map((item, i30) => {
  //           const v =
  //             Math.round(
  //               (draft[i].powProfSchKttne.k03[i30] - siObj.powProf82.k03[i30]) *
  //                 10
  //             ) / 10;
  //           return addStatus(v);
  //         });
  //         draft[i].powProfDiff.k04 = siObj.powProfDiff.k04.map((item, i30) => {
  //           const v =
  //             Math.round(
  //               (draft[i].powProfSchKttne.k04[i30] - siObj.powProf82.k04[i30]) *
  //                 10
  //             ) / 10;
  //           return addStatus(v);
  //         });
  //       }
  //     })
  //   );
  // }

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
    const siStateMod = siState.map((siObj) =>
      siObj.sv2?.v
        ? siObj
        : {
            ...siObj,
            sv2: {
              v: 'noCheck',
              status: 'warning',
              status2: '',
              status3: '',
            },
          }
    );
    console.log(siStateMod);
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
          siState: siStateMod,
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

  function handleToggleBtn(
    event: React.MouseEvent<HTMLElement>,
    newAlignment: Sv2V | null,
    i: number
  ) {
    if (newAlignment !== null) {
      // setAlignment(newAlignment);
      let status: TStatus = '';
      let status2: TStatus2 = '';
      if (newAlignment === 'success') {
        status2 = 'correct';
      } else if (newAlignment === 'error') {
        status = 'warning';
        status2 = 'incorrect';
      } else if (newAlignment === 'warning') {
        status = 'warning';
      } else if (newAlignment === 'noCheck') {
        status = 'warning';
      }
      setSiState(
        (siSt) =>
          siSt.map((siObj, i2) =>
            i2 === i
              ? {
                  ...siObj,
                  sv2: { v: newAlignment, status, status2, status3: '' },
                }
              : siObj
          )
        // produce((draft) => {
        //   draft[i].sv2 = { v: newAlignment, status, status2, status3: '' };
        // })
      );
      console.log('hndlToggleBtn', newAlignment, i);
    }
  }

  return (
    <>
      {siState.map((siObj, i) => {
        // {siArrMutable.map((siObj, i) => {
        const kttne =
          (Number(siObj.kttDB?.v) || Number(siObj.kttSop?.v)) *
          (Number(siObj.ktnDB?.v) || Number(siObj.ktnSop?.v)) *
          Number(siObj.ke?.v);

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
                  <td>{siObj.powProf82?.date}</td>
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
                  <th className={appState.isEdit ? styles.warning : ''}>
                    СОП АИИС
                  </th>
                  <td>
                    {/* {siObj.numTiSop.v} */}
                    <input
                      type="text"
                      className={styles.input}
                      // style={{
                      //   width: siObj.numTiSop.v.length * 8 || 20 + 'px',
                      // }}
                      size={siObj.numTiSop.v.length || 1}
                      readOnly={!appState.isEdit}
                      value={siObj.numTiSop.v}
                      onChange={(e) =>
                        setSiState(
                          produce((draft) => {
                            draft[i].numTiSop.v = e.target.value.trim();
                          })
                        )
                      }
                    />
                  </td>
                  <td>
                    {/* {siObj.naimTiSop.v} */}
                    <textarea
                      className={styles.textarea}
                      readOnly={!appState.isEdit}
                      value={siObj.naimTiSop.v}
                      onChange={(e) =>
                        setSiState(
                          produce((draft) => {
                            draft[i].naimTiSop.v = e.target.value.trim();
                          })
                        )
                      }
                    />
                  </td>
                  <td>
                    {/* {siObj.numSchSop.v} */}
                    <input
                      type="text"
                      className={styles.input}
                      // style={{
                      //   width: siObj.numSchSop.v.length * 8 || 20 + 'px',
                      // }}
                      size={siObj.numSchSop.v.length || 1}
                      readOnly={!appState.isEdit}
                      value={siObj.numSchSop.v}
                      onChange={(e) =>
                        setSiState(
                          produce((draft) => {
                            draft[i].numSchSop.v = e.target.value.trim();
                          })
                        )
                      }
                    />
                  </td>
                  <td>
                    {/* {siObj.tipSchSop.v} */}
                    <input
                      type="text"
                      className={styles.input}
                      size={siObj.tipSchSop.v.length || 1}
                      readOnly={!appState.isEdit}
                      value={siObj.tipSchSop.v}
                      onChange={(e) =>
                        setSiState(
                          produce((draft) => {
                            draft[i].tipSchSop.v = e.target.value.trim();
                          })
                        )
                      }
                    />
                  </td>
                  <td>
                    {/* {siObj.kttSop.v} */}
                    <input
                      type="text"
                      className={styles.input}
                      // style={{
                      //   width: siObj.kttSop.v.length * 8 || 20 + 'px',
                      // }}
                      size={siObj.kttSop.v.length || 1}
                      readOnly={!appState.isEdit}
                      value={siObj.kttSop.v}
                      onChange={(e) =>
                        setSiState(
                          produce((draft) => {
                            draft[i].kttSop.v = e.target.value.trim();
                          })
                        )
                      }
                    />
                  </td>
                  <td>
                    {/* {siObj.ktnSop.v} */}
                    <input
                      type="text"
                      className={styles.input}
                      // style={{
                      //   width: siObj.ktnSop.v.length * 8 || 20 + 'px',
                      // }}
                      size={siObj.ktnSop.v.length || 1}
                      readOnly={!appState.isEdit}
                      value={siObj.ktnSop.v}
                      onChange={(e) =>
                        setSiState(
                          produce((draft) => {
                            draft[i].ktnSop.v = e.target.value.trim();
                          })
                        )
                      }
                    />
                  </td>
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
                      className={styles.input}
                      size={siObj.numSchSch.v.length || 1}
                      // style={{
                      //   width: siObj.numSchSch.v.length * 8 || 20 + 'px',
                      // }}
                      readOnly={!appState.isEdit}
                      value={siObj.numSchSch.v}
                      onChange={(e) =>
                        setSiState(
                          produce((draft) => {
                            draft[i].numSchSch.v = e.target.value.trim();
                          })
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className={styles.input}
                      size={siObj.tipSchSch.v.length || 1}
                      // style={{
                      //   width: siObj.tipSchSch.v.length * 8 || 20 + 'px',
                      // }}
                      readOnly={!appState.isEdit}
                      value={siObj.tipSchSch.v}
                      onChange={(e) =>
                        setSiState(
                          produce((draft) => {
                            draft[i].tipSchSch.v = e.target.value.trim();
                            draft[i].ke.v = defineKe(e.target.value);
                          })
                        )
                      }
                    />
                  </td>
                  <td>Ke=</td>
                  <td>
                    <input
                      type="text"
                      className={styles.input}
                      size={siObj.ke?.v.length || 1}
                      // style={{
                      //   width: siObj.ke.v.length * 8 || 20 + 'px',
                      // }}
                      // style={{ width: 60 }}
                      readOnly={!appState.isEdit}
                      value={siObj.ke?.v}
                      // onChange={(e) => changeKe(e, siObj, i)}
                      onChange={(e) =>
                        setSiState(
                          produce((draft) => {
                            draft[i].ke.v = e.target.value;
                          })
                        )
                      }
                    />
                  </td>
                  <td>---</td>
                  <td>---</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div className={styles.pastFileDropContainer}>
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
              <FileDropZone
                siState={siState}
                setSiState={setSiState}
                setAppState={setAppState}
                setSechInfo={setSechInfo}
                only82xml={true}
                kodTi={siObj.kodTi80.v || siObj.kodTi60.v}
              />
            </div>
            <table>
              <thead>
                <tr>
                  <th>Время</th>
                  <th colSpan={4}>Счетчик</th>
                  <th colSpan={4}>Пересчет</th>
                  <th colSpan={4}>80020</th>
                  <th colSpan={4}>Расхождения</th>
                  <th rowSpan={4} className={styles.thBtnGroup}>
                    <ToggleButtonGroup
                      color={
                        !siObj.sv2
                          ? 'warning'
                          : siObj.sv2.v === 'noCarryOut' ||
                            siObj.sv2.v === 'noCheck'
                          ? 'warning'
                          : siObj.sv2.v
                      }
                      value={siObj.sv2?.v || 'noCheck'}
                      exclusive
                      onChange={(e, newAlignment) => {
                        handleToggleBtn(e, newAlignment, i);
                      }}
                      aria-label="Platform"
                    >
                      <ToggleButton
                        sx={{
                          '&.MuiToggleButton-root.Mui-selected': {
                            backgroundColor: 'rgba(46, 125, 50, 0.2)', //use the color you want
                          },
                        }}
                        value="success"
                      >
                        ok
                      </ToggleButton>
                      <ToggleButton
                        sx={{
                          '&.MuiToggleButton-root.Mui-selected': {
                            backgroundColor: 'rgba(211, 47, 47,  0.2)', //use the color you want
                          },
                        }}
                        value="error"
                      >
                        ошибки
                      </ToggleButton>
                      <ToggleButton
                        sx={{
                          '&.MuiToggleButton-root.Mui-selected': {
                            backgroundColor: 'rgba(237, 108, 2, 0.2)', //use the color you want
                          },
                        }}
                        value="warning"
                      >
                        вопросы
                      </ToggleButton>
                      <ToggleButton
                        sx={{
                          '&.MuiToggleButton-root.Mui-selected': {
                            backgroundColor: 'rgba(237, 108, 2, 0.2)', //use the color you want
                          },
                        }}
                        value="noCheck"
                      >
                        не проводилась
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </th>
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
                  // console.log({ i });
                  const diff01 =
                    Math.round(
                      (siObj.powProf82?.k01[i] -
                        siObj.powProfSch?.k01[i] * kttne) *
                        10
                    ) / 10;
                  const diff02 =
                    Math.round(
                      (siObj.powProf82?.k02[i] -
                        siObj.powProfSch?.k02[i] * kttne) *
                        10
                    ) / 10;
                  const diff03 =
                    Math.round(
                      (siObj.powProf82?.k03[i] -
                        siObj.powProfSch?.k03[i] * kttne) *
                        10
                    ) / 10;
                  const diff04 =
                    Math.round(
                      (siObj.powProf82?.k04[i] -
                        siObj.powProfSch?.k04[i] * kttne) *
                        10
                    ) / 10;

                  const diffSt01 = defineStatus(diff01);
                  const diffSt02 = defineStatus(diff02);
                  const diffSt03 = defineStatus(diff03);
                  const diffSt04 = defineStatus(diff04);

                  return (
                    <tr>
                      <td>{timePeriod}</td>
                      <td>{siObj.powProfSch?.k01[i]}</td>
                      {/* <td>{siObj.powProfSch && siObj.powProfSch.k01[i]}</td> */}
                      <td>{siObj.powProfSch?.k02[i]}</td>
                      <td>{siObj.powProfSch?.k03[i]}</td>
                      <td>{siObj.powProfSch?.k04[i]}</td>
                      <td>
                        {Math.round(siObj.powProfSch?.k01[i] * kttne * 10) / 10}
                        {/* {siObj.powProfSchKttne && siObj.powProfSchKttne.k01[i]} */}
                      </td>
                      <td>
                        {Math.round(siObj.powProfSch?.k02[i] * kttne * 10) / 10}
                        {/* {siObj.powProfSchKttne && siObj.powProfSchKttne.k02[i]} */}
                      </td>
                      <td>
                        {Math.round(siObj.powProfSch?.k03[i] * kttne * 10) / 10}
                        {/* {siObj.powProfSchKttne && siObj.powProfSchKttne.k03[i]} */}
                      </td>
                      <td>
                        {Math.round(siObj.powProfSch?.k04[i] * kttne * 10) / 10}
                        {/* {siObj.powProfSchKttne && siObj.powProfSchKttne.k04[i]} */}
                      </td>
                      {/* <td>{siObj.powProf82 && siObj.powProf82.k01[i]}</td> */}
                      <td>{siObj.powProf82?.k01[i]}</td>
                      <td>{siObj.powProf82?.k02[i]}</td>
                      <td>{siObj.powProf82?.k03[i]}</td>
                      <td>{siObj.powProf82?.k04[i]}</td>

                      <td className={styles[diffSt01]}>
                        {/* <td className={styles[siObj.powProfDiff?.k01[i]?.status]}> */}
                        {/* {siObj.powProfDiff && siObj.powProfDiff.k01[i]?.v} */}
                        {/* {Math.round(
                          (siObj.powProf82?.k01[i] -
                            siObj.powProfSch?.k01[i] * kttne) *
                            10
                        ) / 10} */}
                        {diff01}
                      </td>
                      <td className={styles[diffSt02]}>{diff02}</td>

                      <td className={styles[diffSt03]}>{diff03}</td>
                      <td className={styles[diffSt04]}>{diff04}</td>
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
          <FileDropZone
            siState={siState}
            setSiState={setSiState}
            setAppState={setAppState}
            setSechInfo={setSechInfo}
            only82xml={true}
          />
          <SpeedDialNav actions={actions} />
        </Toolbar>
      </AppBar>
      <SaveBtn appState={appState} onClick={saveSiData} />
      <AlertSucErr appState={appState} setAppState={setAppState} />
    </>
  );
}
