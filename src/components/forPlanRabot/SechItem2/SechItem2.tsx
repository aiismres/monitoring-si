import React, { forwardRef } from 'react';
import styles from './sechitem2.module.css';
import { PagePlanrabotState2 } from '../../../pages/Planrabot2';
import { Ot, SechData } from '../../../app.types';
import useSWR from 'swr';
import { OtItem2 } from '../OtItem2';
import { SechCellWraper } from '../SechCellWraper';

type Props = {
  pageState: PagePlanrabotState2;
  sechData: SechData;
  otArr: Ot[];
};

export const SechItem2 = forwardRef(function SechItem2(
  { pageState, sechData, otArr }: Props,
  ref: React.LegacyRef<HTMLTableRowElement>
) {
  return (
    <tr ref={ref} key={sechData._id} className={styles.tr}>
      <th className={styles.naimSechShortTh}>{sechData.naimSechShort}</th>
      {pageState.sechColOrder.map((sechParam) => (
        <SechCellWraper
          key={sechParam}
          pageState={pageState}
          sechData={sechData}
          sechParam={sechParam}
          otArr={otArr}
        />
      ))}
    </tr>
  );
});
