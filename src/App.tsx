import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  useLayoutEffect,
} from 'react';
import styles from './app.module.css';
import { TableHead } from './TableHead';
import {
  IColsWidth,
  colOrderObj,
  colsWidthInit,
  sameChar,
  colFullName,
} from './modules/constants';
import {
  IAppState,
  IPowProf82,
  // IResReadSiData,
  IResReadSiData1,
  ISechInfo,
  ISiObj1,
  IStringHtml,
  TColShortNames,
  // ISiObj2,
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
import { SpeedDialNav } from './SpeedDialNav';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  buttonBaseClasses,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useAppStore } from './store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MonitoringSi } from './MonitoringSi';
import { Sverka2 } from './Sverka2';

// типизация для работы с кастомными атрибутами html тегов (я добавляю тег colname)
// declare module 'react' {
//   interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
//     colname?: string;
//   }
// }

function App() {
  return (
    <>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/monitoringsi" element={<MonitoringSi />} />
            <Route path="/monitoringsi/sverka2" element={<Sverka2 />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
