import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// install sweetalerts
import Swal from "sweetalert2";

function UpdateUsers() {
  const [password, setPassword] = useState("");
  const [retailer, setRetailer] = useState("");
  const [address, setAddress] = useState("");
  const [discount, setDiscount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_CLIENTS" });
  }, []);
  
  const updateUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "UPDATE",
      payload: {
        id: user.id,
        password: password,
        retailer: retailer,
        address: address,
        discount: discount,
        paymentType: paymentType,
      },
    });
    Swal.fire({
      title: "User updated successfully",
      icon: "success",
    });
  }; // end updateUser

  return (
    <form className="formPanel" onSubmit={updateUser}>
      <h2>Update Retailer</h2>
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
        <input
          className="btn"
          type="submit"
          name="submit"
          value="Update User"
        />
    </form>
  );
}

export default UpdateUsers;