import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  useLayoutEffect,
  Dispatch,
  SetStateAction,
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Tooltip,
  buttonBaseClasses,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { useAppStore } from '../store';
import { ReactComponent as IconExpSv1 } from '../Icons/IconExpSv1.svg';
import { ReactComponent as IconEdit } from '../Icons/IconEdit.svg';
import { ReactComponent as IconInfo } from '../Icons/IconInfo.svg';
import { ReactComponent as IconSverka2 } from '../Icons/IconSverka2.svg';
import { useNavigate } from 'react-router-dom';
import { SaveBtn } from '../SaveBtn';
import { AlertSucErr } from '../AlertSucErr';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Tips } from '../Tips';
// типизация для работы с кастомными атрибутами html тегов (я добавляю тег colname)
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    colname?: string;
  }
}

interface IProps {
  siState: ISiObj1[];
  setSiState: Dispatch<SetStateAction<ISiObj1[]>>;
  appState: IAppState;
  setAppState: Dispatch<SetStateAction<IAppState>>;
  sechInfo: ISechInfo;
  setSechInfo: Dispatch<SetStateAction<ISechInfo>>;
}

export function MonitoringSi({
  siState,
  setSiState,
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
  const navigate = useNavigate();

  const [tableWidth, setTableWidth] = useState<number>(0);

  const btnExportSv1 = useRef(null);
  const btnEdit = useRef(null);
  const siStateMod = useRef<ISiObj1[]>([]);

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      console.log(e.key);
    });
    document.addEventListener('mousedown', (e) => {
      e.preventDefault();
      console.log(e.type);
    });
  }, []);

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

  function sortBy(param: string) {
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

  function tdOnClick3(
    e: React.MouseEvent<HTMLElement>,
    i: number,
    param: string
  ) {
    if (e.ctrlKey && e.altKey) {
      setAppState({ ...appState, isSiStateSave: false });
      setSiState((siarr) => {
        let siarrMod = [...siarr];
        siarrMod[i][param].status2 = '';
        siarrMod[i][param].status = '';
        // siarrMod[i]?[param as keyof ISiObj1].status2 = '';
        return siarrMod;
      });
    } else if (e.ctrlKey) {
      setAppState({ ...appState, isSiStateSave: false });
      setSiState((siarr) => {
        let siarrMod = [...siarr];
        siarrMod[i][param].status2 = 'incorrect';
        siarrMod[i][param].status = 'warning';
        return siarrMod;
      });
    } else if (e.altKey) {
      setAppState({ ...appState, isSiStateSave: false });
      setSiState((siarr) => {
        let siarrMod = [...siarr];
        siarrMod[i][param].status2 = 'correct';
        return siarrMod;
      });
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
              td.attributes.getNamedItem('colname')!.value
            ]['v'] = sameChar(td.textContent!.trim());
          } else {
            siStateMod.current[indexRow][
              td.attributes.getNamedItem('colname')!.value
            ]['v'] = td.textContent!.trim();
          }
          siStateMod.current[indexRow][
            td.attributes.getNamedItem('colname')!.value
          ]['status3'] = '';
        }

        indexRow++;
      }

      console.log('siStateMod.current', siStateMod.current);
      siStateMod.current = checkData(siStateMod.current);
      setSiState(siStateMod.current);
    }

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
        navigate(`sverka2?sechID=${appState.sechID}`);
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
      // do: null,
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
        <tbody id="tbodyId1">
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
              return (
                <td
                  contentEditable={isContenteditable}
                  key={param + item.id}
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
                >
                  {item[param]?.v}
                </td>
              );
            });
            return <tr key={nanoid()}>{tdContent}</tr>;
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
      <SaveBtn appState={appState} onClick={saveSiData} />
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
    </div>
  );
}
