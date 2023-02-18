import {useContext} from 'react';
import {CartContext} from '../../contexts/cart.context';

import {CartIconContainer, CartIconShoppingIcon, CartIconItemCount} from './card-icon.styles';

const CardIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <CartIconShoppingIcon />
            <CartIconItemCount>{cartCount}</CartIconItemCount>
        </CartIconContainer>
    )
}

export default CardIcon;