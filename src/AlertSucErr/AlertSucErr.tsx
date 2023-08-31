import React, { Dispatch, SetStateAction } from 'react';
import styles from './alertsucerr.css';
import { IAppState } from '../app.types';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export function AlertSucErr({
  appState,
  setAppState,
}: {
  appState: IAppState;
  setAppState: Dispatch<SetStateAction<IAppState>>;
}) {
  return (
    <Snackbar
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
        {/* <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}> */}
        {appState.isSuccess
          ? 'Данные успешно сохранены.'
          : 'Ошибка, изменения НЕ сохранены!'}
      </Alert>
    </Snackbar>
  );
}
