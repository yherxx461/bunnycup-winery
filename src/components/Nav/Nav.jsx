import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import "@fontsource/special-elite";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
        <h2 className="nav-title">Bunnycup Winery</h2>
      <div>
        
        {/* If a user is logged in, show these links */}
        {user.id && user.access_level === 10 && (
          <>
            <Link className="navLink" to="/admin_user">
              Home
            </Link>

            <Link className="navLink" to="/register-new">
              Add New
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

            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
