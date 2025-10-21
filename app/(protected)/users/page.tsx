'use client';

import PageHeader from '@/components/PageHeader';
import UserForm from '@/components/users/UserForm';
import DataTable from '@/components/tableRows/DataTable';
import { useEffect, useState } from 'react';
import useDispatchselector from '@/state/redux/useDispatchselector';
import { fetchUsers } from '@/state/redux/slice/appReducer';
import { tableType, UserType } from '@/types/types';
import useUserColumns from '@/components/tableColumns/useUserColumns';
import useProtectedPage from '@/utils/useProtectedPage';

const Users = () => {
useProtectedPage();
  const { userColumns } = useUserColumns();

  const pdfFn = () => {};

  const { dispatch, selector } = useDispatchselector();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const users = selector((state) => state?.users);

  const data: tableType[] = users;

  return (
    <>
      <div className="bg-white">
        <PageHeader
          modalButtonName="Add User"
          component={UserForm} // ✅ pass reference
          pdfFn={pdfFn}
          pageTitle="Users"
        />

        <DataTable columns={userColumns} data={data} />
      </div>
    </>
  );
};

export default Users;
