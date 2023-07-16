import { useReducer, createContext} from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,  
    cartTotalPrice: 0,    
};

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            };
            case CART_ACTION_TYPES.SET_IS_CART_OPEN:
                return{
                    ...state,
                    isCartOpen: payload,
                };
            default:
                throw new Error('error');
    }
}

export const CartProvider = ({children}) => {
    const [{ cartItems, isCartOpen, cartCount, cartTotalPrice}, dispatch] = 
        useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );

        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );
    
            dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartCount: newCartCount,
                cartTotalPrice: newCartTotal
            })
        );
    };
    
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemReducer(newCartItems);
    };

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToRemove) => {
        const newCartItems = clearCartItem(cartItems, cartItemToRemove);
        updateCartItemReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    };
   
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
