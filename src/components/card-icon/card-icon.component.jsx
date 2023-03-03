import {useDispatch, useSelector} from 'react-redux';

import {setIsCartOpen} from '../../store/cart/cart.action';
import {selectIsCartOpen, selectCartCount} from '../../store/cart/cart.selector';

import {CartIconContainer, ShoppingIcon, CartIconItemCount} from './card-icon.styles';

const CardIcon = () => {
    const dispatch = useDispatch();

    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);
    
    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon />
            <CartIconItemCount>{cartCount}</CartIconItemCount>
        </CartIconContainer>
    )
}

export default CardIcon;