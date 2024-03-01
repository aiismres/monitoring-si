import React, { useState } from 'react';
import styles from './metrology.module.css';
import { useOtData } from '../../hooks/useOtData';
import {
  AppBar,
  Button,
  ButtonGroup,
  Toolbar,
  Typography,
} from '@mui/material';
import { SpeedDialNav } from '../../components/SpeedDialNav';
import { ReactComponent as IconEdit } from '../../Icons/IconEdit.svg';
import { ReactComponent as IconDelOt } from '../../Icons/IconDelOt.svg';
import { ReactComponent as IconDel } from '../../Icons/IconDel.svg';
import dayjs from 'dayjs';
import { useSechData } from '../../hooks/useSechData';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { OtItem } from '../../components/forMetrologyPage/OtItem';
import UndoIcon from '@mui/icons-material/Undo';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { Ot } from '../../app.types';
import EditIcon from '@mui/icons-material/Edit';
import { EditOtDialog } from '../../components/forMetrologyPage/EditOtDialog';

export type PageState = {
  editMode: boolean;
  selectedOt: Ot | null;
  // selectedOtId: string | null;
  isEditOtDialogOpen: boolean;
};

const otHistory: Ot[][] = [];

export function Metrology() {
  const [data, isLoading, error, otArr, setOtArr] = useOtData();
  const [sechArr, setSechArr] = useSechData();
  const [pageState, setPageState] = useState<PageState>({
    editMode: false,
    selectedOt: null,
    // selectedOtId: null,
    isEditOtDialogOpen: false,
  });

  const actions = [
    {
      icon: <IconDelOt />,
      name: '',
      do: () => {},
    },

    {
      icon: <IconEdit />,
      name: '',
      do: () => {
        setPageState((st) => ({ ...st, editMode: true }));
      },
    },
  ];

  if (isLoading) {
    return <p>isLoading...</p>;
  }

  return (
    <>
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
            <th>id</th>
          </tr>
        </thead>
        <tbody>
          {otArr?.map((ot) => (
            <OtItem
              key={ot._id}
              ot={ot}
              pageState={pageState}
              setPageState={setPageState}
              sechArr={sechArr}
            />
          ))}
        </tbody>
      </table>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          {/* <Typography variant="h6" sx={{ mr: 5 }}>
            {appState.naimSechShort}
          </Typography> */}
          {pageState.editMode && (
            <ButtonGroup sx={{ margin: '0 auto' }}>
              <Button
                variant="contained"
                onClick={() => {
                  setPageState((st) => ({ ...st, editMode: false }));
                }}
              >
                отмена
              </Button>
              <Button
                variant="contained"
                disabled={!pageState.selectedOt}
                color="error"
                onClick={() => {
                  otHistory.push(otArr);
                  setOtArr((st) =>
                    st.filter((ot) => ot._id !== pageState.selectedOt?._id)
                  );
                }}
              >
                <DeleteIcon />
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disabled={!pageState.selectedOt}
                onClick={() => {
                  setPageState((st) => ({ ...st, isEditOtDialogOpen: true }));
                }}
              >
                <EditIcon />
              </Button>
              {/* <Button
                variant="contained"
                color="secondary"
                disabled={otHistory.length < 1}
                onClick={(e) => {
                  if (otHistory.length > 0) {
                    setOtArr(otHistory[otHistory.length - 1]);
                    otHistory.pop();
                  }
                }}
              >
                <UndoIcon />
              </Button>
              <Button
                variant="contained"
                color="error"
                disabled={otHistory.length < 1}
              >
                <SaveIcon />
              </Button> */}
            </ButtonGroup>
          )}
          <SpeedDialNav actions={actions} />
        </Toolbar>
      </AppBar>
      <EditOtDialog pageState={pageState} setPageState={setPageState} />
    </>
  );
}
