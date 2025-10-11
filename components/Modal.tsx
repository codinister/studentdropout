'use client';

import { modalHide } from '@/state/redux/slice/appReducer';
import useDispatchselector from '@/state/redux/useDispatchselector';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const ModalContent = () => {

  const { dispatch,selector } = useDispatchselector();


  const status = selector(
    (state: { modalStatus: string }) => state.modalStatus
  );
  const ModalComponent = selector(
    (state: { modalComponent: React.ElementType | null }) => state.modalComponent
  );



  const hideModalFn = () => {
    dispatch(modalHide());
    document.body.style.overflow = 'scroll';
  };

  return (
    <>
      <div className={`modal ${status}`} onClick={hideModalFn}></div>
      <div className={status}>{ModalComponent ? <ModalComponent /> : ''}</div>
    </>
  );
};

const Modal = () => {
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    setPageReady(true);
  }, []);

  if (pageReady) {
    return createPortal(
      <ModalContent />,
      document.querySelector('.modal-root') as HTMLElement
    );
  }

  return null;
};

export default Modal;
