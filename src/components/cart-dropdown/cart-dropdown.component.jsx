import Button from '../button/botton.component'

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'></div>
            <Button>Check Out</Button>
        </div>
    );
};

export default CartDropdown;