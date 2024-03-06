import React, { useEffect, useState } from 'react';
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
import { IAppState, Ot } from '../../app.types';
import EditIcon from '@mui/icons-material/Edit';
import { OtEditDialog } from '../../components/forMetrologyPage/OtEditDialog';
import { OtTableHead } from '../../components/forMetrologyPage/OtTableHead';
import { DeleteOtDialog } from '../../components/forMetrologyPage/DeleteOtDialog';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export type PageState = {
  editMode: boolean;
  selectedOt: Ot | null;
  // selectedOtId: string | null;
  isEditOtDialogOpen: boolean;
  isDeleteOtDialogOpen: boolean;
};

type Props = {
  appState: IAppState;
  setAppState: React.Dispatch<React.SetStateAction<IAppState>>;
};

const otHistory: Ot[][] = [];

export function Metrology({ appState, setAppState }: Props) {
  const [data, isLoading, error, otArr, setOtArr] = useOtData();
  const [sechArr, setSechArr] = useSechData();
  const [pageState, setPageState] = useState<PageState>({
    editMode: false,
    selectedOt: null,
    // selectedOtId: null,
    isEditOtDialogOpen: false,
    isDeleteOtDialogOpen: false,
  });

  useEffect(() => {
    document.title = 'ОТ Мониторинг';
  }, []);

  const actions = [
    // {
    //   icon: <IconDelOt />,
    //   name: '',
    //   do: () => {},
    // },

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
        <OtTableHead />
        <tbody>
          {data?.map((ot) => (
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
          {appState.isLoggedin ? (
            <AccountCircleIcon
              fontSize="large"
              sx={{ mr: 1 }}
              // color="secondary"
            />
          ) : (
            <Button
              color="inherit"
              // variant="outlined"
              sx={{ mr: 2 }}
              onClick={() => {
                setAppState((st) => ({ ...st, isLoginDialogOpen: true }));
              }}
            >
              login
            </Button>
          )}
          {pageState.editMode && appState.isLoggedin && (
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
                disabled={
                  !pageState.selectedOt ||
                  sechArr.some((sech) =>
                    sech.metrology.includes(pageState.selectedOt?._id || '')
                  )
                }
                color="error"
                onClick={() => {
                  // otHistory.push(otArr);
                  // setOtArr((st) =>
                  //   st.filter((ot) => ot._id !== pageState.selectedOt?._id)
                  // );
                  setPageState((st) => ({ ...st, isDeleteOtDialogOpen: true }));
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
            </ButtonGroup>
          )}
          <SpeedDialNav actions={actions} />
        </Toolbar>
      </AppBar>
      {pageState.selectedOt && (
        <OtEditDialog
          pageState={pageState}
          setPageState={setPageState}
          sechArr={sechArr}
        />
      )}
      <DeleteOtDialog
        pageState={pageState}
        setPageState={setPageState}
        sechArr={sechArr}
      />
    </>
  );
}
