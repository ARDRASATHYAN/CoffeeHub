import React, { useState } from 'react'
import './register.css'
import axios from 'axios'
import Navbar from '../navbar/Navbar'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [input, setInput] = useState({
    username: "",


    password: "",

  })
  const navigate = useNavigate()
  const role = localStorage.getItem('role');
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
    // if (!values.email) {
    //   errors.email = "email is required!";
    // }
    // else if (!regex.test(values.email)) {
    //   errors.email = "This is not a valid email format!";
    // }

    //password validation
    if (!values.password) {
      errors.password = "Password is required";
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

      axios.post('http://localhost:4000/login/login', input).then((response) => {


        console.log("res===========>", response.data);
        if (response.data.success === true) {
          const { userName, loginId, token, role } = response.data;

          localStorage.setItem('username', userName);
          localStorage.setItem('u_login_id', loginId);
          localStorage.setItem('user_token', token);
          localStorage.setItem('role', role);

          if (role == 1) {
            navigate('/');
          } else {
            navigate('/admin');
          }
        }
      }).catch((err) => {
        console.log(err);
      })

    }


  }


  return (
    <>
      <Navbar />
      <div className="register-container" style={{ marginTop: '20px' }}>
        <h2 className="register-title">Register</h2>
        <form onSubmit={validation} className="register-form">
          <div className="form-floating mb-3">

            <input
              type="text"
              class="form-control"
              name="username"

              onChange={inputchange}

            />
            <span style={{ color: 'red' }}>{formErrors?.username}</span>
            <label htmlFor="floatingInput">username</label>
          </div>


          <div className="form-floating mb-3">

            <input
              type="password"
              class="form-control"
              name="password"

              onChange={inputchange}
              minLength="6"

            />
            <span style={{ color: 'red' }}>{formErrors?.password}</span>
            <label htmlFor="floatingInput">password</label>
          </div>


          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
    </>
  )
}

export default Login
