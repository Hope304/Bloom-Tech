export const userColumns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "name",
    headerName: "Name",
    width: 300,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg"  src={`data:image/jpeg;base64,${params.row.imageData}`} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },

  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 450,
  },
  {
    field: "promotion",
    headerName: "Promotion",
    width: 100,
    renderCell: (params) => {
      return (
        <div>
          {params.row.promotion && params.row.promotion.name ? params.row.promotion.name : 'N/A'} - {params.row.promotion && params.row.promotion.discount ? params.row.promotion.discount : '0'}%
        </div>
      );
    },
  },
];