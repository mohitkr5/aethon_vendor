import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/seller.module.css";
import { getStateCityData } from "@/store/actions/stateCityActions";
import { useSelector } from "react-redux";
import { getBrands } from "@/store/actions/brandActions";
import { getCategories } from "@/store/actions/categoryActions";
import { Button } from "@mui/material";
import toastMessage from "utils/toastMessage";

const Registration = () => {
  const router = useRouter();
  const { id } = router.query;
  const [initialError, setInitialError] = useState(null);
  const [enquiryData, setEnquiryData] = useState({});
  const [form, setForm] = useState({});
  const [error, setError] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState(null);

  const { stateCities } = useSelector((state) => state.stateCity);
  const { brands } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    if (!stateCities.length) {
      getStateCityData();
    }
    if (!brands.length) {
      getBrands();
    }
    if (!categories.length) {
      getCategories();
    }
  }, []);

  const verifyid = async () => {
    try {
      const response = await axios.get(`api/vendor/verifylink?id=${id}`);
      const { message, enquiry } = response.data;
      setEnquiryData(enquiry);
      setForm({
        enquiry: enquiry._id,
        name: enquiry.name,
        phoneNumber: enquiry.phoneNumber,
        email: enquiry.email,
      });
    } catch (err) {
      console.log(err);
      setInitialError(err.response.data.message);
    }
  };

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  console.log(form);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      toastMessage("Submitting", "success");
      setError(null);
      const res = await axios.post("api/vendor/registration", form);
      setSubmissionMessage(res.data.message);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    if (id) {
      verifyid();
    }
  }, [id]);

  return (
    <div>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/aethon-9e3d3.appspot.com/o/Aethon%20Logo%2002%20Black%20-%20short.png?alt=media&token=b9a7a773-bf9d-4247-ab3f-8faa4fc90f2b"
          width="250"
        />
        <h2
          style={{
            paddingLeft: "40px",
            paddingRight: "40px",
            borderLeft: "1px solid black",
          }}
        >
          Seller Registration
        </h2>
      </div>
      {initialError ? (
        <h2 style={{ color: "red", textAlign: "center", marginTop: "100px" }}>
          {initialError}
        </h2>
      ) : submissionMessage ? (
        <h2 style={{ textAlign: "center", marginTop: "100px" }}>
          {submissionMessage}
        </h2>
      ) : (
        <>
          <h3 style={{ textAlign: "center", marginTop: "10px" }}>
            Please enter your business details
          </h3>
          <p style={{ textAlign: "center" }}>
            (Please fill the information details carefully you won&apos;t be
            able to change it again)
          </p>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <form style={{ width: "70%" }} onSubmit={submitHandler}>
              <input
                className={styles.textField}
                value={enquiryData?.name}
                disabled
              />
              <input
                className={styles.textField}
                value={enquiryData?.email}
                disabled
              />
              <input
                className={styles.textField}
                value={enquiryData?.phoneNumber}
                disabled
              />
              <input
                className={styles.textField}
                value={form.companyName}
                name="companyName"
                onChange={onChangeHandler}
                placeholder="Company Name"
                required
              />
              <input
                className={styles.textField}
                value={form.gstNo}
                name="gstNo"
                onChange={(e) =>
                  setForm({ ...form, gstNo: e.target.value.toUpperCase() })
                }
                placeholder="GST No"
                type="text"
                maxLength={15}
                minLength={15}
                required
              />
              <input
                className={styles.textField}
                value={form.address}
                name="address"
                onChange={onChangeHandler}
                placeholder="Address"
                required
              />
              <select
                className={styles.textField}
                required
                value={form.state}
                name="state"
                onChange={onChangeHandler}
              >
                <option value="">Select State</option>
                {stateCities.map((el, index) => (
                  <option value={el._id} key={index}>
                    {el.state}
                  </option>
                ))}
              </select>
              <select
                className={styles.textField}
                required
                value={form.city}
                name="city"
                onChange={onChangeHandler}
              >
                <option value="">Select City</option>
                {stateCities
                  .find((el) => el._id === form.state)
                  ?.cities?.map((el, index) => (
                    <option value={el._id} key={index}>
                      {el.city} - {el.pincode}
                    </option>
                  ))}
              </select>
              <select
                className={styles.textField}
                value={form.category}
                name="category"
                onChange={onChangeHandler}
              >
                <option value="">Select Category</option>
                {categories.map((el, index) => (
                  <option value={el._id} key={index}>
                    {el.name}
                  </option>
                ))}
              </select>
              <select
                className={styles.textField}
                value={form.brand}
                name="brand"
                onChange={onChangeHandler}
              >
                <option value="">Select Brand</option>
                {brands.map((el, index) => (
                  <option value={el._id} key={index}>
                    {el.name}
                  </option>
                ))}
              </select>
              <input
                name="turnover"
                className={styles.textField}
                value={form.turnover}
                onChange={onChangeHandler}
                placeholder="Turnover (Lakhs per year)"
                type="number"
                required
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: "10px",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ marginBottom: "10px", marginRight: 0 }}
                  type="sumbit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
          {error && <h4 style={{ color: red, marginTop: "10px" }}>{error}</h4>}
        </>
      )}
    </div>
  );
};

export default Registration;
