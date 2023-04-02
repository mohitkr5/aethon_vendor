import Loading from "@/components/Loading";
import SidebarLayout from "@/components/SidebarLayout";
import {
  dispatchError,
  markEnquiryAsContacted,
  verifyAndSendVerificationEmail,
} from "@/store/actions/vendorEnquiryActions";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import toastMessage from "utils/toastMessage";

const SingleEnquiryView = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, enquiries } = useSelector((state) => state.vendorEnquiry);

  if (!id) {
    return <>Incorrect Redirection</>;
  }

  console.log({ enquiries });

  const selectedEnquiry = enquiries.find((el) => el._id === id);

  const markContacted = async () => {
    try {
      toastMessage("Submitting...", "success");
      const data = await markEnquiryAsContacted(id);
      toastMessage(data.message, "success");
    } catch (err) {
      toastMessage(err.response.data.message, "error");
    }
  };

  const sendVerificationEmail = async () => {
    try {
      toastMessage("Submitting...", "success");
      const data = await verifyAndSendVerificationEmail(id);
      toastMessage(data.message, "success");
    } catch (err) {
      toastMessage(err.response.data.message, "error");
    }
  };

  return (
    <SidebarLayout>
      <Typography variant={"h4"} color={"primary"} sx={{ mb: "1rem" }}>
        Single Vendor Enquiry Request
      </Typography>

      <div>
        <TextField
          label={"Name"}
          value={selectedEnquiry.name}
          sx={{ width: "80%" }}
        />
        <br />
        <br />
        <TextField
          label={"Email"}
          value={selectedEnquiry.email}
          sx={{ width: "80%" }}
        />
        <br />
        <br />
        <TextField
          label={"Phone Number"}
          value={selectedEnquiry.phoneNumber}
          sx={{ width: "80%" }}
        />
        <br />
        <br />
        <TextField
          label={"Message"}
          value={selectedEnquiry.message}
          sx={{ width: "80%" }}
        />
        <br />
        <br />
        <Box
          sx={{
            width: "80%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          {selectedEnquiry.contacted ? (
            <></>
          ) : (
            <Button
              variant="contained"
              sx={{ marginBottom: "10px", marginRight: 0 }}
              onClick={markContacted}
            >
              Mark as Contacted
            </Button>
          )}
          {selectedEnquiry.sentRegistrationEmail ? (
            <></>
          ) : (
            <Button
              variant="contained"
              sx={{ marginBottom: "10px", marginRight: 0 }}
              onClick={sendVerificationEmail}
            >
              Verify & Send Registration Email
            </Button>
          )}
        </Box>
      </div>
    </SidebarLayout>
  );
};

export default SingleEnquiryView;
