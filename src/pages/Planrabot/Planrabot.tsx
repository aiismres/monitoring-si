import React, { useEffect, useState } from 'react';
import styles from './planrabot.module.css';
import { Ot, SechArr } from '../../app.types';
import { TextEditor } from '../../components/TextEditor';
import classNames from 'classnames';
import {
  AppBar,
  Button,
  ButtonGroup,
  Fade,
  Paper,
  Popper,
  Toolbar,
  Typography,
} from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import SaveIcon from '@mui/icons-material/Save';
import { useSechData } from '../../hooks/useSechData';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import dayjs_ru from 'dayjs/locale/ru';
import {
  DateCalendar,
  DatePicker,
  StaticDatePicker,
} from '@mui/x-date-pickers';
import { position } from 'jodit/types/core/helpers';
import produce from 'immer';
import { KeyTwoTone } from '@mui/icons-material';
import { CellPRDate } from '../../components/CellPRDate';
import { CalendarPopSimple } from '../../components/CalendarPopSimple';
import { CellSech } from '../../components/CellSech';
import { CellOt } from '../../components/CellOt';

// dayjs.locale(dayjs_ru);
interface Props {}
interface PageState {}

export interface SelectCell {
  sechIndex: number | null;
  otId: string | null;
  sechParam: keyof SechArr | null;
  otParam: keyof Ot | null;
  value: string;
}

export interface SechKeys {
  [key: string]: keyof SechArr;
}

export interface OtKeys {
  [key: string]: keyof Ot;
}

export function isKeyOfSechData(
  val: any,
  sechArr: SechArr
): val is keyof SechArr {
  if (val in sechArr) {
    return true;
  } else {
    return false;
  }
}

export function isKeyOfOt(val: any, ot?: Ot): val is keyof Ot {
  // console.log(val, ot);
  if (!ot) {
    return false;
  }
  if (val in ot) {
    return true;
  } else {
    return false;
  }
}

