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
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// CUSTOM COMPONENTS
// import LoginForm from '../LoginForm/LoginForm';

function LandingPage() {
  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'FETCH_INVENTORY' });
    dispatch({ type: 'FETCH_IMAGES' });
  }, []);
  const inventory = useSelector((store) => store.inventory.inventoryList);
  const imageList = useSelector((store) => store.inventory.imageList);
  console.log('THIS IS THE INVENTORY', inventory);
  console.log('THIS IS THE WINE LIST', imageList);

  const handleAddToCart = (sku) => {
    console.log('Add to cart:', sku);
  };

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    // <div>
    //       <LoginForm />
    //     </div>
    <>
      <div className="inventory-list" key={inventory.id}>
        <h1 className="product-list-title" align="center">
          Product List
        </h1>
        {/* TO-DO: Create a table with the Product List */}
        {/* Map the Product List  */}
        {/* Will need to make sure API get request is set up in the server side route */}
        <TableContainer
          key={item.sku}
          component={Paper}
          align="center"
          style={{ font: 'Montserrat' }}
          // justifyContent="center"
        >
          <Table
            sx={{ maxWidth: 1350 }}
            arial-label="simple table"
            align="center"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ verticalAlign: 'top' }}>
                  <h3></h3>
                </TableCell>
                <TableCell align="center" sx={{ verticalAlign: 'top' }}>
                  <h3>Product Name</h3>
                </TableCell>
                <TableCell align="center" sx={{ verticalAlign: 'top' }}>
                  <h3>SKU #</h3>
                </TableCell>
                <TableCell align="center" sx={{ verticalAlign: 'top' }}>
                  <h3>Teaser</h3>
                </TableCell>
                <TableCell align="center" sx={{ verticalAlign: 'top' }}>
                  <h3>Category</h3>
                </TableCell>
                <TableCell align="center" sx={{ verticalAlign: 'top' }}>
                  <h3>Inventory</h3>
                </TableCell>
                <TableCell align="center" sx={{ verticalAlign: 'top' }}>
                  <h3>Retail Price</h3>
                </TableCell>
                <TableCell align="center" sx={{ verticalAlign: 'top' }}>
                  <h3>Quantity</h3>
                  <p>(# of Bottles)</p>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ verticalAlign: 'top' }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={item.sku}
                className="product-list"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">Product Image</TableCell>
                <TableCell align="center" sx={{}}>
                  {item.name}
                </TableCell>
                <TableCell align="center">{item.sku}</TableCell>
                <TableCell align="center">{item.teaser}</TableCell>
                <TableCell align="center">{item.category}</TableCell>
                <TableCell align="center">{item.inv_level}</TableCell>
                <TableCell align="center">{item.retail_price}</TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    variant=""
                    type="button"
                    onClick={() => handleAddToCart(item.sku)}
                  >
                    Add to Cart
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default LandingPage;
