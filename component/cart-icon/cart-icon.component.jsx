import {CartIconContainer,ShoppingIcon, ItemCount} from './cart-icon.styles';

import { useContext } from 'react';
import { CartContext } from '../../src/context/cart.context';

const CartIcon = () =>{
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )

}

export default CartIcon;
