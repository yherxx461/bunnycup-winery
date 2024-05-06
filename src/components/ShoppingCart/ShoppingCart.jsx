import {
  Paper,
  Table,
  TableBody,
  TableCell,
  // TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ShoppingCart.css';

function ShoppingCart() {
  const dispatch = useDispatch();
  const imageList = useSelector((store) => store.inventory.imageList);
  const cart = useSelector((store) => store.orders.cartWines);
  const client = useSelector((store) => store.clients);
  const clientInfo = useSelector((store) => store.orders.cartInfo);

  console.log('THIS IS THE ITEMS ADDED TO CART', cart);
  console.log('THIS IS THE CLIENT INFO', clientInfo);
  console.log('THIS IS THE CLIENT', client);

  useEffect(() => {
    console.log(
      'Cart Items:',
      cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        retail_price: item.retail_price,
        quantityType: typeof item.quantity,
        priceType: typeof item.retail_price,
      }))
    );
  }, [cart]);

  useEffect(() => {
    dispatch({ type: 'FETCH_IMAGES' });
    dispatch({ type: 'GET_CLIENT_ORDERS' });
    dispatch({ type: 'FETCH_CLIENT_DETAILS' });
    dispatch({ type: 'FETCH_CLIENTS' });
  }, [dispatch]);

  // Place Order function
  const placeOrder = () => {
    console.log('Placing an order:', cart, clientInfo, client);
    dispatch({ type: 'PLACE_ORDER', payload: { cart, clientInfo, client } });
  };

  // Remove Item from Cart
  const handleRemoveItem = (sku) => {
    console.log('Removing item from Cart:', sku);
    dispatch({ type: 'REMOVE_ITEM_FROM_CART', payload: sku });
  };

  // Calculation subtotal

  return (
    <div>
      <h1 className="cart-list-title" align="center">
        Shopping Cart
      </h1>
      {client && ( // If there is a client, show the information below
        <div className="retailer-info-address">
          <h3>{clientInfo.name}</h3>
          <p>{clientInfo.street}</p>
          <p>
            {clientInfo.city}, {clientInfo.state} {clientInfo.zip}
          </p>
        </div>
      )}
      <div className="default-payment">
        <h3>Payment Method</h3>
        <p>{client?.payment_type || 'Default Payment'}</p>
      </div>
      <Button
        size="small"
        variant="outlined"
        type="button"
        onClick={placeOrder}
        style={{ marginRight: '3rem' }}
      >
        Place Order
      </Button>
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
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Conditional rendering: If there's no items in the cart, show the 'Your cart is empty' message */}
          {cart.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                Your cart is empty
              </TableCell>
            </TableRow>
          ) : (
            cart.map((item) => (
              <TableRow
                className="product-list"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">
                  <img
                    // filter through the wine.sku images to match inventory.sku of the inventory table
                    src={
                      imageList.filter((item) => {
                        return item.sku === item.sku;
                      })[0]?.image
                    }
                    alt={item.name}
                    style={{ width: '100px', height: 'auto' }}
                  />
                </TableCell>
                <TableCell align="center">{item.product_name}</TableCell>
                <TableCell align="center">{item.wine_sku}</TableCell>
                <TableCell align="center">{item.unit_price}</TableCell>
                <TableCell align="center">{item.number_bottles}</TableCell>
                <TableCell align="center">
                  {(item.number_bottles * item.unit_price).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleRemoveItem(item.sku)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {/* </TableContainer> */}
    </div>
  );
}

export default ShoppingCart;
