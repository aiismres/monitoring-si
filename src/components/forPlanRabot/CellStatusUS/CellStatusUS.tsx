import React from 'react';
import styles from './cellstatusus.module.css';
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
const cx = classNames.bind(styles);

// type MenuItemT = 'Планируется' | 'Подано в АТС' | 'Испытания АТС' | '---';
type Props = {
  otAmount: number;
  sechData: SechData;
  setSechArr: React.Dispatch<React.SetStateAction<SechData[]>>;
  setAppState: React.Dispatch<React.SetStateAction<IAppState>>;
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

export function CellStatusUS({
  otAmount,
  sechData,
  setSechArr,
  setAppState,
  pageState,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
      setSechArr((st) =>
        st.map((item) =>
          item._id === sechData._id ? { ...item, statusUS: v } : item
        )
      );
    } else {
      setAppState((st) => ({ ...st, isMsgOpen: true, isSuccess: false }));
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
          rowSpan={otAmount}
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
          {/* The content of the Popper. */}
          <List>
            {menuStatusUSArr.map((status) => (
              <ListItemButton
                // className={styles.noWrap}
                // sx={{ whiteSpace: 'nowrap' }}
                onClick={() => {
                  handleMenuItemClick(status);
                }}
              >
                {status}
              </ListItemButton>
            ))}
            {/* <ListItemButton
              onClick={() => {
                handleMenuItemClick('Планируется');
              }}
            >
              Планируется
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                handleMenuItemClick('Подано в АТС');
              }}
            >
              Подано в АТС
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                handleMenuItemClick('Испытания АТС');
              }}
            >
              Испытания АТС
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                handleMenuItemClick('---');
              }}
            >
              ---
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                handleMenuItemClick('---');
              }}
            >
              ---
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                handleMenuItemClick('---');
              }}
            >
              ---
            </ListItemButton> */}
          </List>
        </Paper>
      </Popper>
    </>
  );
}
