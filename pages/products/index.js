import { useEffect } from "react";
import { getProducts } from "@/store/actions/productsActions";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SidebarLayout from "@/components/SidebarLayout";

export default function HomePage() {
  const { products, loading } = useSelector((state) => state.products);
  useEffect(() => {
    getProducts();
  }, []);

  const { rows, columns } = getTableData(products);
  return (
    <SidebarLayout pageTitle="Products">
      <DataGrid
        sx={{ height: "70vh" }}
        columns={columns}
        rows={rows}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
      <Button>Create product</Button>
    </SidebarLayout>
  );
}

const getTableData = (products) => {
  return {
    columns: [
      { field: "id", headerName: "ID", width: 90 },
      {
        field: "name",
        headerName: "Name",
        width: 500,
      },
      {
        field: "mrp",
        headerName: "MRP",
        width: 50,
      },
      { field: "price", headerName: "Price", width: 50 },
      { field: "colors", headerName: "Colors", width: 150 },
    ],
    rows: products.map((product) => ({
      id: product._id,
      name: product.name,
      mrp: product.mrp,
      price: product.price,
      colors: product.colors,
    })),
  };
};
