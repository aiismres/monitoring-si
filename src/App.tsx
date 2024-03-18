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
import { LoginDialog } from './components/LoginDialog';

// dayjs.locale(dayjs_ru);
// dayjs.extend(updateLocale);
// dayjs.updateLocale('en', {
//   weekStart: 1,
// });

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
    isSuccess: null,
    isInfoOpen: false,
    editableCell: { index: null, param: null },
    isLoggedin: false,
    isLoginDialogOpen: false,
    loginPassword: { username: '', password: '' },
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
          <Route
            path="/planrabot/:company?"
            element={
              <Planrabot appState={appState} setAppState={setAppState} />
            }
          />
          <Route path="/texteditor" element={<TextEditor />} />
          <Route
            path="/metrology"
            element={
              <Metrology appState={appState} setAppState={setAppState} />
            }
          />
        </Routes>
      </BrowserRouter>
      <LoginDialog appState={appState} setAppState={setAppState} />
    </LocalizationProvider>
  );
}

export default App;
