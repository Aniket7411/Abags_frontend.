import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { orderService } from '../services/api';
import { formatPrice, formatDate, getOrderStatusColor } from '../utils/helpers';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await orderService.getUserOrders(user.id);
            if (response.success) {
                setOrders(response.orders.sort((a, b) =>
                    new Date(b.orderDate) - new Date(a.orderDate)
                ));
            }
            setLoading(false);
        };

        fetchOrders();
    }, [user.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
                    <p className="text-gray-600 mb-8">Start shopping to see your orders here!</p>
                    <Link to="/products">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-amber-800"
                        >
                            Browse Products
                        </motion.button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>

                <div className="space-y-4">
                    {orders.map((order) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            {/* Order Header */}
                            <div className="bg-gray-50 px-6 py-4 border-b flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                                <div className="flex flex-col md:flex-row md:space-x-8">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Order ID</p>
                                        <p className="font-semibold text-gray-800">{order.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Order Date</p>
                                        <p className="font-semibold text-gray-800">{formatDate(order.orderDate)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Total</p>
                                        <p className="font-semibold text-gray-800">{formatPrice(order.finalTotal)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getOrderStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                    <Link to={`/order/${order.id}`}>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="text-amber-700 hover:text-amber-800 flex items-center space-x-1"
                                        >
                                            <Eye className="w-4 h-4" />
                                            <span className="text-sm font-semibold">View Details</span>
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="px-6 py-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {order.products.slice(0, 3).map((item, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                                <Package className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-800">Product {item.productId}</p>
                                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                <p className="text-sm font-semibold text-amber-700">{formatPrice(item.price)}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {order.products.length > 3 && (
                                        <div className="flex items-center text-gray-500">
                                            <span className="text-sm">+{order.products.length - 3} more items</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;



