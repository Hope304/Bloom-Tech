import React, { useState, useEffect, useContext } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from '@mui/styles';
import { ShopContext } from '../../../Context/ShopContext';
import { userColumns } from "./orderFormSource";

const useStyles = makeStyles({
  root: {
    "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
      outline: "none"
    }
  }
});

const OrderDatable = () => {
  const classes = useStyles();
  const { orderInfo , updateOrder} = useContext(ShopContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (orderInfo && orderInfo.length > 0) {
      let newData = [];

      orderInfo.forEach((order) => {
        order.orderItem.forEach((item, index) => {
          // const stateValue = ["Đang chuẩn bị hàng", "Đang giao hàng", "Đã giao hàng thành công", "Đang xác thực"].includes(item.state) ? item.state : "";
          newData.push({
            id: `${order.id}-${index}`,
            orderId: order.id,
            orderItemId: item.id,
            quantity: item.quantity,
            productName: item.product.name,
            imageData: item.product.imageData,
            price: item.product.price,
            type: item.product.type,
            state: item.state,
            email: order.user ? order.user.email : "N/A",
            createdDate: item.createdDate,
          });
        });
      });

      setData(newData);
    }
  }, [orderInfo]);

  const handleEditCellChangeCommitted = async (params) => {
    const updatedData = data.map((row) =>
      row.id === params.id ? { ...row, [params.field]: params.props.value } : row
    );

    setData(updatedData);

  };
  const handleActionChange = async (id, productId, action) => {
    try {
      const response = await updateOrder(id, {
        "orderId": id,
        "orderItemId": productId,
        "state": action // Fix typo here, it should be params.row.value
      });

      if (response.ok) {
        console.log('Backend update successful');
      } else {
        console.error('Backend update failed');
      }
    } catch (error) {
      console.error('Error updating backend:', error);
    }
  };

  const actionColumn = [
    {
      field: "state",
      headerName: "Status",
      width: 200,
      editable: true,
      type: "singleSelect",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <select
              onChange={(e) => handleActionChange(params.row.orderId, params.row.orderItemId, e.target.value)}
              defauvalue={params.row.state || ''}
            > <option value={params.row.state} >
                {params.row.state}
              </option>
              {[ "Đang giao hàng","Đang chuẩn bị hàng", "Đã giao hàng thành công", "Đang xác thực"].map(
                (option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                )
              )}
            </select>
          </div>
        );
      },
    },
  ];

  const uniqueUserColumns = userColumns.map((column) => ({
    ...column,
    key: column.field,
  }));
  
  const columns = uniqueUserColumns.concat(actionColumn);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Order
      </div>
      <DataGrid
        className={classes.root}
        getRowHeight={() => 'auto'}
        editMode="cell"
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        onEditCellChangeCommitted={handleEditCellChangeCommitted}
      />
    </div>
  );
};

export default OrderDatable;
