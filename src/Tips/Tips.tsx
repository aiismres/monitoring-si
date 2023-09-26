import React, { useState } from 'react';
import styles from './tips.module.css';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
  Button,
  ClickAwayListener,
  IconButton,
  ThemeProvider,
  Tooltip,
  createTheme,
} from '@mui/material';
import { grey, lime, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    secondary: { main: grey[100] },
  },
});
export function Tips() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <ClickAwayListener onClickAway={() => setIsOpen(false)}>
        <Tooltip
          open={isOpen}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          aria-setsize={5}
          title={
            <React.Fragment>
              <h2 color="inherit">Подсказки</h2>
              <p className={styles.p}>Q + лкм = выделить зеленым </p>
              <p className={styles.p}>W + лкм = выделить красным</p>
              <p className={styles.p}>E + лкм = снять выделение </p>
              <p className={styles.p}>S + лкм = выбрать ячейку </p>
              <p className={styles.p}>
                ctrl + v = копировать в выбранные ячейки{' '}
              </p>
            </React.Fragment>
          }
        >
          <IconButton onClick={() => setIsOpen((st) => !st)}>
            <HelpOutlineIcon fontSize="large" color="secondary" />
          </IconButton>
          {/* <Button variant="contained">
          <HelpOutlineIcon fontSize="large" />
        </Button> */}
        </Tooltip>
      </ClickAwayListener>
    </ThemeProvider>
  );
}
