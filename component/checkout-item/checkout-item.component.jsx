import './checkout-item.styles.scss';
import { useContext } from 'react';

import { CartContext } from '../../src/context/cart.context';

const CheckoutItem = ({cartItem}) =>{
  const { removeItemToCart, addItemToCart, removeCartItem } = useContext(CartContext);
  const removeCartItemToCartHandler = () => removeItemToCart(cartItem);
  const addCartItemHandler = () => addItemToCart(cartItem);
  const removeCartItemHandler = () => removeCartItem(cartItem);
  const { name, price, imageUrl, quantity } = cartItem;
  
  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>
      
      <div className='quantity'>
        <div className='arrow' onClick={removeCartItemToCartHandler}>&#10094;</div>
          <span className='value'>{quantity}</span>
        <div className='arrow' onClick={addCartItemHandler}>&#10095;</div>        
      </div>

      <span className='price'>{price}</span>

      <div className='remove-button' onClick={removeCartItemHandler}>&#10005;</div>
    </div>
  )
}

export default CheckoutItem;