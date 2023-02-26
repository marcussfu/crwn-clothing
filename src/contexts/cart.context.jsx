import {createContext, useReducer} from 'react';

import {createAction} from '../utils/reducer/reducer.utils';

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
// {
//     const cartItemsDuplicate = [...cartItems];
//     const index = cartItemsDuplicate.findIndex(e => e.id === cartItemToClear.id);
//     if (index > -1)
//         cartItemsDuplicate.splice(index, 1);
//     return cartItemsDuplicate;
// };

const removeCartItem = (cartItems, cartItemToRemove) => {
    // const existingCartItem = cartItems.find(
    //     (cartItem) => cartItem.id === cartItemToRemove.id
    // );

    // if (existingCartItem.quantity === 1) {
    //     return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    // }

    // return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id? 
    //     {...cartItem, quantity: cartItem.quantity - 1}
    //     : cartItem
    // );


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
    // const existingCartItem = cartItems.find(
    //     (cartItem) => cartItem.id === productToAdd.id
    // );

    // if (existingCartItem) {
    //     return cartItems.map((cartItem) => cartItem.id === productToAdd.id? 
    //     {...cartItem, quantity: cartItem.quantity + 1}
    //     : cartItem
    //     );
    // }
    // return [...cardItems, {...productToAdd, quantity: 1}];


    const cartItemsDuplicate = [...cartItems];
    const index = cartItemsDuplicate.findIndex(e => e.id === productToAdd.id);
    if (index > -1)
        cartItemsDuplicate[index].quantity += 1;
    else
        cartItemsDuplicate.push({...productToAdd, quantity: 1});
    return cartItemsDuplicate;
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cardItems: [],
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    addItemToCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }

        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

export const CartProvider = ({children}) => {
    const [{isCartOpen, cartItems, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartCount: newCartCount,
                cartTotal: newCartTotal
            })
        );
    }
    
    const clearItemFromCart = (cartItemToClear) => {
        updateCartItemsReducer(clearCartItem(cartItems, cartItemToClear));
    };

    const removeItemFromCart = (cartItemToRemove) => {
        updateCartItemsReducer(removeCartItem(cartItems, cartItemToRemove));
    }
    
    const addItemToCart = (productToAdd) => {
        updateCartItemsReducer(addCartItem(cartItems, productToAdd));
    };

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, removeItemFromCart, clearItemFromCart, addItemToCart, cartCount, cartTotal};
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}