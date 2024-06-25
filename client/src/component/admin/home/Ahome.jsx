import React, { useEffect, useState } from 'react'
import './ahome.css'
import { Link, useNavigate } from 'react-router-dom';
import './dashboard.css'
import axios from 'axios';




function Ahome() {
const [isToggled, setIsToggled] = useState(false);
const[user,setUser]=useState([])
const[product,setProduct]=useState([])
const[order,setOrder]=useState([])
const navigate=useNavigate()
    const handleToggle = () => {
        setIsToggled(!isToggled);
    };
    useEffect(() => {
        axios.get('http://localhost:4000/user/viewuser')
            .then((response) => {
                setUser(response.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    useEffect(()=>{
    axios.get('http://localhost:4000/product/viewproduct')
               .then((response) => {
                    setProduct(response.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
       
    },[])

    useEffect(()=>{
        axios.get('http://localhost:4000/order/orders')
        .then((response) => {
            setOrder(response.data.data);
        })
        .catch((err) => {
            console.log(err);
        });

},[])




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
                                   
                                </div>
                            </div>
                        </nav>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                <div>
      <div class="container bootstrap snippets bootdey">
    <div class="row">
        <div class="col-md-3 col-sm-6 col-xs-12">
            <div class="panel panel-dark panel-colorful">
                <div class="panel-body text-center">
                	<p class="text-uppercase mar-btm text-sm">user</p>
                	<i class="fa fa-users fa-5x"></i>
                	<hr/>
                	<p class="h2 text-thin">{user.length}</p>
                	<small><span class="text-semibold">user</span> </small>
                </div>
            </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
        	<div class="panel panel-danger panel-colorful">
        		<div class="panel-body text-center">
        			<p class="text-uppercase mar-btm text-sm">product</p>
        			<i class="fa fa-comment fa-5x"></i>
        			<hr/>
        			<p class="h2 text-thin">{product.length}</p>
        			<small><span class="text-semibold"><i class="fa fa-unlock-alt fa-fw"></i> </span> </small>
        		</div>
        	</div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
        	<div class="panel panel-primary panel-colorful">
        		<div class="panel-body text-center">
        			<p class="text-uppercase mar-btm text-sm"> Order</p>
        			<i class="fa fa-shopping-cart fa-5x"></i>
        			<hr/>
        			<p class="h2 text-thin">{order.length}</p>
        			<small><span class="text-semibold"><i class="fa fa-shopping-cart fa-fw"></i></span></small>
        		</div>
        	</div>
        </div>
        {/* <div class="col-md-3 col-sm-6 col-xs-12">
        	<div class="panel panel-info panel-colorful">
        		<div class="panel-body text-center">
        			<p class="text-uppercase mar-btm text-sm">Earning</p>
        			<i class="fa fa-dollar fa-5x"></i>
        			<hr/>
        			<p class="h2 text-thin">7,428</p>
        			<small><span class="text-semibold"><i class="fa fa-dollar fa-fw"></i> 22,675</span> Total Earning</small>
        		</div>
        	</div>
        </div>         */}
	</div>
</div>
    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}



export default Ahome
