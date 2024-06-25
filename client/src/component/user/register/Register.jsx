import React, { useState } from 'react'
import './register.css'
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [input, setInput] = useState({
    username: "",
    email: "",

    password: "",
    confirm_password: ""
  })
const navigate=useNavigate()

  const [formErrors, setformErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  const inputchange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInput({ ...input, [name]: value })
  }
  const validate = (values) => {
    const errors = {};
    const regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')

    if (!values.username) {
      errors.username = "enter name"
    }




    //mobile num validation


    //email validation
    if (!values.email) {
      errors.email = "email is required!";
    }
    else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    //password validation
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!values.confirm_password) {
      errors.confirm_password = "Confirmation Password is required";
    } else if (values.password != values.confirm_password) {
      errors.password = "Password and confirm password not matching";
    }
    else if (!strongPassword.test(values.password)) {
      errors.password = "Password must contain alphabet, digit,special Charecters";
    }

    return errors;
  };
  const validation = (event) => {
    event.preventDefault();

    setformErrors(validate(input))
    setIsSubmit(true)
    console.log(formErrors);
    if (Object.keys(formErrors).length == 0 && isSubmit) {
      console.log(input);

      axios.post('http://localhost:4000/register/userreg', input).then((response) => {


        console.log("res===========>", response.data);
        if (response.data.success === true) {
          navigate('/login')

        }
      }).catch((err) => {
        console.log(err);
      })

    }


  }



  return (
    <>
      <Navbar />
      <div className="register-container " style={{ marginTop: '20px' }}>
        <h2 className="register-title">Register</h2>
        <form onSubmit={validation} className="register-form">
          <div className="form-floating mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              name="username"

              onChange={inputchange}
              required
            />
          </div>
          <div className="form-floating mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              name="email"

              onChange={inputchange}
              required
            />
          </div>
          <div className="form-floating mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              name="password"

              onChange={inputchange}
              minLength="6"
              required
            />
          </div>
          <div className="form-floating mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              class="form-control"
              name="confirm_password"

              onChange={inputchange}
              minLength="6"
              required
            />
          </div>
          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
    </>
  )
}

export default Register
