import React, { useEffect, useState } from 'react'
import './orderstatux.css'
import Navbar from '../navbar/Navbar'
import axios from 'axios';


function Orderstatus() {
    const [orders, setOrders] = useState([]);
    const userid= localStorage.getItem('u_login_id');
console.log('user',userid);
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/order/orders/${userid}`);
            setOrders(response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
  return (
    <>
    <Navbar/>
    <div className="container bootstrap snippets bootdey" style={{marginTop:'20px'}}>
            <div className="row">
                <div className="col-lg-12">
                    <div className="main-box no-header clearfix">
                        <div className="main-box-body clearfix">
                            <div className="table-responsive">
                                <table className="table user-list">
                                    <thead>
                                        <tr>
                                            <th><span>Username</span></th>
                                            <th><span>Order Date</span></th>
                                            <th className="text-center"><span>Product Details</span></th>
                                            <th><span>Status</span></th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order._id}>
                                                <td>
                                                    <img src="https://bootdey.com/img/Content/user_1.jpg" alt=""/>
                                                    {order.userId ? (
                                                        <>
                                                            <a href="#" className="user-link">{order.userId.username}</a>
                                                          
                                                        </>
                                                    ) : (
                                                        <span className="user-subhead">Unknown User</span>
                                                    )}
                                                </td>
                                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                                <td className="text-center">
                                                    {order.items.map(item => (
                                                        <div key={item.productId.id}>
                                                            <span>{item.productname}</span> - <span>{item.quantity} pcs</span>
                                                        </div>
                                                    ))}
                                                </td>
                                                <td>
                                                    <span className="label label-default">{order.status || 'Pending'}</span>
                                                </td>
                                                
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
  )
}

export default Orderstatus
