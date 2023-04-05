import React, { SetStateAction, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './filedropzone.module.css';
import { nanoid } from 'nanoid';
import { colFullName, colOrderObj, sameChar } from '../modules/constants';
import { read60xmlMod } from '../modules/read60xmlMod';
import { read80xmlMod } from '../modules/read80xmlMod';
import { readSv1xlsx } from '../modules/readSv1xlsx';
import { readDBxlsxMod } from '../modules/readDBxlsxMod';
import { checkData } from '../modules/checkDataMod';
import { IAppState, ISechInfo, ISiObj1 } from '../app.types';

interface IProps {
  siState: ISiObj1[];
  setSiState: (value: SetStateAction<ISiObj1[]>) => void;
  setAppState: (value: SetStateAction<IAppState>) => void;
  setSechInfo: (value: SetStateAction<ISechInfo>) => void;
}

export function FileDropZone({
  siState,
  setSiState,
  setAppState,
  setSechInfo,
}: IProps) {
  const onDrop = useCallback(
    (files: File[]) => {
      // Do something with the files
      // console.log(files);
      let file = files[0];
      (async () => {
        // console.log(siState);
        if (file.name.includes('60000') || file.name.includes('60002')) {
          let [data, source60, isPre60] = (await read60xmlMod(
            file,
            siState
          )) as [ISiObj1[], string, boolean];
          console.log(data, source60);
          if (isPre60) {
            setAppState((appState) => ({
              ...appState,
              colOrder: colOrderObj.opt3,
            }));
          }
          data = checkData(data);
          setSiState(data);
          setAppState((appState) => ({
            ...appState,
            isSiStateSave: false,
          }));
          setSechInfo((sechInfo) => ({ ...sechInfo, source60 }));
        } else if (file.name.includes('80000')) {
          let [data, areaCode, areaName] = (await read80xmlMod(
            file,
            siState
          )) as [ISiObj1[], string, string];
          console.log(data);
          data = checkData(data);
          setSiState(data);
          setAppState((appState) => ({
            ...appState,
            isSiStateSave: false,
          }));
          setSechInfo((sechInfo) => ({
            ...sechInfo,
            areaCode,
            areaName,
            amountTi: data.length,
          }));
        } else if (
          file.name.includes('Сверка 1') ||
          file.name.includes('Сверка-1') ||
          file.name.includes('resultSv1')
        ) {
          let data = (await readSv1xlsx(file)) as ISiObj1[];
          data = checkData(data);
          setSiState(data);
          setAppState((appState) => ({
            ...appState,
            isSiStateSave: false,
          }));
        } else if (file.name.includes('Сопоставление ТУ и кодов 80020')) {
          let [data, sourceDB] = (await readDBxlsxMod(file, siState)) as [
            ISiObj1[],
            string
          ];
          data = checkData(data);
          setSiState(data);
          setAppState((appState) => ({
            ...appState,
            isSiStateSave: false,
          }));
          setSechInfo((sechInfo) => ({ ...sechInfo, sourceDB }));
        } else {
          alert(`
          Не соответствует ни одному импрту

          ${files[0].name} `);
        }
      })();
    },
    [siState]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={styles.dropzone} {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop files here Св-1 / БД / 80 / 60</p>
      )}
    </div>
  );
}
