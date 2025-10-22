import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Search } from 'lucide-react';
import { orderService } from '../../services/api';
import { formatPrice, formatDate, getOrderStatusColor } from '../../utils/helpers';
import { ORDER_STATUS } from '../../constants';
import toast from 'react-hot-toast';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        let filtered = orders;

        if (searchQuery) {
            filtered = filtered.filter((order) =>
                order.id.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter((order) => order.status === statusFilter);
        }

        setFilteredOrders(filtered);
    }, [searchQuery, statusFilter, orders]);

    const fetchOrders = async () => {
        const response = await orderService.getAllOrders();
        if (response.success) {
            setOrders(response.orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)));
            setFilteredOrders(response.orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)));
        }
        setLoading(false);
    };

    const handleStatusChange = async (orderId, newStatus) => {
        const response = await orderService.updateOrderStatus(orderId, newStatus);
        if (response.success) {
            toast.success('Order status updated');
            fetchOrders();
        } else {
            toast.error('Failed to update order status');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Orders</h1>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by Order ID..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            />
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value={ORDER_STATUS.PENDING}>Pending</option>
                            <option value={ORDER_STATUS.CONFIRMED}>Confirmed</option>
                            <option value={ORDER_STATUS.PROCESSING}>Processing</option>
                            <option value={ORDER_STATUS.SHIPPED}>Shipped</option>
                            <option value={ORDER_STATUS.DELIVERED}>Delivered</option>
                            <option value={ORDER_STATUS.CANCELLED}>Cancelled</option>
                        </select>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800">{order.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{formatDate(order.orderDate)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{order.shippingAddress.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{order.products.length} items</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">{formatPrice(order.finalTotal)}</td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                disabled={order.status === ORDER_STATUS.CANCELLED || order.status === ORDER_STATUS.DELIVERED}
                                                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getOrderStatusColor(order.status)} border-0 focus:ring-2 focus:ring-amber-500 disabled:opacity-50`}
                                            >
                                                <option value={ORDER_STATUS.PENDING}>Pending</option>
                                                <option value={ORDER_STATUS.CONFIRMED}>Confirmed</option>
                                                <option value={ORDER_STATUS.PROCESSING}>Processing</option>
                                                <option value={ORDER_STATUS.SHIPPED}>Shipped</option>
                                                <option value={ORDER_STATUS.DELIVERED}>Delivered</option>
                                                <option value={ORDER_STATUS.CANCELLED}>Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link to={`/order/${order.id}`}>
                                                <button className="text-blue-600 hover:text-blue-800">
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredOrders.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No orders found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;



