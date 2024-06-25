import axios from 'axios';
import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './order.css'

function Orderconformation() {
    const { userId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };

    const handleConfirmOrder = async () => {
        try {
            const orderData = {
                userId,
                items: cart,
                totalPrice,
            };
            await axios.post('http://localhost:4000/order/orders', orderData);
            navigate('/thank-you');
        } catch (error) {
            console.error('Error confirming order:', error);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="container">
                <h1 className="heading">Order Confirmation</h1>
                <p className="userText">Thank you for your order, user {userId}!</p>
                <h2 className="subheading">Order Details</h2>
                <div className="box">
                    <ul className="cartList">
                        {cart.map((item, index) => (
                            <li key={index} className="cartItem">
                                <img src={item.image} alt={item.productname} className="productImage" />
                                <span className="productName">{item.productname}</span>
                                <span className="quantity">Quantity: {item.quantity}</span>
                                <span className="price">Price: ${parseFloat(item.price).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="totalPrice">Total Price: ${totalPrice.toFixed(2)}</p>
                </div>
                <button onClick={handleConfirmOrder} className="confirmButton">Confirm</button>
            </div>
        </>
  )
}

export default Orderconformation
