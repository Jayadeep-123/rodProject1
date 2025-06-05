import { usePaymentTable } from "../../customHooks/usePaymentTable";
import { useState } from "react";
import '../../styles/payment-module-styles/paymentTable.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { flexRender } from '@tanstack/react-table';

export function PaymentTable() {
  const { table } = usePaymentTable();

  const handleCreatePayment = () => {
    console.log("Create New Payment clicked");
    // Add logic for creating a new payment
  };

  return (
    <main>
      <div className="table-section">
        <TableContainer component={Paper}>
          <Table size="small" aria-label="payments table">
            <TableHead>
              <TableRow>
                {table.getHeaderGroups().map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', cursor: 'pointer' }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === 'asc' ? ' 🔼' : header.column.getIsSorted() === 'desc' ? ' 🔽' : null}
                    </TableCell>
                  ))
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} sx={{
                  '&:hover': { backgroundColor: '#f9f9f9' },
                  borderBottom: '0.1% solid #e0e0e0',
                }}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <button
        className="create-payment-button"
        onClick={handleCreatePayment}
        style={{
          marginTop: '20px', /* Reduced margin for better spacing */
          backgroundColor: '#4876EE',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'inline-flex',
          height: '44px',
          padding: '17px 30px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          flexShrink: 0,
          marginLeft:'345px',
        }}
      >
        <AddIcon fontSize="small" />
        Create New Payment
      </button>
    </main>
  );
}