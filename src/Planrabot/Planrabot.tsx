import React, { useEffect, useState } from 'react';
import styles from './planrabot.css';
import { IAppState } from '../app.types';

interface Props {
  appState: IAppState;
  setAppState: (arg: IAppState) => void;
}

export function Planrabot({ appState, setAppState }: Props) {
  const [sechArr, setSechArr] = useState([]);
  const [otArr, setOtArr] = useState([]);

  useEffect(() => {
    (async () => {
      let responseSech = await fetch('/api/readsech');

      if (responseSech.ok) {
        const secheniya = await responseSech.json();
        console.log('secheniya', secheniya);
        setSechArr(secheniya);
      } else {
        alert('Ошибка HTTP: ' + responseSech.status);
      }

      let responseOt = await fetch('/api/readot');

      if (responseOt.ok) {
        const ot = await responseOt.json();
        console.log('ot', ot);
        setOtArr(ot);
      } else {
        alert('Ошибка HTTP: ' + responseOt.status);
      }
    })();
  }, []);
  return (
    <>
      <h2>План работ</h2>
      <table>
        <tbody>
          {sechArr.map((sechData, i) => {
            return <tr>tr</tr>;
          })}
        </tbody>
      </table>
    </>
  );
}
