import React, { useRef, useState } from 'react';
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
  MetrFullColParam,
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
import { ReactComponent as IconMetrology } from '../../Icons/IconMetrology.svg';
import { dataBind } from 'jodit/types/core/helpers';
import { sortSechByDate } from '../../lib/sortSechByDate';
import FlipMove from 'react-flip-move';
import { useNavigate } from 'react-router-dom';

interface Props {
  appState: IAppState;
  setAppState: React.Dispatch<React.SetStateAction<IAppState>>;
}

export type PagePlanrabotState2 = {
  editMode: boolean;
  sechColOrder: Array<keyof SechData>;
  metrColOrder: MetrFullColParam[];
  selectedSechData: SechData | undefined;
  // isOtEven: boolean;
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
    selectedSechData: undefined,
    // isOtEven: false,
  });

  // const otIndex = useRef(0);

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

  function switchColOrder(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setPageState((st) => ({
        ...st,
        sechColOrder: sechColOrderObj.full,
        metrColOrder: metrColOrderObj.full,
      }));
      console.log('checked');
    } else {
      setPageState((st) => ({
        ...st,
        sechColOrder: sechColOrderObj.short,
        metrColOrder: metrColOrderObj.short,
      }));
      console.log('UnChecked');
    }
  }

  const actions = [
    {
      icon: <IconEdit />,
      name: '',
      do: () => {
        setPageState((st) => ({ ...st, editMode: true }));
      },
    },
    {
      icon: <IconMetrology />,
      name: '',
      do: () => {
        window.open(`/metrology`, '_blank');
      },
    },
  ];

  if (sechError || metrError) return <div>Error</div>;
  if (sechIsLoading || metrIsLoading) return <div>Loading...</div>;

  return (
    <>
      <table className={styles.tablePlanrabot}>
        <thead>
          <tr>
            <th className={styles.naimSechHead}>Наим сеч</th>
            {pageState.sechColOrder.map((sechParam) => {
              if (sechParam !== 'metrology') {
                return (
                  <th className={styles[sechParam]} key={sechParam}>
                    {sechColFullName[sechParam]}
                  </th>
                );
              } else {
                return (
                  <th key={sechParam} className={styles.thMetr}>
                    <table className={styles.tableMetr}>
                      <thead>
                        <tr>
                          {pageState.metrColOrder.map((otParam) => (
                            <th className={styles[otParam]} key={otParam}>
                              {metrColName[otParam]}
                            </th>
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
          {sechData.map((sechItem, i) => (
            // <tr>
            //   {pageState.sechColOrder.map((sechParam) => (
            //     <td>{sechData[sechParam]}</td>
            //   ))}
            // </tr>
            <SechItem2
              key={sechItem._id}
              pageState={pageState}
              setPageState={setPageState}
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

          <FormControlLabel
            control={<Switch color="default" onChange={switchColOrder} />}
            label=" Sech Short / All"
          />
          {appState.isLoggedin && (
            <Button
              variant="contained"
              disabled={!pageState.selectedSechData?._id}
              onClick={() => {
                window.open(
                  `/monitoringsi?sechID=${pageState.selectedSechData?._id}&naimsechshort=${pageState.selectedSechData?.naimSechShort}`,
                  '_blank'
                );
              }}
            >
              СИ
            </Button>
          )}
          {pageState.editMode && (
            // <ButtonGroup
            // sx={{ margin: '0 auto' }}
            // >
            <Button
              variant="contained"
              onClick={() => {
                setPageState((st) => ({ ...st, editMode: false }));
              }}
            >
              отмена
            </Button>

            // </ButtonGroup>
          )}

          {appState.isLoggedin && <SpeedDialNav actions={actions} />}
        </Toolbar>
      </AppBar>
    </>
  );
}
