import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './nav.css'
import axios from 'axios';



function Navbar() {
  const [searchProductName, setSearchProductName] = useState('');
  const navigate = useNavigate();

  const handleProductNameChange = (event) => {
    setSearchProductName(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchProductName.trim()) {
      navigate(`/search?productName=${searchProductName}`);
    }
  };

  const logout = ()=>{
    localStorage.removeItem('role')
    localStorage.removeItem('u_login_id')
    localStorage.removeItem('user_token')
    localStorage.removeItem('username')
    navigate('/')
  }

  return (
    <>
      {/* Start header */}
      <header className="top-header">
        <nav className="navbar header-nav navbar-expand-lg" style={{ boxShadow: '-moz-initial' }}>
          <div className="container">
            <img src="/image/coffee-7057030_1280.webp"  alt="VE Logo" style={{height:'50px'}} />
          <h1>coffee</h1>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbar-wd"
              aria-controls="navbar-wd"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbar-wd"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className='nav-link active' to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/viewproductes">Product</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/cart">cart</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/orderstatus">odrderstatus</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className='nav-link' to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <a className='nav-link' onClick={logout}>Logout</a>
                </li>
              </ul>
              <form className="d-flex" onSubmit={handleSearchSubmit}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search here"
                  aria-label="Search"
                  value={searchProductName}
                  onChange={handleProductNameChange}
                />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </header>

      {/* End header */}
    </>
  )
}

export default Navbar
