import {useContext} from 'react';
import {CartContext} from '../../contexts/cart.context';

import {CheckoutItemContainer, ImageContainer, CheckoutItemName, 
    CheckoutItemQuantity, CheckoutItemPrice, CheckoutItemArrow, 
    CheckoutItemValue, RemoveButton} from './checkout-item.styles';

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    const {removeItemFromCart, clearItemFromCart, addItemToCart} = useContext(CartContext);
    const removeItemHandler = () => removeItemFromCart(cartItem);
    const clearItemHandler = () => clearItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
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
