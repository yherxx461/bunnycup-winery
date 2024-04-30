import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// MUI imports

function AdminUserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const clients = useSelector((store) => store.clients);
  // const orders = useSelector((store) => store.orders);
  const dispatch = useDispatch();


console.log('CLIENTS', clients.clients)

  // onload makes GET call to fetch all boarding data.
  useEffect(() => {
  dispatch({ type: 'FETCH_ALL_CLIENTS' });
  // dispatch({ type: 'FETCH_ALL_ORDERS' });
  }, []);

  return (
    <div className="container">
      <h2>You are logged in as ADMIN!</h2>
      <p>Your ID is: {user.id}</p>
      <h2>RETAILERS</h2>
        {clients.clients.map((client) => {
                return (
                  <p>{client.name}</p>
                )})}
      {/* <h2>RETAILERS</h2>
        {orders.map((order) => {
                return (
                  <p>{order.date}</p>
                )})} */}
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default AdminUserPage;