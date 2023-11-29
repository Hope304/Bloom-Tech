import React from 'react';
import { format, parseISO } from 'date-fns';
import CurrencyFormat from 'react-currency-format';
export const userColumns = [
  { field: "orderId", headerName: "ORDERID", width: 40},
  {
    field: "name",
    headerName: "Name",
    width: 300,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg"  src={`data:image/jpeg;base64,${params.row.imageData}`} alt="avatar" />
          {params.row.productName}
        </div>
      );
    },
  },

  {
    field: "quantity",
    headerName: "Quantity",
    width: 70,
  },

  {
    field: "price",
    headerName: "Price",
    width: 150,
    renderCell: (params) => {
      return (
        <div >
          <CurrencyFormat
            value={params.row.price * params.row.quantity}
            displayType={'text'}
            thousandSeparator={true}
          />VND
        </div>
      );
    },
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  // {
  //   field: "state",
  //   headerName: "Status",
  //   width: 200,
    
  // },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    
  },
  {
    field: "createdDate",
    headerName: "Date",
    width: 200,
    renderCell: (params) => {
      const dateString = params.row.createdDate;

      // Check if dateString is a valid ISO string before parsing
      const parsedDate = dateString ? parseISO(dateString) : null;

      // Format the date only if it's a valid date
      const formattedDate = parsedDate ? format(parsedDate, 'HH:mm MM-dd-yyyy ') : 'Invalid Date';
      return (
        <div>
          {formattedDate}
        </div>
      );
    },
  },
];
