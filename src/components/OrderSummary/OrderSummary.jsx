import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './OrderSummary.css';


function OrderSummary() {
  //dispatch hook
  const dispatch = useDispatch();
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
    <main className="main">
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
      </div>

      {/*To Do: set up Table with MUI */}
      <div className="container">
        <table className="orderTable">
          <thead style={{ borderTop: '1px solid' }}>
            {/*To Do: Table headers needed are item, description, quantity, price, amount */}
            <tr>
              <td style={{ borderBottom: '1px solid' }}>Item</td>
              <td style={{ borderBottom: '1px solid' }}>Description</td>
              <td style={{ borderBottom: '1px solid' }}>Quantity</td>
              <td style={{ borderBottom: '1px solid' }}>Price</td>
              <td style={{ borderBottom: '1px solid' }}>Amount</td>
            </tr>
          </thead>
          <tbody style={{ borderBottom: '1px solid' }}>
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
        <p>Total: $</p>
      </div>
    </main>
  );
}

export default OrderSummary;
