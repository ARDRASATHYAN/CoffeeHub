import React, { useEffect, useState } from 'react'
import './addproduct.css'
import axios from 'axios';


function AddProduct() {
      const [input, setInput] = useState({
        productname: '',
        category_id: '',
        availability: false,
        price: '',
        photo: '',
        description: '',
    });

    const [category, setCategory] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [file, setFile] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);

    const inputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInput({
            ...input,
            [name]: type === 'checkbox' ? checked : value,
        });
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

    const submit = (e) => {
        e.preventDefault();
        const errors = validate(input);
        setFormErrors(errors);
        setIsSubmit(true);

        if (Object.keys(errors).length === 0) {
            const data = new FormData();
            data.append('name', file.name);
            data.append('file', file);

            axios.post('http://localhost:4000/product/product', input)
                .then((response) => {
                    return axios.post('http://localhost:4000/image/upload-image', data);
                })
                .then((response) => {
                    console.log("res==============>", response.data);
                    setInput({
                        productname: '',
                        category_id: '',
                        availability: '',
                        price: '',
                        photo: '',
                        description: '',
                    }); // Reset form fields
                    setFile(null); // Reset file input
                    setIsSubmit(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const validate = (values) => {
        const errors = {};
        const regex1 = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

        if (!values.category_id) {
            errors.category_id = "Category is required";
        }
        if (!values.productname) {
            errors.productname = "Product name is required";
        }
        if (!values.price) {
            errors.price = "Price is required";
        }
        if (!values.description) {
            errors.description = "Description is required";
        }
       if (values.availability === undefined) {
            errors.availability = "Availability is required";
        }
        if (!values.photo) {
            errors.photo = "Photo is required";
        } else if (!regex1.test(values.photo)) {
            errors.photo = "Photo must be in the format jpeg, jpg, png";
        }

        return errors;
    };

    const resetForm = () => {
        setInput({
            productname: '',
            category_id: '',
            availability: false,
            price: '',
            photo: '',
            description: '',
        });
        setFile(null);
        setFormErrors({});
        setIsSubmit(false);
    };


    
    return (

        <div className="container" style={{ padding: '40px 0px 40px 0px' }}>
        <div className="gutters">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row gutters">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <h6 className="mb-3 text-primary">Product Details</h6>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" name='productname' id="floatingInput" placeholder="Coffee" value={input.productname} onChange={inputChange} />
                                    <span style={{ color: 'red' }}>{formErrors?.productname}</span>
                                    <label htmlFor="floatingInput">Product Name</label>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-floating mb-3">
                                    <input type="file" className="form-control" name='photo' id="floatingInput" placeholder="image.jpg" onChange={(e) => { setFile(e.target.files[0]); setInput({ ...input, photo: e.target.files[0].name }) }} />
                                    <span style={{ color: 'red' }}>{formErrors?.photo}</span>
                                    <label htmlFor="floatingInput">Image</label>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-floating">
                                    <textarea className="form-control" name='description' placeholder="Something about coffee" id="floatingTextarea2" value={input.description} onChange={inputChange} ></textarea>
                                    <span style={{ color: 'red' }}>{formErrors?.description}</span>
                                    <label htmlFor="floatingTextarea2">Description</label>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-floating mb-3">
                                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example" name='category_id' value={input.category_id} onChange={inputChange}>
                                        <option value="">Open this select menu</option>
                                        {category.map((data, key) => (
                                            <option key={key} value={data._id}>{data.category}</option>
                                        ))}
                                    </select>
                                    <span style={{ color: 'red' }}>{formErrors?.category_id}</span>
                                    <label htmlFor="floatingSelect">Category</label>
                                </div>
                            </div>
                        </div>
                        <div className="row gutters">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" name='price' id="floatingInput" placeholder="$" value={input.price} onChange={inputChange} />
                                    <span style={{ color: 'red' }}>{formErrors?.price}</span>
                                    <label htmlFor="floatingInput">Price</label>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-check form-group-border">
                                    <input className="form-check-input" type="checkbox" checked={input.availability} id="flexCheckIndeterminate" name='availability' onChange={inputChange} />
                                    <span style={{ color: 'red' }}>{formErrors?.availability}</span>
                                    <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                                        Availability Status
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row gutters">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="text-right">
                                    <button type="button" className="btn btn-primary mx-3" onClick={submit}>Save</button>
                                    <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default AddProduct
