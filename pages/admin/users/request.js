import SidebarLayout from "@/components/SidebarLayout";
import { markAddressed } from "@/store/actions/contactRequestActions";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import toastMessage from "utils/toastMessage";

const Request = () => {
  const router = useRouter();
  const { id } = router.query;
  const { requests } = useSelector((state) => state.contactRequests);
  const selectedRequest = requests.find((el) => el._id === id);
  console.log(selectedRequest);

  const markAsAddressed = async () => {
    try {
      await markAddressed({ id });
      toastMessage("Marked as Addressed", "success");
    } catch (err) {
      toastMessage(err.response.data.message, "error");
    }
  };

  return (
    <SidebarLayout>
      <Typography variant={"h4"} color={"primary"} sx={{ mb: "1rem" }}>
        Single Request
      </Typography>
      <Line data={selectedRequest} label={"Name"} valueField={"name"} />
      <Line data={selectedRequest} label={"Email"} valueField={"email"} />
      <Line
        data={selectedRequest}
        label={"Phone No."}
        valueField={"phoneNumber"}
      />
      <Line
        data={selectedRequest}
        label={"Addressed"}
        valueField={"addressed"}
      />
      <Line
        data={selectedRequest}
        label={"Time Stamp"}
        valueField={"createdAt"}
      />
      <Line data={selectedRequest} label={"Message"} valueField={"message"} />
      <br />
      <Box
        sx={{
          width: "80%",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        {selectedRequest.email ? (
          <a
            target="_blank"
            rel="noreferrer"
            href={`mailto:${selectedRequest.email}`}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              sx={{ marginBottom: "10px", marginRight: 0 }}
            >
              Contact on Email
            </Button>
          </a>
        ) : (
          <p></p>
        )}
        {selectedRequest.addressed ? (
          <p></p>
        ) : (
          <Button
            variant="contained"
            sx={{ marginBottom: "10px", marginRight: 0 }}
            onClick={markAsAddressed}
          >
            Mark Addressed
          </Button>
        )}
      </Box>
    </SidebarLayout>
  );
};

const Line = ({ data, label, valueField }) => {
  return (
    <Grid
      container
      width={"80%"}
      columnGap={1}
      alignItems={"center"}
      sx={{ marginBottom: "15px" }}
    >
      <Grid item xs={2}>
        {label}:
      </Grid>
      <Grid item xs={8}>
        <TextField
          fullWidth
          value={
            valueField === "createdAt"
              ? new Date(data[valueField]).toLocaleString("en-IN")
              : data[valueField]
          }
          disabled={true}
        />
      </Grid>
    </Grid>
  );
};

export default Request;
