import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

function ClientInfoPage() {
  // this component displays the selected Retailer information.
  const user = useSelector((store) => store.user);

  return (
    <div className="container">
      <h2>Retailer Information</h2>
      <p>Retailer ID is: {user.id}</p>
      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default ClientInfoPage;