import SidebarLayout from "@/components/SidebarLayout";
import AsyncSelect from "react-select/async";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import {
  Typography,
  TextField,
  Box,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Fragment, useEffect, useState } from "react";
import FileDropzone from "@/components/CreateProduct/Dropzone";
import { uploadImages } from "../../utils/upload";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  addVendor,
  createProduct,
  createVariant,
} from "@/store/actions/productsActions";
import { getCategories } from "@/store/actions/categoryActions";
import { getSubCategories } from "@/store/actions/subCategoryActions";
import { getBrands } from "@/store/actions/brandActions";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import { getSizes } from "@/store/actions/sizeActions";
import {
  Dropdown,
  ImageViewer,
  LeftSideLabel,
  RightSideLabel,
} from "@/components/helperComponents";
import { getColors } from "@/store/actions/colorActions";
import styles from "../../styles/product.module.css";
import toastMessage from "utils/toastMessage";
import { Label } from "@mui/icons-material";

const Container = styled(Box)({
  maxWidth: "70%",
  marginInline: "auto",
});

export default function CreateProductPage() {
  const router = useRouter();
  const [selectedWholeNewProduct, setSelectedWholeNewProduct] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    product: "",
    mrp: "",
    price: "",
    colors: "",
    category: "",
    subCategory: "",
    brand: "",
    technicalSpecifications: [],
    size: "",
  });

  const [newVariantType, setNewVariantType] = useState(null);
  const [variants, setVariants] = useState([
    { color: "", discountPercentage: 0 },
  ]);

  // const [previouslyPresentColors, setPreviouslyPresentColors] = useState([]);
  // const [previouslyPresentColorNames, setPreviouslyPresentColorNames] =
  //   useState([]);
  const [previousVariations, setPreviousVariations] = useState([]);

  const { categories } = useSelector((state) => state.category);
  const { subCategories } = useSelector((state) => state.subCategory);
  const { brands } = useSelector((state) => state.brand);
  const { sizes } = useSelector((state) => state.size);
  const { colors } = useSelector((state) => state.color);
  const {
    user: { _id },
  } = useSelector((state) => state.auth);

  // const { name, description, mrp, price, category } = formData;

  useEffect(() => {
    if (!categories.length) {
      getCategories();
    }
    if (!subCategories.length) {
      getSubCategories();
    }
    if (!brands.length) {
      getBrands();
    }
    if (!sizes.length) {
      getSizes();
    }
    if (!colors.length) {
      getColors();
    }
  }, []);

  /////// Product type choser
  const productTypeChoser = (bool) => {
    setSelectedWholeNewProduct(bool);
    setNewVariantType(null);
    // setPreviouslyPresentColors([]);
    setPreviousVariations([]);
    setFormData({
      category: formData.category,
      brand: formData.brand,
      subCategory: formData.subCategory,
      name: "",
      product: "",
    });
  };

  //////////Variant Type Choser
  const variantTypeChoser = (type) => {
    setVariants([{ color: "", discountPercentage: 0 }]);
    setNewVariantType(type);
  };

  ////////////Minor front end calculations

  const masterDataEntryFieldDisabled = Boolean(formData.product);

  //Total colors that are present for the search product/
  const previouslyPresentColors = previousVariations.map((el) => el.color._id);
  const previouslyPresentColorNames = previousVariations.map(
    (el) => el.color.name
  );

  ///Color variants which are already submitted by the signed in vendor///
  const blockedVariants = previousVariations.filter((variant) => {
    const vendors = variant.vendors.map((el) => el.vendor);
    if (vendors.includes(_id)) {
      return true;
    } else {
      return falseß;
    }
  });

  //Colors to the corresponding variants that are already submitted by the signed in vendor///
  const colorNamesBlocked = blockedVariants.map((el) => el.color.name);
  const colorsBlocked = blockedVariants.map((el) => el.color._id);

  const existingColorsWhichCanBeAdded = () => {
    const allowedColors = previouslyPresentColors.filter(
      (el) => !colorsBlocked.includes(el)
    );
    return colors.filter((el) => allowedColors.includes(el._id));
  };

  console.log({
    previouslyPresentColors,
    colorNamesBlocked,
    colorsBlocked,
    usableOldColors: existingColorsWhichCanBeAdded(),
  });

  const filteredSubCategories = subCategories.filter(
    (el) => el.categoryId === formData.category
  );

  const selectedColors = variants
    .map((el) => el.color)
    .concat(previouslyPresentColors);

  /////////// Make a function to handle form data change
  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /////////// Make a function to handle form data change for variants
  const handleFormDataChangeVariant = (index, e) => {
    const { name, value } = e.target;
    const variantData = [...variants];
    variantData[index][name] = value;
    const gstPercentage = Number(formData.gstPercentage);
    const mrp = variantData[index]["mrp"];
    if (name === "discountPercentage") {
      if (gstPercentage && value && mrp) {
        variantData[index]["basePrice"] = Number(
          ((100 - value) * mrp) / 100 / (1 + gstPercentage / 100)
        ).toFixed(2);
      }
    }
    if (name === "mrp") {
      if (!formData.gstPercentage) {
        return toastMessage("Please enter gst percentage first", "error");
      }
      if (gstPercentage && value) {
        variantData[index]["basePrice"] = Number(
          value / (1 + gstPercentage / 100)
        ).toFixed(2);
      }
    }
    setVariants(variantData);
  };

  ////////Remove Variant
  const removeVariant = (index) => {
    console.log(index);
    const variantData = JSON.parse(JSON.stringify(variants));
    variantData.splice(index, 1);
    setVariants(variantData);
  };

  /////////Technical Specification Value Change
  const tsValueChangeHandler = (row, index, value) => {
    const technicalSpecifications = JSON.parse(
      JSON.stringify(formData.technicalSpecifications)
    );
    technicalSpecifications[row][index] = value;
    setFormData({ ...formData, technicalSpecifications });
  };

  ///////Delete Technical specification
  const deleteTechinicalSpecification = (index) => {
    const technicalSpecifications = JSON.parse(
      JSON.stringify(formData.technicalSpecifications)
    );
    technicalSpecifications.splice(index, 1);
    setFormData({ ...formData, technicalSpecifications });
  };

  /////////Get Product Names on search
  const getProducts = async (name) => {
    const response = await axios.get("api/products/byname", {
      params: {
        brand: formData.brand,
        category: formData.category,
        subCategory: formData.subCategory,
        name,
      },
    });
    return response.data.data.map((el) => ({
      value: { ...el, product: el._id },
      label: el.name,
    }));
  };

  const finishSubmitting = () => {
    setSubmitting(false);
    setFormData({
      name: "",
      description: "",
      product: "",
      mrp: "",
      price: "",
      colors: "",
      category: "",
      subCategory: "",
      brand: "",
      technicalSpecifications: [],
      size: "",
    });
    setVariants([{ color: "", discountPercentage: 0 }]);
  };

  //Final Submit function
  const fullProductCreate = async () => {
    try {
      const {
        description: Description,
        technicalSpecifications,
        size: Size,
        warranty: Warranty,
        hsnCode: HSNCode,
        gstPercentage: GSTPercentage,
        descriptionImages,
      } = formData;

      const obj = { Description, Size, Warranty, HSNCode, GSTPercentage };
      const emptyFormDataItems = Object.keys(obj).filter((el) => !obj[el]);
      // console.log(emptyFormDataItems);
      if (emptyFormDataItems.length) {
        return toastMessage(
          `Please fill ${emptyFormDataItems.join(", ")} field(s). `,
          "error"
        );
      }

      if (!technicalSpecifications.length) {
        return toastMessage("Please enter technical specifications", "error");
      }

      const flatArray = technicalSpecifications.flat();
      if (flatArray.some((el) => !el)) {
        return toastMessage(
          "Please enter the correct key value pairs for technical specifications",
          "error"
        );
      }

      if (!variants.length) {
        return toastMessage(
          "At least one color variation is necessary to add a new product",
          "error"
        );
      }

      let allVariantFields = variants
        .map((el) => ({
          color: el.color,
          mrp: el.mrp,
          basePrice: el.basePrice,
          inventory: el.inventory,
          thumbnailImage: el.thumbnailImage?.length,
          images: el.images?.length,
        }))
        .map((el) => Object.values(el))
        .flat();
      console.log(allVariantFields);
      if (allVariantFields.some((el) => !el)) {
        return toastMessage(
          "Please enter all the information properly in the color variants",
          "error"
        );
      }

      if (descriptionImages?.length) {
        let descImages = formData.descriptionImages;
        descriptionImages = await uploadImages(descImages, name);
      }

      const apiPayload = {
        ...formData,
        descriptionImages,
      };

      toastMessage("Submitting", "success");
      setSubmitting(true);

      const {
        data: { product: productInfo },
      } = await createProduct(apiPayload);

      const product = productInfo._id;
      await Promise.all(
        variants.map(async (variant) => {
          const [thumbnailImage, images] = await Promise.all([
            uploadImages(variant.thumbnailImage, formData.name),
            uploadImages(variant.images, formData.name),
          ]);

          const apiPayload = {
            ...variant,
            thumbnailImage: thumbnailImage[0],
            images,
            product,
          };
          await createVariant(apiPayload);
        })
      );

      toastMessage("Product Created", "success");
      finishSubmitting();
    } catch (err) {
      setSubmitting(false);
      toastMessage(err.response?.data?.message || err?.message, "error");
    }
  };

  const createListing = async () => {
    try {
      let allVariantFields = variants
        .map((el) => ({
          color: el.color,
          mrp: el.mrp,
          basePrice: el.basePrice,
          inventory: el.inventory,
          thumbnailImage: el.thumbnailImage?.length,
          images: el.images?.length,
        }))
        .map((el) => Object.values(el))
        .flat();

      console.log(allVariantFields);
      if (allVariantFields.some((el) => !el)) {
        return toastMessage(
          "Please enter all the information properly in the color variants",
          "error"
        );
      }

      await Promise.all(
        variants.map(async (variant) => {
          const [thumbnailImage, images] = await Promise.all([
            uploadImages(variant.thumbnailImage, formData.name),
            uploadImages(variant.images, formData.name),
          ]);

          const apiPayload = {
            ...variant,
            thumbnailImage: thumbnailImage[0],
            images,
            product: formData.product,
          };
          await createVariant(apiPayload);
        })
      );
      toastMessage("Listings Added", "success");
      finishSubmitting();
    } catch (err) {
      toastMessage(err?.response?.data?.message || err?.message, "error");
    }
  };

  const addVendorToListing = async () => {
    try {
      let allVariantFields = variants
        .map((el) => ({
          color: el.color,
          mrp: el.mrp,
          basePrice: el.basePrice,
          inventory: el.inventory,
        }))
        .map((el) => Object.values(el))
        .flat();

      console.log(allVariantFields);
      if (allVariantFields.some((el) => !el)) {
        return toastMessage(
          "Please enter all the information properly in the color variants",
          "error"
        );
      }

      await Promise.all(
        variants.map(async (variant) => {
          const apiPayload = {
            ...variant,
            variant: previousVariations.find(
              (el) => el.color._id === variant.color
            )._id,
            product: formData.product,
          };
          await addVendor(apiPayload);
        })
      );
      toastMessage("Listings Added", "success");
      finishSubmitting();
    } catch (err) {
      toastMessage(err?.response?.data?.message || err?.message, "error");
    }
  };

  return (
    <SidebarLayout pageTitle={"Create Product"}>
      <Typography variant="h5" sx={{ backgroundColor: "gold" }}>
        Master Information
      </Typography>
      <br />
      <Dropdown
        state={formData}
        onChange={handleFormDataChange}
        name="category"
        label="Category"
        data={categories}
      />
      <br />
      <br />
      {formData.category && (
        <>
          <Dropdown
            state={formData}
            onChange={handleFormDataChange}
            name="subCategory"
            label="Sub Category"
            data={filteredSubCategories}
          />
          <br />
          <br />
        </>
      )}
      {formData.subCategory && (
        <>
          <Dropdown
            state={formData}
            onChange={handleFormDataChange}
            name="brand"
            label="Brand"
            data={brands}
          />
          <br />
          <br />
        </>
      )}
      {formData.brand && !selectedWholeNewProduct && (
        <>
          <InputLabel>Product Name (without the brand name)</InputLabel>
          <AsyncSelect
            closeMenuOnSelect={true}
            cacheOptions
            loadOptions={getProducts}
            onChange={(values) => {
              // console.log(values.value);
              setFormData({ ...values.value });
              setPreviousVariations(values.value.variations);
              // setPreviouslyPresentColors(
              //   values.value.variations?.map((el) => el.color._id) || []
              // );
              // setPreviouslyPresentColorNames(
              //   values.value.variations?.map((el) => el.color.name) || []
              // );
            }}
            styles={{
              control: (base, state) => {
                return {
                  ...base,
                  paddingTop: ".75%",
                  paddingBottom: "0.75%",
                  borderColor: state.menuIsOpen
                    ? "yellow !important"
                    : "lightGrey",
                };
              },
            }}
          />
          <RightSideLabel
            label={"Can't find the product? Create New Listing"}
            onClick={() => {
              productTypeChoser(true);
            }}
          />
        </>
      )}
      {formData.brand && selectedWholeNewProduct && (
        <>
          <TextField
            label={"Name (Without Brand Name)"}
            value={formData.name}
            name={"name"}
            type={"text"}
            fullWidth
            onChange={handleFormDataChange}
          />
          <RightSideLabel
            label={"Search a Product"}
            onClick={() => {
              productTypeChoser(false);
            }}
          />
        </>
      )}
      {(formData.product || formData.name) && (
        <>
          <InputLabel>Add Description</InputLabel>
          <ReactQuill
            modules={{
              toolbar: [
                ["bold", "underline", "italic"],
                ["code-block", "blockquote"],
                [{ header: [1, 2, 3, 4, 5] }],
                [{ list: "ordered" }],
                [{ list: "bullet" }],
              ],
            }}
            theme="snow"
            onChange={(value) => {
              handleFormDataChange({
                target: { name: "description", value },
              });
            }}
            value={formData.description}
            readOnly={masterDataEntryFieldDisabled}
          />
          <br />
          <InputLabel>Techinical Specifications</InputLabel>
          <Box sx={{ border: "1px solid lightgrey", padding: "0.5%" }}>
            {formData?.technicalSpecifications?.map((el, index) => (
              <Grid
                container
                key={index}
                sx={{ paddingBottom: "0.5%" }}
                alignItems="center"
              >
                <Grid item xs={3}>
                  <input
                    style={{ width: "100%", padding: "0.5%" }}
                    value={el[0]}
                    onChange={(e) =>
                      tsValueChangeHandler(index, 0, e.target.value)
                    }
                    disabled={masterDataEntryFieldDisabled}
                  />
                </Grid>
                <Grid item xs={0.25}>
                  <p style={{ textAlign: "center" }}>:</p>
                </Grid>
                <Grid item xs={8.5}>
                  <input
                    style={{ width: "100%", padding: "0.5%" }}
                    value={el[1]}
                    onChange={(e) =>
                      tsValueChangeHandler(index, 1, e.target.value)
                    }
                    disabled={masterDataEntryFieldDisabled}
                  />
                </Grid>
                {!masterDataEntryFieldDisabled && (
                  <Grid item xs={0.25} sx={{ textAlign: "center" }}>
                    <AiFillCloseCircle
                      cursor={"pointer"}
                      onClick={() => deleteTechinicalSpecification(index)}
                    />
                  </Grid>
                )}
              </Grid>
            ))}

            {!masterDataEntryFieldDisabled && (
              <Grid container>
                <Grid item xs={12}>
                  <RightSideLabel
                    onClick={() =>
                      setFormData({
                        ...formData,
                        technicalSpecifications: [
                          ...(formData.technicalSpecifications || []),
                          ["", ""],
                        ],
                      })
                    }
                    label="Add Specification"
                  />
                </Grid>
              </Grid>
            )}
          </Box>
          <br />
          <Grid container rowGap={3}>
            <Grid item xs={5.9}>
              <Dropdown
                state={formData}
                onChange={handleFormDataChange}
                name="size"
                label="Size"
                data={sizes}
                disabled={masterDataEntryFieldDisabled}
              />
            </Grid>
            <Grid item xs={0.2}></Grid>
            <Grid item xs={5.9}>
              <TextField
                label={"Warranty (in years)"}
                value={formData.warranty}
                name={"warranty"}
                type={"number"}
                fullWidth
                onChange={handleFormDataChange}
                disabled={masterDataEntryFieldDisabled}
              />
            </Grid>
            <Grid item xs={5.9}>
              <TextField
                label={"HSN Code"}
                value={formData.hsnCode}
                name={"hsnCode"}
                type={"number"}
                fullWidth
                onChange={handleFormDataChange}
                disabled={masterDataEntryFieldDisabled}
              />
            </Grid>
            <Grid item xs={0.2}></Grid>
            <Grid item xs={5.9}>
              <TextField
                label={"GST Percentage"}
                value={formData.gstPercentage}
                name={"gstPercentage"}
                type={"number"}
                fullWidth
                onChange={handleFormDataChange}
                disabled={masterDataEntryFieldDisabled}
              />
            </Grid>
          </Grid>
          <br />
          {masterDataEntryFieldDisabled ? (
            <ImageViewer images={formData.descriptionImages} />
          ) : (
            <FileDropzone
              images={formData?.descriptionImages || []}
              setImages={(e) => {
                // console.log(e);
                handleFormDataChange({
                  target: { name: "descriptionImages", value: e },
                });
              }}
              dropzoneLabel={"Upload Description Images"}
              limit={10}
            />
          )}
          <br />
          <br />
          <Typography variant="h5" sx={{ backgroundColor: "gold" }}>
            Variant Information
          </Typography>
          <br />

          {previouslyPresentColors.length ? (
            <Box
              sx={{
                border: "1px solid lightgrey",
                padding: "1%",
                marginBottom: "1.5%",
              }}
            >
              <Typography textAlign={"center"}>
                Previously Present Color(s) are -{" "}
                {previouslyPresentColorNames.join(", ")}
              </Typography>
              {colorNamesBlocked.length && (
                <Typography textAlign={"center"}>
                  You have already listings in - {colorNamesBlocked.join(", ")}
                </Typography>
              )}

              <Box
                sx={{
                  paddingLeft: "10%",
                  paddingRight: "10%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  marginTop: "15px",
                }}
              >
                {previouslyPresentColorNames.length !==
                  colorNamesBlocked.length && (
                  <LeftSideLabel
                    label="List in existing color"
                    classdefault="newClass"
                    onClick={() => variantTypeChoser("existing")}
                  />
                )}
                <RightSideLabel
                  label="List in new color"
                  onClick={() => {
                    variantTypeChoser("new");
                  }}
                />
              </Box>
            </Box>
          ) : (
            <>
              <VariantsData
                variants={variants}
                handleFormDataChangeVariant={handleFormDataChangeVariant}
                removeVariant={removeVariant}
                colors={colors}
                selectedColors={selectedColors}
              />
              <RightSideLabel
                label={"Add Variant"}
                onClick={() => {
                  setVariants([
                    ...variants,
                    { color: "", discountPercentage: 0 },
                  ]);
                }}
                fontSize="16px"
              />
            </>
          )}
          {newVariantType === "new" ? (
            <>
              <VariantsData
                variants={variants}
                handleFormDataChangeVariant={handleFormDataChangeVariant}
                removeVariant={removeVariant}
                colors={colors}
                selectedColors={selectedColors}
                formData={formData}
              />
              <RightSideLabel
                label={"Add Variant"}
                onClick={() => {
                  setVariants([
                    ...variants,
                    { color: "", discountPercentage: 0 },
                  ]);
                }}
                fontSize="16px"
              />
            </>
          ) : newVariantType === "existing" ? (
            <>
              <AlreadyVariantEntry
                variants={variants}
                handleFormDataChangeVariant={handleFormDataChangeVariant}
                removeVariant={removeVariant}
                colors={existingColorsWhichCanBeAdded()}
                formData={formData}
              />
              <RightSideLabel
                label={"Add Variant"}
                onClick={() => {
                  setVariants([
                    ...variants,
                    { color: "", discountPercentage: 0 },
                  ]);
                }}
                fontSize="16px"
              />
            </>
          ) : (
            <></>
          )}
          <Button
            onClick={
              !formData.product
                ? fullProductCreate
                : newVariantType === "existing"
                ? addVendorToListing
                : createListing
            }
            variant={"contained"}
            sx={{ mt: "1rem" }}
            disabled={submitting}
          >
            {formData.product ? "Create Listing" : "Create Product"}
          </Button>
        </>
      )}
    </SidebarLayout>
  );
}

