import React from 'react';
import styles from './calendarpopsimple.css';
import { Button, Fade, Paper, Popper } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import produce from 'immer';
import { Ot, SechArr } from '../../app.types';
import { SelectCell } from '../../pages/Planrabot';
import dayjs from 'dayjs';
import dayjs_ru from 'dayjs/locale/ru';
import updateLocale from 'dayjs/plugin/updateLocale';

interface Props {
  selectCell: SelectCell;
  isCalOpen: boolean;
  anchorEl: HTMLElement | null;
  sechArr: SechArr[];
  otArr: Ot[];
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  setIsCalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSechArr: React.Dispatch<React.SetStateAction<SechArr[]>>;
  setOtArr: React.Dispatch<React.SetStateAction<Ot[]>>;
}

function isString(data: unknown): data is string {
  return typeof data === 'string';
}

export function CalendarPopSimple({
  selectCell,
  isCalOpen,
  anchorEl,
  sechArr,
  otArr,
  setAnchorEl,
  setIsCalOpen,
  setSechArr,
  setOtArr,
}: Props) {
  let value: string = '';
  if (
    selectCell.sechIndex !== null &&
    selectCell.sechParam !== null &&
    selectCell.sechParam !== 'metrology' &&
    ['soglGtp', 'dopusk', 'sdAs', 'planPodachi'].includes(
      selectCell.sechParam || ''
    )
  ) {
    value = sechArr[selectCell.sechIndex][selectCell.sechParam];
  } else if (selectCell.otId !== null) {
    value =
      otArr.find((ot) => ot._id === selectCell.otId)?.sdSop || dayjs().format();
  }
  return (
    <Popper
      // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
      sx={{ zIndex: 1200 }}
      open={isCalOpen}
      anchorEl={anchorEl}
      placement="auto"
      transition
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper
            elevation={5}
            sx={{ position: 'relative', p: 1, borderRadius: 2 }}
          >
            <DateCalendar
              sx={{ bgcolor: 'white' }}
              views={['year', 'month', 'day']}
              value={
                dayjs(value || new Date())
                // dayjs(sechArr[selectCell.sechIndex!]['sdAs'])
                // dayjs(sechArr[selectCell.sechIndex!][selectCell.param!])
              }
              onYearChange={() => {
                setIsCalOpen(true);
              }}
              onMonthChange={() => {
                setIsCalOpen(true);
              }}
              onChange={(newValue) => {
                console.log(newValue);
                setIsCalOpen(false);
                setAnchorEl(null);
                if (
                  selectCell.sechParam &&
                  selectCell.sechIndex &&
                  selectCell.sechParam !== 'metrology'
                ) {
                  setSechArr(
                    produce((draft: SechArr[]) => {
                      if (
                        selectCell.sechIndex !== null &&
                        selectCell.sechParam !== null
                      ) {
                        console.log('sech');
                        draft[selectCell.sechIndex][selectCell.sechParam] =
                          newValue.format('YYYY-MM-DD');
                      }
                    })
                  );
                } else if (selectCell.otId !== null) {
                  console.log('ot');
                  setOtArr(
                    produce((draft) => {
                      if (
                        selectCell.otId !== null &&
                        draft.find((ot) => ot._id === selectCell.otId) !==
                          undefined
                      ) {
                        //@ts-ignore
                        draft.find((ot) => ot._id === selectCell.otId).sdSop =
                          newValue.format('YYYY-MM-DD');
                      }
                    })
                  );
                }
              }}
            />
            <Button
              onClick={() => {
                setIsCalOpen(false);
                setAnchorEl(null);
              }}
              sx={{ position: 'absolute', right: '15px', bottom: '10px' }}
            >
              cancel
            </Button>
          </Paper>
          {/* <DatePicker /> */}
          {/* <div>
          <StaticDatePicker />
        </div> */}
        </Fade>
      )}
    </Popper>
  );
}
