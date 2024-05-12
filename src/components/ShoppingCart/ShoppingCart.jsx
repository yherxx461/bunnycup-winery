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
  const user = useSelector((store) => store.user);
  const orderCount = useSelector((store) => store.orders.orderCount);
  const inventory = useSelector((store) => store.inventory.inventoryList);
  const imageList = useSelector((store) => store.inventory.imageList);
  const cart = useSelector((store) => store.orders.cartWines);
  const client = useSelector((store) => store.clients);
  const clientInfo = useSelector((store) => store.clientDetails);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState({});

  // console.log('THIS IS THE ITEMS ADDED TO CART', cart);
  // console.log('THIS IS THE CLIENT INFO', clientInfo);
  // console.log('THIS IS THE CLIENT', client);

  // useEffect(() => {
  //   console.log(
  //     'Cart Items:',
  //     cart.map((item) => ({
  //       name: item.product_name,
  //       quantity: parseInt(item.number_bottles),
  //       retail_price: item.unit_price.replace('$', ''),
  //     }))
  //   );
  // }, [cart]);

  useEffect(() => {
    dispatch({ type: 'FETCH_IMAGES' });
    dispatch({ type: 'FETCH_CLIENTS' });
    dispatch({ type: 'FETCH_CLIENT_DETAILS', payload: user });
    dispatch({
      type: 'GET_ORDER_COUNT',
      payload: new Date().toLocaleDateString().replaceAll('/', '-'),
    });
  }, []);

  // useEffect(
  //   () => {
  //     console.log('cart data', cart);
  //     console.log('client data:', client);
  //     console.log('clientInfo data:', clientInfo);
  //   },
  //   [client],
  //   [clientInfo]
  // );

  // Place Order function
  const placeOrder = async () => {
    console.log('Placing an order:', cart, clientInfo, client);
    let count = orderCount + 1;
    const orderId = `${new Date()
      .toLocaleDateString()
      .replaceAll('/', '')}${count}`;
    await dispatch({
      type: 'POST_ORDER',
      payload: {
        client_id: clientInfo.id,
        order_id: `${new Date()
          .toLocaleDateString()
          .replaceAll('/', '')}${count}`,
        date: new Date().toLocaleDateString(),
        cost: totalPrice,
        discount: clientInfo.discount,
        wines: cart.map((item) => ({
          sku: item.wine_sku,
          quantity: quantities[item.wine_sku] || item.number_bottles,
          price: item.unit_price,
        })),
      },
    });
    await dispatch({
      type: 'SEND_EMAIL',
      payload: {}
    })
    // navigate to the order summary page
    history.push(`/orderSummary/${orderId}`);

    // Clears cart
    dispatch({ type: 'CLEAR_CART' });
  };

  // Remove Item from Cart
  const handleRemoveItem = (skuToRemove) => {
    console.log('Removing item from Cart:', skuToRemove);
    dispatch({ type: 'REMOVE_ITEM_FROM_CART', payload: skuToRemove });
  };

  // Calculation Total Price
  useEffect(() => {
    const totalPrice = cart.reduce((acc, item) => {
      return acc + item.unit_price * item.number_bottles;
    }, 0);
    setTotalPrice(totalPrice);
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
    <main>
      <div>
        <h1 className="cart-list-title" align="center">
          Shopping Cart
        </h1>
        {/* {client && ( // If there is a client, show the information below */}
        <div className="retailer-info-address">
          <h3>{clientInfo.name}</h3>
          <p>{clientInfo.street}</p>
          <p>
            {clientInfo.city}, {clientInfo.state} {clientInfo.zip}
          </p>
        </div>
        <div className="default-payment">
          <h3>Payment Method</h3>
          <p>{clientInfo.payment_type}</p>
        </div>
        <div className="total-container">
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
            sx={{
              backgroundColor: 'white',
              marginRight: '1rem',
              color: '#757575',
              borderColor: '#757575',
              borderWidth: '2px',
              fontFamily: 'Montserrat',
              fontWeight: '575',
              '&:hover': {
                backgroundColor: '#757575',
                borderWidth: '2px',
                borderColor: '#757575',
                color: 'white',
              },
            }}>
            Place Order
          </Button>
        </div>
        <Table
          sx={{ maxWidth: 1000 }}
          arial-label="simple table"
          align="center">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontFamily: 'Montserrat' }}>
                <h3>Product Image</h3>
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: 'Montserrat' }}>
                <h3>Product Name</h3>
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: 'Montserrat' }}>
                <h3>SKU #</h3>
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: 'Montserrat' }}>
                <h3>Retail Price</h3>
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: 'Montserrat' }}>
                <h3>Quantity</h3>
                {/* <p>(# of Bottles)</p> */}
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: 'Montserrat' }}>
                <h3>Subtotal</h3>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Conditional rendering: If there's no items in the cart, show the 'Your cart is empty' message */}
            {cart.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  align="center"
                  sx={{ fontFamily: 'Montserrat' }}>
                  Your cart is empty
                </TableCell>
              </TableRow>
            ) : (
              cart.map((item) => (
                // console.log('typeof bottles', typeof item.number_bottles),
                // console.log('typeof price', typeof Number(item.unit_price)),
                <TableRow
                  className="product-list"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center" sx={{ fontFamily: 'Montserrat' }}>
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
                  <TableCell align="center" sx={{ fontFamily: 'Montserrat' }}>
                    {item.product_name}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: 'Montserrat' }}>
                    {item.wine_sku}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: 'Montserrat' }}>
                    ${item.unit_price} / bottle
                  </TableCell>
                  {/* <TableCell align="center">{item.number_bottles}</TableCell>
                   */}
                  <TableCell align="center" sx={{ fontFamily: 'Montserrat' }}>
                    <TextField
                      type="number"
                      InputProps={{
                        inputProps: { min: 0, max: inventory.inv_level },
                        style: { fontSize: '0.9rem', fontFamily: 'Montserrat' },
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
                      sx={{ width: '80px', height: '40px' }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: 'Montserrat' }}>
                    $
                    {(item.number_bottles * Number(item.unit_price)).toFixed(2)}{' '}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      type="button"
                      onClick={() => handleRemoveItem(item.wine_sku)}
                      sx={{
                        backgroundColor: 'white',
                        marginRight: '1rem',
                        color: '#757575',
                        borderColor: '#757575',
                        borderWidth: '2px',
                        fontFamily: 'Montserrat',
                        fontWeight: '575',
                        '&:hover': {
                          backgroundColor: '#757575',
                          borderWidth: '2px',
                          borderColor: '#757575',
                          color: 'white',
                        },
                      }}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

export default ShoppingCart;
