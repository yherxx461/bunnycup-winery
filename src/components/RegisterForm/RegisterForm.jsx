import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// install sweetalerts
import Swal from "sweetalert2";

import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { primaryTheme } from "../App/App";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retailer, setRetailer] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [discount, setDiscount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER_CLIENT",
      payload: {
        username: username,
        password: password,
        name: retailer,
        street: street,
        city: city,
        state: state,
        zip: zip,
        discount: discount,
        payment: paymentType,
      },
    });
    Swal.fire({
      title: "Retailer registered successfully",
      icon: "success",
    });
  }; // end registerUser

  return (
    <ThemeProvider theme={primaryTheme}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "45ch" },
        }}
        autoComplete="on"
        onSubmit={registerUser}
      >
        <center>
          <h2>Retailer Registration</h2>
          {errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {errors.registrationMessage}
            </h3>
          )}
          <div>
            <TextField
              variant="outlined"
              label="Username"
              type="username"
              name="username"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              name="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              label="Retailer Name"
              type="retailer"
              name="retailer"
              value={retailer}
              required
              onChange={(event) => setRetailer(event.target.value)}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              label="Street Address"
              type="street"
              name="street"
              value={street}
              required
              onChange={(event) => setStreet(event.target.value)}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              label="City"
              type="city"
              name="city"
              value={city}
              required
              onChange={(event) => setCity(event.target.value)}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              label="State"
              type="state"
              name="state"
              value={state}
              required
              onChange={(event) => setState(event.target.value)}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              label="Zip Code"
              type="zip"
              name="zip"
              value={zip}
              required
              onChange={(event) => setZip(event.target.value)}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              label="Discount %"
              type="discount"
              name="discount"
              value={discount}
              onChange={(event) => setDiscount(event.target.value)}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              label="Default Payment Type"
              type="paymentType"
              name="paymentType"
              value={paymentType}
              onChange={(event) => setPaymentType(event.target.value)}
            />
          </div>
          <div>
            <Button
              variant="contained"
              size="large"
              color="pinot"
              type="submit"
              name="submit"
              value="Register"
            >
              Register
            </Button>
          </div>
        </center>
      </Box>
    </ThemeProvider>
  );
}

export default RegisterForm;
