import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';

const CartIcon = ()=>{
    const {isCartOpen, setIsCartOpen} = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
    
    const {cartCount} = useContext(CartContext);    
    
    return(
        <CartIconContainer className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount className='item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    );
  };

  export default CartIcon;