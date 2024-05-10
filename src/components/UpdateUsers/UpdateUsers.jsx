import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// install sweetalerts
import Swal from "sweetalert2";

import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { primaryTheme } from "../App/App";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Typography } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function UpdateUsers() {
  const clientDetails = useSelector((store) => store.clientDetails);
//   const _name = clientDetails.name;
//   const _email = clientDetails.email;
//   const _discount = clientDetails.discount;
//   const _payment_type = clientDetails.paymentType;
//   const _street = clientDetails.street;
//   const _city = clientDetails.city;
//   const _state = clientDetails.state;
//   const _zip = clientDetails.zip;

  const history = useHistory();

  const user = useSelector((store) => store.user);
  const [password, setPassword] = useState(user.password);
  const [retailer, setRetailer] = useState(clientDetails.name);
  const [street, setStreet] = useState(clientDetails.street);
  const [city, setCity] = useState(clientDetails.city);
  const [state, setState] = useState(clientDetails.state);
  const [zip, setZip] = useState(clientDetails.zip);
  const [discount, setDiscount] = useState(clientDetails.discount);
  const [paymentType, setPaymentType] = useState(clientDetails.paymentType);
  const clients = useSelector((store) => store.clients);
  const { id } = useParams();

  console.log(clientDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_CLIENTS" });
    dispatch({ type: "FETCH_CLIENT_DETAILS", payload: { id } });
  }, []);

  const updateUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "UPDATE",
      payload: {
        id: id,
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
      title: "User updated successfully",
      icon: "success",
    });
  }; // end updateUser

  const handleClickOpenClient = (id) => {
    history.push(`/retailer-info/${id}`);
  };

  return (
    <ThemeProvider theme={primaryTheme}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "45ch" },
        }}
        autoComplete="on"
        onSubmit={updateUser}
      >
        <center>
          <h2>Update Retailer</h2>
          <Button
          color="pinot"
          sx={{
            marginLeft: 1,
            marginRight: "auto",
          }}
          onClick={() => handleClickOpenClient(clientDetails.id)}
          >
            BACK
          </Button>
          <div>
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              name="password"
              defaultValue={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div>
            <TextField InputLabelProps={{ shrink: true }}
              variant="outlined"
              label="Retailer Name"
              type="retailer"
              name="retailer"
              defaultValue={retailer}
              required
              onChange={(event) => setRetailer(event.target.value)}
            />
          </div>
          <div>
            <TextField InputLabelProps={{ shrink: true }}
              variant="outlined"
              label="Street Address"
              type="street"
              name="street"
              defaultValue={street}
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
              defaultValue={city}
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
              defaultValue={state}
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
              defaultValue={zip}
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
              defaultValue={discount}
              onChange={(event) => setDiscount(event.target.value)}
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              label="Default Payment Type"
              type="paymentType"
              name="paymentType"
              defaultValue={paymentType}
              onChange={(event) => setPaymentType(event.target.value)}
            />
          </div>
          <Button
            variant="contained"
            size="large"
            color="pinot"
            type="submit"
            name="submit"
            value="Update User"
          >
            Update
          </Button>
        </center>
      </Box>
    </ThemeProvider>
  );
}

export default UpdateUsers;
