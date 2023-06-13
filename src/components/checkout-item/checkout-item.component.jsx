import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { Arrow, BaseSpan, CheckoutItemContainer, ImageContainer, Quantity, RemoveButton, Value } from './checkout-item.styles';

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, quantity, price} = cartItem;

    const {removeItemFromCart, addItemToCart, clearItemFromCart} = useContext(CartContext);

    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${imageUrl}`}/>
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={()=> removeItemFromCart(cartItem)}>
                    &#10094;
                </Arrow>    
                <Value>{quantity}</Value>
                <Arrow onClick={()=> addItemToCart(cartItem)}>
                    &#10095;
                </Arrow>
            </Quantity>
            <BaseSpan >{price}</BaseSpan>
            <RemoveButton onClick={()=> clearItemFromCart(cartItem)}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );

}
export default CheckoutItem;