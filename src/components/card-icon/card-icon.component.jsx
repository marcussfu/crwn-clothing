import {useContext} from 'react';
import {CartContext} from '../../contexts/cart.context';

import {CartIconContainer, ShoppingIcon, CartIconItemCount} from './card-icon.styles';

const CardIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon />
            <CartIconItemCount>{cartCount}</CartIconItemCount>
        </CartIconContainer>
    )
}

export default CardIcon;