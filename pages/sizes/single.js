import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import SidebarLayout from "@/components/SidebarLayout";
import { styled } from "@mui/material/styles";
import { Typography, TextField, Box, Button } from "@mui/material";
import { useState } from "react";
import toastMessage from "utils/toastMessage";
import axios from "axios";
import { addBrand, updateBrand } from "@/store/actions/brandActions";
import { addSize, updateSize } from "@/store/actions/sizeActions";

// const Container = styled(Box)({
//   maxWidth: "70%",
//   marginInline: "auto",
// });

export default function CreateBrandPage() {
  const { sizes } = useSelector((state) => state.size);
  const router = useRouter();
  const { id } = router.query;
  const selectedSize = sizes.find((el) => el._id === id);

  const [form, setForm] = useState({
    name: selectedSize?.name || "",
    // description: selectedSize?.description || "",
  });

  const valueChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createHandler = async () => {
    try {
      if (Object.values(form).some((el) => !el)) {
        return toastMessage("Please enter values properly", "error");
      }
      await addSize(form);

      toastMessage("Size Created", "success");
      setForm({ name: "", description: "", commission: "" });
    } catch (err) {
      toastMessage(err.response.data.message, "error");
    }
  };

  const updateHandler = async () => {
    try {
      if (Object.values(form).some((el) => !el)) {
        return toastMessage("Please enter values properly", "error");
      }
      await updateSize({ ...form, id });
      toastMessage("Size Updated", "success");
    } catch (err) {
      toastMessage(err.response.data.message, "error");
    }
  };

  return (
    <SidebarLayout>
      <Typography variant={"h4"} color={"primary"}>
        {id ? "Update" : "Create"} Size
      </Typography>
      <br />
      <br />
      <TextField
        sx={{ width: "80%" }}
        label={"Name"}
        name="name"
        value={form.name}
        onChange={valueChangeHandler}
      />
      {/* <br />
      <br />
      <TextField
        sx={{ width: "80%" }}
        label={"Description"}
        name="description"
        value={form.description}
        onChange={valueChangeHandler}
      /> */}
      <br />
      <br />
      <Button variant="contained" onClick={id ? updateHandler : createHandler}>
        {id ? "Update" : "Create"}
      </Button>
    </SidebarLayout>
  );
}
