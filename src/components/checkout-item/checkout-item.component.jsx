import {useDispatch, useSelector} from 'react-redux';

import {addItemToCart, removeItemFromCart, clearItemFromCart} from '../../store/cart/cart.action';
import {selectCartItems} from '../../store/cart/cart.selector';

import {CheckoutItemContainer, ImageContainer, CheckoutItemName, 
    CheckoutItemQuantity, CheckoutItemPrice, CheckoutItemArrow, 
    CheckoutItemValue, RemoveButton} from './checkout-item.styles';

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <CheckoutItemName>{name}</CheckoutItemName>
            <CheckoutItemQuantity>
                <CheckoutItemArrow onClick={removeItemHandler}>&#10094;</CheckoutItemArrow>
                <CheckoutItemValue>{quantity}</CheckoutItemValue>
                <CheckoutItemArrow onClick={addItemHandler}>&#10095;</CheckoutItemArrow>
            </CheckoutItemQuantity>
            <CheckoutItemPrice>{price*quantity}</CheckoutItemPrice>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;
