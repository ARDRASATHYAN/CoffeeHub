import React from 'react'
import Navbar from '../../component/user/navbar/Navbar'
import Userhome from '../../component/user/home/Userhome'
import Viewproduct from '../../component/admin/viewproduct/Viewproduct'
import Footer from '../../component/user/footer/Footer'

function Home() {
  return (
    <div>
      <Navbar/>
      <Userhome/>
      <Viewproduct/>
      <Footer/>
    </div>
  )
}

export default Home
