import {createContext, useState, useEffect} from 'react';

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

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);
        setCartTotal(newCartTotal);
    }, [cartItems]);
    
    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    };

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const value = {isCartOpen, setIsCartOpen, cartItems, removeItemFromCart, clearItemFromCart, addItemToCart, cartCount, cartTotal};
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}