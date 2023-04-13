import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IColsWidth, colsWidthInit } from './modules/constants';
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
