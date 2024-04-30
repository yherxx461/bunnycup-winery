import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../OrderHistory/OrderHistory.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function OrderHistory() {
  
  return (
    <>
      <div className="header">
        <div>
          <h1>Order History</h1>
        </div>
      </div>
      <main></main>
    </>
  );
}

export default OrderHistory;
