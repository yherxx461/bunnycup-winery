import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Material UI Imports
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';

function ShoppingCartIconPage() {
  const history = useHistory();
  const cart = useSelector((store) => store.cart);

  // Counting total quantity instead of total items
  // const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const handleClick = () => {
    history.push('/cart');
    // console.log('navigate to Orders');
  };

  return (
    <>
      <Badge
        className="shoppingCartIcon"
        // TO-DO: Once completed the saga/reducer calls, can do item.length to get the total items added to the cart
        // badgeContent={totalQuantity}
        color="primary"
        // anchorOrigin={{
        //   vertical: 'top',
        //   horizontal: 'right',
        // }}
      >
        <ShoppingCartOutlinedIcon
          className="shoppingCart"
          onClick={handleClick}
          fontSize="medium"
        />
      </Badge>
    </>
  );
}

export default ShoppingCartIconPage;
