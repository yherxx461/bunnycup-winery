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

function ShoppingCart() {
  const dispatch = useDispatch();
  const inventory = useSelector((store) => store.inventory.inventoryList);
  console.log('THIS IS THE INVENTORY', inventory);

  useEffect(() => {
    dispatch({ type: 'FETCH_INVENTORY' });
  }, []);

  return (
    // <div className="cart-list" key={cart.id}>
    <div>
      <h1 className="cart-list-title" align="center">
        Shopping Cart
      </h1>
      <div className="retailer-address">
        <h3>Retailer Name</h3>
        <p>1234 Street</p>
        <p>City, State Zip</p>
      </div>
      <div className="default-payment">
        <h3>Payment Method</h3>
        <p>Default Payment</p>
      </div>
      <Button
        size="small"
        variant="outlined"
        type="button"
        onClick={() => handleAddToCart(item.sku)}
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
                {/* <h3>Product Image</h3> */}
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
            <TableRow
              // key={item.sku}
              className="product-list"
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center"></TableCell>
              <TableCell align="center" sx={{}}>
                {/* {item.name} */}
                item.name
              </TableCell>
              <TableCell align="center">item.sku</TableCell>
              <TableCell align="center">item.retail_price</TableCell>
              <TableCell align="center">item.quantity</TableCell>
              <TableCell align="center">Subtotal</TableCell>
              <TableCell align="center">
                <Button variant="outlined" size="small">
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* )} */}
    </div>
  );
}

export default ShoppingCart;
