import React, { useEffect, useState } from 'react'
import './register.css'
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast,Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Register() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: ""
  });

  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

    if (!values.username) {
      errors.username = "Enter a username";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (!strongPassword.test(values.password)) {
      errors.password = "Password must contain an alphabet, digit, and special character";
    }

    if (!values.confirm_password) {
      errors.confirm_password = "Confirmation password is required";
    } else if (values.password !== values.confirm_password) {
      errors.confirm_password = "Passwords do not match";
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(input));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/register/userreg`, input)
        .then((response) => {
          if (response.data.success === true) {
            navigate('/login');
          }
        })
        .catch((error) => {
          const errorMsg = error.response?.data?.message || error.message;
          toast.error(`Error: ${errorMsg}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
          });
        });
    }
  }, [formErrors, isSubmit]);

  return (
    <>
     <ToastContainer/>
      <Navbar />
      <div className="register-container" style={{ marginTop: '20px' }}>
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
              onChange={inputChange}
            />
            <label className="form-label">Username</label>
            {formErrors.username && <p className="error">{formErrors.username}</p>}
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              onChange={inputChange}
            />
            <label className="form-label">Email address</label>
            {formErrors.email && <p className="error">{formErrors.email}</p>}
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              onChange={inputChange}
            />
            <label className="form-label">Password</label>
            {formErrors.password && <p className="error">{formErrors.password}</p>}
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              name="confirm_password"
              placeholder="Confirm Password"
              onChange={inputChange}
            />
            <label className="form-label">Confirm Password</label>
            {formErrors.confirm_password && <p className="error">{formErrors.confirm_password}</p>}
          </div>
          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
    </>
  )
}

export default Register
