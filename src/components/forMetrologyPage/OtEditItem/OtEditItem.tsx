import React, { useState } from 'react';
import styles from './otedititem.module.css';
import { Ot, SechData } from '../../../app.types';
import { PageState } from '../../../pages/Metrology';
import dayjs from 'dayjs';
import dayjs_ru from 'dayjs/locale/ru';
import { DatePicker } from '@mui/x-date-pickers';

type Props = {
  selectedOt: Ot;
  pageState: PageState;
  setPageState: React.Dispatch<React.SetStateAction<PageState>>;
  // sechArr: SechData[];
  ot: Ot;
  setOt: React.Dispatch<React.SetStateAction<Ot>>;
};

export function OtEditItem({
  selectedOt,
  pageState,
  setPageState,
  // sechArr,
  ot,
  setOt,
}: Props) {
  // const [ot, setOt] = useState<Ot>(selectedOt);
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

  // const idStatus = sechArr.some((sech) => sech.metrology.includes(ot._id))
  //   ? ''
  //   : styles.warning;

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
    <tr>
      <td className={styles.noWrap}>{ot.gr}</td>
      <td>{ot.naimAiis1}</td>
      <td>{ot.naimAiis2}</td>
      <td className={styles.minWidth150}>
        <DatePicker
          views={['year', 'month', 'day']}
          value={dayjs(ot.sdSop)}
          onChange={(newValue) =>
            setOt((st) => ({
              ...st,
              sdSop: newValue?.format('YYYY-MM-DD') || '',
            }))
          }
        />
      </td>
      <td>{ot.izmAiis}</td>
      <td>{ot.tipIzmOt}</td>
      <td>{ot.neobhRab}</td>
      <td className={rabZaplanStatus}>{ot.rabZaplan}</td>
      <td className={styles.minWidth150}>
        <DatePicker
          label="план"
          sx={{ mt: 1, mb: 2 }}
          views={['year', 'month', 'day']}
          value={dayjs(ot.dogPlan)}
          onChange={(newValue) =>
            setOt((st) => ({
              ...st,
              dogPlan: newValue?.format('YYYY-MM-DD') || '',
            }))
          }
        />
        <DatePicker
          label="факт"
          views={['year', 'month', 'day']}
          value={dayjs(ot.dogFact)}
          onChange={(newValue) =>
            setOt((st) => ({
              ...st,
              dogFact: newValue?.format('YYYY-MM-DD') || '',
            }))
          }
        />
      </td>
      <td className={styles.minWidth150}>
        <DatePicker
          label="план"
          sx={{ mt: 1, mb: 2 }}
          views={['year', 'month', 'day']}
          value={dayjs(ot.vyezdPlan)}
          onChange={(newValue) =>
            setOt((st) => ({
              ...st,
              vyezdPlan: newValue?.format('YYYY-MM-DD') || '',
            }))
          }
        />
        <DatePicker
          label="факт"
          views={['year', 'month', 'day']}
          value={dayjs(ot.vyezdFact)}
          onChange={(newValue) =>
            setOt((st) => ({
              ...st,
              vyezdFact: newValue?.format('YYYY-MM-DD') || '',
            }))
          }
        />
      </td>
      <td className={styles.minWidth150}>
        {/* <DatePicker
          label="план"
          sx={{ mt: 1, mb: 2 }}
          views={['year', 'month', 'day']}
          value={dayjs(vniimsDate)}
          onChange={(newValue) =>
            setOt((st) => ({
              ...st,
              vniimsPlan: newValue?.format('YYYY-MM-DD') || '',
            }))
          }
        /> */}
        <DatePicker
          label="факт"
          views={['year', 'month', 'day']}
          value={dayjs(vniimsDate)}
          onChange={(newValue) =>
            setOt((st) => ({
              ...st,
              vniimsFact: newValue?.format('YYYY-MM-DD') || '',
            }))
          }
        />
      </td>
      <td className={styles.minWidth150}>
        {/* <DatePicker
          label="план"
          sx={{ mt: 1, mb: 2 }}
          views={['year', 'month', 'day']}
          value={dayjs(rstDate)}
          onChange={(newValue) =>
            setOt((st) => ({
              ...st,
              rstPlan: newValue?.format('YYYY-MM-DD') || '',
            }))
          }
        /> */}
        <DatePicker
          label="факт"
          views={['year', 'month', 'day']}
          value={dayjs(rstDate)}
          onChange={(newValue) =>
            setOt((st) => ({
              ...st,
              rstFact: newValue?.format('YYYY-MM-DD') || '',
            }))
          }
        />
      </td>
      <td className={styles.minWidth150}>
        {/* <DatePicker
          label="план"
          sx={{ mt: 1, mb: 2 }}
          views={['year', 'month', 'day']}
          value={dayjs(prikazDate)}
          onChange={(newValue) =>
            setOt((st) => ({
              ...st,
              prikazPlan: newValue?.format('YYYY-MM-DD') || '',
            }))
          }
        /> */}
        <DatePicker
          label="факт"
          views={['year', 'month', 'day']}
          value={dayjs(prikazDate)}
          onChange={(newValue) =>
            setOt((st) => ({
              ...st,
              prikazFact: newValue?.format('YYYY-MM-DD') || '',
            }))
          }
        />
      </td>
      <td className={styles.minWidth150}>
        {/* <DatePicker
          label="план"
          sx={{ mt: 1, mb: 2 }}
          views={['year', 'month', 'day']}
          value={dayjs(oforSopDate)}
          onChange={(newValue) =>
            setOt((st) => ({
              ...st,
              prikazPlan: newValue?.format('YYYY-MM-DD') || '',
            }))
          }
        /> */}
        <DatePicker
          label="факт"
          views={['year', 'month', 'day']}
          value={dayjs(oforSopDate)}
          onChange={(newValue) =>
            setOt((st) => ({
              ...st,
              prikazFact: newValue?.format('YYYY-MM-DD') || '',
            }))
          }
        />
      </td>
    </tr>
  );
}
