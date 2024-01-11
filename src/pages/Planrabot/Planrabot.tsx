import React, { useEffect, useState } from 'react';
import styles from './planrabot.module.css';
import { Ot, SechArr } from '../../app.types';
import { TextEditor } from '../../TextEditor';
import classNames from 'classnames';
import { AppBar, Button, ButtonGroup, Toolbar } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import SaveIcon from '@mui/icons-material/Save';
import { useSechData } from '../../hooks/useSechData';

interface Props {}

export function Planrabot() {
  const [sechArr, setSechArr, otArr, setOtArr] = useSechData();

  return (
    <>
      {/* <TextEditor /> */}
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.firstCellTh}>
              <div className={styles.firstCellDiv}>Сечение</div>
            </th>
            <th>вид работ</th>
            <th>Согл ГТП</th>
            <th>Допуск</th>
            <th>СД АС</th>
            <th>Кр-й срок подачи док</th>
            <th>План. дата подачи</th>
            <th>Комментарии</th>
            <th>№ ГР</th>
            <th>Наим. АИИС</th>
            <th>СД СОП</th>
            <th>Изм. АИИС</th>
            <th>Тип изм. АИИС</th>
            <th>Необх. работы</th>
            <th>Раб. запл.?</th>
            <th>Договор</th>
            <th>СМР</th>
            <th>Выезд</th>
            <th>ВНИИМС</th>
            <th>РСТ</th>
            <th>Приказ</th>
            <th>Оформл. СОП</th>
            <th>Комм. ОТ</th>
            <th>Кодировка актуал-а?</th>
            <th>Вид изм. код-и</th>
            <th>Св-2</th>
            <th>ПИ</th>
            <th>Готовность УС</th>
            <th>Заключ-е</th>
          </tr>
        </thead>
        <tbody>
          {sechArr.map((sechData, sechIndex) => {
            const otAmount = sechData.metrology.length;
            return sechData.metrology.map((otId, otIndex) => {
              const ot = otArr.find((item) => item._id === otId);
              // if (otIndex === 0) {
              return (
                <tr
                  className={classNames({
                    [styles.tr]: otIndex === sechData.metrology.length - 1,
                  })}
                >
                  {otIndex === 0 && (
                    <th rowSpan={otAmount} className={styles.naimSechShort}>
                      <div className={styles.naimSechShortDiv}>
                        {sechData.naimSechShort}
                      </div>
                    </th>
                  )}
                  {otIndex === 0 && (
                    <td rowSpan={otAmount}>{sechData.vidRabot}</td>
                  )}
                  {otIndex === 0 && (
                    <td rowSpan={otAmount} className={styles.noWrap}>
                      {sechData.soglGtp}
                    </td>
                  )}
                  {otIndex === 0 && (
                    <td rowSpan={otAmount} className={styles.noWrap}>
                      {sechData.dopusk}
                    </td>
                  )}
                  {otIndex === 0 && (
                    <td rowSpan={otAmount} className={styles.noWrap}>
                      {sechData.sdAs}
                    </td>
                  )}
                  {otIndex === 0 && (
                    <td rowSpan={otAmount} className={styles.noWrap}>
                      {sechData.krSrokPodachi}
                    </td>
                  )}
                  {otIndex === 0 && (
                    <td rowSpan={otAmount} className={styles.noWrap}>
                      {sechData.planPodachi}
                    </td>
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
                  <td className={styles.noWrap}>{ot?.gr}</td>
                  <td>{ot?.naimAiis2}</td>
                  <td className={styles.noWrap}>{ot?.sdSop}</td>
                  <td>{ot?.izmAiis}</td>
                  <td>{ot?.tipIzmOt}</td>
                  <td>{ot?.neobhRab}</td>
                  <td>{ot?.rabZaplan}</td>
                  <td className={styles.noWrap}>
                    {ot?.dogFact ? ot?.dogFact : ot?.dogPlan}
                  </td>
                  <td className={styles.noWrap}>
                    {ot?.smrFact ? ot?.smrFact : ot?.smrPlan}
                  </td>
                  <td className={styles.noWrap}>
                    {ot?.vyezdFact ? ot?.vyezdFact : ot?.vyezdPlan}
                  </td>
                  <td className={styles.noWrap}>
                    {ot?.vniimsFact ? ot?.vniimsFact : ot?.vniimsPlan}
                  </td>
                  <td className={styles.noWrap}>
                    {ot?.rstFact ? ot?.rstFact : ot?.rstPlan}
                  </td>
                  <td className={styles.noWrap}>
                    {ot?.prikazFact ? ot?.prikazFact : ot?.prikazPlan}
                  </td>
                  <td className={styles.noWrap}>
                    {ot?.oforSopFact ? ot?.oforSopFact : ot?.oforSopPlan}
                  </td>
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
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <ButtonGroup>
            <Button
              variant="contained"
              // disabled={!isLoggedin}
              // color={appState.isEdit2 ? 'warning' : 'primary'}
              sx={{ width: 80 }}
              // onClick={() => {
              //   if (!appState.isEdit2) {
              //     siArrHistory.current = [siState];
              //   }
              //   setAppState((st) => ({ ...st, isEdit2: !st.isEdit2 }));
              // }}
            >
              {/* {!appState.isEdit2 ? 'read' : 'edit'} */}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              // disabled={siArrHistory.current.length < 2}
              // onClick={(e) => {
              //   // const prevIndex = siArrHistory.current.length - 2;
              //   if (siArrHistory.current.length - 2 >= 0) {
              //     setSiState(
              //       siArrHistory.current[siArrHistory.current.length - 2]
              //     );
              //     siArrHistory.current.pop();
              //   }
              // }}
            >
              <UndoIcon />
            </Button>
            <Button
              variant="contained"
              color="error"
              // disabled={appState.isSiStateSave}
              // onClick={saveSiData}
            >
              <SaveIcon />
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </>
  );
}
