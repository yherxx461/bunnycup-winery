import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

import AdminUserPage from '../AdminUserPage/AdminUserPage';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  // checking for logged in user_type to show corresponding page info
  if (user.access_level === 10) {
    return <AdminUserPage />;
  }

  return (
    <div className="container">
      <h2>Welcome, {user.email}!</h2>
      {/* <p>Your ID is: {user.id}</p> */}
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
