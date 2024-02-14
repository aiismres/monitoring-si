import { useEffect, useState } from 'react';
import { IResReadSiData1, ISechInfo, ISiObj1, Ot } from '../app.types';
import useSWR from 'swr';
import { checkData } from '../lib/checkDataMod';
import { nanoid } from 'nanoid';

const fetcher = (url: string) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify({
    //   id: new URL(document.URL).searchParams.get('sechID'),
    // }),
  }).then((res) => res.json());

export const useOtData = () => {
  // const [siState, setSiState] = useState<ISiObj1[]>([]);
  // const [sechInfo, setSechInfo] = useState<ISechInfo>({
  //   sechID: '',
  //   naimSechShort: '',
  //   areaCode: '',
  //   areaName: '',
  //   sourceDB: '',
  //   source60: '',
  //   amountTi: 0,
  // });
  const {
    data,
    error,
    isLoading,
  }: { data: Ot[]; error: boolean | undefined; isLoading: boolean } = useSWR(
    '/api/readot',
    fetcher,
    {
      // revalidateOnFocus: false,
      // revalidateOnMount: false,
      // revalidateOnReconnect: false,
      // refreshWhenOffline: false,
      // refreshWhenHidden: false,
      // refreshInterval: 10000,
    }
  );
  if (error) {
    console.log('An error has occurred.');
  }
  if (isLoading) {
    console.log('Loading...');
  }
  if (data) {
    console.log(data);
    data.sort((a, b) => {
      if (!a.sdSop) {
        return 1;
      }
      if (!b.sdSop) {
        return -1;
      }
      return new Date(a.sdSop).getTime() - new Date(b.sdSop).getTime();
    });
  }

  // useEffect(() => {
  //   if (data !== undefined) {
  //     data.si = checkData(data.si);
  //     data.si?.map((item) => (item.id ? item : { ...item, id: nanoid() }));
  //     setSiState(data.si ?? []);
  //     if (data.sechInfo) {
  //       setSechInfo(data.sechInfo);
  //     }
  //     document.title = data.naimSechShort || 'noName';
  //   }
  // }, [data]);

  return [data, isLoading, error] as const;
};
