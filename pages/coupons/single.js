import Loading from "@/components/Loading";
import SidebarLayout from "@/components/SidebarLayout";
import { addCoupon } from "@/store/actions/couponActions";
import { getProducts } from "@/store/actions/productsActions";
import { getUsers } from "@/store/actions/userActions";
import {
  Typography,
  TextField,
  Box,
  Button,
  InputLabel,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function CreateCouponPage() {
  const { coupons } = useSelector((state) => state.coupon);
  const router = useRouter();
  const { id } = router.query;
  const selectedCoupon = coupons.find((el) => el._id === id);
  const [couponLevel, setCouponLevel] = useState(
    selectedCoupon?.coupon_level || "general"
  );

  return (
    <SidebarLayout pageTitle={id ? "Update Coupon" : "Create Coupon"}>
      <Box>
        {id ? (
          <></>
        ) : (
          <FormControl
            sx={{ mb: "2rem", borderBottom: "1px solid #777", pb: "1rem" }}
          >
            <FormLabel id="demo-radio-buttons-group-label">
              Coupon Type
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={couponLevel}
              name="radio-buttons-group"
              onChange={(e) => {
                setCouponLevel(e.target.value);
              }}
            >
              <Box sx={{ display: "flex" }}>
                <FormControlLabel
                  value={"general"}
                  control={<Radio />}
                  label="General"
                />
                <FormControlLabel
                  value={"user"}
                  control={<Radio />}
                  label="User Coupon"
                />
                <FormControlLabel
                  value={"product"}
                  control={<Radio />}
                  label="Product Coupon"
                />
              </Box>
            </RadioGroup>
          </FormControl>
        )}
        <Box
          sx={{
            display: "flex",
            flexFlow: "column",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {/* Here i want to conditionally display the forms for each of the coupon types and also, just explain what the type of coupon is */}
          {couponLevel === "general" && (
            <GeneralCouponForm data={selectedCoupon} />
          )}
          {couponLevel === "user" && <UserCouponForm data={selectedCoupon} />}
          {couponLevel === "product" && (
            <ProductCouponForm data={selectedCoupon} />
          )}
        </Box>
        <Box sx={{ flex: 1 }}></Box>
      </Box>
    </SidebarLayout>
  );
}

function GeneralCouponForm({ data }) {
  const [formData, setFormData] = useState(
    data || {
      code: "",
      discount: 0,
      min_order_amount: 0,
      max_discount_amount: 0,
      coupon_level: "general",
      expiry: "",
    }
  );
  const { code, discount, min_order_amount, max_discount_amount, expiry } =
    formData;

  const onChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Typography variant="h5">
        General Coupons apply to all users over all products.{" "}
      </Typography>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            sx={{ mb: "1rem" }}
            name={"code"}
            value={code}
            label="Code"
            onChange={onChange}
          />
          <TextField
            fullWidth
            sx={{ mb: "1rem" }}
            name={"discount"}
            value={discount}
            label="Discount Percentage"
            type={"number"}
            onChange={onChange}
          />
          <TextField
            fullWidth
            sx={{ mb: "1rem" }}
            name={"expiry"}
            value={expiry?.split("T")[0]}
            label="Expiry"
            type={"date"}
            onChange={onChange}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            sx={{ mb: "1rem" }}
            name={"min_order_amount"}
            value={min_order_amount}
            label="Minimum Order Amount"
            type={"number"}
            onChange={onChange}
          />
          <TextField
            fullWidth
            sx={{ mb: "1rem" }}
            name={"max_discount_amount"}
            value={max_discount_amount}
            label="Max Discount Amount"
            type={"number"}
            onChange={onChange}
          />
        </Box>
      </Box>
      <Button variant="contained" onClick={() => addCoupon(formData)}>
        {data ? "Update Coupon" : "Create Coupon"}
      </Button>
    </>
  );
}

function ProductCouponForm({ data }) {
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    getProducts();
  }, []);

  const [formData, setFormData] = useState(
    data || {
      code: "",
      discount: null,
      min_order_amount: null,
      max_discount_amount: null,
      coupon_level: "product",
      coupon_product: "none",
      expiry: "",
    }
  );

  const {
    code,
    max_discount_amount,
    min_order_amount,
    coupon_product,
    discount,
    expiry,
  } = formData;
  const onChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormData({ ...formData, [name]: value });
  };

  if (loading) return <Loading text="Fetching Products" height={200} />;
  return (
    <>
      <Typography variant="h5">
        Product coupons can be used on a single product by all users.{" "}
      </Typography>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            sx={{ mb: "1rem" }}
            value={code}
            label="Code"
            name="code"
            onChange={onChange}
          />
          <TextField
            fullWidth
            sx={{ mb: "1rem" }}
            value={discount}
            label="Discount Percentage"
            type={"number"}
            name="discount"
            onChange={onChange}
          />
          <FormControl fullWidth>
            <InputLabel id="product-category-select">Product</InputLabel>
            <Select
              labelId="product-category-select"
              id="product-category-select"
              value={coupon_product}
              label="Product"
              onChange={onChange}
              name={"coupon_product"}
            >
              {/* <MenuItem value={"none"}>Select Product</MenuItem> */}
              {products.map((product, index) => (
                <MenuItem key={index} value={product._id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            sx={{ mb: "1rem" }}
            value={min_order_amount}
            label="Minimum Order Amount"
            type={"number"}
            name="min_order_amount"
            onChange={onChange}
          />
          <TextField
            fullWidth
            sx={{ mb: "1rem" }}
            value={max_discount_amount}
            label="Max Discount Amount"
            type={"number"}
            name="max_discount_amount"
            onChange={onChange}
          />
          <TextField
            fullWidth
            sx={{ mb: "1rem" }}
            value={expiry?.split("T")[0]}
            label="Expirty Date"
            type={"date"}
            name="expiry"
            onChange={onChange}
          />
        </Box>
      </Box>
      <Button variant="contained" onClick={() => addCoupon(formData)}>
        {data ? "Update Coupon" : "Create Coupon"}
      </Button>
    </>
  );
}

function UserCouponForm({ data }) {
  const { users, loading } = useSelector((state) => state.users);

  useEffect(() => {
    getUsers({ role: "customer" });
  }, []);

  const [formData, setFormData] = useState(
    data || {
      code: "",
      discount: null,
      min_order_amount: null,
      max_discount_amount: null,
      coupon_level: "user",
      coupon_user: "none",
      expiry: "",
    }
  );

  const onChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormData({ ...formData, [name]: value });
  };

  const {
    code,
    discount,
    min_order_amount,
    max_discount_amount,
    coupon_user,
    expiry,
  } = formData;

  if (loading) return <Loading text="Fetching Users" height={200} />;
  return (
    <>
      <Typography variant="h5">
        User coupons can be applied by a single user on all products.{" "}
      </Typography>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            sx={{ mb: "1rem" }}
            onChange={onChange}
            name={"code"}
            value={code}
            label="Code"
          />
          <TextField
            fullWidth
            sx={{ mb: "1rem" }}
            onChange={onChange}
            name={"discount"}
            value={discount}
            label="Discount Percentage"
            type={"number"}
          />
          <FormControl fullWidth>
            <InputLabel id="product-category-select">User</InputLabel>
            <Select
              labelId="product-category-select"
              id="product-category-select"
              value={coupon_user}
              onChange={onChange}
              name={"coupon_user"}
              label="Category"
            >
              <MenuItem value={"none"}>Select User</MenuItem>
              {users.map((user, index) => (
                <MenuItem key={index} value={user._id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            sx={{ mb: "1rem" }}
            onChange={onChange}
            name={"min_order_amount"}
            value={min_order_amount}
            label="Minimum Order Amount"
            type={"number"}
          />
          <TextField
            fullWidth
            sx={{ mb: "1rem" }}
            onChange={onChange}
            name={"max_discount_amount"}
            value={max_discount_amount}
            label="Max Discount Amount"
            type={"number"}
          />
          <TextField
            fullWidth
            sx={{ mb: "1rem" }}
            onChange={onChange}
            name={"expiry"}
            value={expiry?.split("T")[0]}
            label="Expiry"
            type={"date"}
          />
        </Box>
      </Box>
      <Button variant="contained" onClick={() => addCoupon(formData)}>
        {data ? "Update Coupon" : "Create Coupon"}
      </Button>
    </>
  );
}