export function Planrabot() {
  const [sechArr, setSechArr, otArr, setOtArr] = useSechData();
  const [isCalOpen, setIsCalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [pageState, setPageState] = useState<PageState>({});
  const [selectCell, setSelectCell] = useState<SelectCell>({
    sechIndex: null,
    otId: null,
    sechParam: null,
    otParam: null,
    value: '',
  });

  const sechKeys: SechKeys = {};

  for (const key in sechArr[0]) {
    if (isKeyOfSechData(key, sechArr[0])) {
      sechKeys[key] = key;
    }
  }

  // console.log('sechKeys', sechKeys);

  const otKeys: OtKeys = {};

  for (const key in otArr[0]) {
    if (isKeyOfOt(key, otArr[0])) {
      otKeys[key] = key;
    }
  }

  console.log('sechKeys', sechKeys);

  function openCalendar(
    event: React.MouseEvent<HTMLElement>,
    sechData: SechArr,
    sechIndex: number,
    otId: string,
    param: keyof SechArr,
    value: string
  ) {
    console.log(sechData, sechIndex, otId);
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setIsCalOpen((ico) => !ico);
    // setSelectCell({ sechIndex, otId, param, value });
  }

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
                      // onClick={(e) => {
                      //   openCalendar(
                      //     e,
                      //     sechData,
                      //     sechIndex,
                      //     otIndex,
                      //     'soglGtp'
                      //   );
                      // }}
                    >
                      {sechData.soglGtp}
                    </td>
                  )}
                  {otIndex === 0 && (
                    // <td
                    //   rowSpan={otAmount}
                    //   className={classNames(styles.noWrap, styles.bgcWhite)}
                    //   // onClick={(e) => {
                    //   //   openCalendar(e, sechData, sechIndex, otIndex, 'dopusk');
                    //   // }}
                    // >
                    //   {sechData.dopusk}
                    // </td>
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
                    // <td
                    //   rowSpan={otAmount}
                    //   className={classNames(styles.noWrap, styles.bgcWhite)}
                    //   onClick={(e) => {
                    //     openCalendar(e, sechData, sechIndex, otIndex, 'sdAs');
                    //   }}
                    // >
                    //   {sechData.sdAs}
                    // </td>
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
                    // <CellPRDate
                    //   value={sechData.sdAs}
                    //   sechData={sechData}
                    //   ot={ot}
                    //   otAmount={otAmount}
                    //   sechIndex={sechIndex}
                    //   otIndex={otIndex}
                    //   param={otKeys.sdAs}
                    //   anchorEl={anchorEl}
                    //   setAnchorEl={setAnchorEl}
                    //   setIsCalOpen={setIsCalOpen}
                    //   setSelectCell={setSelectCell}
                    //   setSechArr={setSechArr}
                    //   setOtArr={setOtArr}
                    // />
                  )}
                  {otIndex === 0 && (
                    // <td
                    //   rowSpan={otAmount}
                    //   className={classNames(styles.noWrap, styles.bgcWhite)}
                    // >
                    //   {sechData.krSrokPodachi}
                    // </td>
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
                    // <td
                    //   rowSpan={otAmount}
                    //   className={classNames(styles.noWrap, styles.bgcWhite)}
                    //   // onClick={(e) => {
                    //   //   openCalendar(
                    //   //     e,
                    //   //     sechData,
                    //   //     sechIndex,
                    //   //     otIndex,
                    //   //     'planPodachi'
                    //   //   );
                    //   // }}
                    // >
                    //   {sechData.planPodachi}
                    // </td>
                    <CellSech
                      value={sechData.planPodachi}
                      otAmount={otAmount}
                      sechIndex={sechIndex}
                      param={sechKeys.planPodachi}
                      anchorEl={anchorEl}
                      setSelectCell={setSelectCell}
                      setAnchorEl={setAnchorEl}
                      setIsCalOpen={setIsCalOpen}
                    />
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
                      className={classNames(styles.bgcWhite)}
                    ></td>
                  )}
                  <td className={styles.noWrap}>{ot?.gr}</td>
                  <td>{ot?.naimAiis2}</td>
                  {/* <td
                    className={styles.noWrap}
                    onClick={(e) => {
                      const param = 'sdSop';
                      if (isKeyOfSechData(param, sechData)) {
                        openCalendar(e, sechData, sechIndex, otIndex, param);
                      }
                    }}
                  >
                    {ot?.sdSop}
                  </td> */}
                  <CellOt
                    value={ot?.sdSop}
                    param={otKeys.sdSop}
                    otId={otId}
                    anchorEl={anchorEl}
                    setSelectCell={setSelectCell}
                    setAnchorEl={setAnchorEl}
                    setIsCalOpen={setIsCalOpen}
                  />
                  {/* <CellPRDate
                    value={ot?.sdSop || ''}
                    sechData={sechData}
                    ot={ot}
                    otAmount={1}
                    sechIndex={sechIndex}
                    otIndex={otIndex}
                    param={sechKeys.sdSop}
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    setIsCalOpen={setIsCalOpen}
                    setSelectCell={setSelectCell}
                    setSechArr={setSechArr}
                    setOtArr={setOtArr}
                  /> */}
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
                    <td
                      rowSpan={otAmount}
                      className={classNames(styles.bgcWhite)}
                    >
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
              read
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
          {/* <DatePicker
          // defaultValue={dayjs('2022-04-17')}
          // sx={{ display: 'none' }}
          /> */}
        </Toolbar>
      </AppBar>
      {/* <Popper
        // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
        sx={{ zIndex: 1200 }}
        open={isCalOpen}
        anchorEl={anchorEl}
        placement="auto"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              elevation={5}
              sx={{ position: 'relative', p: 1, borderRadius: 2 }}
            >
              <DateCalendar
                sx={{ bgcolor: 'white' }}
                views={['year', 'month', 'day']}
                onYearChange={() => {
                  setIsCalOpen(true);
                }}
                onMonthChange={() => {
                  setIsCalOpen(true);
                }}
                onChange={(e) => {
                  setIsCalOpen(false);
                  setAnchorEl(null);
                  setSechArr(
                    produce((draft: SechArr[]) => {
                      console.log('!');
                      if (
                        selectCell.param &&
                        selectCell.sechIndex &&
                        selectCell.param !== 'metrology'
                      ) {
                        console.log('!!');
                        draft[selectCell.sechIndex][selectCell.param] =
                          '9999-99-99';
                      }
                    })
                  );
                }}
              />
              <Button
                onClick={() => {
                  setIsCalOpen(false);
                  setAnchorEl(null);
                }}
                sx={{ position: 'absolute', right: '15px', bottom: '10px' }}
              >
                cancel
              </Button>
            </Paper>
          </Fade>
        )}
      </Popper> */}
      <CalendarPopSimple
        selectCell={selectCell}
        isCalOpen={isCalOpen}
        anchorEl={anchorEl}
        sechArr={sechArr}
        otArr={otArr}
        setAnchorEl={setAnchorEl}
        setIsCalOpen={setIsCalOpen}
        setSechArr={setSechArr}
        setOtArr={setOtArr}
      />
    </>
  );
}