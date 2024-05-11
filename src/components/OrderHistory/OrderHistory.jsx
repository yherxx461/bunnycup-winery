import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../OrderHistory/OrderHistory.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { useHistory } from 'react-router-dom';

function OrderHistory() {
  // Set useHistory hook
  const history = useHistory();

  const dispatch = useDispatch();
  const orders = useSelector((store) => store.orders);
  const client = useSelector((store) => store.clients);
  // Getting client details information
  const clientDetails = useSelector((store) => store.clientDetails);
  console.log('clientDetails data', clientDetails);
  console.log('orders data', orders);
  // Setting up clientOrders data
  const clientOrders = orders.clientOrders;
  console.log('clientOrders', clientOrders);
  const clientID = client && Number(client.map((clientItem) => clientItem.id));
  console.log('clientID', clientID);
  // Getting Client Name
  const clientName = clientDetails && clientDetails.name;
  console.log('client name', clientName);
  // Extracting discount
  const clientDiscount = clientDetails && clientDetails.discount;
  console.log('clientDiscount', clientDiscount);

  // Convert discount to decimal
  const discountPercentage = clientDiscount / 100;

  //Functions for view and reorder button
  const viewHandle = (orderId) => {
    console.log('In View Handle', orderId);
    history.push(`/orderSummary/${orderId}`);
  };

  const reorderHandle = (orders) => {
    console.log('reorder data', orders);
    orders.forEach((order) => {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          wine_sku: order.wine_sku,
          number_bottles: order.number_bottles,
          unit_price: order.unit_price,
          checkout_discount: order.checkout_discount,
        },
      });
    });
    // Navigate to the shopping cart page after adding items
    history.push('/cart');
  };

  // Fetch orders on component mount
  useEffect(() => {
    dispatch({ type: 'FETCH_CLIENTS' });
    dispatch({ type: 'FETCH_CLIENT_DETAILS', payload: { id: clientID } });
    dispatch({ type: 'GET_CLIENT_ORDERS', payload: clientID });
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
                  .map((uniqueOrder, index) => {
                    // Calculate the total cost for a unique order
                    const totalCost =
                      clientOrders
                        .filter((order) => order.id === uniqueOrder.id)
                        .reduce((acc, order) => {
                          const orderTotal =
                            order.number_bottles * order.unit_price;
                          return acc + orderTotal;
                        }, 0) *
                      (1 - discountPercentage);
                    const formattedTotalCost = totalCost.toFixed(2);

                    return (
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
                            <p>Total: ${formattedTotalCost}</p>
                            <p>Order #{uniqueOrder.id}</p>
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
                              onClick={() =>
                                reorderHandle(
                                  clientOrders.filter(
                                    (order) => order.id === uniqueOrder.id
                                  )
                                )
                              }>
                              Reorder
                            </Button>
                          </Grid>
                        </div>
                      </Grid>
                    );
                  })}
            </Grid>
          </div>
        </Box>
      </main>
    </>
  );
}

export default OrderHistory;
