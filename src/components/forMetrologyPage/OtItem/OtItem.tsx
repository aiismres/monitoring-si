import React, { LegacyRef, forwardRef } from 'react';
import styles from './otitem.module.css';
import { Ot, SechData } from '../../../app.types';
import dayjs from 'dayjs';
import { useSechData } from '../../../hooks/useSechData';
import { PageState } from '../../../pages/Metrology';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

type Props = {
  ot: Ot;
  pageState: PageState;
  setPageState: React.Dispatch<React.SetStateAction<PageState>>;
  sechArr: SechData[];
};
export const OtItem = forwardRef(function OtItem(
  { ot, pageState, setPageState, sechArr }: Props,
  ref: LegacyRef<HTMLTableRowElement>
) {
  const dogovorDate = ot.dogFact || ot.dogPlan;

  const dogovorStatus = ot.dogFact
    ? styles.success + ' ' + styles.noWrap
    : dayjs(ot.dogPlan) < dayjs()
    ? styles.warning + ' ' + styles.noWrap
    : styles.noWrap;

  const vyezdDate = ot.vyezdFact || ot.vyezdPlan;

  const vyezdStatus = ot.vyezdFact
    ? styles.success + ' ' + styles.noWrap
    : dayjs(ot.vyezdPlan) < dayjs()
    ? styles.warning + ' ' + styles.noWrap
    : styles.noWrap;

  const vniimsDate = ot.vniimsFact
    ? ot.vniimsFact
    : vyezdDate && ot.neobhRab === 'переаттестация'
    ? dayjs(vyezdDate).add(40, 'days').format('YYYY-MM-DD')
    : '';

  const vniimsStatus = ot.vniimsFact
    ? styles.success + ' ' + styles.noWrap
    : dayjs(vniimsDate) < dayjs()
    ? styles.warning + ' ' + styles.noWrap
    : styles.noWrap;

  const rstDate = ot.rstFact
    ? ot.rstFact
    : vniimsDate
    ? dayjs(vniimsDate).add(23, 'days').format('YYYY-MM-DD')
    : '';

  const rstStatus = ot.rstFact
    ? styles.success + ' ' + styles.noWrap
    : dayjs(rstDate) < dayjs()
    ? styles.warning + ' ' + styles.noWrap
    : styles.noWrap;

  const prikazDate = ot.prikazFact
    ? ot.prikazFact
    : rstDate
    ? dayjs(rstDate).add(40, 'days').format('YYYY-MM-DD')
    : '';

  const prikazStatus = ot.prikazFact
    ? styles.success + ' ' + styles.noWrap
    : dayjs(prikazDate) < dayjs()
    ? styles.warning + ' ' + styles.noWrap
    : styles.noWrap;

  const oforSopDate = ot.oforSopFact
    ? ot.oforSopFact
    : prikazDate
    ? dayjs(prikazDate).add(20, 'days').format('YYYY-MM-DD')
    : vyezdDate
    ? dayjs(vyezdDate).add(20, 'days').format('YYYY-MM-DD')
    : '';

  const oforSopStatus = ot.oforSopFact
    ? styles.success + ' ' + styles.noWrap
    : dayjs(oforSopDate) < dayjs()
    ? styles.warning + ' ' + styles.noWrap
    : styles.noWrap;

  const idStatus = sechArr.some((sech) => sech.metrology.includes(ot._id))
    ? ''
    : styles.warning;

  const rabZaplanStatus =
    dayjs() > dayjs(ot.sdSop).subtract(1, 'years') && ot.rabZaplan !== 'да'
      ? styles.error
      : '';

  function rowStyle() {
    if (pageState.editMode && pageState.selectedOt?._id === ot._id) {
      return styles.borderRed;
    }
  }

  return (
    <tr
      onClick={() => {
        setPageState((st) => ({ ...st, selectedOt: ot }));
      }}
      className={rowStyle()}
      ref={ref}
    >
      <td className={styles.noWrap}>{ot.gr}</td>
      <td>{ot.naimAiis1}</td>
      <td>{ot.naimAiis2}</td>
      <td className={styles.noWrap}>{ot.sdSop}</td>
      <td>{ot.izmAiis}</td>
      <td>{ot.tipIzmOt}</td>
      <td>{ot.neobhRab}</td>
      <td className={rabZaplanStatus}>{ot.rabZaplan}</td>
      <td className={dogovorStatus}>{dogovorDate}</td>
      <td className={vyezdStatus}>{vyezdDate}</td>
      <td className={vniimsStatus}>{vniimsDate}</td>
      <td className={rstStatus}>{rstDate}</td>
      <td className={prikazStatus}>{prikazDate}</td>
      <td className={oforSopStatus}>{oforSopDate}</td>
      <td className={idStatus}>{ot._id}</td>
      {/* {pageState.deletOt && (
        <td>
          <RadioButtonUncheckedIcon fontSize="small" />
        </td>
      )} */}
    </tr>
  );
});
