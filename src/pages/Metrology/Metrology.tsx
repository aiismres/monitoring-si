import React from 'react';
import styles from './metrology.module.css';
import { useOtData } from '../../hooks/useOtData';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { SpeedDialNav } from '../../components/SpeedDialNav';
import { ReactComponent as IconEdit } from '../../Icons/IconEdit.svg';
import { ReactComponent as IconInfo } from '../../Icons/IconInfo.svg';

const actions = [
  {
    icon: <IconInfo />,
    name: '',
    do: () => {},
  },

  {
    icon: <IconEdit />,
    name: '',
    do: () => {},
  },
];

export function Metrology() {
  const [data, isLoading, error] = useOtData();

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
          {data.map((ot) => (
            <tr key={ot._id}>
              <td>{ot.gr}</td>
              <td>{ot.naimAiis1}</td>
              <td>{ot.naimAiis2}</td>
              <td>{ot.sdSop}</td>
              <td>{ot.izmAiis}</td>
              <td>{ot.tipIzmOt}</td>
              <td>{ot.neobhRab}</td>
              <td>{ot.rabZaplan}</td>
              <td>{ot.dogFact ? ot.dogFact : ot.dogPlan}</td>
              <td>{ot.vyezdFact ? ot.vyezdFact : ot.vyezdPlan}</td>
              <td>{ot.vniimsFact ? ot.vniimsFact : ot.vniimsPlan}</td>
              <td>{ot.rstFact ? ot.rstFact : ot.rstPlan}</td>
              <td>{ot.prikazFact ? ot.prikazFact : ot.prikazPlan}</td>
              <td>{ot.oforSopFact ? ot.oforSopFact : ot.oforSopPlan}</td>
              <td>{ot._id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          {/* <Typography variant="h6" sx={{ mr: 5 }}>
            {appState.naimSechShort}
          </Typography> */}

          <SpeedDialNav actions={actions} />
        </Toolbar>
      </AppBar>
    </>
  );
}
