'use client'

import useDispatchselector from '@/state/redux/useDispatchselector';
import SuccessMessage from '@/components/SuccessMessage';
import WarningMessage from '@/components/WarningMessage';
import { fetchUsers, modalShow } from '@/state/redux/slice/appReducer';

const useFormSubmitResult = () => {
  const { dispatch } = useDispatchselector();

  const successResult = (val: string) => {
    const Success = () => {
      return <SuccessMessage title="User Updated" subtitle={val} />;
    };

    dispatch(fetchUsers());

    dispatch(
      modalShow({
        component: Success,
      })
    );
  };

  const errorResult = (val: string) => {
    const Error = () => {
      return <WarningMessage title="Error" subtitle={val} />;
    };
    dispatch(
      modalShow({
        component: Error,
      })
    );
  };

  return {
    successResult,
    errorResult,
  };
};

export default useFormSubmitResult;
