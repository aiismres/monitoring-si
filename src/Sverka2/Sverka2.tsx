import React from 'react';
import { IPowProf82 } from '../app.types';
import styles from './sverka2.module.css';

export function Sverka2() {
  return (
    <>
      <div>Страница Сверка-2</div>;
      <button
        onClick={(e) => {
          const powProf82: IPowProf82 = {
            k01: [],
            k02: [],
            k03: [],
            k04: [],
          };

          navigator.clipboard
            .readText()
            .then((text) => {
              console.log('Pasted content: ');
              const rows = text.split('\r\n');
              rows.pop(); // удаляется последний элемент '', к. непонятно откуда берется
              rows.forEach((row) => {
                let arr30 = row.split('\t');
                console.log(arr30);
                powProf82.k01.push(Number(arr30[0]));
                powProf82.k02.push(Number(arr30[1]));
                powProf82.k03.push(Number(arr30[2]));
                powProf82.k04.push(Number(arr30[3]));
              });
              console.log(powProf82);
            })
            .catch((err) => {
              console.error('Failed to read clipboard contents: ', err);
            });
        }}
      >
        paste
      </button>
      {/* <input
            type="text"
            onPaste={(e) => {
              console.log(e.clipboardData.getData('Text'));
              console.log(e.clipboardData.getData('text/plain'));
              console.log(e.clipboardData.getData('text/html'));
              console.log(e.clipboardData.getData('text/rtf'));
            }}
          /> */}
    </>
  );
}
