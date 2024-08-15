import React from 'react'

import './home.css'

function Userhome() {
  const backgroundImage = require('./coffee-9.jpg');
  return (
    <>
      <div 
            className='container-flud blok mb-4' 
            style={{ 
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})` ,height:'100vh'
            }}
        >
            <i className='heading-style'>
            <img src="./image/coffee-7057030_1280.webp" alt="VE Logo" />Coffee is the magical elixir that fuels<br/> dreams and awakens the soul
                <img src="./image/coffee-7057030_1280.webp" alt="VE Logo" />
            </i>
        </div>
    </>
  )
}

export default Userhome
