import React, { forwardRef, useState } from 'react';
import styles from './sechitem.module.css';
import classNames from 'classnames';
import { IAppState, Ot, SechData } from '../../../app.types';
import { CellSech } from '../../CellSech';
import { CellStatusUS } from '../CellStatusUS';
import { CellDateUS } from '../CellDateUS';
import { CellOt } from '../../CellOt';
import {
  OtKeys,
  PagePlanrabotState,
  SechKeys,
  SelectCell,
} from '../../../pages/Planrabot';

type Props = {
  // otIndex: number;
  // otAmount: number;
  // ot: Ot | undefined;
  sechData: SechData;
  sechIndex: number;
  sechKeys: SechKeys;
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  setSelectCell: React.Dispatch<React.SetStateAction<SelectCell>>;
  setIsCalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pageState: PagePlanrabotState;
  setSechArr: React.Dispatch<React.SetStateAction<SechData[]>>;
  setAppState: React.Dispatch<React.SetStateAction<IAppState>>;
  otKeys: OtKeys;
  // otId: string;
  otArr: Ot[];
};

export const SechItem = forwardRef(function SechItem(
  {
    // otIndex,
    // otAmount,
    // ot,
    sechData,
    sechIndex,
    sechKeys,
    anchorEl,
    setAnchorEl,
    setSelectCell,
    setIsCalOpen,
    pageState,
    setSechArr,
    setAppState,
    otKeys,
    // otId,
    otArr,
  }: Props,
  ref: React.LegacyRef<HTMLTableRowElement>
) {
  const otAmount = sechData.metrology.length;
  return (
    <>
      {sechData.metrology.map((otId, otIndex) => {
        const ot = otArr.find((item) => item._id === otId);
        // if (!ot) {
        //   console.log('!ot', otId, sechData.naimSechShort);
        // } else {
        //   console.log('ot', otId, sechData.naimSechShort);
        // }
        return (
          <tr
            ref={ref}
            key={ot?._id}
            className={classNames({
              [styles.tr]: otIndex === sechData.metrology.length - 1,
            })}
          >
            {otIndex === 0 && (
              <th rowSpan={otAmount} className={styles.naimSechShortTh}>
                <div className={styles.naimSechShortDiv}>
                  {sechData.naimSechShort}
                </div>
              </th>
            )}
            {otIndex === 0 && (
              <td rowSpan={otAmount} className={styles.bgcWhite}>
                {sechData.vidRabot}
              </td>
            )}
            {otIndex === 0 && (
              <td
                rowSpan={otAmount}
                className={classNames(styles.noWrap, styles.bgcWhite)}
              >
                {sechData.soglGtp}
              </td>
            )}
            {otIndex === 0 && (
              <CellSech
                value={sechData.dopusk}
                otAmount={otAmount}
                sechIndex={sechIndex}
                param={sechKeys.dopusk}
                anchorEl={anchorEl}
                setSelectCell={setSelectCell}
                setAnchorEl={setAnchorEl}
                setIsCalOpen={setIsCalOpen}
              />
            )}
            {otIndex === 0 && (
              <CellSech
                value={sechData.sdAs}
                otAmount={otAmount}
                sechIndex={sechIndex}
                param={sechKeys.sdAs}
                anchorEl={anchorEl}
                setSelectCell={setSelectCell}
                setAnchorEl={setAnchorEl}
                setIsCalOpen={setIsCalOpen}
              />
            )}
            {otIndex === 0 && (
              <CellSech
                value={sechData.krSrokPodachi}
                otAmount={otAmount}
                sechIndex={sechIndex}
                param={sechKeys.krSrokPodachi}
                anchorEl={anchorEl}
                setSelectCell={setSelectCell}
                setAnchorEl={setAnchorEl}
                setIsCalOpen={setIsCalOpen}
              />
            )}
            {otIndex === 0 && (
              <CellStatusUS
                otAmount={otAmount}
                sechData={sechData}
                setSechArr={setSechArr}
                setAppState={setAppState}
                pageState={pageState}
              />
            )}
            {otIndex === 0 && (
              <CellDateUS
                sechData={sechData}
                otAmount={otAmount}
                pageState={pageState}
                setSechArr={setSechArr}
                setAppState={setAppState}
              />
            )}

            {otIndex === 0 && (
              <td
                rowSpan={otAmount}
                width={200}
                dangerouslySetInnerHTML={{
                  __html: sechData.metrologyKomm,
                }}
                className={classNames(styles.bgcWhite)}
              ></td>
            )}
            <td className={styles.noWrap}>{ot?.gr}</td>
            <td>{ot?.naimAiis2}</td>

            <CellOt
              value={ot?.sdSop}
              param={otKeys.sdSop}
              otId={otId}
              anchorEl={anchorEl}
              setSelectCell={setSelectCell}
              setAnchorEl={setAnchorEl}
              setIsCalOpen={setIsCalOpen}
            />

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
            <td
              dangerouslySetInnerHTML={{
                __html: ot?.kommOt || '',
              }}
            ></td>
            {otIndex === 0 && (
              <td rowSpan={otAmount} className={classNames(styles.bgcWhite)}>
                {sechData.codirovkaActual}
              </td>
            )}
            {otIndex === 0 && (
              <td
                rowSpan={otAmount}
                className={classNames(styles.noWrap, styles.bgcWhite)}
              >
                {sechData.tipIzmCodirovki}
              </td>
            )}
            {otIndex === 0 && (
              <td
                rowSpan={otAmount}
                dangerouslySetInnerHTML={{
                  __html: sechData.sv2 || '',
                }}
                className={classNames(styles.bgcWhite)}
              ></td>
            )}
            {otIndex === 0 && (
              <td
                rowSpan={otAmount}
                dangerouslySetInnerHTML={{
                  __html: sechData.pi || '',
                }}
                className={classNames(styles.bgcWhite)}
              ></td>
            )}
            {otIndex === 0 && (
              <td
                rowSpan={otAmount}
                dangerouslySetInnerHTML={{
                  __html: sechData.gotovnostUs || '',
                }}
                className={classNames(styles.bgcWhite)}
              ></td>
            )}
            {otIndex === 0 && (
              <td
                rowSpan={otAmount}
                dangerouslySetInnerHTML={{
                  __html: sechData.zakluchenie || '',
                }}
                className={classNames(styles.bgcWhite)}
              ></td>
            )}
            {otIndex === 0 && (
              <td
                rowSpan={otAmount}
                className={styles.bgcWhite}
                onClick={(e) => {}}
              >
                status
              </td>
            )}
            {otIndex === 0 && (
              <td rowSpan={otAmount} className={styles.bgcWhite}>
                date
              </td>
            )}
            {otIndex === 0 && (
              <td rowSpan={otAmount} className={styles.bgcWhite}>
                area
              </td>
            )}
          </tr>
        );
      })}
    </>
  );
});
