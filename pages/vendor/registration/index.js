import Loading from "@/components/Loading";
import SidebarLayout from "@/components/SidebarLayout";
import { getVendorRegistrations } from "@/store/actions/vendorRegistrationActions";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { useSelector } from "react-redux";

const VendorRegistrations = () => {
  const { loading, registrations } = useSelector(
    (state) => state.vendorRegistration
  );

  useEffect(() => {
    getVendorRegistrations();
  }, []);

  const rows = registrations.map((el, index) => ({
    ...el,
    id: index + 1,
    action: el._id,
    approved: String(el.approved).toUpperCase(),
    vendorCreated: String(el.vendorCreated).toUpperCase(),
  }));

  const columns = [
    { field: "id", headerName: "S.No", width: 0 },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
    },
    {
      field: "companyName",
      headerName: "Company Name",
      width: 450,
    },
    {
      field: "approved",
      headerName: "Approved",
      width: 150,
    },
    {
      field: "vendorCreated",
      headerName: "Vendor Created",
      width: 200,
    },
    {
      renderCell: Actions,
      field: "action",
      headerName: "Actions",
      width: 100,
    },
  ];

  return (
    <SidebarLayout>
      <Typography variant={"h4"} color={"primary"} sx={{ mb: "1rem" }}>
        Vendor Registration Requests
      </Typography>
      {loading ? (
        <Loading text={"Loading Registrations"} />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <DataGrid
            sx={{ height: "70vh" }}
            columns={columns}
            rows={rows}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </div>
      )}
    </SidebarLayout>
  );
};

const Actions = (params) => {
  const id = params.formattedValue;
  const router = useRouter();

  return (
    <AiFillEye
      onClick={() =>
        router.push({ pathname: "/vendor/registration/single", query: { id } })
      }
      cursor={"pointer"}
      size={20}
    />
  );
};

export default VendorRegistrations;
