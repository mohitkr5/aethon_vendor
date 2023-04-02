import Loading from "@/components/Loading";
import SidebarLayout from "@/components/SidebarLayout";
import { approveRegistration } from "@/store/actions/vendorRegistrationActions";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import toastMessage from "utils/toastMessage";

const SingleEnquiryView = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, registrations } = useSelector(
    (state) => state.vendorRegistration
  );

  if (!id) {
    return <>Incorrect Redirection</>;
  }

  const selectedRegistrations = registrations.find((el) => el._id === id);
  console.log(selectedRegistrations);

  const approveAndCreateVendor = async () => {
    try {
      toastMessage("Submitting...", "success");
      const data = await approveRegistration(id);
      toastMessage(data.message, "success");
    } catch (err) {
      toastMessage(err.response.data.message, "error");
    }
  };

  return (
    <SidebarLayout>
      <Typography variant={"h4"} color={"primary"} sx={{ mb: "1rem" }}>
        Single Vendor Registration Request
      </Typography>

      <div>
        <TextField
          label={"Name"}
          value={selectedRegistrations.name}
          sx={{ width: "80%" }}
        />
        <br />
        <br />
        <TextField
          label={"Email"}
          value={selectedRegistrations.email}
          sx={{ width: "80%" }}
        />
        <br />
        <br />
        <TextField
          label={"Phone Number"}
          value={selectedRegistrations.phoneNumber}
          sx={{ width: "80%" }}
        />
        <br />
        <br />
        <TextField
          label={"Company Name"}
          value={selectedRegistrations.companyName}
          sx={{ width: "80%" }}
        />
        <br />
        <br />
        <TextField
          label={"GST No"}
          value={selectedRegistrations.gstNo}
          sx={{ width: "80%" }}
        />
        <br />
        <br />
        <TextField
          label={"Address"}
          value={selectedRegistrations.address}
          sx={{ width: "80%" }}
        />
        <br />
        <br />
        <TextField
          label={"City"}
          value={selectedRegistrations?.city?.city}
          sx={{ width: "80%" }}
        />
        <br />
        <br />
        <TextField
          label={"State"}
          value={selectedRegistrations?.state?.state}
          sx={{ width: "80%" }}
        />
        <br />
        <br />
        <TextField
          label={"Category"}
          value={selectedRegistrations?.category?.name}
          sx={{ width: "80%" }}
          disabled={selectedRegistrations?.category?.name ? false : true}
        />
        <br />
        <br />
        <TextField
          label={"Brand"}
          value={selectedRegistrations?.brand?.name}
          sx={{ width: "80%" }}
          disabled={selectedRegistrations?.brand?.name ? false : true}
        />
        <br />
        <br />
        <TextField
          label={"Turnover (Lakhs per year)"}
          value={selectedRegistrations?.turnover}
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
          {selectedRegistrations.vendorCreated ? (
            <></>
          ) : (
            <Button
              variant="contained"
              sx={{ marginBottom: "10px", marginRight: 0 }}
              onClick={approveAndCreateVendor}
            >
              Approve and Create Vendor
            </Button>
          )}
        </Box>
      </div>
    </SidebarLayout>
  );
};

export default SingleEnquiryView;
