import { FaExclamation } from 'react-icons/fa6';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { modalHide } from '@/state/redux/slice/appReducer';

type WarningMessageType = {
  title: string;
  subtitle: string;
};
const WarningMessage = ({ title, subtitle }: WarningMessageType) => {
  const dispatch = useDispatch();
  return (
    <div className="alert-box">
      <FaExclamation className="warning-svg" />
      <h5 className="warning-title">{title}</h5>
      <p>{subtitle}</p>

      <Button
        variant="destructive"
        onClick={() => dispatch(modalHide({ status: 'hide', component: null }))}
      >
        Close
      </Button>
    </div>
  );
};

export default WarningMessage;
