import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ShoppingCart.css';

function ShoppingCart() {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);
  // const client = useSelector((store) => store.clients);
  const clientInfo = useSelector((store) => store.clientDetails);

  console.log('THIS IS THE CART', cart);
  console.log('THIS IS THE CLIENT INFO', clientInfo);

  useEffect(() => {
    dispatch({ type: 'FETCH_CART' });
    dispatch({ type: 'FETCH_CLIENT_DETAILS' });
    // dispatch({ type: 'FETCH_CLIENTS' });
  }, [dispatch]);

  // Place Order function
  const placeOrder = () => {
    console.log('Placing an order:,');
    dispatch({ type: 'PLACE_ORDER', payload: { cart, clientInfo } });
  };

  return (
    <div>
      <h1 className="cart-list-title" align="center">
        Shopping Cart
      </h1>
      {/* {client && ( */}
      <div className="retailer-address">
        <h3>{clientInfo.name}</h3>
        <p>{clientInfo.street}</p>
        <p>
          {clientInfo.city}, {clientInfo.state} {clientInfo.zip}
        </p>
      </div>
      {/* )} */}
      <div className="default-payment">
        <h3>Payment Method</h3>
        <p>Default Payment</p>
      </div>
      <Button
        size="small"
        variant="outlined"
        type="button"
        onClick={() => placeOrder(item.sku)}
        style={{ marginRight: '3rem' }}
      >
        Place Order
      </Button>
      {/* {(item) => ( */}
      <TableContainer
        // key={item.sku}
        component={Paper}
        align="center"
        // justifyContent="center"
      >
        <Table sx={{ maxWidth: 900 }} arial-label="simple table" align="center">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <h3>Product Image</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Product Name</h3>
              </TableCell>
              <TableCell align="center">
                <h3>SKU #</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Retail Price</h3>
              </TableCell>
              <TableCell align="center">
                <h3>Quantity</h3>
                {/* <p>(# of Bottles)</p> */}
              </TableCell>
              <TableCell align="center">
                <h3>Subtotal</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart &&
              cart.map((item) => (
                <TableRow
                  className="product-list"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.sku}</TableCell>
                  <TableCell align="center">{item.retail_price}</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">Subtotal</TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" size="small">
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ShoppingCart;
