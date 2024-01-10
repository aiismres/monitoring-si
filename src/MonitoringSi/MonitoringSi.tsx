import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  useLayoutEffect,
  Dispatch,
  SetStateAction,
  useCallback,
  StrictMode,
} from 'react';
import styles from './monitoringsi.module.css';
// import { TableHead } from '../TableHead';
import {
  IColsWidth,
  colOrderObj,
  colsWidthInit,
  sameChar,
  colFullName,
} from '../modules/constants';
import {
  IAppState,
  // IResReadSiData,
  IResReadSiData1,
  ISechInfo,
  ISiObj1,
  IStringHtml,
  TColShortNames,
  // ISiObj2,
} from '../app.types';
import { checkData } from '../modules/checkDataMod';
import produce from 'immer';
import { nanoid } from 'nanoid';
import { exportSv1Mod } from '../modules/exportSv1Mod';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { FileDropZone } from '../FileDropZone';
import { SpeedDialNav } from '../SpeedDialNav';
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField,
  Tooltip,
  buttonBaseClasses,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { useAppStore } from '../store';
import { ReactComponent as IconExpSv1 } from '../Icons/IconExpSv1.svg';
import { ReactComponent as IconEdit } from '../Icons/IconEdit.svg';
import { ReactComponent as IconEdit2 } from '../Icons/IconEdit2.svg';
import { ReactComponent as IconInfo } from '../Icons/IconInfo.svg';
import { ReactComponent as IconSverka2 } from '../Icons/IconSverka2.svg';
import { useNavigate } from 'react-router-dom';
import { SaveBtn } from '../SaveBtn';
import { AlertSucErr } from '../AlertSucErr';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Tips } from '../Tips';
import { keyboardKey } from '@testing-library/user-event';
import { resetStatus3 } from '../modules/resetStatus3';
import UndoIcon from '@mui/icons-material/Undo';
import SaveIcon from '@mui/icons-material/Save';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useSWR from 'swr';
import { useSiData } from '../hooks/useSiData';

// типизация для работы с кастомными атрибутами html тегов (я добавляю тег colname)
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    colname?: string;
  }
}

interface IProps {
  siState?: ISiObj1[];
  setSiState?: Dispatch<SetStateAction<ISiObj1[]>>;
  appState: IAppState;
  setAppState: Dispatch<SetStateAction<IAppState>>;
  sechInfo: ISechInfo;
  setSechInfo: Dispatch<SetStateAction<ISechInfo>>;
}

