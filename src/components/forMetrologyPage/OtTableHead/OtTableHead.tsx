import React from 'react';
import styles from './ottablehead.module.css';

export function OtTableHead() {
  return (
    <thead className={styles.table}>
      <tr>
        <th>ГР</th>
        <th>Наим 1</th>
        <th>Наим 2</th>
        <th>СД СОП</th>
        <th>изм</th>
        <th>тип изм</th>
        <th>Необх раб</th>
        <th>раб заплан</th>
        <th>Договор</th>
        <th>Выезд</th>
        <th>ВНИИМС</th>
        <th>РСТ</th>
        <th>Приказ</th>
        <th>Оформ СОП</th>
        <th>id</th>
      </tr>
    </thead>
  );
}
