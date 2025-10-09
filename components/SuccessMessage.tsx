'use client';
import { FaCheck } from 'react-icons/fa';
import { Button } from './ui/button';
import { modalHide } from '@/state/redux/slice/appReducer';
import { useDispatch } from 'react-redux';

type successMessageType = {
  title: string; 
  subtitle: string;
}
const SuccessMessage = ({title,subtitle}: successMessageType) => {
  const dispatch = useDispatch()
  return (
    <div className="alert-box">
      <FaCheck  className="success-svg" />
      <h5 className="success-title">{title}</h5>
      <p>{subtitle}</p>
      <Button variant="destructive" onClick={()=>dispatch(modalHide({status: 'hide',component: null}))}>Close</Button>
    </div>
  );
};

export default SuccessMessage;
