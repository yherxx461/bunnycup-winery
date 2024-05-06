import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './OrderSummary.css';

function OrderSummary() {
  //dispatch hook
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.orders);
  console.log('orders data', orders);
  //setting up clientOrders data
  const clientOrders = orders.clientOrders;
  console.log('clientOrders', clientOrders);
  //Extracting Date from clientOrders
  console.log('client order first array', clientOrders[0]);
  let orderDate = null;
  if (clientOrders && clientOrders.length > 0) {
    const firstOrder = clientOrders[0];
    orderDate = new Date(firstOrder.date);
    // formatting the orderDate into "Month XX, XXXX" format
    const options = { month: 'long', day: '2-digit', year: 'numeric' };
    orderDate = orderDate.toLocaleDateString('en-US', options);
  }
  console.log('Order Date:', orderDate);

  // const date = clientOrders ? clientOrders[0].date : '';
  // console.log('date', date);

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
        <p className="date">Date: {orderDate}</p>
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
