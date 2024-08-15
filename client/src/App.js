import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Ahome from './component/admin/home/Ahome';

import Addproducts from './pages/admin/Addproducts';
import Viewproduct from './component/admin/viewproduct/Viewproduct';
import ViewProducts from './pages/admin/ViewProducts';


import Addcategory from './pages/admin/Addcategory';

import Register from './component/user/register/Register';
import Login from './component/user/login/Login';
import Singleproduct from './component/user/singleproduct/Singleproduct';
import Cart from './component/user/cart/Cart';
import Home from './pages/user/Home';
import Searchpage from './component/user/searchpage/Searchpage';
import Orderconformation from './component/user/orderform/Orderconformation';
import Thankyou from './component/user/thankupage/Thankyou';
import Orderstatus from './component/user/orderstatuscheck/Orderstatus';
import CheckOrders from './pages/admin/CheckOrders';
import Viewproducts from './pages/user/Viewproducts';
import Categorybasedproductview from './component/user/catergorybasedproduct/Categorybasedproductview';





function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* admin */}
          <Route path='/admin' element={<Ahome />} />
          <Route path='/addproduct' element={<Addproducts />} />
          <Route path='/viewproducts' element={<ViewProducts />} />
          <Route path='/addcategory' element={< Addcategory/>} />
          <Route path='/login' element={< Login/>} />
          <Route path='/checkorder' element={<CheckOrders/>} />
         
          {/* user */}
          <Route path='/' element={<Home/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/viewproduct' element={<Viewproduct/>} />
          <Route path='/viewproductes' element={<Viewproducts/>} />
          <Route path='/viewproducts/:id' element={<Singleproduct />} />
          <Route path='/categoryproduct/:id' element={<Categorybasedproductview/>} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/search" element={<Searchpage />} />
          <Route path="/order-confirmation/:userId" element={<Orderconformation />} /> 
          <Route path="/thank-you" element={<Thankyou />} />
          <Route path="/orderstatus" element={<Orderstatus />} />
        </Routes>
    
      </BrowserRouter>
    </div>
  );
}

export default App;
