import React from 'react'
import Navbar from '../navbar/Navbar'
import './thank.css'
function Thankyou() {
  return (
    <>
    <Navbar/>
    <div className="thank-container ">
            <h1 className="heading">Thank You!</h1>
            <p className="message">Your order has been placed successfully.</p>
            <a href="/" className="button">Back to Home</a>
        </div>
        </>
  )
}

export default Thankyou
