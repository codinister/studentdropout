'use client';

import useDispatchselector from '@/state/redux/useDispatchselector';
import SuccessMessage from '@/components/SuccessMessage';
import WarningMessage from '@/components/WarningMessage';
import {
  fetchUsers,
  modalHide,
  modalShow,
} from '@/state/redux/slice/appReducer';

const useFormSubmitResult = () => {
  const { dispatch } = useDispatchselector();

  const closeModal = () => {
    dispatch(modalHide());
    document.body.style.overflow = 'scroll';
  };

  const showModal = (Component: React.ElementType) => {
    dispatch(
      modalShow({
        component: Component,
      })
    );
    document.body.style.overflow = 'hidden';
  };

  const successResult = (val: string, title: string) => {
    const Success = () => {
      return <SuccessMessage title={title} subtitle={val} />;
    };
    dispatch(fetchUsers());
    showModal(Success);
  };

  const errorResult = (val: string) => {
    const Error = () => {
      return <WarningMessage title="Error" subtitle={val} />;
    };
    showModal(Error);
  };

  return {
    successResult,
    errorResult,
    closeModal,
    showModal,
  };
};

export default useFormSubmitResult;
