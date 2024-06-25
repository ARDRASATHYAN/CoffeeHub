import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'



function Footer() {
  return (
    <>
      
      <footer className="footer">
      <div className="container-footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h2 className="logo">coffee</h2>
            <p>vadakara,kozhikode</p>
            <div className="contact">
              <p>Phone: 6789054326</p>
              <p>Email: <a href="mailto:ardra@gmail.com">coffee@gmail.com</a></p>
            </div>
            
          </div>
          <div className="footer-section links ">
            <h2>Quick Links</h2>
            <ul >
            <li className="nav-item  ">
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
                
            </ul>
          </div>
          
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} COFFEE. All Rights Reserved.</p>
        <div className="terms-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </div>
    </footer>
       
    </>
  )
}

export default Footer

