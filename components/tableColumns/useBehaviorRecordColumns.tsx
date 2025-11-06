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
import EditBehaviorRecordForm from '../behaviorrecord/EditBehaviorRecordForm';
import { fetchBehaviorRecord } from '@/state/redux/slice/asyncThunkFn';
import fetchApi from '@/state/query/fetchApi';
import { behaviorSchema } from '@/types/types';
import { formatDate } from '@/utils/dateFormats';

const useBehaviorRecordColumns = () => {
  const { showModal, closeModal } = useFormSubmitResult();
  const { dispatch } = useDispatchselector();

  const editItemFn = async (id: number) => {
    const { data } = await fetchApi({
      url: '/behaviorrecord/get-behaviorrecord-by-id/'+ id,
    });

    const EditBehaviorRecord = () => {
      return <EditBehaviorRecordForm data={data} />;
    };

    showModal(EditBehaviorRecord);
  };

  const deleteItemFn = (id: number) => {
    const DeleteFnComponent = () => {
      const deleteFn = async () => {
        await fetchApi({
          method: 'Delete',
          url: '/behaviorrecord/delete-behaviorrecord-by-id/'+id,
        });
        closeModal();
        dispatch(fetchBehaviorRecord());
      };

      return <DialogueBox deleteItemFn={deleteFn} />;
    };

    showModal(DeleteFnComponent);
  };

  const behaviorColumn: ColumnDef<behaviorSchema>[] = [
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
        <div className="text-left">{formatDate(row.getValue('date'))}</div>
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
      accessorKey: 'description',
      header: () => <div className="text-left">Description</div>,

      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">
            {row.getValue('description')}
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
                onClick={() => editItemFn(Number(result.behaviorId))}
              >
                <FaEdit /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => deleteItemFn(Number(result.behaviorId))}
              >
                <GoTrash className="text-red-600" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return { behaviorColumn };
};



export default useBehaviorRecordColumns

