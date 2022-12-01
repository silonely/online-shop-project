import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  setCartItems: () =>{},
  cartCount: 0,
  cartTotal: 0,
  setCartTotal: () =>{},
});

const addCartItem = (cartItems, productToAdd) =>{
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if(existingCartItem){
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
      ? {...cartItem, quantity: cartItem.quantity+1}
      : cartItem
    );
  }

  return [...cartItems,{...productToAdd, quantity: 1}]
}

const decreaseCartItem = (cartItems, itemToRemove) =>{
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === itemToRemove.id
  );

  if(existingCartItem.quantity === 1){
    return cartItems.filter(cartItem => cartItem.id !== itemToRemove.id)
  }

  return cartItems.map((cartItem) => cartItem.id === itemToRemove.id
    ? { ...cartItem, quantity: cartItem.quantity - 1 }
    : cartItem
  );
}

const removeItem = (cartItems, itemToRemove) => cartItems.filter(cartItem => cartItem.id !== itemToRemove.id)

export const CartProvider = ({children}) =>{
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(
    () =>{
      const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
      setCartCount(newCartCount)
    }, [cartItems])

  useEffect(
    () => {
      const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0)
      setCartTotal(newCartTotal)
    }, [cartItems])

  const addItemToCart = (productToAdd) =>{
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemToCart = (productToRemove) =>{
    setCartItems(decreaseCartItem(cartItems, productToRemove));
  }

  const removeCartItem = (itemToRemove) => {
    setCartItems(removeItem(cartItems, itemToRemove))
  }  
  
  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, cartTotal, removeItemToCart, removeCartItem };

  return(
    <CartContext.Provider value = {value}>
      {children}
    </CartContext.Provider>
  )
}