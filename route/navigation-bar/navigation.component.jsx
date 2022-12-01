import { Outlet } from 'react-router';
import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../src/assets/crown.svg';

import CartIcon from '../../component/cart-icon/cart-icon.component';
import CartDropdown from '../../component/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../src/context/user.context';
import { signOutUser } from '../../src/utils/firebase/firebase.utils';
import { CartContext } from '../../src/context/cart.context';

import  {NavigationContainer, LogoContainer, NavLinks, NavLink} from './navigation.style';

const Navigation = () =>{

  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            Shop
          </NavLink>       
          {
            currentUser ? (
              <NavLink as='span' onClick={signOutUser}>
                Sign Out
              </NavLink>
            ) : (
                <NavLink to='/auth'>
                Sign In
                </NavLink>
            )
          }
          <CartIcon/>
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
};

export default Navigation;