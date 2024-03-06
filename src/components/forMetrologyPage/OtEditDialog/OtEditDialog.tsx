import React, { useState } from 'react';
import styles from './oteditdialog.module.css';
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
import { Ot, SechData } from '../../../app.types';
import { OtItem } from '../OtItem';
import { OtTableHead } from '../OtTableHead';
import { OtEditItem } from '../OtEditItem';
import { updOt } from '../../../api/updOt';
import { useSWRConfig } from 'swr';

type Props = {
  pageState: PageState;
  setPageState: React.Dispatch<React.SetStateAction<PageState>>;
  // sechArr: SechData[];
};
export function OtEditDialog({ pageState, setPageState }: Props) {
  const { mutate } = useSWRConfig();
  // const [ot, setOt] = useState<Ot>(pageState.selectedOt!);
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
      // maxWidth={'xl'}
      // fullWidth={true}
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: '1900px', // Set your width here
          },
        },
      }}
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
          <table className={styles.table}>
            <thead>
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
              </tr>
            </thead>

            <tbody>
              {pageState.selectedOt && (
                <OtEditItem
                  key={pageState.selectedOt._id}
                  // selectedOt={selectedOt!}
                  pageState={pageState}
                  setPageState={setPageState}
                  // sechArr={sechArr}
                  // ot={ot}
                  // setOt={setOt}
                />
              )}
            </tbody>
          </table>
        </Box>
      </DialogContent>
      <DialogActions sx={{ mr: 1, mb: 1 }}>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={async () => {
            await updOt(pageState.selectedOt);
            mutate('/api/readot');
            handleClose();
          }}
          autoFocus
        >
          save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
