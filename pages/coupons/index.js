import Loading from "@/components/Loading";
import SidebarLayout from "@/components/SidebarLayout";
import { deleteCoupon, getMyCoupons } from "@/store/actions/couponActions";
import { Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";

function CouponPage() {
  const { loading, coupons } = useSelector((state) => state.coupon);
  const router = useRouter();

  useEffect(() => {
    if (!coupons.length) {
      console.log("coupons empty so fetching");
      getMyCoupons();
    }
  }, []);

  const columns = [
    { field: "id", headerName: "S.No", width: 0 },
    { field: "code", headerName: "Coupon Name", width: 150 },
    { field: "discount", headerName: "Discount Percentage (%)", width: 200 },
    { field: "coupon_level", headerName: "Coupon Type", width: 200 },
    { field: "min_order_amount", headerName: "Min Order Amount", width: 200 },
    {
      field: "max_discount_amount",
      headerName: "Max Discount Amount",
      width: 200,
    },
    {
      field: "expiry",
      headerName: "Expiry",
      width: 200,
      renderCell: Expiry,
    },
    {
      field: "action",
      headerName: "Action",
      width: 90,
      renderCell: Action,
    },
  ];

  const rows = coupons.map((el, index) => ({
    id: index + 1,
    ...el,
    action: { id: el._id },
  }));

  return (
    <SidebarLayout>
      <Typography variant={"h4"} color={"primary"} sx={{ mb: "1rem" }}>
        Coupons
      </Typography>
      {loading ? (
        <Loading text={"Loading Coupons"} />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              sx={{ marginBottom: "10px", marginRight: 0 }}
              onClick={() => router.push("/coupons/single")}
            >
              Add Coupon
            </Button>
          </div>
          <DataGrid
            sx={{ height: "70vh" }}
            columns={columns}
            rows={rows}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </>
      )}
    </SidebarLayout>
  );
}

const Expiry = (params) => {
  const date = params.formattedValue;
  return new Date(date).toLocaleDateString("en-IN");
};

const Action = (params) => {
  const { id } = params.formattedValue;
  const router = useRouter();

  const editHandler = (id) => {
    router.push({ pathname: "/coupons/single", query: { id } });
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-evenly",
      }}
    >
      <button
        style={{ cursor: "pointer" }}
        onClick={() => {
          editHandler(id);
        }}
      >
        <AiFillEdit />
      </button>
      <button style={{ cursor: "pointer" }} onClick={() => deleteCoupon(id)}>
        <AiFillDelete />
      </button>
    </div>
  );
};

export default CouponPage;
