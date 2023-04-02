import SidebarLayout from "@/components/SidebarLayout";
import { getStateCityData } from "@/store/actions/stateCityActions";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toastMessage from "utils/toastMessage";
import { useRouter } from "next/router";

const AddState = () => {
  const router = useRouter();
  const { state, id } = router.query;

  const [stateName, setStateName] = useState(state || "");
  const createState = async () => {
    try {
      if (!stateName) {
        return toastMessage("Please enter a state name", "error");
      }
      const response = await axios.post("api/city/state", { state: stateName });
      //   getStateCityData();
      toastMessage("State Created", "success");
      if (!state || !id) {
        setStateName("");
      }
    } catch (err) {
      console.log(err);
      toastMessage(err.response.data.message, "error");
    }
  };

  const updateHandler = async () => {
    try {
      const response = await axios.patch(`api/city/state/${id}`, {
        state: stateName,
      });
      toastMessage(response.data.message, "success");
    } catch (err) {
      toastMessage(err.response.data.message, "error");
    }
  };

  return (
    <SidebarLayout>
      <Typography variant={"h4"} color={"primary"} sx={{ mb: "1rem" }}>
        {state && id ? "Update" : "Add"} State
      </Typography>
      <TextField
        sx={{ width: "65%" }}
        placeholder="Enter State Name..."
        value={stateName}
        onChange={(e) => setStateName(e.target.value)}
      />
      <br />
      <br />
      <Button
        variant="contained"
        onClick={state && id ? updateHandler : createState}
      >
        {state && id ? "Update" : "Create"}
      </Button>
    </SidebarLayout>
  );
};

export default AddState;
