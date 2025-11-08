'use cliemt';

import { MoreHorizontal } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';

import { ColumnDef } from '@tanstack/react-table';

import { FaEdit } from 'react-icons/fa';
import { GoTrash } from 'react-icons/go';
import useDispatchselector from '@/state/redux/useDispatchselector';

import useFormSubmitResult from '@/utils/useFormSubmitResult';
import DialogueBox from '../DialogueBox';
import EditFinancialStatusForm from '../financialstatus/EditFinancialStatusForm';
import {   fetchFinancialStatus } from '@/state/redux/slice/asyncThunkFn';
import fetchApi from '@/state/query/fetchApi';
import { financialSchema} from '@/types/types';
import { formatDate } from '@/utils/dateFormats';

const useFinancialStatus = () => {
  const { showModal, closeModal } = useFormSubmitResult();
  const { dispatch } = useDispatchselector();

  const editItemFn = async (id: number) => {
    const { data } = await fetchApi({
      url: '/financialstatus/get-financialstatus-by-id/'+id,
    });

    const EditFinancialStatus = () => {
      return <EditFinancialStatusForm data={data} />;
    };

    showModal(EditFinancialStatus);
  };

  const deleteItemFn = (id: number) => {
    const DeleteFnComponent = () => {
      const deleteFn = async () => {
        await fetchApi({
          method: 'Delete',
          url: '/financialstatus/delete-financialstatus-by-id/'+id,
        });
        closeModal();
        dispatch(fetchFinancialStatus());
      };

      return <DialogueBox deleteItemFn={deleteFn} />;
    };

    showModal(DeleteFnComponent);
  };

  const financialColumn: ColumnDef<financialSchema>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
        {
      accessorKey: 'status',
      header: () => <div className="text-left">Status</div>,
      cell: ({ row }) => (
        <div className="text-left">{row.getValue('status')}</div>
      ),
    },
    {
      accessorKey: 'studentName',
      header: 'Student Name',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('studentName')}</div>
      ),
    },
    {
      accessorKey: 'studentId',
      header: 'Student ID',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('studentId')}</div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const result = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => editItemFn(Number(result.financialId))}
              >
                <FaEdit /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => deleteItemFn(Number(result.financialId))}
              >
                <GoTrash className="text-red-600" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return { financialColumn };
};




export default useFinancialStatus

