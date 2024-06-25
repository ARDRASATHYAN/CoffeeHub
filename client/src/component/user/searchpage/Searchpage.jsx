import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './Productdetails.css'
import { CartContext } from '../../../contextapi/CartContext';
import Navbar from '../navbar/Navbar';


function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  

function Searchpage() {
  
    const query = useQuery();
    const productName = query.get('productName');
    const categoryId = query.get('categoryId');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);
  console.log('ss',searchResults);


  
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:4000/search/search', {
          params: { productName }
        });
        setSearchResults(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setLoading(false);
      }
    };

    if (productName) {
      fetchResults();
    }
  }, [productName]);

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
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };
      
  return (
    <div>
    <Navbar/>
      <h2>Search Results</h2>
      {loading && <p>Loading...</p>}
      {!loading && searchResults.length === 0 && <p>No results found for your search criteria.</p>}
      {!loading && searchResults.length > 0 && (
        <ul>
          {searchResults.map(item => (
            <>
            <div className='productdetails-container'>
            {item.photo ? (
                <img src={`/photos/${item.photo}`} alt='Product' className='proimage' />
              ) : (
                <p className='loading-image'>Loading image...</p>
              )}
            <div className='product-info'>
                <h2 className='product-title'>Title: {item.productname}</h2>
                <p className='product-des'>Description: {item.description}</p>
                <p className='product-price'>{item.category_id?.category ? `Category: ${item.category_id.category}` : ''}</p>
                <p className='product-price'>Price: {item.price}</p>
                <p className='product-price'>{item.availability ? 'Available' : 'Not Available'}</p>
                <button className='buy-btn' onClick={() => handleAddToCart(item)}>Add to Cart</button>
                <Link to='/'>
                    <button className='home-btn'>Go Back Home</button>
                </Link>
            </div>
            </div>
            </>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Searchpage
