import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import ShoppingCartIconPage from '../ShoppingCartIcon/ShoppingCartIcon';
import './Nav.css';
import { useDispatch, useSelector } from 'react-redux';
//npm install @fontsource/special-elite required
import '@fontsource/special-elite';

function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const client = useSelector((store) => store.clients);
  const clientID = client && Number(client.map((clientItem) => clientItem.id));
  // Grabbing orders
  const orders = useSelector((store) => store.orders);

  // setting up clientOrders data
  const clientOrders = orders.clientOrders;

  const defaultOrderId = clientOrders.length > 0 ? clientOrders[0].id : null;
  // console.log('defaultOrderId', defaultOrderId);

  useEffect(() => {
    dispatch({ type: 'FETCH_CLIENTS' });
    dispatch({ type: 'FETCH_CLIENT_DETAILS', payload: { id: clientID } });
    dispatch({ type: 'GET_CLIENT_ORDERS', payload: clientID });
  }, [dispatch, clientID]);

  function userType() {
    if (user.id && user.access_level === 10) {
      return (
        <>
          <Link className="navLink" to="/admin_user">
            Home
          </Link>

          <Link className="navLink" to="/orderSummary">
            Order Summary
          </Link>

          <Link className="navLink" to="/orderHistory">
            Order History
          </Link>

          <Link className="navLink" to="/cart">
            <ShoppingCartIconPage />
          </Link>

          <LogOutButton className="navLink" />
        </>
      );
    }
    if (user.id) {
      return (
        <>
          <Link className="navLink" to="/user">
            Home
          </Link>

          <Link className="navLink" to="/products">
            Products
          </Link>

          <Link className="navLink" to={`/orderSummary/${defaultOrderId}`}>
            Order Summary
          </Link>

          <Link className="navLink" to="/orderHistory">
            Order History
          </Link>

          <Link className="navLink" to="/cart">
            <ShoppingCartIconPage />
          </Link>

          <LogOutButton className="navLink" />
        </>
      );
    } else {
      return (
        <>
          <Link className="navLink" to="/login">
            Log In
          </Link>
        </>
      );
    }
  }

  return (
    <div className="nav">
      <h2 className="nav-title">Bunnycup Winery</h2>
      <div>
        {userType()}
        {/* If a user is logged in and has ADMIN access level of 10, show these links */}

        {/* {user.id && user.access_level === 10 && (
          <>
            <Link className="navLink" to="/admin_user">
              Home
            </Link>

            <Link className="navLink" to="/update">
              Update Retailer
            </Link>

            <Link className="navLink" to="/orderSummary">
              Order Summary
            </Link>

            <Link className="navLink" to="/orderHistory">
              Order History
            </Link>

            <Link className="navLink" to="/cart">
              <ShoppingCartIconPage />
            </Link>

            <LogOutButton className="navLink" />
          </> */}
      </div>
    </div>
  );
}

export default Nav;
