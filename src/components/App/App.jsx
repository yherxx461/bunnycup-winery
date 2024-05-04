import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import UserPage from "../UserPage/UserPage";
// import InfoPage from '../InfoPage/InfoPage';
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import AdminUserPage from "../AdminUserPage/AdminUserPage";
import ClientInfoPage from "../ClientInfoPage/ClientInfoPage";
import AdminRetailerView from "../AdminRetailerView/AdminRetailerView";
import OrderSummary from "../OrderSummary/OrderSummary";
import OrderHistory from "../OrderHistory/OrderHistory";
import UpdateUsers from "../UpdateUsers/UpdateUsers";
import RegisterClientPage from "../RegisterClientPage/RegisterClientPage";
import "./App.css";

import { createTheme, alpha, getContrastRatio } from "@mui/material/styles";

const pinotMain = "#861F41";
const pinotBase = alpha(pinotMain, 0.7);

export const primaryTheme = createTheme({
  palette: {
    pinot: {
      main: pinotMain,
      light: alpha(pinotBase, 0.5),
      dark: alpha(pinotBase, 0.9),
      contrastText: getContrastRatio(pinotMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
  },
});

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          <Route
            // logged in shows UserPage else shows LoginPage
            exact
            path="/home"
          >
            <LandingPage />
          </Route>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/client_info">
            <ClientInfoPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/admin_user">
            <AdminUserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            path="/retailer-info"
          >
            <AdminRetailerView />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/client_info"
          >
            <ClientInfoPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UpdateUsers Page else shows LoginPage
            exact
            path="/update"
          >
            <UpdateUsers />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows RegisterClient Page else shows LoginPage
            exact
            path="/register-new"
          >
            <RegisterClientPage />
          </ProtectedRoute>

          <ProtectedRoute
            // Order Summary page
            exact
            path="/orderSummary"
          >
            <OrderSummary />
          </ProtectedRoute>

          <ProtectedRoute
            // Order History page
            exact
            path="/orderHistory"
          >
            <OrderHistory />
          </ProtectedRoute>

          <ProtectedRoute
            // ShoppingCart Page
            exact
            path="/cart"
          >
            <ShoppingCart />
          </ProtectedRoute>

          <ProtectedRoute
            // Product Page
            exact
            path="/products"
          >
            <ProductList />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/products" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/products" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/products" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
