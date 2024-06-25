import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './categorystyle.css'
import axios from 'axios'
import { useEffect } from 'react'


function Category() {
    const [category, setCategory] = useState([])

   
        useEffect(() => {
            axios.get('http://localhost:4000/category/viewcategory')
                .then((response) => {
                    setCategory(response.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }, []);
    
    
  return (
    <>
            <div className="category-display-page">
                {category.map((Category, key) => (
                    <ul className="category-list">
                        <li>
                            <button className='categorybutton'> <Link to={`/categoryproduct/${Category._id}`}>{Category.category}<img src={`/photos/${Category.photo}`} alt='image' /></Link></button>
                        </li>
                    </ul>
                ))}
            </div>
        </>
  )
}

export default Category
