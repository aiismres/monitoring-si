import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from './otitem2.module.css';
import { PagePlanrabotState2 } from '../../../pages/Planrabot2';
import { Ot } from '../../../app.types';
import classNames from 'classnames/bind';
import { useAppStore2 } from '../../../store';
const cx = classNames.bind(styles);

type Props = {
  pageState: PagePlanrabotState2;
  otData: Ot | undefined;
};

let otIndex = useAppStore2.getState().otIndex;
let firstOtIndex = 0;
export function OtItem2({ pageState, otData }: Props) {
  // const otIndex = useAppStore2((state) => state.otIndex);
  const [otIndex, setOtIndex] = useState(firstOtIndex++);

  if (otData) {
    return (
      <tr
        key={otData._id}
        className={cx({ bgcGrey: otIndex % 2 === 0 })}
        // className={cx({ bbGrey: true })}
      >
        {pageState.metrColOrder.map((param) => (
          <td className={styles[param]} key={param}>
            {otData[param]}
          </td>
        ))}
      </tr>
    );
  } else return <tr></tr>;
}
