'use cliemt';

import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
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
import { tableType } from '@/types/types';
import { FaEdit } from 'react-icons/fa';
import { GoTrash } from 'react-icons/go';
import getUserById from '@/state/actions/getUserById';
import useDispatchselector from '@/state/redux/useDispatchselector';
import { modalShow } from '@/state/redux/slice/appReducer';
import EditUserForm from '../users/EditUserForm';
import { EditUserFormType } from '@/state/schemas/schemas';
import { z } from 'zod';

const useUserColumns = () => {
  const { dispatch } = useDispatchselector();

  const editItemFn = async (id: number) => {
    const user = (await getUserById(id)) as z.infer<typeof EditUserFormType>;

    const EditUserFn = () => {
      return <EditUserForm data={user} />;
    };

    dispatch(
      modalShow({
        component: EditUserFn,
      })
    );

    document.body.style.overflow = 'hidden';
  };

  const deleteItemFn = (id: number) => {
    alert(id);
  };

  const userColumns: ColumnDef<tableType>[] = [
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
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue('email')}</div>
      ),
    },
    {
      accessorKey: 'roleId',
      header: () => <div className="text-right">Role ID</div>,

      cell: ({ row }) => {
        //const amount = parseFloat(row.getValue('roleId'));

        // Format the amount as a dollar amount
        // const formatted = new Intl.NumberFormat('en-US', {
        //   style: 'currency',
        //   currency: 'USD',
        // }).format(amount);

        return (
          <div className="text-right font-medium">{row.getValue('roleId')}</div>
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
                onClick={() => editItemFn(Number(result.userId))}
              >
                <FaEdit /> Edit=
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <GoTrash
                  onClick={() => alert(result.userId)}
                  className="text-red-600"
                />{' '}
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return { userColumns };
};

export default useUserColumns;
