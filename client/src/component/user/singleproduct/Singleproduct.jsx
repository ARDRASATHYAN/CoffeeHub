import React, { useContext, useEffect, useState } from 'react'
import './Productdetails.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../navbar/Navbar';
import { CartContext } from '../../../contextapi/CartContext';

function Singleproduct() {
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
const navigate=useNavigate()
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/product/productone/${id}`);
                setProduct(response.data.data);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = async (product) => {
        const cartItem = {
            productId: product._id,  // Include productId here
            productname: product.productname,
            price: product.price,
            quantity: 1,
            image: product.photo  // Ensure this matches your backend schema
        };

        try {
            const response = await axios.post('http://localhost:4000/cart/addcart', cartItem);
            addToCart(cartItem);
            console.log(response); 
           
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };
    return (
        <>
            <Navbar />
            <div className='productdetails-container'>
                {product.photo ? (
                    <img src={`/photos/${product.photo}`} alt='Product' className='proimage' />
                ) : (
                    <p>Loading image...</p>
                )}
                <div className='product-info'>
                    <h2 className='product-title'>Title: {product.productname}</h2>
                    <p className='product-des'>Description: {product.description}</p>
                    <p className='product-price'>{product.category_id?.category ? `Category: ${product.category_id.category}` : ''}</p>
                    <p className='product-price'>Price: {product.price}</p>
                    <p className='product-price'>{product.availability ? 'Available' : 'Not Available'}</p>
                    <button className='buy-btn' onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    <Link to='/'>
                        <button className='home-btn'>Go Back Home</button>
                    </Link>
                </div>
            </div>
        </>
  )
}

export default Singleproduct
