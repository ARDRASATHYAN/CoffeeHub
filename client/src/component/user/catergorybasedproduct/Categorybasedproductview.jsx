import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../navbar/Navbar';


function Categorybasedproductview() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
       
        
        axios.get(`http://localhost:4000/category/viewcategory/${id}`)
            .then((response) => {
                setProducts(response.data.data || []);
               
            })
            .catch((error) => {
                console.error(error);
               
            });
    }, [id]);

  

    return (
        <div>
            <Navbar/>
            {products.length > 0 ? (
                <>
                    <h2>{products[0]?.category_id?.category}</h2>
                    <ul>
                        {products.map(item => (
                            <div key={item._id} className='productdetails-container'>
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
                                </div>
                            </div>
                        ))}
                    </ul>
                </>
            ) : (
                <p>No products found for this category.</p>
            )}
        </div>
  )
}

export default Categorybasedproductview
