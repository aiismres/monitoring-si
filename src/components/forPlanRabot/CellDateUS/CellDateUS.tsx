import React, { useState } from 'react';
import styles from './celldateus.module.css';
import { IAppState, SechData } from '../../../app.types';
import { Button, ClickAwayListener, Paper, Popper } from '@mui/material';
import { PagePlanrabotState } from '../../../pages/Planrabot';
import { DateCalendar } from '@mui/x-date-pickers';
import zIndex from '@mui/material/styles/zIndex';
import { updSech } from '../../../api/updSech';
import dayjs, { Dayjs } from 'dayjs';
import { sortSechByDate } from '../../../lib/sortSechByDate';

type Props = {
  sechData: SechData;
  otAmount: number;
  pageState: PagePlanrabotState;
  setSechArr: React.Dispatch<React.SetStateAction<SechData[]>>;
  setAppState: React.Dispatch<React.SetStateAction<IAppState>>;
};

let tempDate: Dayjs | null = null;

export function CellDateUS({
  sechData,
  otAmount,
  pageState,
  setSechArr,
  setAppState,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isCalOpen, setIsCalOpen] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  function handleCellClick(event: React.MouseEvent<HTMLElement>) {
    if (!pageState.editMode) return;
    setIsCalOpen(anchorEl ? false : true);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  function handleClickAway() {
    setAnchorEl(null);
    setIsCalOpen(false);
  }

  async function updSechData(val: Dayjs | null) {
    setIsCalOpen(false);
    setAnchorEl(null);
    const res: Response | undefined = await updSech({
      ...sechData,
      planPodachi: val?.format('YYYY-MM-DD') || '',
    });
    if (res?.ok) {
      setSechArr((st) =>
        st
          .map((sech) =>
            sech._id === sechData._id
              ? { ...sech, planPodachi: val?.format('YYYY-MM-DD') || '' }
              : sech
          )
          .sort(sortSechByDate)
      );
    } else {
      setAppState((st) => ({
        ...st,
        isMsgOpen: true,
        isSuccess: false,
      }));
    }
  }

  return (
    <>
      <td className={styles.td} rowSpan={otAmount} onClick={handleCellClick}>
        {sechData.planPodachi}
      </td>
      <Popper
        id={id}
        open={isCalOpen}
        anchorEl={anchorEl}
        placement="right"
        sx={{ zIndex: 1600 }}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper elevation={5} sx={{ p: 1, borderRadius: 2 }}>
            <DateCalendar
              views={['year', 'month', 'day']}
              defaultValue={dayjs(sechData.planPodachi || new Date())}
              // onYearChange={(newVal) => {
              //   tempDate = newVal;
              //   setIsCalOpen(true);
              // }}
              // onMonthChange={(newVal) => {
              //   tempDate = newVal;
              //   setIsCalOpen(true);
              // }}
              onChange={async (newVal) => {
                console.log(newVal);
                tempDate = newVal;
                // updSechData(newVal);
              }}
            />
            <Button
              // sx={{ position: 'absolute', right: '15px', bottom: '10px' }}
              onClick={() => {
                tempDate = null;
                // updSechData(null);
              }}
            >
              очистить
            </Button>
            <Button>cancel</Button>
            <Button
              onClick={() => {
                updSechData(tempDate);
              }}
            >
              ok
            </Button>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
}
