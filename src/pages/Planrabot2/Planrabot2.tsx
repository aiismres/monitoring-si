import React, { useState } from 'react';
import styles from './planrabot2.module.css';
import { IAppState, Ot, SechData } from '../../app.types';
import { table } from 'console';
import {
  SechColOrderObj,
  sechColOrderObj,
  sechColFullName,
  metrColOrderObj,
  metrColName,
  MetrCol,
} from '../../lib/constants';
import { useSechData } from '../../hooks/useSechData';
import useSWR from 'swr';
import { SechItem2 } from '../../components/forPlanRabot/SechItem2';
import {
  AppBar,
  Button,
  ButtonGroup,
  FormControlLabel,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import { SpeedDialNav } from '../../components/SpeedDialNav';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import { ReactComponent as IconEdit } from '../../Icons/IconEdit.svg';
import { dataBind } from 'jodit/types/core/helpers';
import { sortSechByDate } from '../../lib/sortSechByDate';
import FlipMove from 'react-flip-move';

interface Props {
  appState: IAppState;
  setAppState: React.Dispatch<React.SetStateAction<IAppState>>;
}

export type PagePlanrabotState2 = {
  editMode: boolean;
  sechColOrder: Array<keyof SechData>;
  metrColOrder: Array<keyof Ot>;
};

const fetcher = (url: string) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

type SwrResSech = {
  data: SechData[];
  error: boolean | undefined;
  isLoading: boolean;
};

type SwrResMetr = {
  data: Ot[];
  error: boolean | undefined;
  isLoading: boolean;
};

export function Planrabot2({ appState, setAppState }: Props) {
  const [pageState, setPageState] = useState<PagePlanrabotState2>({
    editMode: false,
    sechColOrder: sechColOrderObj.short,
    metrColOrder: metrColOrderObj.short,
  });

  const {
    data: sechData,
    error: sechError,
    isLoading: sechIsLoading,
  }: SwrResSech = useSWR('/api/readsech', fetcher, {
    revalidateOnFocus: true,
    // revalidateOnMount: false,
  });

  const {
    data: otArr,
    error: metrError,
    isLoading: metrIsLoading,
  }: SwrResMetr = useSWR('/api/readot', fetcher, {
    //  revalidateOnFocus: true
  });

  sechData?.sort(sortSechByDate);

  const actions = [
    {
      icon: <IconEdit />,
      name: '',
      do: () => {
        setPageState((st) => ({ ...st, editMode: true }));
      },
    },
  ];

  if (sechError || metrError) return <div>Error</div>;
  if (sechIsLoading || metrIsLoading) return <div>Loading...</div>;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Наим сеч</th>
            {pageState.sechColOrder.map((sechParam) => {
              if (sechParam !== 'metrology') {
                return <th key={sechParam}>{sechColFullName[sechParam]}</th>;
              } else {
                return (
                  <th key={sechParam} className={styles.thMetr}>
                    <table className={styles.tableMetr}>
                      <thead>
                        <tr>
                          {pageState.metrColOrder.map((otParam) => (
                            <th key={otParam}>{metrColName[otParam]}</th>
                          ))}
                        </tr>
                      </thead>
                    </table>
                  </th>
                );
              }
            })}
          </tr>
        </thead>
        <FlipMove typeName="tbody">
          {/* <tbody> */}
          {sechData.map((sechItem) => (
            // <tr>
            //   {pageState.sechColOrder.map((sechParam) => (
            //     <td>{sechData[sechParam]}</td>
            //   ))}
            // </tr>
            <SechItem2
              key={sechItem._id}
              pageState={pageState}
              sechData={sechItem}
              otArr={otArr}
            />
          ))}
          {/* </tbody> */}
        </FlipMove>
      </table>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          {/* {!company && (
            <FormControlLabel
              control={<Switch color="default" onChange={aiisGpeFilter} />}
              label="Все / ГПЭ"
            />
          )}
          {company === 'gpe' && (
            <Typography>План работ Газпром энерго</Typography>
          )} */}
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
                color="secondary"
                // disabled={!pageState.selectedOtId}
              >
                <EditIcon />
              </Button>
            </ButtonGroup>
          )}

          {appState.isLoggedin && <SpeedDialNav actions={actions} />}
        </Toolbar>
      </AppBar>
    </>
  );
}
