import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MonitoringSi } from './pages/MonitoringSi';
import { Sverka2 } from './pages/Sverka2';
import { IAppState, IResReadSiData1, ISechInfo, ISiObj1 } from './app.types';
import { colOrderObj } from './lib/constants';
import { checkData } from './lib/checkDataMod';
import { nanoid } from 'nanoid';
import { Planrabot } from './pages/Planrabot';
import { TextEditor } from './TextEditor';
import useSWR from 'swr';

// const fetcher = (url: string) => fetch(url).then((res) => res.json());
// let url1 = new URL(document.URL);

// const fetcherPost = (url: string) =>
//   fetch(url, {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       id: new URL(document.URL).searchParams.get('sechID'),
//     }),
//   }).then((res) => res.json());

function App() {
  const [siState, setSiState] = useState<ISiObj1[]>([]);
  const [appState, setAppState] = useState<IAppState>({
    // selectedCell: {},
    // colOrderOpt: 'opt1',
    colOrder: colOrderObj.opt1,
    // colOrderPlanRab: colOrderPlanRabObj.opt1,
    sechID: '',
    naimSechShort: '',
    isEdit: false,
    isEdit2: false,
    // classSSDBtn: '',
    // classEditBtn: '',
    isSiStateSave: true,
    isMsgOpen: false,
    isSuccess: true,
    isInfoOpen: false,
    editableCell: { index: null, param: null },
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

  // const {
  //   data,
  //   error,
  //   isLoading,
  // }: { data: IResReadSiData1; error: boolean | undefined; isLoading: boolean } =
  //   useSWR('/api/readsidata', fetcherPost, {
  //     // revalidateOnFocus: false,
  //     // revalidateOnMount: false,
  //     // revalidateOnReconnect: false,
  //     // refreshWhenOffline: false,
  //     // refreshWhenHidden: false,
  //     // refreshInterval: 10000,
  //   });

  // if (error) {
  //   console.log('An error has occurred.');
  // }
  // if (isLoading) {
  //   console.log('Loading...');
  // }

  // useEffect(() => {
  //   if (data !== undefined) {
  //     data.si = checkData(data.si);
  //     data.si.map((item) => (item.id ? item : { ...item, id: nanoid() }));
  //     setSiState(data.si);
  //     if (data.sechInfo) {
  //       setSechInfo(data.sechInfo);
  //     }
  //     document.title = data.naimSechShort || 'noName';
  //   }
  // }, [data]);

  // useEffect(() => {
  //   (async () => {
  //     console.log(document.URL, window.location.search);
  //     let url = new URL(document.URL);

  //     const naimSechShort =
  //       url.searchParams.get('naimsechshort') ?? 'defaultNaimSech';
  //     // document.title = naimSechShort;

  //     const sechID = url.searchParams.get('sechID') ?? 'defaultSechID';
  //     setAppState({
  //       ...appState,
  //       sechID,
  //       // naimSechShort,
  //     });
  //   })();
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/monitoringsi"
          element={
            <MonitoringSi
              // siState={siState}
              // setSiState={setSiState}
              appState={appState}
              setAppState={setAppState}
              // sechInfo={sechInfo}
              // setSechInfo={setSechInfo}
            />
          }
        />
        <Route
          path="/monitoringsi/sverka2"
          element={
            <Sverka2
              // siState={siState}
              // setSiState={setSiState}
              appState={appState}
              setAppState={setAppState}
              // sechInfo={sechInfo}
              // setSechInfo={setSechInfo}
            />
          }
        />
        <Route path="/planrabot" element={<Planrabot />} />
        <Route path="/texteditor" element={<TextEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
