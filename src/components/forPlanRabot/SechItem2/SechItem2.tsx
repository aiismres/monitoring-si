import React, { forwardRef } from 'react';
import styles from './sechitem2.module.css';
import { PagePlanrabotState2 } from '../../../pages/Planrabot2';
import { Ot, SechData } from '../../../app.types';
import useSWR from 'swr';
import { OtItem2 } from '../OtItem2';
import { SechCellWraper } from '../SechCellWraper';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type Props = {
  pageState: PagePlanrabotState2;
  setPageState: React.Dispatch<React.SetStateAction<PagePlanrabotState2>>;
  sechData: SechData;
  otArr: Ot[];
};

export const SechItem2 = forwardRef(function SechItem2(
  { pageState, setPageState, sechData, otArr }: Props,
  ref: React.LegacyRef<HTMLTableRowElement>
) {
  return (
    <tr
      tabIndex={0}
      ref={ref}
      key={sechData._id}
      className={styles.tr}
      // className={cx({
      //   tr: true,
      //   selected: pageState.selectedSechData?._id === sechData._id,
      // })}
      onClick={() => {
        setPageState((st) => ({ ...st, selectedSechData: sechData }));
      }}
    >
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
