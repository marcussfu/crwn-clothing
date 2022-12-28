import {createContext, useState} from 'react';

const addCartItem = (cartItems, productToAdd) => {
    // const existingCartItem = cartItems.find(
    //     (cartItem) => cartItem.id === productToAdd.id
    // );

    // if (existingCartItem) {
    //     return cartItems.map((cartItem) => cartItem.id === productToAdd.id? 
    //     {...cartItem, quantity: cardItem.quantity + 1}
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
    addItemToCart: () => {},
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    
    const addItemToCart = (productToAdd) => 
        setCartItems(addCartItem(cartItems, productToAdd));

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart};
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}