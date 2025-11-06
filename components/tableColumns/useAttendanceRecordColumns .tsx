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
import EditAttendanceRecordForm from '../attendancerecord/EditAttendanceRecordForm';
import { attendanceRecordSchema } from '@/types/types';
import { fetchAttendancerecord } from '@/state/redux/slice/asyncThunkFn';
import fetchApi from '@/state/query/fetchApi';

const useAttendanceRecordColumns = () => {
  const { showModal, closeModal } = useFormSubmitResult();
  const { dispatch } = useDispatchselector();

  const editItemFn = async (id: number) => {
    const { data } = await fetchApi({
      url: '/attendancerecord/get-attendancerecord-by-id/'+id,
    });

    console.log('ID',id, 'REC', data)

    const EditStudentFn = () => {
      return <EditAttendanceRecordForm data={data} />;
    };

    showModal(EditStudentFn);
  };

  const deleteItemFn = (id: number) => {
    const DeleteFnComponent = () => {
      const deleteFn = async () => {
        await fetchApi({
          method: 'Delete',
          url: '/attendancerecord/delete-attendancerecord-by-id/'+id,
        });
        closeModal();
        dispatch(fetchAttendancerecord());
      };

      return <DialogueBox deleteItemFn={deleteFn} />;
    };

    showModal(DeleteFnComponent);
  };

  const attendanceColumn: ColumnDef<attendanceRecordSchema>[] = [
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
      accessorKey: 'studentId',
      header: 'Student ID',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('studentId')}</div>
      ),
    },
    {
      accessorKey: 'status',
      header: () => <div className="text-left">Status</div>,
      cell: ({ row }) => (
        <div className="text-left lowercase">{row.getValue('status')}</div>
      ),
    },
    {
      accessorKey: 'totalAttendance',
      header: () => <div className="text-left">Attendance</div>,

      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">
            {row.getValue('totalAttendance')}
          </div>
        );
      },
    },
    {
      accessorKey: 'score',
      header: () => <div className="text-left">Score</div>,

      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">{row.getValue('score')}</div>
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
                onClick={() => editItemFn(Number(result.attendanceId))}
              >
                <FaEdit /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => deleteItemFn(Number(result.attendanceId))}
              >
                <GoTrash className="text-red-600" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return { attendanceColumn };
};



export default useAttendanceRecordColumns 
