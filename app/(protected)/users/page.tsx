'use client';

import PageHeader from '@/components/PageHeader';
import UserForm from '@/components/users/UserForm';
import DataTable from '@/components/tableRows/DataTable';
import { useEffect, useState } from 'react';
import useDispatchselector from '@/state/redux/useDispatchselector';
import { fetchUsers } from '@/state/redux/slice/asyncThunkFn';
import { userSchema } from '@/types/types';
import useUserColumns from '@/components/tableColumns/useUserColumns';
import useJsPdfGenerator from '@/utils/useJsPdfGenerator';

const Users = () => {
  const { userColumns } = useUserColumns();

  const { dispatch, selector } = useDispatchselector();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const users = selector((state) => state?.users);

  const data: userSchema[] = users;

  const tableColumn = ['ID', 'Name', 'Email'];

  const tableRows = data.map((v) => [v.userId, v.name, v.email]);

  const { genPdf } = useJsPdfGenerator({
    tableColumn,
    tableRows,
    reportTitle: 'Students',
  });

  return (
    <>
      <div className="bg-white">
        <PageHeader
          modalButtonName="Add User"
          component={UserForm} // ✅ pass reference
          pdfFn={genPdf}
          pageTitle="Users"
        />

        <DataTable columns={userColumns} data={data} />
      </div>
    </>
  );
};

export default Users;
