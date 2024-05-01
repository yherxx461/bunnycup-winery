import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../OrderHistory/OrderHistory.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

function OrderHistory() {
  //Setting up state for sample data to list
  const data = [
    { Date: '04/30/2024', Total: '$100.50' },
    { Date: '05/01/2024', Total: '$85.45' },
    { Date: '05/02/2024', Total: '$95.89' },
  ];
  console.log('Data object', data);

  //Functions for view and reorder button
  const viewHandle = (event) => {
    console.log('In View Handle');
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
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {data.map((item, index) => (
              <Grid xs={8} key={index} className="listItem">
                <p>
                  <div className="dateTotal">
                    <Stack spacing={2}>
                      <p>Date: {item.Date}</p>
                      <p>Total: {item.Total}</p>
                    </Stack>
                  </div>
                  <div className="button">
                    <Button
                      variant="contained"
                      onClick={viewHandle}
                      sx={{ marginLeft: '500px' }}>
                      View
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ marginLeft: '15px' }}
                      onClick={reorderHandle}>
                      Reorder
                    </Button>
                  </div>
                </p>
              </Grid>
            ))}
          </Grid>
        </Box>
      </main>
    </>
  );
}

export default OrderHistory;
