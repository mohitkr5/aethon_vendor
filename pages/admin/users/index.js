import SidebarLayout from "@/components/SidebarLayout";
import { useEffect } from "react";
import { getUsers } from "@/store/actions/userActions";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "@/components/Loading";

export default function OrdersPage() {
  const { users, loading } = useSelector((state) => state.users);
  useEffect(() => {
    getUsers();
  }, []);

  const { rows, columns } = getTableData(users);
  return (
    <SidebarLayout>
      <Typography variant={"h4"} color={"primary"} sx={{ mb: "1rem" }}>
        Users
      </Typography>
      {loading ? (
        <Loading text={"Loading Users"} />
      ) : (
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
      )}
    </SidebarLayout>
  );
}

const getTableData = (orders) => {
  return {
    columns: [
      { field: "id", headerName: "ID", width: 90 },
      { field: "email", headerName: "Email", width: 300 },
      { field: "name", headerName: "Name", width: 300 },
    ],
    rows: orders.map((order) => ({
      id: order._id,
      email: order.email,
      name: order.name,
    })),
  };
};
