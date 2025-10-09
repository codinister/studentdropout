'use client';

import PageHeader from '@/components/PageHeader';
import Modal from '@/components/Modal';
import SuccessMessage from '@/components/SuccessMessage';
import UserForm from '@/components/users/UserForm';

const Users = () => {
  const pdfFn = () => {};



  return (
    <>
      <div className="bg-white">
        <PageHeader
          modalButtonName="Add User"
          component={UserForm} // ✅ pass reference
          pdfFn={pdfFn}
          pageTitle="Users"
        />
      </div>

   
    </>
  );
};

export default Users;
