import { useEffect, useState } from 'react';
import { IResReadSiData1, ISechInfo, ISiObj1 } from '../app.types';
import useSWR from 'swr';
import { checkData } from '../lib/checkDataMod';
import { nanoid } from 'nanoid';

const fetcher = (url: string) =>
  fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: new URL(document.URL).searchParams.get('sechID'),
    }),
  }).then((res) => res.json());

export const useSiData = () => {
  const [siState, setSiState] = useState<ISiObj1[]>([]);
  const [sechInfo, setSechInfo] = useState<ISechInfo>({
    sechID: '',
    naimSechShort: '',
    areaCode: '',
    areaName: '',
    sourceDB: '',
    source60: '',
    amountTi: 0,
  });
  const {
    data,
    error,
    isLoading,
  }: { data: IResReadSiData1; error: boolean | undefined; isLoading: boolean } =
    useSWR('/api/readsidata', fetcher, {
      // revalidateOnFocus: false,
      // revalidateOnMount: false,
      // revalidateOnReconnect: false,
      // refreshWhenOffline: false,
      // refreshWhenHidden: false,
      // refreshInterval: 10000,
    });
  if (error) {
    console.log('An error has occurred.');
  }
  if (isLoading) {
    console.log('Loading...');
  }

  useEffect(() => {
    if (data !== undefined) {
      data.si = checkData(data.si);
      data.si?.map((item) => (item.id ? item : { ...item, id: nanoid() }));
      setSiState(data.si ?? []);
      if (data.sechInfo) {
        setSechInfo(data.sechInfo);
      }
      document.title = data.naimSechShort || 'noName';
    }
  }, [data]);

  const sechID =
    new URL(document.URL).searchParams.get('sechID') ?? 'defaultSechID';

  return [data, sechID, siState, setSiState, sechInfo, setSechInfo] as const;
};
