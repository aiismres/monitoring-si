import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import styles from './app.module.css';
import { TableHead } from './TableHead';
import { colOrderObj, sameChar } from './modules/constants';
import {
  IAppState,
  IResReadSiData,
  IResReadSiData1,
  ISechInfo,
  ISiObj1,
  ISiObj2,
} from './app.types';
import { checkData } from './modules/checkDataMod';
import produce from 'immer';
import { nanoid } from 'nanoid';
import { exportSv1Mod } from './modules/exportSv1Mod';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { FileDropZone } from './FileDropZone';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    colname?: string;
  }
}

function App() {
  const [siState, setSiState] = useState<ISiObj1[]>([]);
  const [appState, setAppState] = useState<IAppState>({
    // selectedCell: {},
    colOrderOpt: 'opt1',
    colOrder: colOrderObj.opt1,
    sechID: '',
    naimSechShort: '',
    isEdit: false,
    classSSDBtn: '',
    classEditBtn: '',
    isSiStateSave: true,
    isMsgOpen: false,
    isSuccess: true,
    isInfoOpen: false,
  });
  const [sechInfo, setSechInfo] = useState<ISechInfo>({
    sechID: '',
    naimSechShort: '',
    areaCode: '',
    areaName: '',
    sourceDB: '',
    source60: '',
    amountTi: 0,
  });
  const [tableWidth, setTableWidth] = useState<number>(0);

  const btnExportSv1 = useRef(null);
  const btnEdit = useRef(null);
  const siStateMod = useRef<ISiObj1[]>([]);

  useEffect(() => {
    if (appState.isSiStateSave) {
      setAppState({ ...appState, classSSDBtn: '' });
    } else {
      setAppState({ ...appState, classSSDBtn: 'attention' });
    }
  }, [appState.isSiStateSave]);

  useEffect(() => {
    (async () => {
      console.log(document.URL, window.location.search);
      let url = new URL(document.URL);

      const naimSechShort =
        url.searchParams.get('naimsechshort') ?? 'defaultNaimSech';
      document.title = naimSechShort;

      const sechID = url.searchParams.get('sechID') ?? 'defaultSechID';
      setAppState({
        ...appState,
        sechID,
        naimSechShort,
      });

      let res = await fetch('/api/readsidata', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: url.searchParams.get('sechID') }),
      });
      let resJson: IResReadSiData1 = await res.json();
      console.log('res /api/readsidata', resJson);

      resJson.si = checkData(resJson.si);
      setSiState(resJson.si);
      if (resJson.sechInfo) {
        setSechInfo(resJson.sechInfo);
      }
    })();
  }, []);

  function sortBy(param: string) {
    console.log(siState, param);
    setSiState((state: ISiObj1[]) => {
      let stateMod = structuredClone(state);
      stateMod = stateMod.sort((a: ISiObj1, b: ISiObj1) => {
        // console.log(a);
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
      if (!siStateMod.current) {
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
        colOrderOpt: 'opt2',
        colOrder: colOrderObj['opt2'],
      });
    } else {
      setAppState({
        ...appState,
        colOrderOpt: 'opt1',
        colOrder: colOrderObj['opt1'],
      });
    }
  }

  return (
    <div className={styles.App}>
      <table
        style={{
          width: tableWidth,
        }}
      >
        <TableHead
          appState={appState}
          sortBy={sortBy}
          tableWidth={tableWidth}
          setTableWidth={setTableWidth}
        />
        <tbody id="tbodyId1">
          {siState.map((item, index) => {
            let tdContent = appState.colOrder.map((param) => {
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
                    styles[item[param]?.status3] +
                    ' ' +
                    styles[item[param]?.selected]
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
      <div id="control-panel" className={styles.dpnone}>
        <div>{appState.naimSechShort}</div>
        <button
          onClick={() =>
            setAppState({
              ...appState,
              isEdit: !appState.isEdit,
              isSiStateSave: !appState.isSiStateSave,
            })
          }
          className={appState.classEditBtn}
          ref={btnEdit}
        >
          ред-ть
        </button>

        <button
          onClick={saveSiData}
          className={appState.isSiStateSave ? '' : styles.attention}
        >
          сохранить изм-я
        </button>

        <button
          ref={btnExportSv1}
          onClick={() => {
            console.log(siState);
            exportSv1Mod(siState);
          }}
          className={styles.dpnone}
        >
          экспорт св-1
        </button>
      </div>
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
          />
          {/* <SpeedDialNav
            inputFileSv2={inputFileSv2}
            btnExportSv1={btnExportSv1}
            btnEdit={btnEdit}
            appState={appState}
            setAppState={setAppState}
          /> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default App;
