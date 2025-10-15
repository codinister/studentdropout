import { FaExclamation } from 'react-icons/fa6';
import { Button } from './ui/button';
import { modalHide } from '@/state/redux/slice/appReducer';
import useDispatchselector from '@/state/redux/useDispatchselector';
import useFormSubmitResult from '@/utils/useFormSubmitResult';

type WarningMessageType = {
  title: string;
  subtitle: string;
};
const WarningMessage = ({ title, subtitle }: WarningMessageType) => {
  const { closeModal } = useFormSubmitResult();

  return (
    <div className="alert-box">
      <FaExclamation className="warning-svg" />
      <h5 className="warning-title">{title}</h5>
      <p>{subtitle}</p>

      <Button variant="destructive" onClick={closeModal}>
        Close
      </Button>
    </div>
  );
};

export default WarningMessage;
