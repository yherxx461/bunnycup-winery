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
        <h1>Order #{orderNumber}</h1>
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
          </tbody>
        </table>
      </div>

      <div className="total">
        <p>Total: ${totalCost}</p>
      </div>
    </main>
  );
}

export default OrderSummary;
