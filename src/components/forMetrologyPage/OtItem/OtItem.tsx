import React from 'react';
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
export function OtItem({ ot, pageState, setPageState, sechArr }: Props) {
  const vyezdDate = ot.vyezdFact || ot.vyezdPlan;

  const vyezdStatus = ot.vyezdFact
    ? styles.success
    : dayjs(ot.vyezdPlan) < dayjs()
    ? styles.warning
    : '';

  const vniimsDate = ot.vniimsFact
    ? ot.vniimsFact
    : vyezdDate && ot.neobhRab === 'переаттестация'
    ? dayjs(vyezdDate).add(40, 'days').format('YYYY-MM-DD')
    : '';

  const vniimsStatus = ot.vniimsFact
    ? styles.success
    : dayjs(vniimsDate) < dayjs()
    ? styles.warning
    : '';

  const rstDate = ot.rstFact
    ? ot.rstFact
    : vniimsDate
    ? dayjs(vniimsDate).add(23, 'days').format('YYYY-MM-DD')
    : '';

  const rstStatus = ot.rstFact
    ? styles.success
    : dayjs(rstDate) < dayjs()
    ? styles.warning
    : '';

  const prikazDate = ot.prikazFact
    ? ot.prikazFact
    : rstDate
    ? dayjs(rstDate).add(40, 'days').format('YYYY-MM-DD')
    : '';

  const prikazStatus = ot.prikazFact
    ? styles.success
    : dayjs(prikazDate) < dayjs()
    ? styles.warning
    : '';

  const oforSopDate = ot.oforSopFact
    ? ot.oforSopFact
    : prikazDate
    ? dayjs(prikazDate).add(20, 'days').format('YYYY-MM-DD')
    : vyezdDate
    ? dayjs(vyezdDate).add(20, 'days').format('YYYY-MM-DD')
    : '';

  const oforSopStatus = ot.oforSopFact
    ? styles.success
    : dayjs(oforSopDate) < dayjs()
    ? styles.warning
    : '';

  const idStatus = sechArr.some((sech) => sech.metrology.includes(ot._id))
    ? ''
    : styles.warning;

  function rowStyle() {
    if (pageState.deletOtSt && pageState.selectedOtId === ot._id) {
      return styles.borderRed;
    }
  }
  return (
    <tr
      onClick={() => {
        setPageState((st) => ({ ...st, selectedOtId: ot._id }));
      }}
      className={rowStyle()}
    >
      <td>{ot.gr}</td>
      <td>{ot.naimAiis1}</td>
      <td>{ot.naimAiis2}</td>
      <td>{ot.sdSop}</td>
      <td>{ot.izmAiis}</td>
      <td>{ot.tipIzmOt}</td>
      <td>{ot.neobhRab}</td>
      <td>{ot.rabZaplan}</td>
      <td>{ot.dogFact ? ot.dogFact : ot.dogPlan}</td>
      <td className={vyezdStatus}>
        {ot.vyezdFact ? ot.vyezdFact : ot.vyezdPlan}
      </td>
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
}
