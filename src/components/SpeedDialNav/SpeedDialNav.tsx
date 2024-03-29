import React, { Dispatch, MutableRefObject, SetStateAction } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import styles from './speeddialnav.module.css';
import { IAppState, ISiObj1 } from '../../app.types.js';
import { ReactComponent as IconExpSv1 } from '../Icons/IconExpSv1.svg';
import { ReactComponent as IconEdit } from '../Icons/IconEdit.svg';
import { ReactComponent as IconInfo } from '../Icons/IconInfo.svg';
import { ReactComponent as IconSverka2 } from '../Icons/IconSverka2.svg';
import { useNavigate } from 'react-router-dom';
import { exportSv1Mod } from '../../lib/exportSv1Mod';

interface IActions {
  icon: JSX.Element;
  name: string;
  do: () => void;
}

interface IProps {
  actions: IActions[];
  // siState: ISiObj1[];
  // appState: IAppState;
  // setAppState: Dispatch<SetStateAction<IAppState>>;
  // btnExportSv1: MutableRefObject<HTMLButtonElement | null>;
  // inputFileSv2,
  // btnEdit: MutableRefObject<HTMLButtonElement | null>;
}

export function SpeedDialNav({
  actions,
}: // btnExportSv1,
// btnEdit,
// siState,
// appState,
// setAppState,
IProps) {
  // const navigate = useNavigate();

  // const actions = [
  //   {
  //     icon: <IconSverka2 />,
  //     name: '',
  //     // ref: null,
  //     do: () => {
  //       navigate(`sverka2?sechID=${appState.sechID}`);
  //     },
  //   },
  //   {
  //     icon: (
  //       <IconInfo
  //       //  color={'primary'}
  //       />
  //     ),
  //     name: '',
  //     // ref: null,
  //     do: () => {
  //       setAppState({ ...appState, isInfoOpen: true });
  //     },
  //   },

  //   // {
  //   //   icon: <IconImpSv2 color={'primary'} />,
  //   //   name: '',
  //   //   ref: inputFileSv2,
  //   //   do: null,
  //   // },

  //   // {
  //   //   icon: <Icon82xml color={'primary'} />,
  //   //   name: '',
  //   //   ref: '',
  //   //   do: null,
  //   // },
  //   {
  //     icon: (
  //       <IconEdit
  //       // color={'primary'}
  //       />
  //     ),
  //     name: '',
  //     // ref: null,
  //     // ref: btnEdit,
  //     do: () =>
  //       setAppState({
  //         ...appState,
  //         isEdit: !appState.isEdit,
  //         isSiStateSave: !appState.isSiStateSave,
  //       }),
  //     // do: null,
  //   },
  //   {
  //     icon: (
  //       <IconExpSv1
  //       //  color={'primary'}
  //       />
  //     ),
  //     name: '',
  //     // ref: null,
  //     // ref: btnExportSv1,
  //     do: () => {
  //       console.log(siState);
  //       exportSv1Mod(siState);
  //     },
  //     // do: null,
  //   },
  // ];

  return (
    <Box
      sx={{
        height: 320,
        transform: 'translateZ(0px)',
        flexGrow: 1,
        position: 'fixed',
        bottom: 16,
        right: 16,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action, index) => (
          <SpeedDialAction
            key={index}
            icon={action.icon}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              // if (action.ref && action.ref.current) {
              //   action.ref.current.click();
              // }
              // if (action.do) {
              action.do();
              // }
            }}
            FabProps={{
              variant: 'extended',
              sx: {
                p: 2,
                bgcolor: 'Seashell', //
              },
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
