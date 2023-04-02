import SidebarLayout from "@/components/SidebarLayout";
import {
  Typography,
  TextField,
  Box,
  TextareaAutosize,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import FileDropzone from "@/components/CreateProduct/Dropzone";
import { uploadImages } from "../../../utils/upload";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { createProduct } from "@/store/actions/productsActions";
import { getCategories } from "@/store/actions/categoryActions";

const Container = styled(Box)({
  maxWidth: "70%",
  marginInline: "auto",
});

export default function CreateProductPage() {
  const router = useRouter();
  const { categories } = useSelector((state) => state.category);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    mrp: "",
    price: "",
    colors: "",
    category: "",
  });

  const { name, description, mrp, price, colors, category } = formData;
  const [image, setImage] = useState([]);
  const [images, setImages] = useState([]);
  const [carousalImages, setCarousalImages] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  // Make a function to handle form data change
  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductCreate = async () => {
    let imageLinks = await uploadImages(images, name);
    await Promise.all(imageLinks).then((links) => {
      imageLinks = links;
    });

    let carousalImageLinks = await uploadImages(carousalImages, name);
    await Promise.all(carousalImageLinks).then((links) => {
      carousalImageLinks = links;
    });

    let imageLink = await uploadImages(image, name);
    await Promise.all(imageLink).then((links) => (imageLink = links[0]));

    const apiPayload = {
      name,
      description,
      mrp,
      price,
      colors: colors.split(","),
      image: imageLink,
      images: imageLinks,
      carousalImages: carousalImageLinks,
      category,
    };

    createProduct(apiPayload);
  };

  return (
    <SidebarLayout pageTitle={"Add Employee"}>
      <Container>
        <Box sx={{ display: "flex", flexFlow: "column", gap: "1rem" }}>
          <TextField
            label={"Name"}
            value={name}
            name={"name"}
            onChange={handleFormDataChange}
            fullWidth
          />
          <TextareaAutosize
            value={description}
            name={"description"}
            onChange={handleFormDataChange}
            aria-label="empty textarea"
            placeholder="Description"
            fullWidth
          />
          <TextField
            label={"MRP"}
            value={mrp}
            name={"mrp"}
            type={"number"}
            fullWidth
            onChange={handleFormDataChange}
          />
          <TextField
            label={"Price"}
            value={price}
            name={"price"}
            type={"number"}
            fullWidth
            onChange={handleFormDataChange}
          />
          <FileDropzone
            images={image}
            setImages={setImage}
            dropzoneLabel={"Upload Product Image"}
            limit={1}
          />{" "}
          <FileDropzone
            images={images}
            setImages={setImages}
            dropzoneLabel={"Upload Product Images"}
            limit={10}
          />
          <FileDropzone
            images={carousalImages}
            setImages={setCarousalImages}
            dropzoneLabel={"Upload Product Carousal Images"}
            limit={10}
          />
          <TextField
            label={"Colors"}
            value={colors}
            name={"colors"}
            onChange={handleFormDataChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              name={"category"}
              onChange={handleFormDataChange}
            >
              {categories.map((category, index) => (
                <MenuItem key={index} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button
          onClick={handleProductCreate}
          variant={"contained"}
          sx={{ mt: "1rem" }}
        >
          Create Product
        </Button>
      </Container>
    </SidebarLayout>
  );
}
