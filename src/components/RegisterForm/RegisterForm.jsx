import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// install sweetalerts
import Swal from "sweetalert2";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retailer, setRetailer] = useState("");
  const [address, setAddress] = useState("");
  const [discount, setDiscount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
        retailer: retailer,
        address: address,
        discount: discount,
        paymentType: paymentType,
      },
    });
    Swal.fire({
      title: "Admin registered successfully",
      icon: "success",
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Retailer Registration</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="retailer">
          Retailer Name:
          <input
            type="retailer"
            name="retailer"
            value={retailer}
            required
            onChange={(event) => setRetailer(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="address">
          Delivery Address:
          <input
            type="address"
            name="address"
            value={address}
            required
            onChange={(event) => setAddress(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="discount">
          Discount %:
          <input
            type="discount"
            name="discount"
            value={discount}
            required
            onChange={(event) => setDiscount(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="paymentType">
          Default Payment Type:
          <input
            type="paymentType"
            name="paymentType"
            value={paymentType}
            required
            onChange={(event) => setPaymentType(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
