import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './OrderSummary.css';
import { useParams } from 'react-router-dom';

function OrderSummary() {
  //dispatch hook
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.orders);
  const user = useSelector((store) => store.user);
  console.log('user data', user);

  console.log('orders data', orders);
  if (!orders.clientOrders) {
    // If clientOrders is not available yet, return a loading message
    return <div>Loading...</div>;
  }
  //setting up clientOrders data
  const clientOrders = orders.clientOrders;
  console.log('clientOrders', clientOrders);
  //getting orderId from URL
  const { orderId } = useParams();
  // const orderId = 11223;
  console.log('orderId', orderId);
  // Filter clientOrders based on the orderId
  const filteredOrders = clientOrders.filter(
    (order) => Number(order.id) === Number(orderId)
  );
  console.log('filteredOrders', filteredOrders);
  //Extracting Date from clientOrders
  console.log('client order first array', clientOrders[0]);

  let orderIdentification = null;
  let orderDate = null;
  if (filteredOrders.length > 0) {
    const firstOrder = filteredOrders[0];
    orderIdentification = firstOrder.id;
    const options = { month: 'long', day: '2-digit', year: 'numeric' };
    orderDate = new Date(firstOrder.date).toLocaleDateString('en-US', options);
  }
  console.log('Order Date:', orderDate);
  console.log('order Identification for first array', orderIdentification);

  //making a customized order number
  // let orderNumber = null;
  // if (clientOrders && clientOrders.length > 0) {
  //   const firstOrder = clientOrders[0];
  //   const orderDate = new Date(firstOrder.date);

  //   // Extract date components
  //   const month = ('0' + (orderDate.getMonth() + 1)).slice(-2);
  //   const day = ('0' + orderDate.getDate()).slice(-2);
  //   const year = orderDate.getFullYear().toString().slice(-2);

  //   // Calculate the order number for the day
  //   const orderDailyNumber = clientOrders.length;

  //   // Construct order number
  //   orderNumber = `${month}${day}${year}-${orderDailyNumber}`;
  // }

  // console.log('Order Number:', orderNumber);

  // Calculating the total cost of clientOrders
  const totalCost = filteredOrders
    ? filteredOrders.reduce(
        (total, order) => total + order.number_bottles * order.unit_price,
        0
      )
    : 0;
  console.log('total cost', totalCost);

  const client = useSelector((store) => store.clients);
  console.log('client data', client);
  //getting client details information
  const clientDetails = useSelector((store) => store.clientDetails);
  console.log('clientDetails data', clientDetails);

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

  // Convert discount to decimal
  const discountPercentage = clientDiscount / 100;

  // Apply discount to total cost
  const discountedTotalCost = totalCost * (1 - discountPercentage);

  console.log('clients data', client);
  // const clientID = client && Number(client.map((clientItem) => clientItem.id));
  const clientID = user.id;
  console.log('clientID', clientID);
  const clientDetailsID = clientDetails.id;
  console.log('clientDetailsID', clientDetailsID);

  // Fetch orders on component mount
  useEffect(() => {
    {
      dispatch({ type: 'FETCH_CLIENTS' });
      dispatch({ type: 'FETCH_CLIENT_DETAILS', payload: { id: clientID } });
      dispatch({ type: 'GET_CLIENT_ORDERS', payload: clientDetailsID });
    }
  }, [dispatch, clientID]);

  return (
    <main className="main">
      <div className="header">
        <h1>Order #{orderIdentification}</h1>
      </div>
      <div className="customerInfo">
        {/*To Do: Retailer info includes Name, Address, contact info */}
        <p className="summaryHeader">Order Summary </p>
        <p className="date">Date: {orderDate}</p>
        {clientName} <br />
        {street} <br />
        {city}, {state}, {zip} <br />
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
            {filteredOrders &&
              filteredOrders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.wine_sku}</td>
                  <td>{order.number_bottles}</td>
                  <td>{order.unit_price}</td>
                  <td>
                    $ {(order.number_bottles * order.unit_price).toFixed(2)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="total">
        <p>Total With Discount: ${discountedTotalCost.toFixed(2)}</p>
      </div>
    </main>
  );
}

export default OrderSummary;
