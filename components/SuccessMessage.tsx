'use client';
import { FaCheck } from 'react-icons/fa';
import { Button } from './ui/button';
import useFormSubmitResult from '@/utils/useFormSubmitResult';

type successMessageType = {
  title: string; 
  subtitle: string;
}
const SuccessMessage = ({title,subtitle}: successMessageType) => {

  const {closeModal} = useFormSubmitResult()

  return (
    <div className="alert-box">
      <FaCheck  className="success-svg" />
      <h5 className="success-title">{title}</h5>
      <p>{subtitle}</p>
      <Button variant="destructive" onClick={closeModal}>Close</Button>
    </div>
  );
};

export default SuccessMessage;