export function MonitoringSi({
  // siState,
  // setSiState,
  appState,
  setAppState,
  sechInfo,
  setSechInfo,
}: IProps) {
  // const [appState, setAppState] = useState<IAppState>({
  //   // selectedCell: {},
  //   // colOrderOpt: 'opt1',
  //   colOrder: colOrderObj.opt1,
  //   sechID: '',
  //   naimSechShort: '',
  //   isEdit: false,
  //   classSSDBtn: '',
  //   classEditBtn: '',
  //   isSiStateSave: true,
  //   isMsgOpen: false,
  //   isSuccess: true,
  //   isInfoOpen: false,
  // });
  // const [sechInfo, setSechInfo] = useState<ISechInfo>({
  //   sechID: '',
  //   naimSechShort: '',
  //   areaCode: '',
  //   areaName: '',
  //   sourceDB: '',
  //   source60: '',
  //   amountTi: 0,
  // });
  type Params = keyof ISiObj1;
  const navigate = useNavigate();

  const [data, siState, setSiState] = useSiData(
    new URL(document.URL).searchParams.get('sechID') ?? 'defaultSechID'
  );

  const [status2, setStatus2] = useState<'' | 'correct' | 'incorrect' | null>(
    null
  );
  const [status3, setStatus3] = useState<'' | 'selected' | null>(null);
  const [selectedItems, setSelectedItems] = useState<
    {
      i: number;
      param: TColShortNames;
    }[]
  >([]);
  const [loginDialogIsOpen, setLoginDialogIsOpen] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [loginPassword, setLoginPassword] = useState({
    username: '',
    password: '',
  });
  const siArrHistory = useRef<ISiObj1[][]>([]);
  const btnExportSv1 = useRef(null);
  const btnEdit = useRef(null);
  const siStateMod = useRef<ISiObj1[]>([]);

  // Управление клавишами (работает, перерес в <td onClick()>) начало

  // useEffect(() => {
  //   function handlekeydownEvent(e: keyboardKey) {
  //     if (e.key === 'Control') return;
  //     const { key, keyCode, code } = e;
  //     console.log(key, keyCode, code);
  //     if (code === 'KeyQ') {
  //       setStatus2('correct');
  //     } else if (code === 'KeyW') {
  //       setStatus2('incorrect');
  //     } else if (code === 'KeyE') {
  //       setStatus2('');
  //     }
  //     // else if (code === 'KeyS') {
  //     //   setStatus3('selected');
  //     // }

  //     if (!selectedItems[0]) {
  //       return;
  //     } else if (e.key === 'Alt' || e.key === 'Control') {
  //       return;
  //     } else if (e.code === 'Delete') {
  //       setSiState((siArr) => {
  //         let siArrMod = [...siArr];
  //         selectedItems.forEach(({ i, param }) => {
  //           siArrMod[i][param].v = '';
  //         });
  //         return siArrMod;
  //       });
  //       setAppState({ ...appState, isSiStateSave: false });
  //     } else if (e.code === 'Backspace') {
  //       setSiState((siArr) => {
  //         let siArrMod = [...siArr];
  //         selectedItems.forEach(({ i, param }) => {
  //           siArrMod[i][param].v = siArrMod[i][param].v.slice(0, -1);
  //         });
  //         return siArrMod;
  //       });
  //       setAppState({ ...appState, isSiStateSave: false });
  //     } else if (e.code === 'ArrowRight') {
  //       const { i, param } = selectedItems[0];
  //       const paramIndex = appState.colOrder.findIndex(
  //         (item) => item === param
  //       );
  //       setSelectedItems((st) => [
  //         { ...st[0], param: appState.colOrder[paramIndex + 1] },
  //       ]);
  //       setSiState((siArr) => {
  //         const siArrMod = resetStatus3(siArr);
  //         siArrMod[i][appState.colOrder[paramIndex + 1]].status3 = 'selected';
  //         return siArrMod;
  //       });
  //     } else {
  //       setSiState((siArr) => {
  //         let siArrMod = [...siArr];
  //         selectedItems.forEach(({ i, param }) => {
  //           siArrMod[i][param].v += e.key || '';
  //         });
  //         return siArrMod;
  //       });
  //       setAppState({ ...appState, isSiStateSave: false });
  //     }
  //   }

  //   document.addEventListener('keydown', handlekeydownEvent);
  //   return () => {
  //     document.removeEventListener('keydown', handlekeydownEvent);
  //   };
  // }, [selectedItems, setSiState]);

  // useEffect(() => {
  //   function handlekeyupEvent() {
  //     setStatus2(null);
  //     setStatus3(null);
  //   }
  //   document.addEventListener('keyup', handlekeyupEvent);
  //   return () => {
  //     document.removeEventListener('keyup', handlekeyupEvent);
  //   };
  // }, []);

  // конец управление клавишами (работает)

  // копирование ctrl+v (перенес в table onPaste) начало
  // useEffect(() => {
  //   function handlePasteEvent(e: ClipboardEvent) {
  //     if (e.clipboardData) {
  //       console.log(e.clipboardData.getData('text'), selectedItems);
  //       if (!selectedItems[0]) return;
  //       setSiState((siArr) => {
  //         let siArrMod = [...siArr];
  //         selectedItems.forEach(({ i, param }) => {
  //           siArrMod[i][param].v = e.clipboardData
  //             ? e.clipboardData.getData('text')
  //             : '';
  //         });
  //         return siArrMod;
  //       });
  //       setAppState({ ...appState, isSiStateSave: false });
  //     }
  //   }
  //   document.addEventListener('paste', handlePasteEvent);
  //   return () => {
  //     document.removeEventListener('paste', handlePasteEvent);
  //   };
  // }, [selectedItems, appState]);

  // конец копирование ctrl+v (перенес в table onPaste)

  // useEffect(() => {
  //   if (appState.isSiStateSave) {
  //     // setAppState({ ...appState, classSSDBtn: '' });
  //   } else {
  //     // setAppState({ ...appState, classSSDBtn: 'attention' });
  //   }
  // }, [appState.isSiStateSave]);

  // useEffect(() => {
  //   (async () => {
  //     console.log(document.URL, window.location.search);
  //     let url = new URL(document.URL);

  //     const naimSechShort =
  //       url.searchParams.get('naimsechshort') ?? 'defaultNaimSech';
  //     document.title = naimSechShort;

  //     const sechID = url.searchParams.get('sechID') ?? 'defaultSechID';
  //     setAppState({
  //       ...appState,
  //       sechID,
  //       naimSechShort,
  //     });

  //     let res = await fetch('/api/readsidata', {
  //       method: 'post',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ id: url.searchParams.get('sechID') }),
  //     });
  //     let resJson: IResReadSiData1 = await res.json();
  //     console.log('res /api/readsidata', resJson);

  //     resJson.si = checkData(resJson.si);
  //     setSiState(resJson.si);
  //     if (resJson.sechInfo) {
  //       setSechInfo(resJson.sechInfo);
  //     }
  //   })();
  // }, []);

  const [rerender, setRerender] = useState(0); // для ререндера при изм ширины столбцов таблицы

  const colsWidthObjZu = useAppStore((st) => st.colsWidth[appState.sechID]);
  const tableWidthZu = useAppStore((st) => st.tableWidth[appState.sechID]);
  const setZuColsWidth = useAppStore((st) => st.setZuColsWidth);
  const setZuTableWidth = useAppStore((st) => st.setZuTableWidth);
  const refColsWidth = useRef<IColsWidth>({ ...colsWidthInit });
  const initialTableWidth = Object.values(colsWidthInit).reduce(
    (sum, item) => (sum += item),
    0
  );
  const refTableWidth = useRef(initialTableWidth);

  useLayoutEffect(() => {
    console.log('useLayoutEffect(() => {}');
    if (tableWidthZu) {
      refColsWidth.current = { ...colsWidthObjZu };
      refTableWidth.current = tableWidthZu;
    } else {
      refTableWidth.current = initialTableWidth;
    }
  }, [colsWidthObjZu, tableWidthZu]);

  useEffect(() => {
    let cookie = document.cookie;
    console.log(cookie);
    if (cookie) {
      setIsLoggedin(true);
    }
  }, []);

  const startX = useRef(0);
  const startColWidth = useRef(0);
  const startTableWidth = useRef(0);
  const refThsObj = useRef<IStringHtml>({});

  function onDragStartTh(e: React.DragEvent, i: number, param: string) {
    startX.current = e.clientX;
    startColWidth.current = refColsWidth.current[param];
    startTableWidth.current = refTableWidth.current;
  }

  function onDragTh(e: React.DragEvent, i: number, param: keyof IColsWidth) {
    if (e.clientY <= 0) return; // исключить последнее значение drgon т.к. оно всегда косячное
    let colWidthInc = e.clientX - startX.current;

    refColsWidth.current[param] = startColWidth.current + colWidthInc * 0.93; //0.93 имперически выведенный коэфф

    if (refColsWidth.current[param] < colsWidthInit[param]) {
      refColsWidth.current[param] = colsWidthInit[param];
      return;
    }
    refTableWidth.current = startTableWidth.current + colWidthInc;

    setRerender(colWidthInc);
  }

  function onDragEndTh(e: React.DragEvent, i: number, param: string) {
    setZuColsWidth(appState.sechID, { ...refColsWidth.current });
    setZuTableWidth(appState.sechID, refTableWidth.current);
  }

  // end block for table head

  function sortBy(param: TColShortNames) {
    console.log(siState, param);
    setSiState((state: ISiObj1[]) => {
      let stateMod = structuredClone(state);
      stateMod = stateMod.sort((a: ISiObj1, b: ISiObj1) => {
        if (
          [
            'naimTi60',
            'tipSch60',
            'gr',
            'naimTiSop',
            'tipSchSop',
            'naimTi80',
            'tipSch80',
            'tipSchSch',
            'tipSchDB',
          ].includes(param)
        ) {
          return String(a[param]['v']).localeCompare(String(b[param]['v']));
        } else if (
          [
            'numTiShem60',
            'kodTi60',
            'numTiSop',
            'numSchSop',
            'kodTi80',
            'numSchSch',
            'numSchDB',
          ].includes(param)
        ) {
          return Number(a[param]['v']) - Number(b[param]['v']);
        } else {
          return 1;
        }
      });
      return stateMod;
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTableSectionElement>) {
    if (appState.isEdit || !appState.isEdit2) return;
    console.log(e, 'e.code', e.code, 'e.key', e.key);
    const { i, param } = selectedItems[0] || { i: null, param: null };

    const paramIndex = appState.colOrder.findIndex((item) => item === param);
    if (e.code === 'ArrowRight' && !appState.editableCell.param) {
      e.preventDefault();
      // const { i, param } = selectedItems[0];
      // const paramIndex = appState.colOrder.findIndex(
      //   (item) => item === param
      // );
      setSelectedItems((st) =>
        appState.colOrder[paramIndex + 1]
          ? [
              {
                ...st[0],
                param: appState.colOrder[paramIndex + 1],
              },
            ]
          : st
      );
      setSiState((siArr) => {
        const siArrMod = resetStatus3(siArr);
        if (siArrMod[i][appState.colOrder[paramIndex + 1]]) {
          siArrMod[i][appState.colOrder[paramIndex + 1]].status3 = 'selected';
          return siArrMod;
        } else {
          return siArr;
        }
      });
    } else if (e.code === 'ArrowLeft' && !appState.editableCell.param) {
      e.preventDefault();
      // const { i, param } = selectedItems[0];
      // const paramIndex = appState.colOrder.findIndex(
      //   (item) => item === param
      // );
      setSelectedItems((st) =>
        appState.colOrder[paramIndex - 1]
          ? [
              {
                ...st[0],
                param: appState.colOrder[paramIndex - 1],
              },
            ]
          : st
      );
      setSiState((siArr) => {
        const siArrMod = resetStatus3(siArr);
        if (siArrMod[i][appState.colOrder[paramIndex - 1]]) {
          siArrMod[i][appState.colOrder[paramIndex - 1]].status3 = 'selected';
          return siArrMod;
        } else {
          return siArr;
        }
      });
    } else if (e.code === 'ArrowUp' && !appState.editableCell.param) {
      setSelectedItems((st) => (i - 1 >= 0 ? [{ ...st[0], i: i - 1 }] : st));
      setSiState((siArr) => {
        const siArrMod = resetStatus3(siArr);
        if (siArrMod[i - 1]) {
          siArrMod[i - 1][param].status3 = 'selected';
          return siArrMod;
        } else {
          return siArr;
        }
      });
    } else if (
      e.code === 'ArrowDown' &&
      !e.shiftKey &&
      !appState.editableCell.param
    ) {
      setSelectedItems((st) =>
        siState[i + 1] ? [{ ...st[0], i: i + 1 }] : st
      );
      setSiState((siArr) => {
        const siArrMod = resetStatus3(siArr);
        if (siArrMod[i + 1]) {
          siArrMod[i + 1][param].status3 = 'selected';
          return siArrMod;
        } else {
          return siArr;
        }
      });
    } else if (
      e.code === 'ArrowDown' &&
      e.shiftKey &&
      !appState.editableCell.param
    ) {
      const lastI = selectedItems.at(-1)?.i || selectedItems[0].i;
      setSelectedItems((st) =>
        siState[lastI + 1] ? st.concat([{ ...st[0], i: lastI + 1 }]) : st
      );
      setSiState((siArr) => {
        const siArrMod = structuredClone(siArr);
        if (siArrMod[lastI + 1]) {
          siArrMod[lastI + 1][param].status3 = 'selected';
          return siArrMod;
        } else {
          return siArr;
        }
      });
    } else if (e.code === 'KeyQ') {
      setStatus2('correct');
    } else if (e.code === 'KeyW') {
      setStatus2('incorrect');
    } else if (e.code === 'KeyE') {
      setStatus2('');
    }

    if (
      [
        'gr',
        'numTiSop',
        // 'naimTiSop',
        // 'numSchSop',
        // 'tipSchSop',
        'kttSop',
        'ktnSop',
      ].includes(param)
    ) {
      if (e.key.match(/\d+/) || ['/', '-'].includes(e.key)) {
        console.log('match!');
        setSiState((siArr) => {
          siArrHistory.current.push(siArr);
          let siArrMod = [...siArr];
          selectedItems.forEach(({ i, param }) => {
            siArrMod[i][param].v += e.key || '';
          });
          return siArrMod;
        });
        setAppState({ ...appState, isSiStateSave: false });
      } else if (e.code === 'Backspace') {
        setSiState((siArr) => {
          let siArrMod = [...siArr];
          selectedItems.forEach(({ i, param }) => {
            siArrMod[i][param].v = siArrMod[i][param].v.slice(0, -1);
          });
          return siArrMod;
        });
        setAppState({ ...appState, isSiStateSave: false });
      } else if (e.key === 'Enter') {
        const { i, param } = selectedItems[0];
        if (
          ['kttSop', 'ktnSop'].includes(param) &&
          siState[i][param].v.indexOf('/') >= 0
        ) {
          const kttKtn = siState[i][param].v.split('/');
          const siArrMod = structuredClone(siState);
          siArrMod[i][param].v = String(Number(kttKtn[0]) / Number(kttKtn[1]));
          setSiState(siArrMod);
          setAppState({ ...appState, isSiStateSave: false });
        } else if (['naimTiSop', 'numSchSop', 'tipSchSop'].includes(param)) {
          console.log('!!!');
        }
      }
    }
  }

  function tdOnClick3(
    e: React.MouseEvent<HTMLElement>,
    i: number,
    param: TColShortNames
  ) {
    // if (e.ctrlKey && e.altKey) {
    //   setAppState({ ...appState, isSiStateSave: false });
    //   setSiState((siarr) => {
    //     let siarrMod = [...siarr];
    //     siarrMod[i][param].status2 = '';
    //     siarrMod[i][param].status = '';
    //     return siarrMod;
    //   });
    // } else if (e.ctrlKey) {
    //   setAppState({ ...appState, isSiStateSave: false });
    //   setSiState((siarr) => {
    //     let siarrMod = [...siarr];
    //     siarrMod[i][param].status2 = 'incorrect';
    //     siarrMod[i][param].status = 'warning';
    //     return siarrMod;
    //   });
    // } else if (e.altKey) {
    //   setAppState({ ...appState, isSiStateSave: false });
    //   setSiState((siarr) => {
    //     let siarrMod = [...siarr];
    //     siarrMod[i][param].status2 = 'correct';
    //     return siarrMod;
    //   });
    // }
    if (status2 !== null) {
      setAppState({ ...appState, isSiStateSave: false });
      setSiState((siarr) => {
        // let siarrMod = [...siarr];
        let siarrMod = structuredClone(siarr);
        siarrMod[i][param].status2 = status2;
        if (status2 === 'incorrect') {
          siarrMod[i][param].status = 'warning';
        } else {
          siarrMod[i][param].status = '';
        }
        return siarrMod;
      });
    }
    if (e.altKey) {
      // setAppState({ ...appState, isSiStateSave: false });
      setSiState((siarr) => {
        let siarrMod = [...siarr];
        siarrMod[i][param].status3 = 'selected';
        return siarrMod;
      });
      setSelectedItems((st) => {
        console.log({ i, param }, st, st.includes({ i, param }));
        if (st.some((item) => item.i === i && item.param === param)) {
          return st;
        } else {
          return st.concat({ i, param });
        }
      });
    }
    if (appState.isEdit2) {
      setSiState((siarr) => {
        let siarrMod = resetStatus3([...siarr]);

        siarrMod[i][param].status3 = 'selected';
        return siarrMod;
      });
      setSelectedItems([{ i, param }]);
    }
  }

  const saveSiData = async () => {
    if (appState.isEdit) {
      const tbody = document.getElementById('tbodyId1') as HTMLTableElement;

      let rows = tbody.rows;

      let indexRow = 0;
      siStateMod.current = structuredClone(siState);

      for (let row of rows) {
        const tds = row.getElementsByTagName('td');
        for (let td of tds) {
          if (
            (td.attributes.getNamedItem('colname')?.value === 'kttSop' ||
              td.attributes.getNamedItem('colname')?.value === 'ktnSop') &&
            td.textContent?.includes('/')
          ) {
            const kttKtn = td.textContent.split('/');
            td.textContent = String(Number(kttKtn[0]) / Number(kttKtn[1]));
          }
          if (
            td.attributes.getNamedItem('colname')!.value.indexOf('tipSch') >= 0
          ) {
            siStateMod.current[indexRow][
              td.attributes.getNamedItem('colname')!.value as TColShortNames
            ]['v'] = sameChar(td.textContent!.trim());
          } else {
            siStateMod.current[indexRow][
              td.attributes.getNamedItem('colname')!.value as TColShortNames
            ]['v'] = td.textContent!.trim();
          }
          siStateMod.current[indexRow][
            td.attributes.getNamedItem('colname')!.value as TColShortNames
          ]['status3'] = '';
        }

        indexRow++;
      }

      console.log('siStateMod.current', siStateMod.current);
      siStateMod.current = checkData(siStateMod.current);
      setSiState(siStateMod.current);
    } else if (appState.isEdit2) {
      siStateMod.current = resetStatus3(siState);
      siStateMod.current.forEach((siObj) => {
        if (siObj.kttSop.v.includes('/')) {
          const kttKtn = siObj.kttSop.v.split('/');
          siObj.kttSop.v = String(Number(kttKtn[0]) / Number(kttKtn[1]));
        }
        if (siObj.ktnSop.v.includes('/')) {
          const kttKtn = siObj.ktnSop.v.split('/');
          siObj.ktnSop.v = String(Number(kttKtn[0]) / Number(kttKtn[1]));
        }
      });
      setSiState(siStateMod.current);
      setSelectedItems([]);
      // console.log(siStateMod.current, resetStatus3(siStateMod.current));
    }
    console.log('sechID:', appState.sechID);
    try {
      if (!siStateMod.current[0]) {
        siStateMod.current = siState;
      }

      let res = await fetch(`/api/savesidata`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          siState: siStateMod.current,
          sechInfo,
          sechID: appState.sechID,
        }),
      });
      siStateMod.current = [];
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
    } finally {
      siArrHistory.current = [siState];
    }
  };

  function handleSwitch(e: ChangeEvent<HTMLInputElement>) {
    console.log();
    if (e.target.checked) {
      setAppState({
        ...appState,
        // colOrderOpt: 'opt2',
        colOrder: colOrderObj['opt2'],
      });
    } else {
      setAppState({
        ...appState,
        // colOrderOpt: 'opt1',
        colOrder: colOrderObj['opt1'],
      });
    }
  }

  const actions = [
    {
      icon: <IconSverka2 />,
      name: '',
      do: () => {
        // navigate(`sverka2?sechID=${appState.sechID}`);
        window.open(`monitoringsi/sverka2?sechID=${appState.sechID}`);
      },
    },
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
    {
      icon: <IconExpSv1 />,
      name: '',
      do: () => {
        console.log(siState);
        exportSv1Mod(siState);
      },
    },
  ];

  return (
    <div className={styles.App}>
      <table
        style={{
          minWidth: refTableWidth.current,
        }}
        onPaste={(e) => {
          if (e.clipboardData) {
            console.log(e.clipboardData.getData('text'), selectedItems);
            if (!selectedItems[0]) return;
            siArrHistory.current.push(siState);
            setSiState((siArr) => {
              let siArrMod = [...siArr];
              selectedItems.forEach(({ i, param }) => {
                siArrMod[i][param].v = e.clipboardData
                  ? e.clipboardData.getData('text')
                  : '';
              });
              return siArrMod;
            });
            setAppState({ ...appState, isSiStateSave: false });
          }
        }}
      >
        {/* <TableHead
          appState={appState}
          sortBy={sortBy}
          tableWidth={tableWidth}
          setTableWidth={setTableWidth}
        /> */}
        <thead id="thead1">
          <tr>
            {appState.colOrder.map((param, i) => {
              // {colOrderObj[appState.colOrderOpt].map((param, i) => {
              let classes =
                appState.isEdit &&
                (param.includes('Sop') ||
                  param.includes('SchSch') ||
                  param === 'gr')
                  ? styles.attention
                  : '';
              return (
                <th
                  className={classes}
                  onDoubleClick={() => {
                    sortBy(param);
                  }}
                  style={{
                    // width: colsWidthObj[param],
                    // minWidth: colsWidthInit[param],
                    width: refColsWidth.current[param],
                  }}
                  // ref={(el) => (thRefs.current[i] = el!)}
                  ref={(el) => (refThsObj.current[param] = el!)}
                >
                  {colFullName[param]}
                  <div
                    className={styles.resizer}
                    draggable={true}
                    onDragStart={(e) => onDragStartTh(e, i, param)}
                    // onMouseDown={(e) => onMouseDownRes(e, i)}
                    onDrag={(e) => onDragTh(e, i, param)}
                    onDragEnd={(e) => onDragEndTh(e, i, param)}
                  >
                    |
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody
          id="tbodyId1"
          onKeyDown={(e) => handleKeyDown(e)}
          onKeyUp={() => setStatus2(null)}
        >
          {siState.map((item, index) => {
            let tdContent = appState.colOrder.map((param) => {
              // let tdContent = colOrderObj[appState.colOrderOpt].map((param) => {
              let isContenteditable =
                appState.isEdit &&
                (param.includes('Sop') ||
                  param.includes('SchSch') ||
                  param === 'gr')
                  ? true
                  : false;
              let isContentEditable2 = false;
              // if (param === 'naimTiSop' && appState.isEdit2)
              //   isContentEditable2 = item[param].status4 || false;
              if (
                index === appState.editableCell.index &&
                param === appState.editableCell.param
              ) {
                isContentEditable2 = true;
              } else {
                isContentEditable2 = false;
              }
              return (
                <td
                  contentEditable={isContenteditable || isContentEditable2}
                  // key={param + item.id}
                  colname={param}
                  className={
                    styles[param] +
                    ' ' +
                    styles[item[param]?.status] +
                    ' ' +
                    styles[item[param]?.status2] +
                    ' ' +
                    styles[item[param]?.status3]
                    // +
                    // ' ' +
                    // styles[item[param]?.selected]
                  }
                  onClick={(e) => {
                    tdOnClick3(e, index, param);
                  }}
                  onDoubleClick={() => {
                    if (!appState.isEdit2) return;
                    if (
                      ['naimTiSop', 'numSchSop', 'tipSchSop'].includes(param)
                    ) {
                      console.log('dblClick');
                      // setSiState((siArr) =>  {
                      //   let siArrMod = structuredClone(siArr);
                      //   if (param === 'naimTiSop')
                      //     siArrMod[index][param].status4 = true;
                      //   return siArrMod;
                      // });
                      setAppState({
                        ...appState,
                        isSiStateSave: false,
                        editableCell: { index, param },
                      });
                    }
                  }}
                  onBlur={(e) => {
                    if (
                      index === appState.editableCell.index &&
                      param === appState.editableCell.param
                    ) {
                      siArrHistory.current.push(siState);
                    }
                    console.log(e.target.innerText);
                    setAppState({
                      ...appState,
                      editableCell: { index: null, param: null },
                    });
                    setSiState(
                      produce((draft) => {
                        draft[index][param].v = e.target.innerText.trim();
                      })
                    );
                  }}
                  tabIndex={0}
                >
                  {item[param]?.v}
                </td>
              );
            });
            return <tr key={String(item.id)}>{tdContent}</tr>;
          })}
        </tbody>
      </table>
      {/* <div id="control-panel" className={styles.dpnone}> */}
      {/* <div>{appState.naimSechShort}</div> */}
      {/* <button
          onClick={() =>
            setAppState({
              ...appState,
              isEdit: !appState.isEdit,
              isSiStateSave: !appState.isSiStateSave,
            })
          }
          // className={appState.classEditBtn}
          ref={btnEdit}
        >
          ред-ть
        </button> */}

      {/* <button
          onClick={saveSiData}
          className={appState.isSiStateSave ? '' : styles.attention}
        >
          сохранить изм-я
        </button> */}

      {/* <button
          ref={btnExportSv1}
          onClick={() => {
            console.log(siState);
            exportSv1Mod(siState);
          }}
          className={styles.dpnone}
        >
          экспорт св-1
        </button> */}
      {/* </div> */}
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Switch color="default" onChange={handleSwitch} />
          <Typography variant="h6" sx={{ mr: 5 }}>
            {appState.naimSechShort}
          </Typography>
          <FileDropZone
            siState={siState}
            setSiState={setSiState}
            setAppState={setAppState}
            setSechInfo={setSechInfo}
            only82xml={false}
          />
          <Tips />
          {isLoggedin ? (
            <AccountCircleIcon
              fontSize="large"
              sx={{ mr: 1 }}
              // color="secondary"
            />
          ) : (
            <Button
              color="secondary"
              variant="contained"
              sx={{ mr: 2 }}
              onClick={() => {
                setLoginDialogIsOpen(true);
              }}
            >
              login
            </Button>
          )}
          <ButtonGroup>
            <Button
              variant="contained"
              disabled={!isLoggedin}
              color={appState.isEdit2 ? 'warning' : 'primary'}
              sx={{ width: 80 }}
              onClick={() => {
                if (!appState.isEdit2) {
                  siArrHistory.current = [siState];
                }
                setAppState((st) => ({ ...st, isEdit2: !st.isEdit2 }));
              }}
            >
              {/* isEdit {String(appState.isEdit2)} */}
              {!appState.isEdit2 ? 'read' : 'edit'}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              disabled={siArrHistory.current.length < 2}
              onClick={(e) => {
                // const prevIndex = siArrHistory.current.length - 2;
                if (siArrHistory.current.length - 2 >= 0) {
                  setSiState(
                    siArrHistory.current[siArrHistory.current.length - 2]
                  );
                  siArrHistory.current.pop();
                }
              }}
            >
              <UndoIcon />
            </Button>
            <Button
              variant="contained"
              color="error"
              disabled={appState.isSiStateSave}
              onClick={saveSiData}
            >
              <SaveIcon />
            </Button>
          </ButtonGroup>

          <SpeedDialNav
            actions={actions}
            // btnExportSv1={btnExportSv1}
            // inputFileSv2={inputFileSv2}
            // btnEdit={btnEdit}
            // siState={siState}
            // appState={appState}
            // setAppState={setAppState}
          />
        </Toolbar>
      </AppBar>
      {/* <SaveBtn appState={appState} onClick={saveSiData} /> */}
      {/* <Snackbar
        open={!appState.isSiStateSave}
        ContentProps={{
          sx: {
            background: '#ff8c00',
          },
        }}
        message="Режим редактирования"
        action={
          <Button
            color="error"
            size="small"
            onClick={saveSiData}
            variant="contained"
            sx={{ paddingTop: '8px' }}
          >
            Сохранить
          </Button>
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      /> */}
      {/* <Snackbar
        open={appState.isMsgOpen}
        autoHideDuration={3000}
        onClose={() => {
          setAppState((st) => ({ ...st, isMsgOpen: false }));
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          elevation={6}
          variant="filled"
          severity={appState.isSuccess ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {appState.isSuccess
            ? 'Данные успешно сохранены.'
            : 'Ошибка, изменения НЕ сохранены!'}
        </Alert>
      </Snackbar> */}
      <AlertSucErr appState={appState} setAppState={setAppState} />
      <Dialog
        open={appState.isInfoOpen}
        onClose={() => {
          setAppState({ ...appState, isInfoOpen: false });
        }}
        maxWidth={'md'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {appState.naimSechShort}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            80000xml area: {sechInfo?.areaCode}
          </DialogContentText>
          <DialogContentText>
            80000xml name: {sechInfo?.areaName}
          </DialogContentText>
          <DialogContentText>60000xml: {sechInfo?.source60}</DialogContentText>
          <DialogContentText>БД: {sechInfo?.sourceDB}</DialogContentText>
          <DialogContentText>Кол-во ТИ: {sechInfo?.amountTi}</DialogContentText>
          <DialogContentText>ОТ: {'asdfasdfasdfs'}</DialogContentText>
          <DialogContentText>СОП: {'asdfasdfasdfs'}</DialogContentText>
          <DialogContentText>Сверка-1: {'asdfasdfasdfs'}</DialogContentText>
          <DialogContentText>Сверка-2: {'asdfasdfasdfs'}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setAppState({ ...appState, isInfoOpen: false });
            }}
            // autoFocus
          >
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={loginDialogIsOpen}
        onClose={() => {
          setLoginDialogIsOpen(false);
        }}
      >
        <DialogTitle>Авторизация</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="login"
            label="login"
            type="text"
            // fullWidth
            variant="standard"
            sx={{ marginRight: 5 }}
            value={loginPassword.username}
            onChange={(e) => {
              setLoginPassword((st) => ({ ...st, username: e.target.value }));
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="password"
            type="password"
            // fullWidth
            variant="standard"
            value={loginPassword.password}
            onChange={(e) => {
              setLoginPassword((st) => ({ ...st, password: e.target.value }));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setLoginDialogIsOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setLoginDialogIsOpen(false);
              fetch('/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(loginPassword),
              }).then((res) => {
                console.log(document.cookie);
                if (document.cookie) {
                  setIsLoggedin(true);
                }
              });
            }}
          >
            login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
