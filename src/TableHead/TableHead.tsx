import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './tablehead.module.css';
import { IAppState } from '../app.types';
import { useImmer } from 'use-immer';
import {
  IColsWidth,
  colFullName,
  colOrderObj,
  colsWidthInit,
} from '../modules/constants';
import { useAppStore } from '../store';
import { table } from 'console';

interface IProps {
  appState: IAppState;
  sortBy: (v: string) => void;
  tableWidth: number;
  setTableWidth: (value: SetStateAction<number>) => void;
}

interface IStringHtml {
  [N: string]: HTMLElement;
}

export function TableHead({
  appState,
  sortBy,
  tableWidth,
  setTableWidth,
}: IProps) {
  const [colWidths, setColWidths] = useImmer<number[]>([]);
  const [colsWidthObj, setColsWidthObj] = useState<IColsWidth>({
    ...colsWidthInit,
  });

  const colsWidthObjZu = useAppStore((st) => st.colsWidth[appState.sechID]);
  const tableWidthZu = useAppStore((st) => st.tableWidth[appState.sechID]);

  useLayoutEffect(() => {
    console.log('useLayoutEffect(() => {},[])');
    if (tableWidthZu) {
      setColsWidthObj(colsWidthObjZu);
      setTableWidth(tableWidthZu);
    } else {
      const initialTableWidth = Object.values(colsWidthObj).reduce(
        (sum, item) => (sum += item),
        0
      );
      setTableWidth(initialTableWidth);
    }
  }, []);

  const startX = useRef(0);
  const startColWidth = useRef(0);
  const startTableWidth = useRef(0);
  const thRefs = useRef<HTMLElement[]>([]);
  const refThsObj = useRef<IStringHtml>({});

  // useMemo(() => {
  //   const initialColWidths = appState.colOrder.map(
  //     (colName) => colsWidthInit[colName]
  //   );
  //   const initialTableWidth = initialColWidths.reduce(
  //     (sum, item) => (sum += item),
  //     0
  //   );
  //   setColWidths(initialColWidths);
  //   setTableWidth(initialTableWidth);
  // }, [appState.colOrder]);

  function onDragStartTh(e: React.DragEvent, i: number, param: string) {
    startX.current = e.clientX;
    // startColWidth.current = colWidths[i];
    startColWidth.current = colsWidthObj[param];
    startTableWidth.current = tableWidth;
    console.log(
      'onDragStart',
      colsWidthObj[param],
      Object.values(colsWidthObj).reduce((sum, item) => sum + item, 0),
      tableWidth
    );
  }

  // function onMouseDownRes(e: React.MouseEvent, i: number) {
  //   startX.current = e.clientX;
  //   startColWidth.current = colWidths[i];
  //   startTableWidth.current = tableWidth;
  //   console.log('onDragStart', 'e.clientX:', e.clientX, { i });
  // }

  function onDragTh(e: React.DragEvent, i: number, param: keyof IColsWidth) {
    if (e.clientY <= 0) return; // исключить последнее значение drgon т.к. оно всегда косячное
    let colWidthInc = e.clientX - startX.current;

    // setColWidths((draft) => {
    //   draft[i] = startColWidth.current + colWidthInc;
    // });

    setColsWidthObj((st) => ({
      ...st,
      [param]: startColWidth.current + colWidthInc,
    }));

    setTableWidth(startTableWidth.current + colWidthInc);

    console.log(
      'onDrag',
      e.clientX,
      e.clientY,
      startX.current,
      colWidthInc,
      colsWidthObj[param],
      Object.values(colsWidthObj).reduce((sum, item) => sum + item, 0),
      tableWidth
    );
  }

  function onDragEndTh(e: React.DragEvent, i: number, param: string) {
    // setColWidths((draft) => {
    //   let newColWidthCalc = startColWidth.current + e.clientX - startX.current;
    //   if (newColWidthCalc < thRefs.current[i].clientWidth) {
    //     newColWidthCalc = thRefs.current[i].clientWidth;
    //   }
    //   draft[i] = newColWidthCalc - 14;
    // });

    setColsWidthObj((st) => {
      let newColWidthCalc = startColWidth.current + e.clientX - startX.current;
      if (newColWidthCalc < refThsObj.current[param].clientWidth) {
        newColWidthCalc = refThsObj.current[param].clientWidth;
      }
      console.log({ ...st, [param]: newColWidthCalc - 38 });
      return { ...st, [param]: newColWidthCalc - 38 };
    });

    setTableWidth((st) => {
      let sum2 = Object.values(colsWidthObj).reduce(
        (sum, item) => sum + item,
        0
      );
      return sum2;
    });

    console.log(
      'onDragEnd',
      colsWidthObj[param],
      Object.values(colsWidthObj).reduce((sum, item) => sum + item, 0),
      tableWidth
    );
    // setTableWidth((st) => {
    //   let sum1 = thRefs.current.reduce(
    //     (sum: number, item: any) => sum + item.clientWidth,
    //     0
    //   );
    //   console.log({ sum1 });
    //   return sum1 - 14;
    // });
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
                // minWidth: colWidths[i],
                // width: colsWidthObj[param],
                minWidth: colsWidthObj[param],
              }}
              // ref={(el) => (thRefs.current[i] = el!)}
              ref={(el) => (refThsObj.current[param] = el!)}
            >
              {colFullName[param]}
              <div
                className={styles.resizer}
                draggable={true}
                onDragStart={(e) => onDragStartTh(e, i, param)}
                // onMouseDown={(e) => onMouseDownRes(e, i)}
                onDrag={(e) => onDragTh(e, i, param)}
                onDragEnd={(e) => onDragEndTh(e, i, param)}
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
