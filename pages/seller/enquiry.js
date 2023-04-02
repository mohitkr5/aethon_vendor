import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toastMessage from "utils/toastMessage";

const VendorEnquiry = () => {
  const [form, setForm] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [otpSent, setOTPSent] = useState(false);
  const [otp, setOtp] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState();

  const valueChangeHandler = (e) => [
    setForm({ ...form, [e.target.name]: e.target.value }),
  ];

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setErrorMessage(null);
      console.log("Submit called");
      const { name, email, phoneNumber } = form;
      if (!name) {
        return toastMessage("Please enter name", "error");
      }
      if (!phoneNumber) {
        return toastMessage("Please enter phone number", "error");
      }
      if (phoneNumber.toString().length !== 10) {
        return toastMessage("Please enter a 10 digit phone number", "error");
      }
      if (!email) {
        return toastMessage("Please enter email", "error");
      }

      const response = await axios.post("api/vendor/otp", form);
      setOTPSent(true);
      toastMessage(response.data.message, "success");
      // setSuccessMessage(response.data.message);
    } catch (err) {
      console.log(err);
      const message = err.response.data.message;
      setErrorMessage(message);
    }
  };

  const finalSubmitHandler = async () => {
    try {
      setErrorMessage(null);
      console.log("Submit called");
      const { name, email, phoneNumber } = form;
      if (!name) {
        return toastMessage("Please enter name", "error");
      }
      if (!phoneNumber) {
        return toastMessage("Please enter phone number", "error");
      }
      if (phoneNumber.toString().length !== 10) {
        return toastMessage("Please enter a 10 digit phone number", "error");
      }
      if (!email) {
        return toastMessage("Please enter email", "error");
      }

      const response = await axios.post("api/vendor/enquiry", { ...form, otp });
      setSubmitted(true);
      // toastMessage(response.data.message, "error");
      setSuccessMessage(response.data.message);
    } catch (err) {
      console.log(err);
      const message = err.response.data.message;
      setErrorMessage(message);
    }
  };

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
          Seller Enquiry
        </h2>
      </div>
      <br />
      <h2 style={{ textAlign: "center" }}>Get Started in a few minutes</h2>
      <p style={{ textAlign: "center" }}>
        (Please enter correct business information)
      </p>
      <br />
      <br />
      {!submitted && !otpSent ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form onSubmit={onSubmit} style={{ width: "80%" }}>
            <TextField
              label={"Name"}
              name="name"
              value={form.name}
              onChange={valueChangeHandler}
              required={true}
              fullWidth
            />
            <br />
            <br />
            <TextField
              label={"Phone Number"}
              name={"phoneNumber"}
              value={form.phoneNumber}
              onChange={valueChangeHandler}
              required={true}
              type="number"
              fullWidth
            />
            <br />
            <br />
            <TextField
              label={"Email"}
              name={"email"}
              value={form.email}
              onChange={valueChangeHandler}
              required={true}
              type="email"
              fullWidth
            />
            <br />
            <br />
            <TextField
              label={"Message"}
              name={"message"}
              value={form.message}
              onChange={valueChangeHandler}
              fullWidth
            />
            <br />
            <br />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Button
                variant="contained"
                sx={{ marginBottom: "10px", marginRight: 0 }}
                type="sumbit"
              >
                Submit
              </Button>
              <br />
              <br />
              {errorMessage ? (
                <p style={{ fontWeight: "bold", color: "red" }}>
                  {errorMessage}
                </p>
              ) : (
                <></>
              )}
            </div>
          </form>
        </div>
      ) : !submitted && otpSent ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            label={"Enter OTP"}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            sx={{ width: "80%" }}
          />
          <br />
          <br />
          <Button
            variant="contained"
            sx={{ marginBottom: "10px", marginRight: 0 }}
            onClick={finalSubmitHandler}
          >
            Submit
          </Button>
          {errorMessage ? (
            <p style={{ fontWeight: "bold", color: "red" }}>{errorMessage}</p>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <h2 style={{ textAlign: "center" }}>{successMessage}</h2>
      )}
    </div>
  );
};

export default VendorEnquiry;
