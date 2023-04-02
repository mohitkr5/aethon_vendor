import SidebarLayout from "@/components/SidebarLayout";
import { useEffect } from "react";
import { getOrders } from "@/store/actions/orderActions";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "@/components/Loading";

export default function OrdersPage() {
  const { orders, loading } = useSelector((state) => state.order);
  useEffect(() => {
    getOrders();
  }, []);

  const { rows, columns } = getTableData(orders);
  return (
    <SidebarLayout>
      <Typography variant={"h4"} color={"primary"}>
        Orders
      </Typography>
      {loading ? <Loading text={"Loading Employees"} /> : <DataGrid
        sx={{ height: "70vh" }}
        columns={columns}
        rows={rows}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
      }
    </SidebarLayout>
  );
}


const getTableData = (orders) => {
  return {
    columns: [
      { field: "id", headerName: "ID", width: 90 },
      { field: "user", headerName: "User", width: 250 },
      { field: "products", headerName: "Products", width: 250 },
      { field: "order_status", headerName: "Order Status", width: 150 },
      { field: "payment_status", headerName: "Payment Status", width: 150 },
      { field: "payment_method", headerName: "Payment Method", width: 150 },
      { field: "order_amount", headerName: "Order Amount", width: 100 },
      { field: "discount_amount", headerName: "Discount Amount", width: 100 },
      { field: "payable_amount", headerName: "Payable Amount", width: 100 },
      { field: "order_date", headerName: "Order Date", width: 150 },
      { field: "delivery_date", headerName: "Delivery Date", width: 150 },
      { field: "delivery_time", headerName: "Delivery Time", width: 150 },
      { field: "delivery_charge", headerName: "Delivery Charge", width: 150 },
    ],
    rows: orders.map((order) => ({
      id: order._id,
      user: order.user.name,
      products: order.products.map((product) => product.name).join(", "),
      order_status: order.order_status,
      payment_status: order.payment_status,
      payment_method: order.payment_method,
      order_amount: order.order_amount,
      discount_amount: order.discount_amount,
      payable_amount: order.payable_amount,
      order_date: order.order_date,
      delivery_date: order.delivery_date,
      delivery_time: order.delivery_time,
      delivery_charge: order.delivery_charge,
    })),
  };
};
