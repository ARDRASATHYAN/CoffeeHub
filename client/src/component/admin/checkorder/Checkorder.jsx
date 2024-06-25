import axios from 'axios';
import React, { useEffect, useState } from 'react'




function Checkorder() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:4000/order/orders');
            setOrders(response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            await axios.post(`http://localhost:4000/order/orders/update/${orderId}`, { status });
            fetchOrders(); // Refresh orders after update
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <div className="container bootstrap snippets bootdey">
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
                                            <th>Actions</th>
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
                                                            <span className="user-subhead"></span>
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
                                                <td style={{width:'20%'}}>
                                                    <a href="#" className="table-link text-warning" onClick={() => updateOrderStatus(order._id, 'Processing')}>
                                                        <span className="fa-stack">
                                                            <i className="fa fa-square fa-stack-2x"></i>
                                                            <i className="fa fa-spinner fa-stack-1x fa-inverse"></i>
                                                        </span>
                                                    </a>
                                                    <a href="#" className="table-link text-info" onClick={() => updateOrderStatus(order._id, 'completed')}>
                                                        <span className="fa-stack">
                                                            <i className="fa fa-square fa-stack-2x"></i>
                                                            <i className="fa fa-check fa-stack-1x fa-inverse"></i>
                                                        </span>
                                                    </a>
                                                    <a href="#" className="table-link danger" onClick={() => updateOrderStatus(order._id, 'canceled')}>
                                                        <span className="fa-stack">
                                                            <i className="fa fa-square fa-stack-2x"></i>
                                                            <i className="fa fa-times fa-stack-1x fa-inverse"></i>
                                                        </span>
                                                    </a>
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
    
  )
}

export default Checkorder
