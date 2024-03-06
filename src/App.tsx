import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MonitoringSi } from './pages/MonitoringSi';
import { Sverka2 } from './pages/Sverka2';
import { IAppState, IResReadSiData1, ISechInfo, ISiObj1 } from './app.types';
import { colOrderObj } from './lib/constants';
import { checkData } from './lib/checkDataMod';
import { nanoid } from 'nanoid';
import { Planrabot } from './pages/Planrabot';
import { TextEditor } from './components/TextEditor';
import { Metrology } from './pages/Metrology';
import useSWR from 'swr';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
// import dayjs_ru from 'dayjs/locale/ru';
import 'dayjs/locale/ru';
import updateLocale from 'dayjs/plugin/updateLocale';

// dayjs.locale(dayjs_ru);
// dayjs.extend(updateLocale);
// dayjs.updateLocale('en', {
//   weekStart: 1,
// });

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
    isLoggedin: false,
  });

  useEffect(() => {
    let cookie = document.cookie;
    console.log(cookie);
    if (cookie) {
      setAppState((st) => ({ ...st, isLoggedin: true }));
    }
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
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
          <Route path="/planrabot/:company?" element={<Planrabot />} />
          <Route path="/texteditor" element={<TextEditor />} />
          <Route path="/metrology" element={<Metrology />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
