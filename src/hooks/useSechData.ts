import { useEffect, useState } from 'react';
import { Ot, SechData } from '../app.types';
import { useParams } from 'react-router-dom';

export function useSechData() {
  const [sechArr, setSechArr] = useState<SechData[]>([]);
  const [otArr, setOtArr] = useState<Ot[]>([]);
  const { company } = useParams();
  console.log(company);
  useEffect(() => {
    (async () => {
      let responseSech = await fetch('/api/readsech');

      if (responseSech.ok) {
        const secheniya: SechData[] = await responseSech.json();
        console.log('secheniya', secheniya);
        secheniya.sort((a, b) => {
          if (a.planPodachi && !b.planPodachi) {
            return (
              new Date(a.planPodachi).getTime() -
              new Date(b.krSrokPodachi).getTime()
            );
          } else if (b.planPodachi && !a.planPodachi) {
            return (
              new Date(a.krSrokPodachi).getTime() -
              new Date(b.planPodachi).getTime()
            );
          } else if (a.planPodachi && b.planPodachi) {
            return (
              new Date(a.planPodachi).getTime() -
              new Date(b.planPodachi).getTime()
            );
          } else {
            return (
              new Date(a.krSrokPodachi).getTime() -
              new Date(b.krSrokPodachi).getTime()
            );
          }
        });
        if (company === 'gpe') {
          setSechArr(
            secheniya.filter((sech) => sech.sobstvAiis.includes('ГПЭ'))
          );
        } else {
          setSechArr(secheniya);
        }
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
