import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './OrderSummary.css';

function OrderSummary() {
  //dispatch hook
  const dispatch = useDispatch();
<<<<<<< HEAD
  const reducer = useSelector((store) => store.reducer);

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
    dispatch({ type: 'FETCH_REDUCER' });
  }, [dispatch]);

  return (
    <>
      <div className="header">
        <h1>Order #XXXXXX-1</h1>
      </div>
      <div className="customerInfo">
        {/*To Do: Retailer info includes Name, Address, contact info */}
        <h3>Order Summary </h3>
        <p className="date">Date:</p>
        Retailer Name <br />
        Address <br />
        Phone <br />
        Email <br />
=======
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

  //making a customized order number
  let orderNumber = null;
  if (clientOrders && clientOrders.length > 0) {
    const firstOrder = clientOrders[0];
    const orderDate = new Date(firstOrder.date);

    // Extract date components
    const month = ('0' + (orderDate.getMonth() + 1)).slice(-2);
    const day = ('0' + orderDate.getDate()).slice(-2);
    const year = orderDate.getFullYear().toString().slice(-2);

    // Calculate the order number for the day
    const orderDailyNumber = clientOrders.length;

    // Construct order number
    orderNumber = `${month}${day}${year}-${orderDailyNumber}`;
  }

  console.log('Order Number:', orderNumber);

  //Calculating the total cost of clientOrders
  const totalCost =
    clientOrders &&
    clientOrders.reduce((total, order) => total + Number(order.total_cost), 0);
  console.log('total cost', totalCost);

  const client = useSelector((store) => store.clients);
  //getting client details information
  const clientDetails = useSelector((store) => store.clientDetails);
  console.log('clientDetails data', clientDetails);
  // const deliveryAddress = clientDetails && clientDetails.delivery_address;
  // console.log('deliveryAddress', deliveryAddress);
  //Formatting Delivery Address
  // const addressParts = deliveryAddress ? deliveryAddress.split(',') : '';
  // const streetAddress = deliveryAddress ? addressParts[0] : '';
  // const cityStateZip = deliveryAddress
  //   ? addressParts.slice(1).join(',').trim()
  //   : '';
  // console.log('street address', streetAddress);
  // console.log('cityStateZip', cityStateZip);
  //address information changed so need to adjust mapping
  const street = clientDetails && clientDetails.street;
  const city = clientDetails && clientDetails.city;
  const state = clientDetails && clientDetails.state;
  const zip = clientDetails && clientDetails.zip;

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
        <h1>Order #{orderNumber}</h1>
      </div>
      <div className="customerInfo">
        {/*To Do: Retailer info includes Name, Address, contact info */}
        <p className="summaryHeader">Order Summary </p>
        <p className="date">Date: {orderDate}</p>
        {clientName} <br />
        {street} <br />
        {city}, {state}, {zip} <br />
        {clientEmail} <br />
>>>>>>> bf30a906deea237b5a31ea7842d09f34009d9785
      </div>

      {/*To Do: set up Table with MUI */}
      <div className="container">
        <table className="orderTable">
<<<<<<< HEAD
          <thead>
            {/*To Do: Table headers needed are item, description, quantity, price, amount */}
            <tr style={{ borderTop: '1px solid' }}>
              <th style={{ borderBottom: '1px solid' }}>Item</th>
              <th style={{ borderBottom: '1px solid' }}>Description</th>
              <th style={{ borderBottom: '1px solid' }}>Quantity</th>
              <th style={{ borderBottom: '1px solid' }}>Price</th>
              <th style={{ borderBottom: '1px solid' }}>Amount</th>
            </tr>
          </thead>
          <tbody style={{ borderBottom: '1px solid' }}>
            <tr>
              <td>1.</td>
              <td>Product Description 1</td>
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
              <td>$150.00</td>
            </tr>
=======
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
            {clientOrders &&
              clientOrders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.wine_sku}</td>
                  <td>{order.number_bottles}</td>
                  <td>{order.unit_price}</td>
                  <td>{order.total_cost}</td>
                </tr>
              ))}
>>>>>>> bf30a906deea237b5a31ea7842d09f34009d9785
          </tbody>
        </table>
      </div>

      <div className="total">
<<<<<<< HEAD
        <p>Total: $</p>
      </div>
    </>
=======
        <p>Total: ${totalCost}</p>
      </div>
    </main>
>>>>>>> bf30a906deea237b5a31ea7842d09f34009d9785
  );
}

export default OrderSummary;
