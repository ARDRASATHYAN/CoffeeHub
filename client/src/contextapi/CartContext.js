import React, { createContext, useState, useEffect,useMemo } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/cart/cart`);
                setCart(response.data.data || []);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCart();
    }, []);

    const addToCart = async (product) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cart/addcart`, { ...product, quantity: 1 });
            console.log(response);
            const newCartItem = {
                ...product,
                quantity: 1,
               
            };
            setCart(prevCart => [...prevCart, newCartItem]);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const removeFromCart = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/cart/cart/${id}`);
            setCart(prevCart => prevCart.filter(item => item._id !== id));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };
    const contextValue = useMemo(() => ({
        cart,
        addToCart,
        removeFromCart,
        setCart
    }), [cart])
    return (
        <CartContext.Provider value={contextValue }>
            {children}
        </CartContext.Provider>
    );
};
