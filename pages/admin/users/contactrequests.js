import Loading from "@/components/Loading";
import SidebarLayout from "@/components/SidebarLayout";
import { getContactRequests } from "@/store/actions/contactRequestActions";
import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const ContactForm = () => {
  const { loading, requests } = useSelector((state) => state.contactRequests);

  useEffect(() => {
    getContactRequests();
  }, []);

  const columns = [
    { field: "id", headerName: "S.No", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "phoneNumber", headerName: "Phone Number", width: 100 },
    { field: "message", headerName: "Message", width: 200 },
    { field: "addressed", headerName: "Addressed", width: 90 },
    { field: "date", headerName: "Date", width: 200 },
    { field: "action", renderCell: Action, headerName: "View", width: 50 },
  ];

  const rows = requests.map((el, index) => ({
    ...el,
    id: index + 1,
    addressed: el.addressed.toString().toUpperCase(),
    date: new Date(el.createdAt).toLocaleString("en-In"),
    action: { id: el._id },
  }));

  return (
    <SidebarLayout>
      <Typography variant={"h4"} color={"primary"} sx={{ mb: "1rem" }}>
        Contact Requests
      </Typography>
      {loading ? (
        <Loading text={"Loading Contact Requests"} />
      ) : (
        <>
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
              pageSize={5}
              rowsPerPageOptions={[5]}
              experimentalFeatures={{ newEditingApi: true }}
            />
          </div>
        </>
      )}
    </SidebarLayout>
  );
};

const Action = (params) => {
  const id = params.formattedValue.id;
  const router = useRouter();

  return (
    <AiFillEye
      onClick={() =>
        router.push({ pathname: "/admin/users/request", query: { id } })
      }
      cursor={"pointer"}
      size={20}
    />
  );
};

export default ContactForm;
