'use client';

import { modalHide } from '@/state/redux/slice/appReducer';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import selectors from '@/state/redux/useSelectors';

const ModalContent = () => {
  const status = selectors()?.modalstatus;
  const ModalComponent = selectors()?.modalcomponent;

  const dispatch = useDispatch();
  return (
    <>
      <div
        className={`modal ${status}`}
        onClick={() => dispatch(modalHide({ status: 'hide', component: null }))}
      ></div>
      <div className={status}>
        {ModalComponent ? <ModalComponent /> : '' }
      </div>
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
      document.querySelector('body') as HTMLElement
    );
  }

  return null;
};

export default Modal;
