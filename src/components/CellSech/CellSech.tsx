import React from 'react';
import styles from './cellsech.module.css';
import classNames from 'classnames';
import { SelectCell } from '../../pages/Planrabot';
import { SechData } from '../../app.types';

interface Props {
  value: string;
  otAmount: number;
  sechIndex: number;
  param: keyof SechData;
  anchorEl: HTMLElement | null;
  setSelectCell: React.Dispatch<React.SetStateAction<SelectCell>>;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  setIsCalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CellSech({
  value,
  otAmount,
  sechIndex,
  param,
  anchorEl,
  setSelectCell,
  setAnchorEl,
  setIsCalOpen,
}: Props) {
  return (
    <td
      rowSpan={otAmount}
      className={classNames(styles.noWrap, styles.bgcWhite)}
      onClick={(e) => {
        console.log(value);
        setSelectCell({
          sechIndex,
          sechParam: param,
          otParam: null,
          otId: null,
          value,
        });
        if (['soglGtp', 'dopusk', 'sdAs', 'planPodachi'].includes(param)) {
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
