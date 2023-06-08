import { useContext } from 'react';
import './checkout-item.styles.scss'
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, quantity, price} = cartItem;

    const {removeItemFromCart, addItemToCart, clearItemFromCart} = useContext(CartContext);

    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${imageUrl}`}/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div onClick={()=> removeItemFromCart(cartItem)} className='arrow'>
                    &#10094;
                </div>    
                <span className='value'>{quantity}</span>
                <div onClick={()=> addItemToCart(cartItem)} className='arrow'>
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            <div onClick={()=> clearItemFromCart(cartItem)} className='remove-button'>&#10005;</div>
        </div>
    );

}
export default CheckoutItem;