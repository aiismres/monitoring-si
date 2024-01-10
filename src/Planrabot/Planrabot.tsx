import React, { useEffect, useState } from 'react';
import styles from './planrabot.css';
import { IAppState, Ot, SechArr } from '../app.types';
import { TextEditor } from '../TextEditor';

interface Props {
  appState: IAppState;
  setAppState: (arg: IAppState) => void;
}

export function Planrabot({ appState, setAppState }: Props) {
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
  return (
    <>
      <h2>План работ</h2>
      {/* <TextEditor /> */}
      <table>
        <tbody>
          {sechArr.map((sechData, sechIndex) => {
            const otAmount = sechData.metrology.length;
            return sechData.metrology.map((otId, otIndex) => {
              const ot = otArr.find((item) => item._id === otId);
              // if (otIndex === 0) {
              return (
                <tr>
                  {otIndex === 0 && (
                    <td rowSpan={otAmount} width={200}>
                      {sechData.naimSechShort}
                    </td>
                  )}
                  {otIndex === 0 && (
                    <td rowSpan={otAmount}>{sechData.vidRabot}</td>
                  )}
                  {otIndex === 0 && (
                    <td rowSpan={otAmount}>{sechData.soglGtp}</td>
                  )}
                  {otIndex === 0 && (
                    <td rowSpan={otAmount}>{sechData.dopusk}</td>
                  )}
                  {otIndex === 0 && <td rowSpan={otAmount}>{sechData.sdAs}</td>}
                  {otIndex === 0 && (
                    <td rowSpan={otAmount}>{sechData.krSrokPodachi}</td>
                  )}
                  {otIndex === 0 && (
                    <td rowSpan={otAmount}>{sechData.planPodachi}</td>
                  )}
                  {/* {otIndex === 0 && (
                    <td rowSpan={otAmount}>{sechData.metrologyKomm}</td>
                  )} */}
                  {otIndex === 0 && (
                    <td
                      rowSpan={otAmount}
                      width={200}
                      dangerouslySetInnerHTML={{
                        __html: sechData.metrologyKomm,
                      }}
                    ></td>
                  )}
                  <td>{ot?.gr}</td>
                  <td>{ot?.naimAiis2}</td>
                  <td>{ot?.sdSop}</td>
                  <td>{ot?.izmAiis}</td>
                  <td>{ot?.tipIzmOt}</td>
                  <td>{ot?.neobhRab}</td>
                  <td>{ot?.rabZaplan}</td>
                  <td>{ot?.dogFact ? ot?.dogFact : ot?.dogPlan}</td>
                  <td>{ot?.smrFact ? ot?.smrFact : ot?.smrPlan}</td>
                  <td>{ot?.vyezdFact ? ot?.vyezdFact : ot?.vyezdPlan}</td>
                  <td>{ot?.vniimsFact ? ot?.vniimsFact : ot?.vniimsPlan}</td>
                  <td>{ot?.rstFact ? ot?.rstFact : ot?.rstPlan}</td>
                  <td>{ot?.prikazFact ? ot?.prikazFact : ot?.prikazPlan}</td>
                  <td>{ot?.oforSopFact ? ot?.oforSopFact : ot?.oforSopPlan}</td>
                  {/* <td>{ot?.kommOt}</td> */}
                  <td
                    dangerouslySetInnerHTML={{
                      __html: ot?.kommOt || '',
                    }}
                  ></td>
                  {otIndex === 0 && (
                    <td rowSpan={otAmount}>{sechData.codirovkaActual}</td>
                  )}
                  {otIndex === 0 && (
                    <td rowSpan={otAmount}>{sechData.tipIzmCodirovki}</td>
                  )}
                  {otIndex === 0 && (
                    <td
                      rowSpan={otAmount}
                      dangerouslySetInnerHTML={{
                        __html: sechData.sv2 || '',
                      }}
                    ></td>
                  )}
                  {otIndex === 0 && (
                    <td
                      rowSpan={otAmount}
                      dangerouslySetInnerHTML={{
                        __html: sechData.pi || '',
                      }}
                    ></td>
                  )}
                  {otIndex === 0 && (
                    <td
                      rowSpan={otAmount}
                      dangerouslySetInnerHTML={{
                        __html: sechData.gotovnostUs || '',
                      }}
                    ></td>
                  )}
                  {otIndex === 0 && (
                    <td
                      rowSpan={otAmount}
                      dangerouslySetInnerHTML={{
                        __html: sechData.zakluchenie || '',
                      }}
                    ></td>
                  )}
                </tr>
              );
              // } else {
              //   return (
              //     <tr>
              //       <td>{ot?.gr}</td>
              //       <td>{ot?.naimAiis2}</td>
              //       <td>{ot?.sdSop}</td>
              //     </tr>
              //   );
              // }
            });
            // const otIndex = otArr.findIndex(
            //   (item) => item._id === sechData.metrology[0]
            // );
            // const trCondtent = appState.colOrderPlanRab.map((param) => {
            //   if (param === 'gr') {
            //     return <td>{otArr[otIndex]?.gr}</td>;
            //   } else if (param === 'metrologyKomm') {
            //     return (
            //       <td
            //         dangerouslySetInnerHTML={{ __html: sechArr[i][param] }}
            //       ></td>
            //     );
            //   } else {
            //     return <td>{sechArr[i][param]}</td>;
            //   }
            // });
            // return <tr>{trCondtent}</tr>;
          })}
        </tbody>
      </table>
    </>
  );
}
