'use client'

import { useQuery } from '@tanstack/react-query';
import fetchApi from './fetchApi';

const useGetQuery = (key: string, url: string) => {
  const fn = () => fetchApi({ url });
  const result = useQuery({
    queryKey: [key], 
    queryFn: fn
  });
  return result?.data?.data || [];
};

export default useGetQuery;
