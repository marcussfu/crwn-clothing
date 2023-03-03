import {createAction} from '../../utils/reducer/reducer.utils';

import {CART_ACTION_TYPES} from './cart.types';

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);

const removeCartItem = (cartItems, cartItemToRemove) => {
    const cartItemsDuplicate = [...cartItems];
    const index = cartItemsDuplicate.findIndex(e => e.id === cartItemToRemove.id);
    if (index > -1) {
        cartItemsDuplicate[index].quantity -= 1;
        if (cartItemsDuplicate[index].quantity === 0)
            cartItemsDuplicate.splice(index, 1);
    }
        
    return cartItemsDuplicate;
};

const addCartItem = (cartItems, productToAdd) => {
    const cartItemsDuplicate = [...cartItems];
    const index = cartItemsDuplicate.findIndex(e => e.id === productToAdd.id);
    if (index > -1)
        cartItemsDuplicate[index].quantity += 1;
    else
        cartItemsDuplicate.push({...productToAdd, quantity: 1});
    return cartItemsDuplicate;
};

export const setIsCartOpen = (boolean) =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};