import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './ShoppingCart.css';

function ShoppingCart() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.id);
  const inventory = useSelector((store) => store.inventory.inventoryList);
  const imageList = useSelector((store) => store.inventory.imageList);
  const cart = useSelector((store) => store.orders.cartWines);
  const client = useSelector((store) => store.clients);
  const clientInfo = useSelector((store) => store.clientDetails);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState({});

  // console.log('THIS IS THE ITEMS ADDED TO CART', cart);
  // console.log('THIS IS THE CLIENT INFO', clientInfo);
  console.log('THIS IS THE CLIENT', client);

  useEffect(() => {
    console.log(
      'Cart Items:',
      cart.map((item) => ({
        name: item.product_name,
        quantity: parseInt(item.number_bottles),
        retail_price: item.unit_price,
      }))
    );
  }, [cart]);

  useEffect(() => {
    dispatch({ type: 'FETCH_IMAGES' });
    dispatch({ type: 'FETCH_CLIENTS' });
    dispatch({ type: 'FETCH_CLIENT_DETAILS', payload: user });
  }, [dispatch]);

  // Place Order function
  const placeOrder = () => {
    console.log('Placing an order:', cart, client);
    dispatch({
      type: 'ORDER_INFO',
      payload: {
        orders: {
          client_id: client[0]?.id,
          date: new Date().toISOString(),
          cost: totalPrice,
          discount: client[0]?.discount,
          wines: cart.map((item) => ({
            sku: item.wine_sku,
            quantity: quantities[item.wine_sku] || item.number_bottles,
            price: item.unit_price,
          })),
        },
      },
    });
    // Clears cart once order is placed
    history.push('/orderSummary');
    dispatch({ type: 'CLEAR_CART' });
    // Navigates to Order Summery Page
  };

  // Remove Item from Cart
  const handleRemoveItem = (skuToRemove) => {
    console.log('Removing item from Cart:', skuToRemove);
    dispatch({ type: 'REMOVE_ITEM_FROM_CART', payload: skuToRemove });
  };

  // Calculation Total Price
  useEffect(() => {
    if (cart.length > 0) {
      console.log('cart in reduce function', cart);
      const totalPrice = cart.reduce(
        (acc, item) =>
          acc + Number(item.unit_price.slice(1)) * item.number_bottles,
        0
      );
      // return acc + item.unit_price * item.number_bottles;
      // }, 0);
      setTotalPrice(totalPrice);
    }
    console.log('totalPrice', totalPrice);
  }, [cart]);

  // Update quantity in the local state
  const handleQuantityChange = (sku, quantity) => {
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: {
        sku: sku,
        quantity: quantity >= 0 ? quantity : 0,
      },
    });
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [sku]: quantity >= 0 ? quantity : 0,
    }));
  };

  // const currentClient = client.find((item) => {
  //   return item.user_id === user.id;
  // });
  // console.log('currentClient', currentClient);

  return (
    <div>
      <h1 className="cart-list-title" align="center">
        Shopping Cart
      </h1>
      {/* {client && ( // If there is a client, show the information below */}
      <div className="retailer-info-address">
        <h3>{client[0]?.name}</h3>
        {/* <p>{client[0].name}</p> */}
        <p>{client[0]?.street}</p>
        <p>
          {client[0]?.city}, {client[0]?.state} {client[0]?.zip}
        </p>
      </div>
      {/* // )} */}
      <div className="default-payment">
        <h3>Payment Method</h3>
        <p>{clientInfo.payment_type}</p>
      </div>
      <div className="total">
        <p>Retail Total: ${Number(totalPrice).toFixed(2)}</p>
        <p>Your Discount: {Number(clientInfo.discount)}% </p>
        <h4>
          Your Total: $
          {(
            Number(totalPrice) -
            Number(totalPrice) * (clientInfo.discount / 100)
          ).toFixed(2)}
        </h4>
        <Button
          size="small"
          variant="outlined"
          type="button"
          onClick={placeOrder}
          style={{
            marginRight: '1rem',
            backgroundColor: 'white',
            color: 'black',
          }}
          sx={{
            fontFamily: 'Montserrat',
            fontWeight: '575',
          }}
        >
          Place Order
        </Button>
      </div>
      <Table sx={{ maxWidth: 1000 }} arial-label="simple table" align="center">
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
              // console.log('typeof bottles', typeof item.number_bottles),
              // console.log('typeof price', typeof Number(item.unit_price)), // Although this makes the string a number, it's still showing that this is a string as it has the $ sign. This will continue returning a 'NaN'.
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
                <TableCell align="center">${item.unit_price}</TableCell>
                {/* <TableCell align="center">{item.number_bottles}</TableCell>
                 */}
                <TableCell align="center">
                  <TextField
                    type="number"
                    InputProps={{
                      inputProps: { min: 0, max: inventory.inv_level },
                      style: { fontSize: '0.9rem' },
                    }}
                    value={quantities[item.wine_sku] || item.number_bottles}
                    onChange={(event) =>
                      handleQuantityChange(
                        item.wine_sku,
                        parseInt(event.target.value, 10)
                      )
                    }
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  {/* unit_price is a string. It's not letting me multiply a string with a number. */}
                  ${(item.number_bottles * Number(item.unit_price)).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleRemoveItem(item.wine_sku)}
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
