'use client'

import { useSelector } from 'react-redux';

const useSelectors = () => {
  type stateType = {
    modalstatus: string;
    modalcomponent: React.ElementType | null
  };
  const selector = useSelector((state: stateType) => state);
  return selector;
};

export default useSelectors;
