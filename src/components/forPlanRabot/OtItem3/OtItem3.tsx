import React, { LegacyRef, forwardRef, useState } from 'react';
import styles from './otitem3.module.css';
import { Ot, SechData } from '../../../app.types';
import dayjs from 'dayjs';
import { useSechData } from '../../../hooks/useSechData';
import { PageState } from '../../../pages/Metrology';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { PagePlanrabotState2 } from '../../../pages/Planrabot2';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type Props = {
  ot: Ot | undefined;
  pageState: PagePlanrabotState2;
};

let firstOtIndex = 0;

export function OtItem3(
  { ot, pageState }: Props,
  ref: LegacyRef<HTMLTableRowElement>
) {
  const [otIndex, setOtIndex] = useState(firstOtIndex++);

  const isFull = pageState.metrColOrder.includes('vniimsFact');

  if (!ot) {
    return (
      <tr>
        <td></td>
      </tr>
    );
  }
  const dogovorDate = ot.dogFact || ot.dogPlan;

  const dogovorStatus = ot.dogFact
    ? styles.success + ' ' + styles.dateWidth
    : dayjs(ot.dogPlan) < dayjs()
    ? styles.warning + ' ' + styles.dateWidth
    : styles.dateWidth;

  const vyezdDate = ot.vyezdFact || ot.vyezdPlan;

  const vyezdStatus = ot.vyezdFact
    ? styles.success + ' ' + styles.dateWidth
    : dayjs(ot.vyezdPlan) < dayjs()
    ? styles.warning + ' ' + styles.dateWidth
    : styles.dateWidth;

  const vniimsDate = ot.vniimsFact
    ? ot.vniimsFact
    : vyezdDate && ot.neobhRab === 'переаттестация'
    ? dayjs(vyezdDate).add(40, 'days').format('YYYY-MM-DD')
    : '';

  const vniimsStatus = ot.vniimsFact
    ? styles.success + ' ' + styles.dateWidth
    : dayjs(vniimsDate) < dayjs()
    ? styles.warning + ' ' + styles.dateWidth
    : styles.dateWidth;

  const rstDate = ot.rstFact
    ? ot.rstFact
    : vniimsDate
    ? dayjs(vniimsDate).add(23, 'days').format('YYYY-MM-DD')
    : '';

  const rstStatus = ot.rstFact
    ? styles.success + ' ' + styles.dateWidth
    : dayjs(rstDate) < dayjs()
    ? styles.warning + ' ' + styles.dateWidth
    : styles.dateWidth;

  const prikazDate = ot.prikazFact
    ? ot.prikazFact
    : rstDate
    ? dayjs(rstDate).add(40, 'days').format('YYYY-MM-DD')
    : '';

  const prikazStatus = ot.prikazFact
    ? styles.success + ' ' + styles.dateWidth
    : dayjs(prikazDate) < dayjs()
    ? styles.warning + ' ' + styles.dateWidth
    : styles.dateWidth;

  const oforSopDate = ot.oforSopFact
    ? ot.oforSopFact
    : prikazDate
    ? dayjs(prikazDate).add(20, 'days').format('YYYY-MM-DD')
    : vyezdDate
    ? dayjs(vyezdDate).add(20, 'days').format('YYYY-MM-DD')
    : '';

  const oforSopStatus = ot.oforSopFact
    ? styles.success + ' ' + styles.dateWidth
    : dayjs(oforSopDate) < dayjs()
    ? styles.warning + ' ' + styles.dateWidth
    : styles.dateWidth;

  const rabZaplanStatus =
    dayjs() > dayjs(ot.sdSop).subtract(1, 'years') && ot.rabZaplan !== 'да'
      ? styles.error + ' ' + styles.rabZaplan
      : styles.rabZaplan;

  return (
    <tr key={ot._id} className={cx({ bgcGrey: otIndex % 2 === 0 })}>
      <td className={styles.gr}>{ot.gr}</td>
      {/* <td>{ot.naimAiis1}</td> */}
      <td className={styles.naimAiis2}>{ot.naimAiis2}</td>
      <td className={styles.dateWidth}>{ot.sdSop}</td>
      {isFull && <td className={styles.izmAiis}>{ot.izmAiis}</td>}
      {/* <td>{ot.tipIzmOt}</td> */}
      <td className={styles.neobhRab}>{ot.neobhRab}</td>
      <td className={rabZaplanStatus}>{ot.rabZaplan}</td>
      {isFull && <td className={dogovorStatus}>{dogovorDate}</td>}
      {isFull && <td className={vyezdStatus}>{vyezdDate}</td>}
      {isFull && <td className={vniimsStatus}>{vniimsDate}</td>}
      {isFull && <td className={rstStatus}>{rstDate}</td>}
      {isFull && <td className={prikazStatus}>{prikazDate}</td>}
      <td className={oforSopStatus}>{oforSopDate}</td>
    </tr>
  );
}
