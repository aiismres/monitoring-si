import React, { useState } from 'react';
import styles from './otedititem.module.css';
import { Ot, SechData } from '../../../app.types';
import { PageState } from '../../../pages/Metrology';
import dayjs from 'dayjs';
import dayjs_ru from 'dayjs/locale/ru';
import { DatePicker } from '@mui/x-date-pickers';
import { produce } from 'immer';
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

type Props = {
  // selectedOt: Ot;
  pageState: PageState;
  setPageState: React.Dispatch<React.SetStateAction<PageState>>;
  // sechArr: SechData[];
  // ot: Ot;
  // setOt: React.Dispatch<React.SetStateAction<Ot>>;
};

export function OtEditItem({
  // selectedOt,
  pageState,
  setPageState,
}: // sechArr,
// ot,
// setOt,
Props) {
  // const [ot, setOt] = useState<Ot>(selectedOt);
  // const dogovorDate = selectedOt?.dogFact || selectedOt?.dogPlan;

  // const dogovorStatus = selectedOt?.dogFact
  //   ? styles.success + ' ' + styles.noWrap
  //   : dayjs(selectedOt?.dogPlan) < dayjs()
  //   ? styles.warning + ' ' + styles.noWrap
  //   : styles.noWrap;
  const { selectedOt } = pageState;
  const vyezdDate = selectedOt?.vyezdFact || selectedOt?.vyezdPlan;

  // const vyezdStatus = selectedOt?.vyezdFact
  //   ? styles.success + ' ' + styles.noWrap
  //   : dayjs(selectedOt?.vyezdPlan) < dayjs()
  //   ? styles.warning + ' ' + styles.noWrap
  //   : styles.noWrap;

  const vniimsDate = selectedOt?.vniimsFact
    ? selectedOt?.vniimsFact
    : vyezdDate && selectedOt?.neobhRab === 'переаттестация'
    ? dayjs(vyezdDate).add(40, 'days').format('YYYY-MM-DD')
    : '';

  const vniimsStatus = selectedOt?.vniimsFact
    ? styles.success + ' ' + styles.noWrap
    : dayjs(vniimsDate) < dayjs()
    ? styles.warning + ' ' + styles.noWrap
    : styles.noWrap;

  const rstDate = selectedOt?.rstFact
    ? selectedOt?.rstFact
    : vniimsDate
    ? dayjs(vniimsDate).add(23, 'days').format('YYYY-MM-DD')
    : '';

  const rstStatus = selectedOt?.rstFact
    ? styles.success + ' ' + styles.noWrap
    : dayjs(rstDate) < dayjs()
    ? styles.warning + ' ' + styles.noWrap
    : styles.noWrap;

  const prikazDate = selectedOt?.prikazFact
    ? selectedOt?.prikazFact
    : rstDate
    ? dayjs(rstDate).add(40, 'days').format('YYYY-MM-DD')
    : '';

  const prikazStatus = selectedOt?.prikazFact
    ? styles.success + ' ' + styles.noWrap
    : dayjs(prikazDate) < dayjs()
    ? styles.warning + ' ' + styles.noWrap
    : styles.noWrap;

  const oforSopDate = selectedOt?.oforSopFact
    ? selectedOt?.oforSopFact
    : prikazDate
    ? dayjs(prikazDate).add(20, 'days').format('YYYY-MM-DD')
    : vyezdDate
    ? dayjs(vyezdDate).add(20, 'days').format('YYYY-MM-DD')
    : '';

  const oforSopStatus = selectedOt?.oforSopFact
    ? styles.success + ' ' + styles.noWrap
    : dayjs(oforSopDate) < dayjs()
    ? styles.warning + ' ' + styles.noWrap
    : styles.noWrap;

  // const idStatus = sechArr.some((sech) => sech.metrology.includes(selectedOt?._id))
  //   ? ''
  //   : styles.warning;

  const rabZaplanStatus =
    dayjs() > dayjs(selectedOt?.sdSop).subtract(1, 'years') &&
    selectedOt?.rabZaplan !== 'да'
      ? styles.error
      : '';

  function rowStyle() {
    if (pageState.editMode && pageState.selectedOt?._id === selectedOt?._id) {
      return styles.borderRed;
    }
  }

  return (
    <tr>
      <td className={styles.minWidth150}>
        <TextField
          // id="standard-basic"
          label="№ ГР"
          // variant="standard"
          value={selectedOt?.gr}
          onChange={(e) => {
            setPageState(
              produce((draft) => {
                draft.selectedOt!.gr = e.target.value || '';
              })
            );
          }}
        />
      </td>
      <td className={styles.minWidth150}>
        <TextField
          // id="standard-basic"
          label="Наим 1"
          // variant="standard"
          value={selectedOt?.naimAiis1}
          onChange={(e) => {
            setPageState(
              produce((draft) => {
                draft.selectedOt!.naimAiis1 = e.target.value || '';
              })
            );
          }}
        />
      </td>
      <td className={styles.minWidth150}>
        <TextField
          // id="standard-basic"
          label="Наим 2"
          // variant="standard"
          value={selectedOt?.naimAiis2}
          onChange={(e) => {
            setPageState(
              produce((draft) => {
                draft.selectedOt!.naimAiis2 = e.target.value || '';
              })
            );
          }}
        />
      </td>
      <td className={styles.minWidth150}>
        <DatePicker
          views={['year', 'month', 'day']}
          label="СД СОП"
          value={dayjs(selectedOt?.sdSop)}
          onChange={(newValue) =>
            // setOt((st) => ({
            //   ...st,
            //   sdSop: newValue?.format('YYYY-MM-DD') || '',
            // }))
            setPageState(
              produce((draft) => {
                draft.selectedOt!.sdSop = newValue?.format('YYYY-MM-DD') || '';
              })
            )
          }
          slotProps={{
            actionBar: {
              actions: ['clear'],
            },
          }}
        />
      </td>
      <td>
        <FormControl sx={{ minWidth: 75 }}>
          <InputLabel id="demo-simple-select-label">Изм.</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedOt?.izmAiis}
            label="Изм."
            onChange={(e) => {
              setPageState(
                produce((draft) => {
                  draft.selectedOt!.izmAiis = e.target.value || '';
                })
              );
            }}
          >
            <MenuItem value={'да'}>да</MenuItem>
            <MenuItem value={'нет'}>нет</MenuItem>
          </Select>
        </FormControl>
      </td>
      <td>
        <TextField
          sx={{ minWidth: 200 }}
          // id="standard-basic"
          label="тип изм"
          // variant="standard"
          value={selectedOt?.tipIzmOt}
          onChange={(e) => {
            setPageState(
              produce((draft) => {
                draft.selectedOt!.tipIzmOt = e.target.value || '';
              })
            );
          }}
        />
      </td>
      <td>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="demo-simple-select-label">Необх. раб.</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedOt?.neobhRab}
            label="Необх. раб."
            onChange={(e) => {
              setPageState(
                produce((draft) => {
                  draft.selectedOt!.neobhRab = e.target.value || '';
                })
              );
            }}
          >
            <MenuItem value={'переаттестация'}>переаттестация</MenuItem>
            <MenuItem value={'поверка'}>поверка</MenuItem>
            <MenuItem value={'не требуется'}>не требуется</MenuItem>
          </Select>
        </FormControl>
      </td>
      <td className={rabZaplanStatus}>
        <FormControl sx={{ minWidth: 75 }}>
          <InputLabel id="demo-simple-select-label">раб заплан</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedOt?.rabZaplan}
            label="раб заплан"
            onChange={(e) => {
              setPageState(
                produce((draft) => {
                  draft.selectedOt!.rabZaplan = e.target.value || '';
                })
              );
            }}
          >
            <MenuItem value={'да'}>да</MenuItem>
            <MenuItem value={'нет'}>нет</MenuItem>
            <MenuItem value={'--'}>--</MenuItem>
          </Select>
        </FormControl>
        {selectedOt?.rabZaplan}
      </td>
      <td className={styles.minWidth150}>
        <DatePicker
          label="план"
          sx={{ mt: 1, mb: 2 }}
          views={['year', 'month', 'day']}
          value={dayjs(selectedOt?.dogPlan)}
          onChange={(newValue) =>
            // setOt((st) => ({
            //   ...st,
            //   dogPlan: newValue?.format('YYYY-MM-DD') || '',
            // }))
            setPageState(
              produce((draft) => {
                draft.selectedOt!.dogPlan =
                  newValue?.format('YYYY-MM-DD') || '';
              })
            )
          }
          slotProps={{
            actionBar: {
              actions: ['clear'],
            },
          }}
        />
        <DatePicker
          label="факт"
          views={['year', 'month', 'day']}
          value={dayjs(selectedOt?.dogFact)}
          onChange={(newValue) =>
            // setOt((st) => ({
            //   ...st,
            //   dogFact: newValue?.format('YYYY-MM-DD') || '',
            // }))
            setPageState(
              produce((draft) => {
                draft.selectedOt!.dogFact =
                  newValue?.format('YYYY-MM-DD') || '';
              })
            )
          }
          slotProps={{
            actionBar: {
              actions: ['clear'],
            },
          }}
        />
      </td>
      <td className={styles.minWidth150}>
        <DatePicker
          label="план"
          sx={{ mt: 1, mb: 2 }}
          views={['year', 'month', 'day']}
          value={dayjs(selectedOt?.vyezdPlan)}
          onChange={(newValue) =>
            // setOt((st) => ({
            //   ...st,
            //   vyezdPlan: newValue?.format('YYYY-MM-DD') || '',
            // }))
            setPageState(
              produce((draft) => {
                draft.selectedOt!.vyezdPlan =
                  newValue?.format('YYYY-MM-DD') || '';
              })
            )
          }
          slotProps={{
            actionBar: {
              actions: ['clear'],
            },
          }}
        />
        <DatePicker
          label="факт"
          views={['year', 'month', 'day']}
          value={dayjs(selectedOt?.vyezdFact)}
          onChange={(newValue) =>
            // setOt((st) => ({
            //   ...st,
            //   vyezdFact: newValue?.format('YYYY-MM-DD') || '',
            // }))
            setPageState(
              produce((draft) => {
                draft.selectedOt!.vyezdFact =
                  newValue?.format('YYYY-MM-DD') || '';
              })
            )
          }
          slotProps={{
            actionBar: {
              actions: ['clear'],
            },
          }}
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
            // setOt((st) => ({
            //   ...st,
            //   vniimsFact: newValue?.format('YYYY-MM-DD') || '',
            // }))
            setPageState(
              produce((draft) => {
                draft.selectedOt!.vniimsFact =
                  newValue?.format('YYYY-MM-DD') || '';
              })
            )
          }
          slotProps={{
            actionBar: {
              actions: ['clear'],
            },
          }}
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
          value={dayjs(selectedOt?.vniimsFact)}
          onChange={(newValue) =>
            // setOt((st) => ({
            //   ...st,
            //   rstFact: newValue?.format('YYYY-MM-DD') || '',
            // }))
            setPageState(
              produce((draft) => {
                draft.selectedOt!.vniimsFact =
                  newValue?.format('YYYY-MM-DD') || '';
              })
            )
          }
          slotProps={{
            actionBar: {
              actions: ['clear'],
            },
          }}
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
          value={dayjs(selectedOt?.prikazFact)}
          onChange={(newValue) =>
            // setOt((st) => ({
            //   ...st,
            //   prikazFact: newValue?.format('YYYY-MM-DD') || '',
            // }))
            setPageState(
              produce((draft) => {
                draft.selectedOt!.prikazFact =
                  newValue?.format('YYYY-MM-DD') || '';
              })
            )
          }
          slotProps={{
            actionBar: {
              actions: ['clear'],
            },
          }}
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
          value={dayjs(selectedOt?.oforSopFact)}
          onChange={(newValue) =>
            // setOt((st) => ({
            //   ...st,
            //   oforSopFact: newValue?.format('YYYY-MM-DD') || '',
            // }))
            setPageState(
              produce((draft) => {
                draft.selectedOt!.oforSopFact =
                  newValue?.format('YYYY-MM-DD') || '';
              })
            )
          }
          slotProps={{
            actionBar: {
              actions: ['clear'],
            },
          }}
        />
      </td>
    </tr>
  );
}
