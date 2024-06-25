import React, { useState } from 'react'
import './addproduct.css'
import axios from 'axios'


function Addcategorys() {
    const [input, setInput] = useState({
        photo: '',
        category: '',
      });
      const [formErrors, setFormErrors] = useState({});
      const [file, setFile] = useState(null);
      const [isSubmit, setIsSubmit] = useState(false);
    
      const inputChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
      };
    
      const submit = (e) => {
        e.preventDefault();
        const errors = validate(input);
        setFormErrors(errors);
        setIsSubmit(true);
    
        if (Object.keys(errors).length === 0) {
          const data = new FormData();
          data.append('name', file.name);
          data.append('file', file);
    
          axios.post('http://localhost:4000/category/category', input)
            .then((response) => {
              return axios.post('http://localhost:4000/image/upload-image', data);
            })
            .then((response) => {
              console.log("res==============>", response.data);
              setInput({ photo: '', category: '' }); // Reset form fields
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
    
        if (!values.category) {
          errors.category = "Category is required";
        }
    
        if (!values.photo) {
          errors.photo = "Photo is required";
        } else if (!regex1.test(values.photo)) {
          errors.photo = "Photo must be in the format jpeg, jpg, png";
        }
    
        return errors;
      };
    
      const resetForm = () => {
        setInput({ photo: '', category: '' });
        setFile(null);
        setFormErrors({});
        setIsSubmit(false);
        window.location.reload();
      };
  return (
    <div className="container" style={{ padding: '40px 0px 40px 0px',position:'relative' }}>
    <div className=" gutters">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card ">
                <div className="card-body">
                    <div className="gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <h6 className="mb-3 text-primary">category adding</h6>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" name='category' id="floatingInput" placeholder="coffee"onChange={inputChange} />
                                <span style={{ color: 'red' }}> {formErrors?.category}</span>
                                <label for="floatingInput">categoryname</label>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div class="form-floating mb-3">
                                <input type="file" class="form-control"name='photo' id="floatingInput" placeholder="image.jpg"  onChange={(e) => { setFile(e.target.files[0]); setInput({ ...input, photo: e.target.files[0].name }) }} />
                                <span style={{ color: 'red' }}> {formErrors?.photo}</span>
                                <label for="floatingInput">image</label>
                            </div>
                        </div>
                       
                        
                    </div>
                   
                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="text-right ">
                            <button type="button" className="btn btn-primary mx-3"  onClick={submit}>Save</button>
                                <button type="button" className="btn btn-secondary"  onClick={resetForm}
                      >Cancel</button>
                               
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

export default Addcategorys

