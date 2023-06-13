import { useContext } from 'react';

import Button, { BUTTON_TYPE_CLASSES } from '../button/botton.component';
import { CartContext } from '../../contexts/cart.context';

import { Footer, Name, Price, ProductCardContainer } from './product-card.styles';

const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product;
    const {addItemToCart} = useContext(CartContext);

    const addProductToCart = () => {
        addItemToCart(product);
    } 

    return(
        <ProductCardContainer>
            <img src={imageUrl} alt={`${imageUrl}`}/>
            <Footer>
                <Name className='name'>{name}</Name>
                <Price className='price'>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add To Card</Button>
        </ProductCardContainer>
    );
};

export default ProductCard;