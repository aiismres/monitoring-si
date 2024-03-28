import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IColsWidth, colsWidthInit } from './lib/constants';
import produce from 'immer';

interface IAppStore {
  colsWidth: { [name: string]: IColsWidth };
  tableWidth: { [name: string]: number };
  setZuColsWidth: (sechId: string, colsWidthObj: IColsWidth) => void;
  setZuTableWidth: (sechId: string, tableWidth: number) => void;
}

export const useAppStore = create<IAppStore>()(
  devtools(
    persist(
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
      }),
      {
        name: 'monSiAppStorage',
      }
    )
  )
);

interface IAppStore2 {
  otIndex: number;
  incOtIndex: () => void;
}

export const useAppStore2 = create<IAppStore2>()(
  devtools((set) => ({
    otIndex: 0,
    incOtIndex: () => set((state) => ({ otIndex: state.otIndex + 1 })),
  }))
);
