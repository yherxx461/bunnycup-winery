// import axios from 'axios';
import {
  // Paper,
  Table,
  TableBody,
  TableCell,
  // TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
      initialQuantities[item.sku] = 12; // Default quantity
    });
    setQuantities(initialQuantities);
  }, [inventory]);

  const handleQuantityChange = (sku, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [sku]: newQuantity,
    }));
  };

  // Add to Cart function
  const handleAddToCart = (item) => {
    const quantity = quantities[item.sku]; // Retrieve quantity from state
    // console.log(
    //   'adding item to cart',
    //   item.image,
    //   item.name,
    //   item.sku,
    //   item.retail_price,
    //   quantity
    // );

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

  const viewCart = () => {
    history.push('/cart');
  };

  return (
    // <div>
    //       <LoginForm />
    //     </div>
    <>
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
          // justifyContent="center"
        > */}
        <Table
          sx={{ maxWidth: 1350 }}
          arial-label="simple table"
          align="center"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ verticalAlign: 'bottom' }}>
                <h3></h3>
              </TableCell>
              <TableCell align="center" sx={{ verticalAlign: 'bottom' }}>
                <h3>Product Name</h3>
              </TableCell>
              <TableCell align="center" sx={{ verticalAlign: 'bottom' }}>
                <h3>SKU #</h3>
              </TableCell>
              <TableCell align="center" sx={{ verticalAlign: 'bottom' }}>
                <h3>Teaser</h3>
              </TableCell>
              <TableCell align="center" sx={{ verticalAlign: 'bottom' }}>
                <h3>Category</h3>
              </TableCell>
              <TableCell align="center" sx={{ verticalAlign: 'bottom' }}>
                <h3>Inventory</h3>
              </TableCell>
              <TableCell align="center" sx={{ verticalAlign: 'bottom' }}>
                <h3>Retail Price</h3>
              </TableCell>
              <TableCell align="center" sx={{ verticalAlign: 'bottom' }}>
                <h3>Quantity</h3>
                {/* <p>(# of Bottles)</p> */}
              </TableCell>
              <TableCell
                align="center"
                sx={{ verticalAlign: 'top' }}
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
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.sku}</TableCell>
                <TableCell
                  align="left"
                  style={{
                    verticalAlign: 'middle',
                    whiteSpace: 'normal',
                    wordWrap: 'break-words',
                    maxWidth: '300px',
                  }}
                >
                  {item.teaser}
                </TableCell>
                <TableCell align="center">{item.category}</TableCell>
                <TableCell align="center">{item.inv_level}</TableCell>
                <TableCell align="center">${item.retail_price}</TableCell>
                <TableCell align="center">
                  <TextField
                    type="number"
                    InputProps={{
                      inputProps: { min: 0, max: item.inv_level },
                      style: { fontSize: '0.9rem' },
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
                    variant="contained"
                    style={{
                      backgroundColor: 'white',
                      color: 'black',
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
              variant="contained"
              style={{ backgroundColor: 'white', color: 'black' }}
              type="button"
              onClick={viewCart}
            >
              View Cart
            </Button>
          </div>
        </Table>
        {/* </TableContainer> */}
      </div>
    </>
  );
}

export default ProductList;
