import { useState } from 'react';
import { IAppState } from '../app.types';
import { colOrderObj } from '../modules/constants';

export function useAppState() {
  const [appState, setAppState] = useState<IAppState>({
    colOrder: colOrderObj.opt1,
    sechID: '',
    naimSechShort: '',
    isEdit: false,
    isEdit2: false,
    isSiStateSave: true,
    isMsgOpen: false,
    isSuccess: true,
    isInfoOpen: false,
    editableCell: { index: null, param: null },
  });
  let url = new URL(document.URL);

  const naimSechShort =
    new URL(document.URL).searchParams.get('naimsechshort') ??
    'defaultNaimSech';
  // document.title = naimSechShort;

  const sechID = url.searchParams.get('sechID') ?? 'defaultSechID';
  setAppState({
    ...appState,
    sechID,
    // naimSechShort,
  });
  return [appState, setAppState] as const;
}
