import { format, parseISO } from 'date-fns';
import CurrencyFormat from 'react-currency-format';
export const userColumns = [
  { field: "id", headerName: "ID", width: 50, renderCell: (params) => {
    const id = params.row.product.id;
    return (
      <div>
        {id}
      </div>
    );
  }, },
  {
    field: "name",
    headerName: "Name",
    width: 400,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg"  src={`data:image/jpeg;base64,${params.row.product.imageData}`} alt="avatar" />
          {params.row.product.name}
        </div>
      );
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 200,
    renderCell: (params) => {
      const price = params.row.product.price;
      return (
        <div>
          <CurrencyFormat
            value={price}
            displayType={'text'}
            thousandSeparator={true}
          /> VND
        </div>
      );
    },
  },

  {
    field: "type",
    headerName: "Type",
    width: 200,
    renderCell: (params) => {
      const type = params.row.product.type;
      return (
        <div>
          {type}
        </div>
      );
    },
  },
  {
    field: "state",
    headerName: "Status",
    width: 300,
  },
  {
    field: "createdDate",
    headerName: "Date",
    width: 300,
    renderCell: (params) => {
      const dateString = params.row.createdDate;
      const parsedDate = parseISO(dateString);

      // Format the date as "MM dd yyyy HH mm"
      const formattedDate = format(parsedDate, 'HH:mm MM-dd-yyyy ');

      return (
        <div>
          {formattedDate}
        </div>
      );
    },
  },
  
];