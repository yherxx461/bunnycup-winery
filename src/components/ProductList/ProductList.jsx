// import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartIconPage from '../ShoppingCartIcon/ShoppingCartIcon';
import './ProductList.css';

function ProductList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const inventory = useSelector((store) => store.inventory.inventoryList);
  const imageList = useSelector((store) => store.inventory.imageList);
  // console.log('THIS IS THE INVENTORY', inventory);
  // console.log('THIS IS THE WINE LIST', imageList);

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    dispatch({ type: 'FETCH_INVENTORY' });
    dispatch({ type: 'FETCH_IMAGES' });
  }, []);

  // Initialize quantities when inventory is fetched
  useEffect(() => {
    const initialQuantities = {};
    inventory.forEach((item) => {
      initialQuantities[item.sku] = 12; // Default quantity set to 12
    });
    setQuantities(initialQuantities);
  }, [inventory]);

  // handles quantity change
  const handleQuantityChange = (sku, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [sku]: newQuantity,
    }));
  };

  // Add to Cart function
  const handleAddToCart = (item) => {
    const quantity = quantities[item.sku]; // Retrieve quantity from state
    console.log(
      'adding item to cart',
      item.image,
      item.name,
      item.sku,
      item.retail_price,
      quantity
    );

    // Find corresponding image URL from imageList
    const image = imageList.find(
      (imageItem) => imageItem.sku === item.sku
    )?.image;

    // Send data to backend
    const orderData = {
      image: image,
      product_name: item.name,
      wine_sku: item.sku,
      unit_price: item.retail_price.replace('$', ''),
      number_bottles: quantity,
    };

    //Dispatch action to add product to cart
    dispatch({
      type: 'ADD_TO_CART',
      payload: orderData,
    });
  };

  // Push function to go to the Shopping Cart page
  const viewCart = () => {
    history.push('/cart');
  };

  return (
    <>
      <div className="inventory-list" key={inventory.id}>
        <h1 className="product-list-title" align="center">
          Product Inventory
        </h1>
        <Table
          sx={{ maxWidth: 1450 }}
          arial-label="simple table"
          align="center"
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ verticalAlign: 'bottom', fontFamily: 'Montserrat' }}
              >
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
                <h3>Inventory</h3>
              </TableCell>
              <TableCell
                align="center"
                sx={{ verticalAlign: 'bottom', fontFamily: 'Montserrat' }}
              >
                {' '}
                <h3>Retail Price</h3>
              </TableCell>
              <TableCell
                align="center"
                sx={{ verticalAlign: 'bottom', fontFamily: 'Montserrat' }}
              >
                {' '}
                <h3>Quantity</h3>
              </TableCell>
              <TableCell
                align="center"
                sx={{ verticalAlign: 'bottom', fontFamily: 'Montserrat' }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <TableRow
                key={item.sku}
                className="product-list"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" sx={{ fontFamily: 'Montserrat' }}>
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
                    maxWidth: '300px',
                  }}
                  sx={{ fontFamily: 'Montserrat' }}
                >
                  {item.teaser}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: 'Montserrat' }}>
                  {item.category}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: 'Montserrat' }}>
                  {item.inv_level}
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: 'Montserrat' }}>
                  {item.retail_price} / bottle
                </TableCell>
                <TableCell align="center" sx={{ fontFamily: 'Montserrat' }}>
                  <TextField
                    type="number"
                    InputProps={{
                      inputProps: { min: 0, max: item.inv_level },
                      style: { fontSize: '0.9rem', fontFamily: 'Montserrat' },
                    }}
                    value={quantities[item.sku] || ''}
                    onChange={(event) =>
                      handleQuantityChange(
                        item.sku,
                        parseInt(event.target.value, 10)
                      )
                    }
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    variant="outlined"
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
                    }}
                    type="button"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <div className="view-cart">
            <Button
              className="view-cart"
              size="small"
              variant="outlined"
              type="button"
              onClick={viewCart}
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
              }}
            >
              <ShoppingCartIconPage /> Cart
            </Button>
          </div>
        </Table>
      </div>
    </>
  );
}

export default ProductList;
