import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import SidebarLayout from "@/components/SidebarLayout";
import { styled } from "@mui/material/styles";
import {
  Typography,
  TextField,
  Box,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import toastMessage from "utils/toastMessage";
import axios from "axios";
import { getCategories } from "@/store/actions/categoryActions";
import {
  createSubCategory,
  updateSubCategory,
} from "@/store/actions/subCategoryActions";

// const Container = styled(Box)({
//   maxWidth: "70%",
//   marginInline: "auto",
// });

export default function CreateCategoryPage() {
  const { categories } = useSelector((state) => state.category);
  const { subCategories } = useSelector((state) => state.subCategory);
  const router = useRouter();
  const { id } = router.query;
  const selectedSubCategory = subCategories.find((el) => el._id === id);

  if (!categories.length) {
    getCategories();
  }

  console.log(selectedSubCategory);

  const [form, setForm] = useState({
    category: selectedSubCategory?.categoryId || "",
    name: selectedSubCategory?.name || "",
  });

  const valueChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  console.log(form);

  const createHandler = async () => {
    try {
      console.log(form);
      if (Object.values(form).some((el) => !el)) {
        return toastMessage("Please enter values properly", "error");
      }
      await createSubCategory(form);

      toastMessage("Sub Category Created", "success");
      setForm({ name: "", description: "" });
    } catch (err) {
      toastMessage(err.response.data.message, "error");
    }
  };

  const updateHandler = async () => {
    try {
      if (Object.values(form).some((el) => !el)) {
        return toastMessage("Please enter values properly", "error");
      }
      await updateSubCategory({ ...form, id });
      toastMessage("Sub Category Updated", "success");
    } catch (err) {
      toastMessage(err.response.data.message, "error");
    }
  };

  return (
    <SidebarLayout>
      <Typography variant={"h4"} color={"primary"}>
        Create Sub Category
      </Typography>
      <br />
      <br />
      {/* <InputLabel id="demo-simple-select-label">Category</InputLabel> */}
      <Select
        sx={{ width: "80%" }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        name={"category"}
        label="Category"
        value={form.category}
        onChange={valueChangeHandler}
      >
        {categories.map((el, index) => (
          <MenuItem key={index} value={el._id}>
            {el.name}
          </MenuItem>
        ))}
      </Select>
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
      <Button variant="contained" onClick={id ? updateHandler : createHandler}>
        {id ? "Update" : "Create"}
      </Button>
    </SidebarLayout>
  );
}
