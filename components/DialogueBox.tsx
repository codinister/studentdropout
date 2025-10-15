import { FaExclamation } from 'react-icons/fa6';
import { Button } from './ui/button';
import useFormSubmitResult from '@/utils/useFormSubmitResult';

type WarningMessageType = {
  deleteItemFn: ()=> void
};
const DialogueBox = ({ deleteItemFn }: WarningMessageType) => {
  const { closeModal } = useFormSubmitResult();

  return (
    <div className="alert-box">
      <FaExclamation className="warning-svg" />
      <h5 className="warning-title">Delete item ?</h5>

      <div className="flex gap-6  justify-center mt-10">
   

        <Button variant="secondary" onClick={deleteItemFn}>
          Continue
        </Button>


             <Button variant="destructive" onClick={closeModal}>
          Cancel
        </Button>
      </div>
    </div>
  );
};



export default DialogueBox
