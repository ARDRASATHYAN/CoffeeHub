import React, { useContext, useEffect, useState } from 'react'
import './cartstyle.css'
import { CartContext } from '../../../contextapi/CartContext';
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';





function Cart() {
    
    const { cart, setCart, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();
    const userId = localStorage.getItem('u_login_id');
    console.log('cart',cart);
    const incrementQuantity = async (index) => {
        const newCart = [...cart];
        newCart[index].quantity += 1;

        try {
            const response = await axios.patch(`http://localhost:4000/cart/cart/${newCart[index].productId}`, { quantity: newCart[index].quantity });
            
            if (response.data) {
                setCart(newCart);
            } else {
                console.error('Error updating quantity:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };
    
    const decrementQuantity = async (index) => {
        const newCart = [...cart];
        if (newCart[index].quantity > 1) {
            newCart[index].quantity -= 1;

            try {
                const response = await axios.patch(`http://localhost:4000/cart/cart/${newCart[index].productId}`, { quantity: newCart[index].quantity });
                if (response.data) {
                    setCart(newCart);
                } else {
                    console.error('Error updating quantity:', response.data.message);
                }
            } catch (error) {
                console.error('Error updating quantity:', error);
            }
        }
    };
    
    const handleRemoveFromCart = async (id) => {
        console.log('cartof',id );
        console.log('Removing item with id:', id);
        try {
            await axios.get(`http://localhost:4000/cart/cart/${id}`);
            setCart(cart.filter(item => item.productId !== id));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };
    if (!Array.isArray(cart)) {
        return <div>Loading...</div>;
    }

    const totalPrice = cart.reduce((acc, item) => {
        const price = parseFloat(item.price);
        return acc + price * item.quantity;
    }, 0);

    const handleOrder = () => {
        if (userId) {
            navigate(`/order-confirmation/${userId}`, { state: { cart, totalPrice } });
        } else {
            console.error('User ID not found in local storage');
        }
    };
    return (
        <>
        <Navbar/>
        <div className="cart-container">
            <h1>Shopping Cart</h1>
            <hr />
            <ul className="cart-items">
                {cart.map((item, index) => (
                    <li key={index}>
                        <span><img src={item.image} alt={item.productname} style={{ width: '100px', height: '100px' }} /></span>
                        <span>{item.productname}</span>
                        <span>${parseFloat(item.price).toFixed(2)}</span>
                        <div className="quantity-control">
                            <button onClick={() => decrementQuantity(index)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => incrementQuantity(index)}>+</button>
                        </div>
                        <button onClick={() => handleRemoveFromCart(item.productId)}>Delete</button>
                    </li>
                ))}
            </ul>
            <hr />
            <div className='order' style={{display:'flex',justifyContent:'space-between'}}>
            <p className="total">Total: ${totalPrice.toFixed(2)}</p>
            <button className='orderbtn' onClick={handleOrder} >order</button>
            </div>
        </div>
        </>
    )
}

export default Cart
