import "./datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from '@mui/styles';
import { userColumns } from "../../../Data/formSource";
import { Link,useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import all_product from "../../../Data/Product/all_Product";
import ProductService from "../../../services/product.service";

const ProductDatatable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleViewClick = (productData) => {
    navigate(`/admin/product/view/${productData.id}`, { state: { product: productData } });
  };
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () =>{
    const response = await ProductService.productGetAll();
    setData(response.data);
  }
  const deleteData = async (id) =>{
    await ProductService.productDelete(id);
    loadData();
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton" onClick={() => handleViewClick(params.row)}>
              View
            </div>
            <div
              className="deleteButton"
              onClick={() => deleteData(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Product
        <Link to="/admin/product/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        // className={classes.root}
        getRowHeight={() => 'auto'}
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
};

export default ProductDatatable;
