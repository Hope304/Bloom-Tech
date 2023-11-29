import "./Ship.css";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from '@mui/styles';
import { userColumns } from "../../../Data/orderFormSource";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from '../../../Context/ShopContext';
const useStyles = makeStyles({
  root: {
    "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
      outline: "none"
    }
  },
  datatable: {
    marginBottom: '80px', // Add margin at the bottom
  },
});
const Ship = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const {orderItems} = useContext(ShopContext);
  useEffect(() => {
    if (orderItems && orderItems.length > 0) {
      // Use a temporary array to accumulate data
      let newDatai = [];
  
      orderItems.forEach((e) => {
        e.orderItems.forEach((i) => {
          newDatai.push(i);
        });
      });
  
      // Set the accumulated data to state once
      setData((prevDatai) => [...prevDatai, ...newDatai]);
    }
  }, [orderItems, setData]);
  
  // const actionColumn = [orderItems];
  return (
    <div className="ship">
      <div className="datatable ship">
        <div className="datatableTitle">
          Order
        </div>
        <DataGrid
          // className={classes.root}
          getRowHeight={() => 'auto'}
          className="datagrid"
          rows={data}
          columns={userColumns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default Ship;
