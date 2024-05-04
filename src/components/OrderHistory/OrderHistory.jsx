import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../OrderHistory/OrderHistory.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { useHistory } from 'react-router-dom';

function OrderHistory() {
  //Set useHistory hook
  const history = useHistory();
  //Setting up state for sample data to list
  const data = [
    { Date: '04/30/2024', Total: '$100.50' },
    { Date: '05/01/2024', Total: '$85.45' },
    { Date: '05/02/2024', Total: '$95.89' },
    { Date: '05/03/2024', Total: '$105.89' },
  ];
  console.log('Data object', data);

  //Functions for view and reorder button
  const viewHandle = (event) => {
    console.log('In View Handle');
    history.push('/orderSummary');
  };

  const reorderHandle = (event) => {
    console.log('In Reorder Handle');
  };

  return (
    <>
      <div className="header">
        <div>
          <h1>Order History</h1>
        </div>
      </div>
      <main className="main">
        <Box sx={{ flexGrow: 4 }} className="orders">
          <div className="boxItems">
            <Grid container spacing={8}>
              {data.map((item, index) => (
                <Grid xs={8} key={index} className="listItem">
                  <Grid item xs={2} md={4} lg={8} className="dateTotal">
                    <Stack
                      spacing={2}
                      sx={{
                        textAlign: 'left',
                      }}>
                      <p>Retailer Name</p>
                      <p>Date: {item.Date}</p>
                      <p>Total: {item.Total}</p>
                    </Stack>
                  </Grid>
                  <div className="buttons">
                    <Grid item>
                      <Button
                        variant="contained"
                        onClick={viewHandle}
                        sx={{
                          fontFamily: 'Montserrat',
                          backgroundColor: '#757575',
                          color: '#FFFFFF',
                          fontWeight: '575',
                          marginRight: '-50px',
                        }}>
                        View
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        sx={{
                          fontFamily: 'Montserrat',
                          backgroundColor: '#757575',
                          color: '#FFFFFF',
                          fontWeight: '575',
                        }}
                        onClick={reorderHandle}>
                        Reorder
                      </Button>
                    </Grid>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </Box>
      </main>
    </>
  );
}

export default OrderHistory;
