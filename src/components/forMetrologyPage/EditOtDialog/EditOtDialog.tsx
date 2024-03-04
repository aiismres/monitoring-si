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
          {/* <TextField
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
          </FormControl> */}
          <table>
            <OtTableHead />

            {/* <thead>
              <tr>
                <th>ГР</th>
                <th>Наим 1</th>
                <th>Наим 2</th>
                <th>СД СОП</th>
                <th>изм</th>
                <th>тип изм</th>
                <th>Необх раб</th>
                <th>раб заплан</th>
                <th>Договор</th>
                <th>Выезд</th>
                <th>ВНИИМС</th>
                <th>РСТ</th>
                <th>Приказ</th>
                <th>Оформ СОП</th>
                <th>id</th>
              </tr>
            </thead> */}
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} autoFocus>
          save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
