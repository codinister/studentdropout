import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '@/state/redux/store';

const useDispatchselector = () => {
  const useAppDispatch: () => AppDispatch = useDispatch;
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  const dispatch = useAppDispatch();
  const selector = useAppSelector;

  return { dispatch, selector };
};

export default useDispatchselector;
