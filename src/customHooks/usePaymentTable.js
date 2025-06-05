 
import { useState } from 'react';
import { createColumnHelper, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
 
export function usePaymentTable() {
  const [data] = useState([
    {
      class: '10th',
      year: '2024-2025',
      head: 'Tuition Fee',
      mode: 'Online',
      payHead: 'Fee Payment',
      amount: 10000,
      campus: 'HYD',
      date: '2025-05-01',
      no: '1',
    },
    {
      class: '9th',
      year: '2024-2025',
      head: 'Transport Fee',
      mode: 'Cash',
      payHead: 'Transport',
      amount: 5000,
      campus: 'HYD',
      date: '2025-05-10',
      no: '2',
    },
    {
      class: '11th',
      year: '2024-2025',
      head: 'Library Fee',
      mode: 'Online',
      payHead: 'Library',
      amount: 2000,
      campus: 'HYD',
      date: '2025-05-15',
      no: '3',
    },
    {
      class: '8th',
      year: '2024-2025',
      head: 'Sports Fee',
      mode: 'Cheque',
      payHead: 'Sports',
      amount: 3000,
      campus: 'HYD',
      date: '2025-05-20',
      no: '4',
    },
  ]);
 
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('class', {
      header: 'Class',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('year', {
      header: 'Academic Year',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('head', {
      header: 'Payment Head',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('mode', {
      header: 'Pay Mode',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('payHead', {
      header: 'Pay Head',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('amount', {
      header: 'Amount',
      cell: (info) => info.getValue().toFixed(2),
    }),
    columnHelper.accessor('campus', {
      header: 'Payment Campus',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('date', {
      header: 'Date',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('no', {
      header: 'Installment No',
      cell: (info) => info.getValue(),
    }),
  ];
 
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
 
  return { table };
}
 