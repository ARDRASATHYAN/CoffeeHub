import React, { useEffect, useState } from 'react'
import './ahome.css'
import { Link, useNavigate } from 'react-router-dom';
import AddProduct from '../../component/admin/addproduct/AddProduct';


function Addproducts() {
    const [isToggled, setIsToggled] = useState(false);
    const navigate=useNavigate()
    const handleToggle = () => {
        setIsToggled(!isToggled);
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
            <div>
                <div id="wrapper" className={`wrapper-content ${isToggled ? 'toggled' : ''}`}>
                    <div id="sidebar-wrapper">
                    <ul className="sidebar-nav mb-4">
                            <li className="sidebar-brand " ><a href="#"><img src='./image/coffee-7057030_1280.webp' ait='imag' style={{height:'50px'}}/>coffee</a></li>
                            <li><Link className='nav-link ' as={Link} to="/admin">Dashboard</Link></li>
                            <li> <Link className='nav-link ' as={Link} to="/addproduct">Add products</Link></li>
                            <li> <Link className='nav-link ' as={Link} to="/viewproducts">view AddProduct</Link></li>   
                            <li> <Link className='nav-link ' as={Link} to="/addcategory">Add category</Link></li> 
                            <li> <Link className='nav-link ' as={Link} to="/checkorder">checkorder</Link></li> 
                            <li> <Link className='nav-link '></Link> <button  className=' btn btn-dark ' onClick={logout}>Logout</button></li>                                                
                        </ul>
                    </div>

                    <div id="page-content-wrapper">
                        <nav className="navbar navbar-default">
                            <div className="container-fluid ">
                                <div className="navbar-header">
                                    <button className="btn-menu btn btn-success btn-toggle-menu" type="button" onClick={handleToggle}>
                                        <i className="fa fa-bars"></i>
                                    </button>
                                </div>
                                <div className="collapse navbar-collapse">
                                    <ul className="nav navbar-nav navbar-right" >
                                        <li>
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                                <i className="ti-panel"></i>
                                                <p>Stats</p>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="ti-settings"></i>
                                                <p>Settings</p>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        <AddProduct />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Addproducts
