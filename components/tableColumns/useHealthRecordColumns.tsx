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
import EditHealthRecordForm from '../healthrecord/EditHealthRecordForm';
import {  fetchHealthrecord } from '@/state/redux/slice/asyncThunkFn';
import fetchApi from '@/state/query/fetchApi';
import {  healthSchema } from '@/types/types';

const useHealthRecordColumns = () => {
  const { showModal, closeModal } = useFormSubmitResult();
  const { dispatch } = useDispatchselector();

  const editItemFn = async (id: number) => {
    const { data } = await fetchApi({
      url: '/healthrecord/get-healthrecord-by-id/' + id,
    });

    const EditHealthRecord = () => {
      return <EditHealthRecordForm data={data} />;
    };

    showModal(EditHealthRecord);
  };

  const deleteItemFn = (id: number) => {
    const DeleteFnComponent = () => {
      const deleteFn = async () => {
        await fetchApi({
          method: 'Delete',
          url: '/healthrecord/delete-healthrecord-by-id/' + id,
        });
        closeModal();
        dispatch(fetchHealthrecord());
      };

      return <DialogueBox deleteItemFn={deleteFn} />;
    };

    showModal(DeleteFnComponent);
  };

  const healthColumn: ColumnDef<healthSchema>[] = [
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
      accessorKey: 'date',
      header: () => <div className="text-left">Date</div>,
      cell: ({ row }) => (
        <div className="text-left lowercase">{row.getValue('date')}</div>
      ),
    },
    {
      accessorKey: 'date',
      header: () => <div className="text-left">Date</div>,

      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">
            {row.getValue('date')}
          </div>
        );
      },
    },
    {
      accessorKey: 'studentName',
      header: 'Student Name',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('studentName')}</div>
      ),
    },

    {
      accessorKey: 'amount',
      header: () => <div className="text-left">Amount</div>,

      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">
            {row.getValue('amount')}
          </div>
        );
      },
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
                onClick={() => editItemFn(Number(result.healthId))}
              >
                <FaEdit /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => deleteItemFn(Number(result.healthId))}
              >
                <GoTrash className="text-red-600" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return { healthColumn };
};



export default useHealthRecordColumns




