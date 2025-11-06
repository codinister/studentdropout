'use client';

import { Button } from './ui/button';
import { FaCube } from 'react-icons/fa';
import { BsFileEarmarkPdf } from 'react-icons/bs';
import { FaArrowLeft } from 'react-icons/fa6';
import useFormSubmitResult from '@/utils/useFormSubmitResult';

type PageHeaderType = {
  modalButtonName: string;
  component: React.ElementType;
  pdfFn: () => void;
  pageTitle: string;
};
const PageHeader = ({
  modalButtonName,
  component,
  pdfFn,
  pageTitle,
}: PageHeaderType) => {
const {showModal} = useFormSubmitResult()



  const fnShow = () => {
    showModal(component)
  };

  return (
    <>
      <div className="flex justify-between w-full px-10 py-4 items-center">
        <div>
          <p>Bluecrest University College</p>
          <h6 className="font-bold">{pageTitle}</h6>
        </div>
        <div className="flex gap-4">
          <Button variant="default" onClick={fnShow}>
            {modalButtonName} <FaCube />
          </Button>
          <Button variant="outline">
            <FaArrowLeft /> Go Back
          </Button>
          <Button variant="destructive" onClick={pdfFn}>
            <BsFileEarmarkPdf />
            PDF
          </Button>
        </div>
      </div>

      {/* ✅ ref passed down with typing */}
    </>
  );
};

export default PageHeader;
