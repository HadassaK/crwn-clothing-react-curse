import { useEffect } from "react";
import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {

    const cartExists = cartItems.find(
        (item) => item.id == productToAdd.id
    );

    if(cartExists){
        return cartItems.map((item) => item.id === productToAdd.id?
        {...item, quantity: item.quantity + 1}
        :item
        );
    }

    return [...cartItems,{...productToAdd, quantity:1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    
    const cartExists = cartItems.find(
        (cartItem) => cartItem.id == cartItemToRemove.id
    );

    if(cartExists.quantity == 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove .id);
    }

    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id?
        {...cartItem, quantity: cartItem.quantity - 1}
        :cartItem
        );
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear .id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=> false,
    cartItems: [],
    addItemToCart: ()=>{},  
    removeItemFromCart: ()=>{},
    cartCount: 0,  
    cartTotalPrice: 0,
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToRemove) => {
        setCartItems(clearCartItem(cartItems, cartItemToRemove));
    }

    useEffect(()=>{
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0);
        setCartCount(newCartCount);        
    },[cartItems]);

    useEffect(()=>{
        const newCartTotalPrice = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0);
        setCartTotalPrice(newCartTotalPrice);
    }, [cartItems]);

    const value = {
        isCartOpen,
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart, 
        clearItemFromCart, 
        cartItems, 
        cartCount, 
        cartTotalPrice};

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
        );
};
