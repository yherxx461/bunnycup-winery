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
    <>
      <div className="header">
        <div>
          <h1>Order Summary Page</h1>
        </div>
      </div>
      <div>
        <p>Retailer info </p>
        <p>Date:</p>
      </div>
      <div>
        <p>Table</p>
      </div>
      <div>
        <p>Total: $</p>
      </div>
    </>
  );
}

export default OrderSummary;
