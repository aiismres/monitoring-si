import React from 'react';
import styles from './cellprdate.css';
import { Ot, SechArr } from '../../app.types';
import {
  SechKeys,
  SelectCell,
  isKeyOfOt,
  isKeyOfSechData,
} from '../../pages/Planrabot';

interface Props {
  value: string;
  sechData: SechArr;
  ot: Ot | undefined;
  otAmount: number;
  sechIndex: number;
  otIndex: number;
  param: keyof SechArr | keyof Ot;
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  setIsCalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectCell: React.Dispatch<React.SetStateAction<SelectCell>>;
  setSechArr: React.Dispatch<React.SetStateAction<SechArr[]>>;
  setOtArr: React.Dispatch<React.SetStateAction<Ot[]>>;
}

export function CellPRDate({
  value,
  sechData,
  ot,
  otAmount,
  sechIndex,
  otIndex,
  param,
  anchorEl,
  setAnchorEl,
  setIsCalOpen,
  setSelectCell,
}: Props) {
  console.log(param);

  // function openCalendar(
  //   event: React.MouseEvent<HTMLElement>,
  //   sechData: SechArr,
  //   sechIndex: number,
  //   otIndex: number,
  //   param: keyof SechArr| keyof Ot ;
  // ) {
  //   console.log(sechData, sechIndex, otIndex);
  //   setAnchorEl(anchorEl ? null : event.currentTarget);
  //   setIsCalOpen((ico) => !ico);
  //   setSelectCell({ sechIndex, otIndex, param });
  // }

  return (
    <td
      rowSpan={otAmount}
      className={styles.noWrap}
      // onClick={(e) => {
      //   console.log(
      //     isKeyOfSechData(param, sechData),
      //     isKeyOfOt(param, ot),
      //     param
      //   );
      //   setSelectCell({ sechIndex, otIndex, param });
      //   if (isKeyOfSechData(param, sechData) || isKeyOfOt(param, ot)) {
      //     // openCalendar(e, sechData, sechIndex, otIndex, param);
      //     console.log(sechData, sechIndex, otIndex);
      //     setAnchorEl(anchorEl ? null : e.currentTarget);
      //     setIsCalOpen((ico) => !ico);
      //   }
      // }}
    >
      {value}
    </td>
  );
}
