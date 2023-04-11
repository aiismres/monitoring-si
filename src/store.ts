import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IColsWidth, colsWidthInit } from './modules/constants';
import produce from 'immer';

interface IAppStore {
  colsWidth: { [name: string]: IColsWidth };
  tableWidth: { [name: string]: number };
  setZuTableWidth: (sechId: string, tableWidth: number) => void;
  setZuColsWidth: (sechId: string, colsWidthObj: IColsWidth) => void;
  // bears: number;
  // increasePopulation: () => void;
  // removeAllBears: () => void;
  // updateZuColWidth: (
  //   sechId: string,
  //   param: keyof IColsWidth,
  //   colWidth: number
  // ) => void;
}

export const useAppStore = create<IAppStore>()(
  devtools(
    // persist(
    (set) => ({
      colsWidth: {
        sechIdInit: colsWidthInit,
      },
      tableWidth: {
        sechIDinit: 2700,
      },

      setZuTableWidth: (sechId, tableWidth) =>
        set(
          produce((state: IAppStore) => {
            state.tableWidth[sechId] = tableWidth;
          })
        ),

      setZuColsWidth: (sechId, colsWidthObj) =>
        set(
          produce((state) => {
            state.colsWidth[sechId] = colsWidthObj;
          })
        ),

      // bears: 0,
      // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
      // removeAllBears: () => set({ bears: 0 }),

      // setZuTableWidth: (sechId, tableWidth) =>
      //   set((state) => ({
      //     tableWidth: { ...state.tableWidth, [sechId]: tableWidth },
      //   })),

      // updateZuColWidth: (sechId, param, colWidth) =>
      //   set(
      //     produce((state) => {
      //       state.colsWidth[sechId][param] = colWidth;
      //     })
      //   ),
    })
    //   ,
    //   {
    //     name: 'monSiAppStorage',
    //   }
    // )
  )
);
