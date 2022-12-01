import { CartDropdownContainer, Empty, CartItems,  } from './cart-dropdown.styles.jsx';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../src/context/cart.context';

const CartDropdown = () =>{
  const {cartItems} = useContext(CartContext);
  const navigate = useNavigate();
  const checkoutRouter = () => navigate('/checkout')

  return (
    <CartDropdownContainer>
      <CartItems>
        {
          cartItems.length ? 
            (cartItems.map((item) => (<CartItem key={item.id} cartItem={item} />))) :
            (<Empty>Your cart is Empty.</Empty>)
        }
      </CartItems>
      <Button onClick={checkoutRouter}>Go to Checkout</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown;