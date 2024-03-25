import React from 'react';
import styles from './otitem2.module.css';
import { PagePlanrabotState2 } from '../../../pages/Planrabot2';
import { Ot } from '../../../app.types';

type Props = {
  pageState: PagePlanrabotState2;
  otData: Ot | undefined;
};

export function OtItem2({ pageState, otData }: Props) {
  if (otData) {
    return (
      <tr key={otData._id}>
        {pageState.metrColOrder.map((param) => (
          <td key={param}>{otData[param]}</td>
        ))}
      </tr>
    );
  } else return <tr></tr>;
}
