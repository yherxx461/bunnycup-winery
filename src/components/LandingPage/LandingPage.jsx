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
import './LandingPage.css';

import { useDispatch, useSelector } from 'react-redux';
import { WidthWide } from '@mui/icons-material';

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

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <main className="main">
      <div className="inventory-list" key={inventory.id}>
        <h1 className="product-list-title" align="center">
          Product Inventory
        </h1>
        {/* TO-DO: Create a table with the Product List */}
        {/* Map the Product List  */}
        {/* Will need to make sure API get request is set up in the server side route */}
        {/* <TableContainer
          component={Paper}
          align="center"
          style={{ fontFamily: 'Montserrat' }}
          // justifyContent="center"
        > */}
        <Table
          sx={{ maxWidth: 1350 }}
          arial-label="simple table"
          align="center"
          fontFamily="Montserrat"
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ verticalAlign: 'bottom', fontFamily: 'Montserrat' }}
              >
                {' '}
                <h3></h3>
              </TableCell>
              <TableCell
                align="center"
                sx={{ verticalAlign: 'bottom', fontFamily: 'Montserrat' }}
              >
                {' '}
                <h3>Product Name</h3>
              </TableCell>
              <TableCell
                align="center"
                sx={{ verticalAlign: 'bottom', fontFamily: 'Montserrat' }}
              >
                {' '}
                <h3>SKU #</h3>
              </TableCell>
              <TableCell
                align="center"
                sx={{ verticalAlign: 'bottom', fontFamily: 'Montserrat' }}
              >
                {' '}
                <h3>Teaser</h3>
              </TableCell>
              <TableCell
                align="center"
                sx={{ verticalAlign: 'bottom', fontFamily: 'Montserrat' }}
              >
                {' '}
                <h3>Category</h3>
              </TableCell>
              <TableCell
                align="center"
                sx={{ verticalAlign: 'bottom', fontFamily: 'Montserrat' }}
              >
                {' '}
                <h3>Retail Price</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <TableRow
                key={item.sku}
                className="product-list"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">
                  <img
                    // filter through the wine.sku images to match inventory.sku of the inventory table
                    src={
                      imageList.filter((imageItem) => {
                        return imageItem.sku === item.sku;
                      })[0].image
                    }
                    alt={item.name}
                    style={{ width: '100px', height: 'auto' }}
                  />
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: 'Montserrat' }}>
                  {item.name}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: 'Montserrat' }}>
                  {item.sku}
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    verticalAlign: 'middle',
                    whiteSpace: 'normal',
                    wordWrap: 'break-words',
                    maxWidth: '275px',
                  }}
                  sx={{ verticalAlign: 'bottom', fontFamily: 'Montserrat' }}
                >
                  {item.teaser}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: 'Montserrat' }}>
                  {item.category}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: 'Montserrat' }}>
                  {item.retail_price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* </TableContainer> */}
      </div>
    </main>
  );
}

export default LandingPage;
