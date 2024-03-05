import React from 'react';
import styles from './editotdialog.css';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { PageState } from '../../../pages/Metrology';
import { SechData } from '../../../app.types';
import { OtItem } from '../OtItem';
import { OtTableHead } from '../OtTableHead';
import { OtEditItem } from '../OtEditItem';

type Props = {
  pageState: PageState;
  setPageState: React.Dispatch<React.SetStateAction<PageState>>;
  sechArr: SechData[];
};
export function EditOtDialog({ pageState, setPageState, sechArr }: Props) {
  const { selectedOt } = pageState;
  function handleClose() {
    setPageState((st) => ({ ...st, isEditOtDialogOpen: false }));
  }

  return (
    <Dialog
      open={pageState.isEditOtDialogOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={'xl'}
      // fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title">
        {'Редактирование ' +
          selectedOt?.naimAiis1 +
          ' ' +
          selectedOt?.naimAiis2 +
          ' № ' +
          selectedOt?.gr}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ paddingTop: 1 }}>
          <table>
            <OtTableHead />

            <tbody>
              <OtEditItem
                key={selectedOt?._id}
                selectedOt={selectedOt!}
                pageState={pageState}
                setPageState={setPageState}
                sechArr={sechArr}
              />
            </tbody>
          </table>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} autoFocus>
          save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
