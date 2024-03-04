import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './planrabot.module.css';
import { Ot, SechData } from '../../app.types';
import { TextEditor } from '../../components/TextEditor';
import classNames from 'classnames';
import {
  AppBar,
  Button,
  ButtonGroup,
  Fade,
  FormControlLabel,
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
import Switch from '@mui/material/Switch';
import { SpeedDialNav } from '../../components/SpeedDialNav';
import { ReactComponent as IconEdit } from '../../Icons/IconEdit.svg';
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from 'react-router-dom';

// dayjs.locale(dayjs_ru);
interface Props {}
interface PageState {
  editMode: boolean;
}

export interface SelectCell {
  sechIndex: number | null;
  otId: string | null;
  sechParam: keyof SechData | null;
  otParam: keyof Ot | null;
  value: string;
}

export interface SechKeys {
  [key: string]: keyof SechData;
}

export interface OtKeys {
  [key: string]: keyof Ot;
}

export function isKeyOfSechData(
  val: any,
  sechArr: SechData
): val is keyof SechData {
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

let sechArrSource: SechData[] = [];

export function Planrabot() {
  const [sechArr, setSechArr, otArr, setOtArr] = useSechData();
  const [isCalOpen, setIsCalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [pageState, setPageState] = useState<PageState>({ editMode: false });
  const [selectCell, setSelectCell] = useState<SelectCell>({
    sechIndex: null,
    otId: null,
    sechParam: null,
    otParam: null,
    value: '',
  });
  const { company } = useParams();

  useEffect(() => {
    if (company === 'gpe') {
      document.title = 'План работ ГПЭ';
    } else {
      document.title = 'План работ';
    }
  }, []);

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
    sechData: SechData,
    sechIndex: number,
    otId: string,
    param: keyof SechData,
    value: string
  ) {
    console.log(sechData, sechIndex, otId);
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setIsCalOpen((ico) => !ico);
    // setSelectCell({ sechIndex, otId, param, value });
  }

  function aiisGpeFilter(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      sechArrSource = structuredClone(sechArr);
      setSechArr((st) => st.filter((sech) => sech.sobstvAiis.includes('ГПЭ')));
      console.log(sechArr);
    } else {
      setSechArr(sechArrSource);
      console.log(sechArr);
    }
  }

  const actions = [
    {
      icon: <IconEdit />,
      name: '',
      do: () => {
        setPageState((st) => ({ ...st, editMode: true }));
      },
    },
  ];

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
            <th>Статус комплекта</th>
            <th>План. дата подачи</th>
            <th style={{ minWidth: '200px' }}>Комментарии</th>
            <th>№ ГР</th>
            <th>Наим. АИИС</th>
            <th style={{ minWidth: '90px' }}>СД&nbsp;СОП</th>
            <th>Изм. АИИС</th>
            <th>Тип&nbsp;изм. АИИС</th>
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
            <th>Статус комплекта</th>
            <th>дата</th>
            <th>№ area</th>
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
                    <td rowSpan={otAmount} className={styles.bgcWhite}>
                      Статус комплекта
                    </td>
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
          {!company && (
            <FormControlLabel
              control={<Switch color="default" onChange={aiisGpeFilter} />}
              label="Все / ГПЭ"
            />
          )}
          {company === 'gpe' && (
            <Typography>План работ Газпром энерго</Typography>
          )}
          {pageState.editMode && (
            <ButtonGroup sx={{ margin: '0 auto' }}>
              <Button
                variant="contained"
                onClick={() => {
                  setPageState((st) => ({ ...st, editMode: false }));
                }}
              >
                отмена
              </Button>

              <Button
                variant="contained"
                color="secondary"
                // disabled={!pageState.selectedOtId}
              >
                <EditIcon />
              </Button>
              {/* <Button
                variant="contained"
                color="secondary"
                disabled={otHistory.length < 1}
                onClick={(e) => {
                  if (otHistory.length > 0) {
                    setOtArr(otHistory[otHistory.length - 1]);
                    otHistory.pop();
                  }
                }}
              >
                <UndoIcon />
              </Button>
              <Button
                variant="contained"
                color="error"
                disabled={otHistory.length < 1}
              >
                <SaveIcon />
              </Button> */}
            </ButtonGroup>
          )}
          {/* <DatePicker
          // defaultValue={dayjs('2022-04-17')}
          // sx={{ display: 'none' }}
          /> */}
          <SpeedDialNav actions={actions} />
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
                    produce((draft: SechData[]) => {
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
