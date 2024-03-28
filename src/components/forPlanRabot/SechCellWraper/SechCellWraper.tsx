import React from 'react';
import styles from './sechcellwraper.module.css';
import { PagePlanrabotState2 } from '../../../pages/Planrabot2';
import { Ot, SechData } from '../../../app.types';

import { CellStatusUS2 } from '../CellStatusUS2';
import { CellDateSech } from '../CellDateSech';
import { CellDateSech2 } from '../CellDateSech2';
import { Pages } from '@mui/icons-material';
import { OtItem3 } from '../OtItem3';
// import { useAppStore2 } from '../../../store';

type Props = {
  pageState: PagePlanrabotState2;
  sechData: SechData;
  sechParam: keyof SechData;
  otArr: Ot[];
};

export function SechCellWraper({
  pageState,
  sechData,
  sechParam,
  otArr,
}: Props) {
  // const incOtIndex = useAppStore2((state) => state.incOtIndex);

  if (
    [
      'vidRabot',
      'krSrokPodachi',
      'codirovkaActual',
      'soglGtp',
      'dopusk',
    ].includes(sechParam)
  ) {
    return <td>{sechData[sechParam]}</td>;
  } else if (sechParam === 'statusUS') {
    return <CellStatusUS2 sechData={sechData} pageState={pageState} />;
  } else if (sechParam === 'sdAs' || sechParam === 'planPodachi') {
    return (
      <CellDateSech2
        param={sechParam}
        sechData={sechData}
        pageState={pageState}
      />
    );
  } else if (sechParam === 'metrology') {
    return (
      <td className={styles.metrTd}>
        <table className={styles.metrTable}>
          <tbody>
            {sechData.metrology.map((otId, i) => {
              return (
                // <OtItem2
                //   key={otId}
                //   otData={otArr.find((ot) => ot._id === otId)}
                //   pageState={pageState}
                // />
                <OtItem3
                  key={otId}
                  ot={otArr.find((ot) => ot._id === otId)}
                  pageState={pageState}
                />
              );
            })}
          </tbody>
        </table>
      </td>
    );
  } else if (sechParam === 'metrologyKomm') {
    return <td dangerouslySetInnerHTML={{ __html: sechData[sechParam] }}></td>;
  } else {
    return <td></td>;
  }
}
