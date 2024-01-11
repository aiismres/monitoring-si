import { useEffect, useState } from 'react';
import { Ot, SechArr } from '../app.types';

export function useSechData() {
  const [sechArr, setSechArr] = useState<SechArr[]>([]);
  const [otArr, setOtArr] = useState<Ot[]>([]);

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

  return [sechArr, setSechArr, otArr, setOtArr] as const;
}
