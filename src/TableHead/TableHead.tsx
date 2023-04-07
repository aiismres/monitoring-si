import React, { SetStateAction, useEffect, useMemo, useRef } from 'react';
import styles from './tablehead.module.css';
import { IAppState } from '../app.types';
import { useImmer } from 'use-immer';
import { colFullName, colOrderObj, colsWidthInit } from '../modules/constants';

interface IProps {
  appState: IAppState;
  sortBy: (v: string) => void;
  tableWidth: number;
  setTableWidth: (value: SetStateAction<number>) => void;
}

export function TableHead({
  appState,
  sortBy,
  tableWidth,
  setTableWidth,
}: IProps) {
  const [colWidths, setColWidths] = useImmer<number[]>([]);

  const startX = useRef(0);
  const startColWidth = useRef(0);
  const startTableWidth = useRef(0);
  const thRefs = useRef<HTMLElement[]>([]);

  // useEffect(() => {
  //   const thead1 = document.getElementById('thead1');
  //   let thTags;
  //   if (thead1) thTags = thead1.getElementsByTagName('th');

  //   const initialColWidths = [];
  //   let initialTableWidth = 0;
  //   if (thTags) {
  //     for (let thTag of thTags) {
  //       initialColWidths.push(thTag.clientWidth);
  //       initialTableWidth += thTag.clientWidth;
  //     }
  //     setColWidths(initialColWidths);
  //   }

  //   setTableWidth(initialTableWidth);
  // }, []);

  useMemo(() => {
    const initialColWidths = appState.colOrder.map(
      (colName) => colsWidthInit[colName]
    );
    const initialTableWidth = initialColWidths.reduce(
      (sum, item) => (sum += item),
      0
    );
    setColWidths(initialColWidths);
    setTableWidth(initialTableWidth);
  }, [appState.colOrder]);

  function onDragStartTh(e: React.DragEvent, i: number) {
    startX.current = e.clientX;
    startColWidth.current = colWidths[i];
    startTableWidth.current = tableWidth;
    console.log('onDragStart', 'e.clientX:', e.clientX, { i });
  }

  // function onMouseDownRes(e: React.MouseEvent, i: number) {
  //   startX.current = e.clientX;
  //   startColWidth.current = colWidths[i];
  //   startTableWidth.current = tableWidth;
  //   console.log('onDragStart', 'e.clientX:', e.clientX, { i });
  // }

  function onDragTh(e: React.DragEvent, i: number) {
    if (e.clientY <= 0) return; // исключить последниее значение drgon т.к. оно всегда косячное
    let colWidthInc = e.clientX - startX.current;

    setColWidths((draft) => {
      draft[i] = startColWidth.current + colWidthInc;
    });

    setTableWidth(startTableWidth.current + colWidthInc);

    console.log('onDrag', e.clientX, e.clientY, startX.current, colWidthInc);
  }

  function onDragEndTh(e: React.DragEvent, i: number) {
    setColWidths((draft) => {
      let newColWidthCalc = startColWidth.current + e.clientX - startX.current;
      if (newColWidthCalc < thRefs.current[i].clientWidth) {
        newColWidthCalc = thRefs.current[i].clientWidth;
      }
      draft[i] = newColWidthCalc - 14;
    });

    setTableWidth((st) => {
      let sum1 = thRefs.current.reduce(
        (sum: number, item: any) => sum + item.clientWidth,
        0
      );
      console.log({ sum1 });
      return sum1 - 14;
    });
  }

  return (
    <thead id="thead1">
      <tr>
        {appState.colOrder.map((param, i) => {
          // {colOrderObj[appState.colOrderOpt].map((param, i) => {
          let classes =
            appState.isEdit &&
            (param.includes('Sop') ||
              param.includes('SchSch') ||
              param === 'gr')
              ? styles.attention
              : '';
          return (
            <th
              className={classes}
              onDoubleClick={() => {
                sortBy(param);
              }}
              style={{
                minWidth: colWidths[i],
              }}
              ref={(el) => (thRefs.current[i] = el!)}
            >
              {colFullName[param]}
              <div
                className={styles.resizer}
                draggable={true}
                onDragStart={(e) => onDragStartTh(e, i)}
                // onMouseDown={(e) => onMouseDownRes(e, i)}
                onDrag={(e) => onDragTh(e, i)}
                onDragEnd={(e) => onDragEndTh(e, i)}
              >
                |
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
