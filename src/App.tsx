import React, { useState, useEffect, useRef } from 'react';
import styles from './app.module.css';
import { TableHead } from './TableHead';
import { colOrderObj } from './modules/constants';
import { IAppState, IResReadSiData, ISechInfo, ISiData } from './app.types';
import { checkData } from './modules/checkDataMod';
import produce from 'immer';

function App() {
  const [siState, setSiState] = useState<ISiData[]>([]);
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
  const siStateMod = useRef(null);

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
      let resJson: IResReadSiData = await res.json();
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
    setSiState((state: ISiData[]) => {
      let stateMod = structuredClone(state);
      stateMod = stateMod.sort((a: ISiData, b: ISiData) => {
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
      </table>
    </div>
  );
}

export default App;
