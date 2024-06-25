import React, { useContext, useEffect, useState } from 'react'
import './viewproducts.css'
import { Link, useNavigate } from 'react-router-dom'
import './addproduct.css'
import axios from 'axios'
import { CartContext } from '../../../contextapi/CartContext'
import Category from '../../user/catergory/Category'




export default function Viewproduct() {

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [inputValues, setInputValues] = useState({});
    const [file, setFile] = useState(null);
    const [editId, setEditId] = useState(null);
    const [category, setCategory] = useState([])
    const navigate = useNavigate()
    const { addToCart } = useContext(CartContext);

    const role = localStorage.getItem('role');
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {

            const response = await axios.get('http://localhost:4000/product/viewproduct');
            setProducts(response.data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };


    useEffect(() => {
        axios.get('http://localhost:4000/category/viewcategory')
            .then((response) => {
                setCategory(response.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInputValues({
            ...inputValues,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.get(`http://localhost:4000/product/delete/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEdit = (product) => {
        setEditId(product._id);
        setSelectedProduct(product);
        setInputValues(product);
        console.log('product', inputValues);
    };

    const handleSubmit = async () => {
        try {
            if (file) {
                const data = new FormData();
                data.append('name', file.name);
                data.append('file', file);
                await axios.post('http://localhost:4000/image/upload-image', data);
            }
            await axios.post(`http://localhost:4000/product/updateproduct/${editId}`, inputValues);
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
    const move = (id) => {
        navigate(`/viewproducts/${id}`)
    }


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

        <>
        {(role==0)? null:
             <Category/>
        }
          
            <div className='product-grid mb-4'>
                {products.length > 0 ? (
                    products.map((product) => (
                        <div className='product' key={product._id}>
                            <Link to="#">
                                <img className="img-fluid" src={`/photos/${product.photo}`} alt="" style={{ height: '400px', width: '400px' }} />
                            </Link>
                            <h2 className='sample'>Title: {product.productname}</h2><p>{product.category_id.category}</p>
                            <p>
                                <h3 className='price'>Price: {product.price} {product.availability ? 'Available' : 'Not Available'}</h3>
                            </p>

                            {role == 0 ? (
                                <>
                                    <button className='button1' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEdit(product)}>Update</button>
                                    <button className='button2' onClick={() => handleDelete(product._id)}>Delete</button>
                                </>
                            ) : (
                                <>
                                    <button className='button1' onClick={() => { move(product._id) }}>viewdetails</button>
                                    <button className='button2' onClick={() => handleAddToCart(product)}>AddToCart </button>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="container" style={{ padding: '40px 0px' }}>
                                <div className="card">
                                    <div className="card-body">
                                        <h6 className="mb-3 text-primary">Edit Product</h6>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="productname"
                                                placeholder="Product Name"
                                                value={inputValues.productname || ''}
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor="productname">Product Name</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="file"
                                                className="form-control"
                                                name="photo"

                                                placeholder="Image"
                                                onChange={(e) => { setFile(e.target.files[0]); setInputValues({ ...inputValues, photo: e.target.files[0].name }) }}
                                            />
                                            <label htmlFor="photo">Image</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                placeholder="Description"
                                                value={inputValues.description || ''}
                                                onChange={handleInputChange}
                                            ></textarea>
                                            <label htmlFor="description">Description</label>
                                        </div>

                                        <div className="form-floating mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="price"
                                                placeholder="Price"
                                                value={inputValues.price || ''}
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor="price">Price</label>
                                        </div>
                                        <div className="form-check mb-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="availability"
                                                checked={inputValues.availability || false}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label" htmlFor="availability">
                                                Availability Status
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}


