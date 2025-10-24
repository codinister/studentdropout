'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import fetchApi from './fetchApi';
import { useQueryClient } from '@tanstack/react-query';

const useMutations = ({ ...options }) => {
  const { key, method = '', url } = options;
  const fn = async (data: {}) => {
    const res = await fetchApi({
      method: method ? method : 'Post',
      url,
      data,
    });

    if (res.status === 200) {
      return res;
    } else {
      if (res) {
        const message = Object.values(res?.response?.data).join('') || '';
        throw new Error(message);
      }
    }
  };

  const queryClient = useQueryClient();

  const { isPending, isSuccess, isError, error, mutate } = useMutation({
    mutationFn: fn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [key] }),
  });

  return { isPending, isSuccess, isError, error, mutate };
};

export default useMutations;
