import React from 'react';
import styles from './otitem2.module.css';
import { PagePlanrabotState2 } from '../../../pages/Planrabot2';
import { Ot } from '../../../app.types';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type Props = {
  pageState: PagePlanrabotState2;
  otData: Ot | undefined;
  // sechIndex: number
};

export function OtItem2({ pageState, otData }: Props) {
  if (otData) {
    return (
      <tr key={otData._id} className={cx({ bgcGrey: true })}>
        {pageState.metrColOrder.map((param) => (
          <td className={styles[param]} key={param}>
            {otData[param]}
          </td>
        ))}
      </tr>
    );
  } else return <tr></tr>;
}
