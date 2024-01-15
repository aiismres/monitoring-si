import React from 'react';
import styles from './cellot.css';
import classNames from 'classnames';
import { SelectCell } from '../../pages/Planrabot';
import { Ot, SechData } from '../../app.types';

interface Props {
  value: string | undefined;
  param: keyof Ot;
  otId: string;
  anchorEl: HTMLElement | null;
  setSelectCell: React.Dispatch<React.SetStateAction<SelectCell>>;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  setIsCalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CellOt({
  value,
  param,
  otId,
  anchorEl,
  setSelectCell,
  setAnchorEl,
  setIsCalOpen,
}: Props) {
  return (
    <td
      className={classNames(styles.noWrap, styles.bgcWhite)}
      onClick={(e) => {
        console.log(value);
        setSelectCell({
          sechIndex: null,
          sechParam: null,
          otParam: param,
          otId,
          value: value || '',
        });
        if (['sdSop'].includes(param)) {
          setAnchorEl(anchorEl ? null : e.currentTarget);
          setIsCalOpen((ico) => !ico);
          // openCalendar(e, sechData, sechIndex, otIndex, 'sdAs');
        }
      }}
    >
      {value}
    </td>
  );
}
