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

  const dispatch = useDispatch();
  const orders = useSelector((store) => store.orders);
  const client = useSelector((store) => store.clients);
  //getting client details information
  const clientDetails = useSelector((store) => store.clientDetails);
  console.log('clientDetails data', clientDetails);
  console.log('orders data', orders);
  //setting up clientOrders data
  const clientOrders = orders.clientOrders;
  console.log('clientOrders', clientOrders);
  const clientID = client && Number(client.map((clientItem) => clientItem.id));
  console.log('clientID', clientID);
  //Getting Client Name
  const clientName = clientDetails && clientDetails.name;
  console.log('client name', clientName);
  //Setting up state for sample data to list
  // const data = [
  //   { Date: '04/30/2024', Total: '$100.50' },
  //   { Date: '05/01/2024', Total: '$85.45' },
  //   { Date: '05/02/2024', Total: '$95.89' },
  //   { Date: '05/03/2024', Total: '$105.89' },
  // ];
  // console.log('Data object', data);

  //Extracting discount
  const clientDiscount = clientDetails && clientDetails.discount;
  console.log('clientDiscount', clientDiscount);

  // Convert discount to decimal
  const discountPercentage = clientDiscount / 100;

  // Calculate the total cost with discount
  let totalCost = 0;
  if (clientOrders) {
    totalCost = clientOrders.reduce((acc, order) => {
      const orderTotal = order.number_bottles * order.unit_price;
      return acc + orderTotal;
    }, 0);
    totalCost *= 1 - discountPercentage;
    totalCost = totalCost.toFixed(2); // Round to two decimal places
  }
  console.log('Total Cost with Discount:', totalCost);

  //Functions for view and reorder button
  const viewHandle = (orderId) => {
    console.log('In View Handle', orderId);
    history.push('/orderSummary/${orderId}');
  };

  const reorderHandle = (event) => {
    console.log('In Reorder Handle');
  };

  // Fetch orders on component mount
  useEffect(() => {
    {
      dispatch({ type: 'FETCH_CLIENTS' });
      dispatch({ type: 'FETCH_CLIENT_DETAILS', payload: { id: clientID } });
      dispatch({ type: 'GET_CLIENT_ORDERS', payload: clientID });
    }
  }, [dispatch, clientID]);

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
              {clientOrders &&
                clientOrders
                  .reduce((uniqueOrders, order) => {
                    if (
                      !uniqueOrders.find(
                        (uniqueOrder) => uniqueOrder.id === order.id
                      )
                    ) {
                      uniqueOrders.push(order);
                    }
                    return uniqueOrders;
                  }, [])
                  .map((uniqueOrder, index) => (
                    <Grid xs={8} key={index} className="listItem">
                      <Grid item xs={2} md={4} lg={8} className="dateTotal">
                        <Stack
                          spacing={2}
                          sx={{
                            textAlign: 'left',
                          }}>
                          <p>{clientName}</p>
                          <p>
                            Date:{' '}
                            {new Date(uniqueOrder.date).toLocaleDateString()}
                          </p>
                          <p>Total: ${uniqueOrder.total_cost}</p>
                        </Stack>
                      </Grid>
                      <div className="buttons">
                        <Grid item>
                          <Button
                            variant="contained"
                            onClick={() => viewHandle(uniqueOrder.id)}
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
