import React from 'react';
import styles from './deleteotdialog.css';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { PageState } from '../../../pages/Metrology';
import { OtTableHead } from '../OtTableHead';
import { OtItem } from '../OtItem';
import { SechData } from '../../../app.types';
import { useSWRConfig } from 'swr';

type Props = {
  pageState: PageState;
  setPageState: React.Dispatch<React.SetStateAction<PageState>>;
  sechArr: SechData[];
};

export function DeleteOtDialog({ pageState, setPageState, sechArr }: Props) {
  const { mutate } = useSWRConfig();
  const { selectedOt } = pageState;

  function handleClose() {
    setPageState((st) => ({ ...st, isDeleteOtDialogOpen: false }));
  }
  return (
    <Dialog
      open={pageState.isDeleteOtDialogOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={'xl'}
    >
      <DialogTitle id="alert-dialog-title">
        {'Удалить ' +
          selectedOt?.naimAiis1 +
          ' ' +
          selectedOt?.naimAiis2 +
          ' № ' +
          selectedOt?.gr +
          ' ?'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ paddingTop: 1 }}>
          <table>
            <OtTableHead />

            <tbody>
              <OtItem
                key={selectedOt?._id}
                ot={selectedOt!}
                pageState={pageState}
                setPageState={setPageState}
                sechArr={sechArr}
              />
            </tbody>
          </table>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" autoFocus onClick={handleClose}>
          отмена
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={async () => {
            handleClose();
            let x6 = await fetch(`/api/delot`, {
              method: 'delete',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(selectedOt),
            });
            console.log('x6', x6);
            mutate('/api/readot');
          }}
        >
          да, удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
