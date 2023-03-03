import {Fragment} from 'react';
import {Outlet} from 'react-router-dom';

import {useSelector} from 'react-redux';

import CardIcon from '../../components/card-icon/card-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import {selectorCurrentUser} from '../../store/user/user.selector';
import {selectIsCartOpen} from '../../store/cart/cart.selector';

import {signOutUser} from '../../utils/firebase/firebase.utils';

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import {NavigationContainer, NavLinks, LogoContainer, NavLink} from './navigation.styles';

const Navigation = () => {
    const currentUser = useSelector(selectorCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='Logo' />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {currentUser? (
                        <NavLink as='span' onClick={signOutUser}>
                            SIGN OUT
                        </NavLink>
                    ): (
                        <NavLink to='/auth'>
                            SIGN IN
                        </NavLink>
                    )}
                    <CardIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;