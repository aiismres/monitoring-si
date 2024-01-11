import React, { Dispatch, SetStateAction } from 'react';
import styles from './infodialog.css';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { IAppState, ISechInfo } from '../../app.types';

interface Props {
  appState: IAppState;
  setAppState: Dispatch<SetStateAction<IAppState>>;
  sechInfo: ISechInfo;
}

export function InfoDialog({ appState, setAppState, sechInfo }: Props) {
  return (
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
  );
}
