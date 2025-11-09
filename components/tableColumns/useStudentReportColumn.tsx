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
import { studentSchema } from '@/types/types';

const useStudentReportColumn = () => {
  const studentReportColumn: ColumnDef<studentSchema>[] = [
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
      accessorKey: 'studentId',
      header: 'ID',
      cell: ({ row }) => <div>{row.getValue('studentId')}</div>,
    },
    {
      accessorKey: 'studentName',
      header: 'Name',
      cell: ({ row }) => <div>{row.getValue('studentName')}</div>,
    },
    {
      accessorKey: 'level',
      header: 'Level',
      cell: ({ row }) => <div>{row.getValue('level')}</div>,
    },

    {
      accessorKey: 'attendance',
      header: 'Attendance',
      cell: ({ row }) => <div>{row.getValue('attendance')}%</div>,
    },

    {
      accessorKey: 'score',
      header: 'Score',
      cell: ({ row }) => <div>{row.getValue('score')}%</div>,
    },

    {
      accessorKey: 'dropoutRisk',
      header: 'Dropout Risk',
      cell: ({ row }) => (
        <div>
          <div
            className={`max-w-max text-white rounded-3xl px-4 py-1
              ${
                row.getValue('dropoutRisk') === 'High Risk'
                  ? 'bg-red-600 '
                  : row.getValue('dropoutRisk') === 'Medium Risk'
                  ? 'bg-yellow-500 '
                  : row.getValue('dropoutRisk') === 'Low Risk'
                  ? 'bg-green-500 '
                  : ''
              }`}
          >
            {row.getValue('dropoutRisk')}
          </div>
        </div>
      ),
    },

    {
      accessorKey: 'financialStatus',
      header: 'Financial Status',
      cell: ({ row }) => <div>{row.getValue('financialStatus')}</div>,
    },
  ];

  return { studentReportColumn };
};

export default useStudentReportColumn;
