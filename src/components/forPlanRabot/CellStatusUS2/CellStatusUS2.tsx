import React from 'react';
import styles from './cellstatusus2.module.css';
import {
  Box,
  ClickAwayListener,
  List,
  ListItemButton,
  MenuItem,
  Paper,
  Popper,
  Select,
} from '@mui/material';
import classNames from 'classnames/bind';
import { IAppState, SechData } from '../../../app.types';
import { updSech } from '../../../api/updSech';
import { PagePlanrabotState } from '../../../pages/Planrabot';
import { useSWRConfig } from 'swr';
const cx = classNames.bind(styles);

// type MenuItemT = 'Планируется' | 'Подано в АТС' | 'Испытания АТС' | '---';
type Props = {
  sechData: SechData;
  // setSechArr: React.Dispatch<React.SetStateAction<SechData[]>>;
  // setAppState: React.Dispatch<React.SetStateAction<IAppState>>;
  pageState: PagePlanrabotState;
};

const menuStatusUSArr = [
  'Планируется',
  'Подано в АТС',
  'Испытания АТС',
  'Отриц. ТЭ',
  'Отриц. Исп-я',
  '---',
] as const;

export type MenuStatusUSItem = (typeof menuStatusUSArr)[number];

export function CellStatusUS2({
  sechData,

  // setAppState,
  pageState,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { mutate } = useSWRConfig();

  function handleCellClick(event: React.MouseEvent<HTMLElement>) {
    if (!pageState.editMode) return;
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  function handleClickAway() {
    setAnchorEl(null);
  }

  async function handleMenuItemClick(v: MenuStatusUSItem) {
    console.log(v);
    const res = await updSech({ ...sechData, statusUS: v });
    if (res?.ok) {
      console.log('res.ok');
      mutate('/api/readsech');
      // setSechArr((st) =>
      //   st.map((item) =>
      //     item._id === sechData._id ? { ...item, statusUS: v } : item
      //   )
      // );
    } else {
      console.log('ошибка обновления статуса комплекта');
      // setAppState((st) => ({ ...st, isMsgOpen: true, isSuccess: false }));
    }
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <td
          aria-describedby={id}
          onClick={handleCellClick}
          className={cx({ bgcWhite: true, selected: open })}
        >
          {sechData.statusUS || 'Статус комплекта'}
        </td>
      </ClickAwayListener>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="right"
        sx={{ zIndex: 1600 }}
      >
        <Paper elevation={3} sx={{ p: 0 }}>
          <List>
            {menuStatusUSArr.map((status) => (
              <ListItemButton
                key={status}
                onClick={() => {
                  handleMenuItemClick(status);
                }}
              >
                {status}
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </Popper>
    </>
  );
}