const VariantsData = ({
  variants,
  handleFormDataChangeVariant,
  removeVariant,
  colors,
  selectedColors,
  formData,
}) => {
  return variants.map((variant, index) => (
    <Fragment key={index}>
      <Box
        sx={{
          border: "1px solid lightgrey",
          padding: "1%",
          marginBottom: "1.5%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ marginBottom: "10px" }}>
            Variant {index + 1}
          </Typography>
          <AiFillCloseCircle
            cursor={"pointer"}
            onClick={removeVariant.bind(null, index)}
          />
        </Box>
        <FormControl fullWidth>
          <InputLabel id={`product-color-select`}>Color</InputLabel>
          <Select
            labelId={`product-color-select`}
            id={`product-color-select`}
            value={variant.color}
            label={"Color"}
            name={"color"}
            onChange={handleFormDataChangeVariant.bind(null, index)}
          >
            {colors.map((entry, index) => (
              <MenuItem
                key={index}
                disabled={selectedColors.includes(entry._id)}
                value={entry._id}
              >
                {entry.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <Grid container rowGap={1.5}>
          <Grid item xs={5.9}>
            <TextField
              label={"MRP"}
              value={variant.mrp}
              name={"mrp"}
              type={"number"}
              fullWidth
              onChange={handleFormDataChangeVariant.bind(null, index)}
            />
          </Grid>
          <Grid item xs={0.2}></Grid>
          <Grid item xs={5.9}>
            <TextField
              label={"Discount Percentage"}
              value={variant.discountPercentage}
              name={"discountPercentage"}
              type={"number"}
              fullWidth
              onChange={handleFormDataChangeVariant.bind(null, index)}
            />
          </Grid>
          <Grid item xs={5.9}>
            <TextField
              label={"Discounted Price"}
              value={(
                ((100 - Number(variant.discountPercentage)) *
                  Number(variant.mrp)) /
                100
              ).toFixed(2)}
              name={"discountPercentage"}
              type={"number"}
              fullWidth
              // disabled={true}
              // onChange={handleFormDataChangeVariant.bind(null, index)}
            />
          </Grid>
          <Grid item xs={0.2}></Grid>
          <Grid item xs={5.9}>
            <TextField
              label={"Base Price"}
              value={(
                ((100 - Number(variant.discountPercentage)) *
                  Number(variant.mrp)) /
                100 /
                (1 + Number(formData?.gstPercentage || 0) / 100)
              ).toFixed(2)}
              name={"basePrice"}
              type={"number"}
              fullWidth
              placeholder="Base Price"
              // disabled
              // onChange={handleFormDataChangeVariant.bind(null, index)}
            />
          </Grid>
          <Grid item xs={5.9}>
            <TextField
              label={"Inventory"}
              value={variant.inventory}
              name={"inventory"}
              type={"number"}
              fullWidth
              onChange={handleFormDataChangeVariant.bind(null, index)}
            />
          </Grid>
        </Grid>
        <br />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ width: "49.5%" }}>
            <FileDropzone
              images={variant.thumbnailImage || []}
              setImages={(e) =>
                handleFormDataChangeVariant(index, {
                  target: { name: "thumbnailImage", value: e },
                })
              }
              dropzoneLabel={"Upload Product Thumbnail"}
              limit={1}
            />
          </Box>
          <Box sx={{ width: "49.5%" }}>
            <FileDropzone
              images={variant.images || []}
              setImages={(e) =>
                handleFormDataChangeVariant(index, {
                  target: { name: "images", value: e },
                })
              }
              dropzoneLabel={"Upload Product Page Images"}
              limit={10}
            />
          </Box>
        </Box>
      </Box>
    </Fragment>
  ));
};

const AlreadyVariantEntry = ({
  variants,
  handleFormDataChangeVariant,
  removeVariant,
  colors,
}) => {
  const selectedColors = variants.map((el) => el.color);
  return variants.map((variant, index) => (
    <Fragment key={index}>
      <Box
        sx={{
          border: "1px solid lightgrey",
          padding: "1%",
          marginBottom: "1.5%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ marginBottom: "10px" }}>
            Variant {index + 1}
          </Typography>
          <AiFillCloseCircle
            cursor={"pointer"}
            onClick={removeVariant.bind(null, index)}
          />
        </Box>
        <FormControl fullWidth>
          <InputLabel id={`product-color-select`}>Color</InputLabel>
          <Select
            labelId={`product-color-select`}
            id={`product-color-select`}
            value={variant.color}
            label={"Color"}
            name={"color"}
            onChange={handleFormDataChangeVariant.bind(null, index)}
          >
            {colors.map((entry, index) => (
              <MenuItem
                key={index}
                disabled={selectedColors.includes(entry._id)}
                value={entry._id}
              >
                {entry.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <Grid container rowGap={1.5}>
          <Grid item xs={5.9}>
            <TextField
              label={"MRP"}
              value={variant.mrp}
              name={"mrp"}
              type={"number"}
              fullWidth
              onChange={handleFormDataChangeVariant.bind(null, index)}
            />
          </Grid>
          <Grid item xs={0.2}></Grid>
          <Grid item xs={5.9}>
            <TextField
              label={"Discounted Price"}
              value={(
                ((100 - Number(variant.discountPercentage)) *
                  Number(variant.mrp)) /
                100
              ).toFixed(2)}
              name={"discountPercentage"}
              type={"number"}
              fullWidth
              // disabled={true}
              // onChange={handleFormDataChangeVariant.bind(null, index)}
            />
          </Grid>
          <Grid item xs={0.2}></Grid>
          <Grid item xs={5.9}>
            <TextField
              label={"Base Price"}
              value={(
                ((100 - Number(variant.discountPercentage)) *
                  Number(variant.mrp)) /
                100 /
                (1 + Number(formData.gstPercentage) / 100)
              ).toFixed(2)}
              name={"basePrice"}
              type={"number"}
              fullWidth
              placeholder="Base Price"
              // disabled
              // onChange={handleFormDataChangeVariant.bind(null, index)}
            />
          </Grid>
          <Grid item xs={5.9}>
            <TextField
              label={"Inventory"}
              value={variant.inventory}
              name={"inventory"}
              type={"number"}
              fullWidth
              onChange={handleFormDataChangeVariant.bind(null, index)}
            />
          </Grid>
        </Grid>
        <br />
      </Box>
    </Fragment>
  ));
};
