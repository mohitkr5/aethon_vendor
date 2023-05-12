import SidebarLayout from "@/components/SidebarLayout";
import { useEffect } from "react";
import { getPendingOrders } from "@/store/actions/orderActions";
import { useSelector } from "react-redux";
import { Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";

export default function OrdersPage() {
  const { orders, loading } = useSelector((state) => state.order);
  const { isAuthenticated } = useSelector(state => state.auth)
  const router = useRouter()
  useEffect(() => {
    if (isAuthenticated) {
      getPendingOrders()
    }
  }, [isAuthenticated]);

  const { rows, columns } = getTableData(orders, router);
  return (
    <SidebarLayout>
      <Typography variant={"h4"} color={"primary"}>
        Orders
      </Typography>
      {loading ? <Loading text={"Loading Orders"} /> : <DataGrid
        sx={{ height: "70vh" }}
        columns={columns}
        rows={rows}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
      }
    </SidebarLayout>
  );
}


const getTableData = (orders, router) => {
  return {
    columns: [
      { field: "id", headerName: "ID", width: 90 },
      { field: "user", headerName: "User", width: 250 },
      { field: "order_status", headerName: "Order Status", width: 150 },
      { field: "payment_method", headerName: "Payment Method", width: 150 },
      { field: "order_amount", headerName: "Payable Amount", width: 100 },
      { field: "order_date", headerName: "Order Date", width: 150 },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        width: 100,
        renderCell: (params) => {
          return (
            <Button variant="contained" color="primary" onClick={() => router.push(`/orders/${params.id}`)}>
              View
            </Button>
          )
        }
      },
    ],
    rows: orders.map((order) => ({
      id: order._id,
      user: order.user.name,
      order_status: order.order_status,
      payment_method: order.payment_method,
      order_amount: order.order_amount,
      order_date: order.order_date.split("T")[0].split("-").reverse().join("-"),
    })),
  };
};
