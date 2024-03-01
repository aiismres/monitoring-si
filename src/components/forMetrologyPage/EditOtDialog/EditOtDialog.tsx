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

type Props = {
  pageState: PageState;
  setPageState: React.Dispatch<React.SetStateAction<PageState>>;
};
export function EditOtDialog({ pageState, setPageState }: Props) {
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
      maxWidth={'lg'}
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
          <TextField
            type="text"
            variant="outlined"
            defaultValue={selectedOt?.gr}
          />
          <TextField
            type="text"
            variant="outlined"
            defaultValue={selectedOt?.naimAiis1}
          />

          <TextField
            type="text"
            variant="outlined"
            label="Наим. АИИС 2"
            defaultValue={selectedOt?.naimAiis2}
          />
          <FormControl sx={{ width: '100px' }}>
            <InputLabel id="izmAiis-select-label">изм. аиис</InputLabel>
            <Select
              labelId="izmAiis-select-label"
              id="demo-simple-select"
              label="изм. аиис"
              defaultValue={selectedOt?.izmAiis}
            >
              <MenuItem value={'да'}>да</MenuItem>
              <MenuItem value={'нет'}>нет</MenuItem>
            </Select>
          </FormControl>
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
