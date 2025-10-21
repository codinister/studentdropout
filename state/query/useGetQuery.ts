'use client'

import { useQuery } from 'react-query';
import fetchApi from './fetchApi';

const useGetQuery = (key: string, url: string) => {
  const fn = () => fetchApi({ url });
  

  const result = useQuery(key, fn);
  return result?.data?.data || [];
};

export default useGetQuery;
