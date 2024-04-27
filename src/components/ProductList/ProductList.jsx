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

import './ProductList.css';

function ProductList() {
  const dispatch = useDispatch();
  const inventory = useSelector((store) => store.inventory.inventoryList);
  console.log('THIS IS THE INVENTORY', inventory);

  useEffect(() => {
    dispatch({ type: 'FETCH_INVENTORY' });
  }, []);

  return (
    <div className="inventory-list" key={inventory.id}>
      <h1 className="product-list-title" align="center">
        Product List
      </h1>
      {/* TO-DO: Create a table with the Product List */}
      {/* Map the Product List  */}
      {/* Will need to make sure API get request is set up in the server side route -- Nate is currently working on this */}
      {inventory.map((item) => (
        <TableContainer
          key={item.id}
          component={Paper}
          align="center"
          // justifyContent="center"
        >
          <Table
            sx={{ maxWidth: 1500 }}
            arial-label="simple table"
            align="center"
          >
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
                  <h3>Teaser</h3>
                </TableCell>
                <TableCell align="center">
                  <h3>Category</h3>
                </TableCell>
                <TableCell align="center">
                  <h3>Inventory</h3>
                </TableCell>
                <TableCell align="center">
                  <h3>Retail Price</h3>
                </TableCell>
                <TableCell align="center">
                  <h3>Quantity</h3>
                  <p>(# of Bottles)</p>
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={item.id}
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
                    onClick={() => handleAddToCart(item.id)}
                  >
                    Add to Cart
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ))}
    </div>
  );
}

export default ProductList;
