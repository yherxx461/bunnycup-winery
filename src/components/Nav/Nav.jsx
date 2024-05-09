import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import ShoppingCartIconPage from '../ShoppingCartIcon/ShoppingCartIcon';
import './Nav.css';
import { useSelector } from 'react-redux';
//npm install @fontsource/special-elite required
import '@fontsource/special-elite';

function Nav() {
  const user = useSelector((store) => store.user);

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
