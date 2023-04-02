import Loading from "@/components/Loading";
import SidebarLayout from "@/components/SidebarLayout";
import { getEnquiries } from "@/store/actions/vendorEnquiryActions";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { useSelector } from "react-redux";
import toastMessage from "utils/toastMessage";

const VendorEnquiryList = () => {
  const { loading, enquiries } = useSelector((state) => state.vendorEnquiry);

  useEffect(() => {
    getEnquiries();
  }, []);

  const rows = enquiries.map((el, index) => ({
    ...el,
    id: index + 1,
    action: el._id,
    contacted: String(el.contacted).toUpperCase(),
    sentRegistrationEmail: String(el.sentRegistrationEmail).toUpperCase(),
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
      field: "message",
      headerName: "Message",
      width: 450,
    },
    {
      field: "contacted",
      headerName: "Contacted",
      width: 150,
    },
    {
      field: "sentRegistrationEmail",
      headerName: "Registration Email Sent",
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
        Vendor Enquiry Requests
      </Typography>
      {loading ? (
        <Loading text={"Loading Enquiries"} />
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
        router.push({ pathname: "/vendor/enquiry/single", query: { id } })
      }
      cursor={"pointer"}
      size={20}
    />
  );
};

export default VendorEnquiryList;
