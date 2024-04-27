import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

import {useDispatch, useSelector} from 'react-redux';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {
  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'FETCH_INVENTORY' });
  }, []);
  const inventory = useSelector((store) => store.inventory.inventoryList);
  console.log('THIS IS THE INVENTORY', inventory);

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div>
          <LoginForm />
        </div>
  );
}

export default LandingPage;
