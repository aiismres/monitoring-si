import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IColsWidth } from './modules/constants';

interface IAppStore {
  colsWidth: { [name: string]: IColsWidth };
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
}

export const useAppStore = create<IAppStore>()(
  devtools(
    persist(
      (set) => ({
        colsWidth: {
          v: {
            numTiShem60Pre: 55,
            kodTi60Pre: 130,
            naimTi60Pre: 200,
            tipSch60Pre: 80,
            kanaly60Pre: 70,
            numTiShem60: 55,
            kodTi60: 130,
            naimTi60: 200,
            tipSch60: 95,
            kanaly60: 70,
            // tiAiis: "ТИ в АИИС",
            gr: 95,
            numTiSop: 50,
            naimTiSop: 200,
            naimTi80: 200,
            naimTi82: 150,
            numSchDB: 80,
            numSchSop: 80,
            numSchSch: 80,
            tipSchSop: 80,
            tipSch80: 80,
            tipSchSch: 80,
            tipSchDB: 80,
            kttSop: 40,
            kttDB: 40,
            ktnSop: 40,
            ktnDB: 40,
            kodTi80: 130,
            kanaly80: 70,
          },
        },
        bears: 0,
        increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
        removeAllBears: () => set({ bears: 0 }),
      }),
      {
        name: 'monSiAppStorage',
      }
    )
  )
);
