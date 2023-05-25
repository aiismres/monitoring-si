import React, { Dispatch, SetStateAction } from 'react';
import styles from './savebtn.css';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import { IAppState, ISiObj1 } from '../app.types';

export function SaveBtn({
  appState,
  onClick,
}: {
  appState: IAppState;
  onClick: () => void;
}) {
  return (
    <Snackbar
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
          onClick={onClick}
          variant="contained"
          sx={{ paddingTop: '8px' }}
        >
          Сохранить
        </Button>
      }
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    />
  );
}
