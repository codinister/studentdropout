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
import EditAcademicRecordForm from '../academicrecord/EditAcademicRecordForm';
import { academicRecordSchema } from '@/types/types';
import { fetchAcademicrecord } from '@/state/redux/slice/asyncThunkFn';
import fetchApi from '@/state/query/fetchApi';

const useAcademicRecordColumns = () => {
  
  const { showModal, closeModal } = useFormSubmitResult();
  const { dispatch } = useDispatchselector();

  const editItemFn = async (id: number) => {
    const { data } = await fetchApi({
      url: '/academicrecord/get-academicrecord-by-id/' + id,
    });

    const EditAcademicRecordFn = () => {
      return <EditAcademicRecordForm data={data} />;
    };

    showModal(EditAcademicRecordFn);
  };

  const deleteItemFn = (id: number) => {
    const DeleteFnComponent = () => {
      const deleteFn = async () => {
        await fetchApi({
          method: 'Delete',
          url: '/academicrecord/delete-academicrecord-by-id/' + id,
        });
        closeModal();
        dispatch(fetchAcademicrecord());
      };

      return <DialogueBox deleteItemFn={deleteFn} />;
    };

    showModal(DeleteFnComponent);
  };

  const academicColumn: ColumnDef<academicRecordSchema>[] = [
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
      accessorKey: 'studentName',
      header: 'Student Name',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('studentName')}</div>
      ),
    },
    {
      accessorKey: 'level',
      header: () => <div className="text-left">Level</div>,
      cell: ({ row }) => (
        <div className="text-left lowercase">{row.getValue('level')}</div>
      ),
    },
    {
      accessorKey: 'subjectName',
      header: () => <div className="text-left">Subject</div>,

      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">
            {row.getValue('subjectName')}
          </div>
        );
      },
    },


    {
      accessorKey: 'semester',
      header: () => <div className="text-left">Semester</div>,

      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">{row.getValue('semester')}</div>
        );
      },
    },


    {
      accessorKey: 'year',
      header: () => <div className="text-left">Year</div>,

      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">{row.getValue('year')}</div>
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
                onClick={() => editItemFn(Number(result.recordId))}
              >
                <FaEdit /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => deleteItemFn(Number(result.recordId))}
              >
                <GoTrash className="text-red-600" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return { academicColumn };
};


export default useAcademicRecordColumns
