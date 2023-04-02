import { getStateCityData } from "@/store/actions/stateCityActions";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
const { default: SidebarLayout } = require("@/components/SidebarLayout");
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import toastMessage from "utils/toastMessage";

const City = () => {
  const router = useRouter();
  const { state, city } = router.query;
  const { stateCities } = useSelector((state) => state.stateCity);
  const selectedState = stateCities.find((el) => el._id === state);

  const allCities = selectedState?.cities;
  let selectedCity;
  if (city) {
    selectedCity = allCities.find((el) => el._id === city);
  }

  const [form, setForm] = useState({
    state,
    city: selectedCity?.city,
    pincode: selectedCity?.pincode,
  });

  const createCity = async () => {
    try {
      if (Object.values(form).some((el) => !el)) {
        return toastMessage("Please enter a data properly", "error");
      }
      const response = await axios.post("api/city", form);
      //   getStateCityData();
      toastMessage("City Created", "success");
      if (!city) {
        setForm({
          state,
          city: "",
          pincode: "",
        });
      }
      getStateCityData();
    } catch (err) {
      console.log(err);
      toastMessage(err.response.data.message, "error");
    }
  };

  const updateHandler = async () => {
    try {
      const response = await axios.patch(`api/city/${city}`, form);
      toastMessage("City Updated", "success");
      getStateCityData();
    } catch (err) {
      toastMessage(err.response.data.message, "error");
    }
  };

  return (
    <SidebarLayout>
      <Typography variant={"h4"} color={"primary"} sx={{ mb: "1rem" }}>
        {state && city ? "Update" : "Create"} City in {selectedState?.state}
      </Typography>
      <TextField
        sx={{ width: "65%" }}
        placeholder="Enter City Name..."
        value={form.city}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
      />
      <br />
      <br />
      <TextField
        sx={{ width: "65%" }}
        placeholder="Enter Pin Code..."
        type={"number"}
        value={form.pincode}
        onChange={(e) => setForm({ ...form, pincode: e.target.value })}
      />
      <br />
      <br />
      <Button
        variant="contained"
        onClick={state && city ? updateHandler : createCity}
      >
        {state && city ? "Update" : "Create"}
      </Button>
    </SidebarLayout>
  );
};

export default City;
