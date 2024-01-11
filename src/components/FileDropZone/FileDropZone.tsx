import React, { SetStateAction, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './filedropzone.module.css';
import { nanoid } from 'nanoid';
import { colFullName, colOrderObj, sameChar } from '../../lib/constants';
import { read60xmlMod } from '../../lib/read60xmlMod';
import { read80xmlMod } from '../../lib/read80xmlMod';
import { readSv1xlsx } from '../../lib/readSv1xlsx';
import { readDBxlsxMod } from '../../lib/readDBxlsxMod';
import { checkData } from '../../lib/checkDataMod';
import { IAppState, ISechInfo, ISiObj1 } from '../../app.types';
import { read82xmlMod } from '../../lib/read82xmlMod';
import { readDbMirxlsxMod } from '../../lib/readDbMirXlsxMod';
import { readDbSalavatXlsxMod } from '../../lib/readDbSalavatXlsxMod';

interface IProps {
  siState: ISiObj1[];
  setSiState: (value: SetStateAction<ISiObj1[]>) => void;
  setAppState: (value: SetStateAction<IAppState>) => void;
  setSechInfo: (value: SetStateAction<ISechInfo>) => void;
  only82xml: boolean;
  kodTi?: string;
}

export function FileDropZone({
  siState,
  setSiState,
  setAppState,
  setSechInfo,
  only82xml,
  kodTi,
}: IProps) {
  const onDrop = useCallback(
    (files: File[]) => {
      // Do something with the files
      // console.log(files);
      let file = files[0];
      (async () => {
        console.log(file.name);
        if (
          file.name.includes('60000_') ||
          (file.name.includes('60002_') && !only82xml)
        ) {
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
        } else if (file.name.includes('80000_') && !only82xml) {
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
          (file.name.includes('Сверка 1') ||
            file.name.includes('Сверка-1') ||
            file.name.includes('resultSv1')) &&
          !only82xml
        ) {
          let data = (await readSv1xlsx(file)) as ISiObj1[];
          data = checkData(data);
          setSiState(data);
          setAppState((appState) => ({
            ...appState,
            isSiStateSave: false,
          }));
        } else if (
          file.name.includes('Сопоставление ТУ и кодов 80020') &&
          !only82xml
        ) {
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
        } else if (file.name.includes('Отчет1') && !only82xml) {
          let [data, sourceDB] = (await readDbMirxlsxMod(file, siState)) as [
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
        } else if (file.name.includes('БД ГН Салават') && !only82xml) {
          let [data, sourceDB] = (await readDbSalavatXlsxMod(
            file,
            siState
          )) as [ISiObj1[], string];
          data = checkData(data);
          setSiState(data);
          setAppState((appState) => ({
            ...appState,
            isSiStateSave: false,
          }));
          setSechInfo((sechInfo) => ({ ...sechInfo, sourceDB }));
        } else if (file.name.includes('80020_') && only82xml) {
          console.log('import 80020');
          let [data, areaCode, areaName] = (await read82xmlMod(
            file,
            siState,
            kodTi
          )) as [ISiObj1[], string, string];
          console.log(data);
          setSiState(data);
          setAppState((appState) => ({
            ...appState,
            isSiStateSave: false,
          }));
        } else {
          alert(`
          Не соответствует ни одному импорту
          название файла должно содержать одно из:
          - 80020_ / 80000_ / 60000_ / 60002_
          - БД ГН Салават (для xlsx БД ГН Салават)
          - Отчет1 (для xlsx БД ННГ)
          - Сопоставление ТУ и кодов 80020 (для xlsx БД ГПЭ)
          - resultSv1 / Сверка 1 / Сверка-1


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
      ) : !only82xml ? (
        <p>Drag 'n' drop files here Св-1 / БД / 80 / 60</p>
      ) : (
        <p>Drag 'n' drop file here 82xml</p>
      )}
    </div>
  );
}
function readDbSalavetXlsxMod(
  file: File,
  siState: ISiObj1[]
): [ISiObj1[], string] | PromiseLike<[ISiObj1[], string]> {
  throw new Error('Function not implemented.');
}
