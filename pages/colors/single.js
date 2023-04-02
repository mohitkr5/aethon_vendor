import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import SidebarLayout from "@/components/SidebarLayout";
import { Typography, TextField, Box, Button, InputLabel } from "@mui/material";
import { useState } from "react";
import toastMessage from "utils/toastMessage";
import { addColor, updateColor } from "@/store/actions/colorActions";
import { SketchPicker } from "react-color";

// const Container = styled(Box)({
//   maxWidth: "70%",
//   marginInline: "auto",
// });

export default function CreateBrandPage() {
  const { colors } = useSelector((state) => state.color);
  const router = useRouter();
  const { id } = router.query;
  const selectedColor = colors.find((el) => el._id === id);

  const [form, setForm] = useState({
    name: selectedColor?.name || "",
    hexCode: selectedColor?.hexCode || "",
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
      await addColor(form);

      toastMessage("Color Created", "success");
      setForm({ name: "", hexCode: "" });
    } catch (err) {
      toastMessage(err.response.data.message, "error");
    }
  };

  const updateHandler = async () => {
    try {
      if (Object.values(form).some((el) => !el)) {
        return toastMessage("Please enter values properly", "error");
      }
      await updateColor({ ...form, id });
      toastMessage("Color Updated", "success");
    } catch (err) {
      toastMessage(err.response.data.message, "error");
    }
  };

  return (
    <SidebarLayout>
      <Typography variant={"h4"} color={"primary"}>
        {id ? "Update" : "Create"} Color
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
      <br />
      <br />
      <InputLabel id="demo-simple-select-label">Select Color</InputLabel>
      <SketchPicker
        color={form.hexCode}
        onChangeComplete={(color) => {
          setForm({ ...form, hexCode: color.hex });
        }}
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
