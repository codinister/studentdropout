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
import EditInterventionForm from '../intervention/EditInterventionForm';
import { interventionSchema } from '@/types/types';
import { fetchIntervention } from '@/state/redux/slice/asyncThunkFn';
import fetchApi from '@/state/query/fetchApi';
import { formatDate } from '@/utils/dateFormats';

const useInterventionColumns = () => {
  const { showModal, closeModal } = useFormSubmitResult();
  const { dispatch } = useDispatchselector();

  const editItemFn = async (id: number) => {
    const { data } = await fetchApi({
      url: '/intervention/get-intervention-by-id/' + id,
    });

    const EditInterventionFn = () => {
      return <EditInterventionForm data={data} />;
    };

    showModal(EditInterventionFn);
  };

  const deleteItemFn = (id: number) => {
    const DeleteFnComponent = () => {
      const deleteFn = async () => {
        await fetchApi({
          method: 'Delete',
          url: '/intervention/delete-intervention-by-id/' + id,
        });
        closeModal();
        dispatch(fetchIntervention());
      };

      return <DialogueBox deleteItemFn={deleteFn} />;
    };

    showModal(DeleteFnComponent);
  };

  const interventionColumn: ColumnDef<interventionSchema>[] = [
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
      accessorKey: 'interventionId',
      header: 'Student ID',
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('interventionId')}</div>
      ),
    },


 
  


    {
      accessorKey: 'type',
      header: () => <div className="text-left">Intervention Type</div>,
      cell: ({ row }) => (
        <div className="text-left ">{row.getValue('type')}</div>
      ),
    },


    {
      accessorKey: 'outcome',
      header: () => <div className="text-left">Status</div>,

      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">
            {row.getValue('outcome')}
          </div>
        );
      },
    },
    {
      accessorKey: 'date',
      header: () => <div className="text-left">Date</div>,

      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">{formatDate(row.getValue('date'))}</div>
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
                onClick={() => editItemFn(Number(result.interventionId))}
              >
                <FaEdit /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => deleteItemFn(Number(result.interventionId))}
              >
                <GoTrash className="text-red-600" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return { interventionColumn };
};

export default useInterventionColumns 