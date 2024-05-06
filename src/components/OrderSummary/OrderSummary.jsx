import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './OrderSummary.css';

function OrderSummary() {
  //dispatch hook
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.orders);
  console.log('clientOrders data', orders);
  const client = useSelector((store) => store.clients);
  //getting client details information
  const clientDetails = useSelector((store) => store.clientDetails);
  console.log('clientDetails data', clientDetails);
  const deliveryAddress = clientDetails && clientDetails.delivery_address;
  console.log('deliveryAddress', deliveryAddress);
  //Formatting Delivery Address
  const addressParts = deliveryAddress ? deliveryAddress.split(',') : '';
  const streetAddress = deliveryAddress ? addressParts[0] : '';
  const cityStateZip = deliveryAddress
    ? addressParts.slice(1).join(',').trim()
    : '';
  console.log('street address', streetAddress);
  console.log('cityStateZip', cityStateZip);
  //Getting Client Name
  const clientName = clientDetails && clientDetails.name;
  //Getting Client Email
  const clientEmail = clientDetails && clientDetails.email;
  //Extracting discount
  const clientDiscount = clientDetails && clientDetails.discount;
  console.log('clientDiscount', clientDiscount);

  console.log('clients data', client);
  const clientID = client && Number(client.map((clientItem) => clientItem.id));
  console.log('clientID', clientID);

  /*//Formatting Date
  const formatDate = (newDate) => {
    // //This splits string into substrings/array
    // const splitDate = newDate.split('T');
    // // console.log('new date object', splitDate);
    // return splitDate[0];

    //new date formatting
    const date = new Date(newDate);
    // console.log(date);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });
    // console.log(formattedDate);
    const splitDate = formattedDate.split(',');
    // console.log(splitDate);
    // const weekday = splitDate[0];
    const monthDay = splitDate[1];
    const splitMonthDay = monthDay.split(' ');
    // console.log('splitMonthDay', splitMonthDay);
    const newDateFormat = splitMonthDay[1];
    // console.log('newDateFormat', newDateFormat);
    const replaceNewDateFormat = newDateFormat.replace(/\//g, '-');
    // console.log('replaceNewDateFormat', replaceNewDateFormat);

    return `${replaceNewDateFormat}`;
  };*/

  // Fetch orders on component mount
  useEffect(() => {
    {
      dispatch({ type: 'FETCH_CLIENTS' });
      dispatch({ type: 'FETCH_CLIENT_DETAILS', payload: { id: clientID } });
      dispatch({ type: 'GET_CLIENT_ORDERS', payload: clientID });
    }
  }, [dispatch, clientID]);

  return (
    <main className="main">
      <div className="header">
        <h1>Order #XXXXXX-1</h1>
      </div>
      <div className="customerInfo">
        {/*To Do: Retailer info includes Name, Address, contact info */}
        <p className="summaryHeader">Order Summary </p>
        <p className="date">Date:</p>
        {clientName} <br />
        {streetAddress} <br />
        {cityStateZip} <br />
        {clientEmail} <br />
      </div>

      {/*To Do: set up Table with MUI */}
      <div className="container">
        <table className="orderTable">
          <thead
            style={{
              borderTop: '3px solid black',
              backgroundColor: '#861f41',
              color: '#FFFFFF',
              fontWeight: '575',
            }}>
            {/*To Do: Table headers needed are item, description, quantity, price, amount */}
            <tr>
              <td style={{ borderBottom: '3px solid black' }}>Item</td>
              <td style={{ borderBottom: '3px solid black' }}>Description</td>
              <td style={{ borderBottom: '3px solid black' }}>Quantity</td>
              <td style={{ borderBottom: '3px solid black' }}>Price</td>
              <td style={{ borderBottom: '3px solid black' }}>Amount</td>
            </tr>
          </thead>
          <tbody style={{ borderBottom: '3px solid black', color: 'black' }}>
            <tr>
              <td>1.</td>
              <td>Product Description</td>
              <td>12</td>
              <td>Unit Price</td>
              <td>$120.00</td>
            </tr>
            <tr>
              <td>2.</td>
              <td>Product Description 2</td>
              <td>24</td>
              <td>Unit Price</td>
              <td>$200.00</td>
            </tr>
            <tr>
              <td>3.</td>
              <td>Product Description 3</td>
              <td>12</td>
              <td>Unit Price</td>
              <td>$99.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="total">
        <p>Total: $539.00</p>
      </div>
    </main>
  );
}

export default OrderSummary;
