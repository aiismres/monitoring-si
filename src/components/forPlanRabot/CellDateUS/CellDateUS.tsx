import React, { useState } from 'react';
import styles from './celldateus.module.css';
import { IAppState, SechData } from '../../../app.types';
import { ClickAwayListener, Paper, Popper } from '@mui/material';
import { PagePlanrabotState } from '../../../pages/Planrabot';
import { DateCalendar } from '@mui/x-date-pickers';
import zIndex from '@mui/material/styles/zIndex';
import { updSech } from '../../../api/updSech';
import dayjs from 'dayjs';

type Props = {
  sechData: SechData;
  otAmount: number;
  pageState: PagePlanrabotState;
  setSechArr: React.Dispatch<React.SetStateAction<SechData[]>>;
  setAppState: React.Dispatch<React.SetStateAction<IAppState>>;
};

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
        <Paper elevation={3}>
          <ClickAwayListener onClickAway={handleClickAway}>
            <DateCalendar
              views={['year', 'month', 'day']}
              value={dayjs(sechData.planPodachi)}
              onYearChange={() => {
                setIsCalOpen(true);
              }}
              onMonthChange={() => {
                setIsCalOpen(true);
              }}
              onChange={async (newVal) => {
                setIsCalOpen(false);
                setAnchorEl(null);
                console.log(newVal.format('YYYY-MM-DD'));
                const res: Response | undefined = await updSech({
                  ...sechData,
                  planPodachi: newVal.format('YYYY-MM-DD'),
                });
                if (res?.ok) {
                  setSechArr((st) =>
                    st.map((sech) =>
                      sech._id === sechData._id
                        ? { ...sech, planPodachi: newVal.format('YYYY-MM-DD') }
                        : sech
                    )
                  );
                } else {
                  setAppState((st) => ({
                    ...st,
                    isMsgOpen: true,
                    isSuccess: false,
                  }));
                }
              }}
            />
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
}
