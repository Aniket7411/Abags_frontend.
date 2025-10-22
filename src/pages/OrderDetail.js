import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Phone, User, CheckCircle } from 'lucide-react';
import { orderService } from '../services/api';
import { formatPrice, formatDate, getOrderStatusColor, getOrderTrackingSteps } from '../utils/helpers';
import toast from 'react-hot-toast';

const OrderDetail = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            const response = await orderService.getOrder(orderId);
            if (response.success) {
                setOrder(response.order);
            } else {
                toast.error('Order not found');
                navigate('/orders');
            }
            setLoading(false);
        };

        fetchOrder();
    }, [orderId, navigate]);

    const handleCancelOrder = async () => {
        const reason = window.prompt('Please provide a reason for cancellation:');

        if (!reason || reason.trim() === '') {
            toast.error('Cancellation reason is required');
            return;
        }

        setCancelling(true);
        const response = await orderService.cancelOrder(orderId, reason);

        if (response.success) {
            setOrder(response.order);
            toast.success('Order cancelled successfully');
        } else {
            toast.error('Failed to cancel order');
        }

        setCancelling(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
            </div>
        );
    }

    if (!order) return null;

    const trackingSteps = getOrderTrackingSteps(order.status);
    const canCancel = ['pending', 'confirmed'].includes(order.status);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/orders')}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Orders</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Header */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
                                    <p className="text-gray-600">Order ID: {order.id}</p>
                                </div>
                                <span className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${getOrderStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500">Order Date</p>
                                    <p className="font-semibold text-gray-800">{formatDate(order.orderDate)}</p>
                                </div>
                                {order.deliveryDate && (
                                    <div>
                                        <p className="text-gray-500">Delivery Date</p>
                                        <p className="font-semibold text-gray-800">{formatDate(order.deliveryDate)}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Cancellation Info */}
                        {order.status === 'cancelled' && order.cancellationReason && (
                            <div className="bg-red-50 border border-red-200 rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold text-red-800 mb-4">Order Cancelled</h2>
                                <div className="space-y-2 text-sm">
                                    <div>
                                        <span className="font-semibold text-gray-700">Cancellation Date:</span>
                                        <span className="ml-2 text-gray-600">{formatDate(order.cancellationDate)}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700">Reason:</span>
                                        <p className="mt-1 text-gray-600">{order.cancellationReason}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Order Tracking */}
                        {order.status !== 'cancelled' && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-6">Order Tracking</h2>

                                <div className="relative">
                                    {trackingSteps.map((step, index) => (
                                        <div key={index} className="flex items-start mb-8 last:mb-0">
                                            <div className="flex flex-col items-center mr-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-500' : 'bg-gray-300'
                                                    }`}>
                                                    {step.completed ? (
                                                        <CheckCircle className="w-6 h-6 text-white" />
                                                    ) : (
                                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                                    )}
                                                </div>
                                                {index < trackingSteps.length - 1 && (
                                                    <div className={`w-0.5 h-16 ${step.completed ? 'bg-green-500' : 'bg-gray-300'
                                                        }`}></div>
                                                )}
                                            </div>
                                            <div className="flex-1 pt-1">
                                                <h3 className={`font-semibold ${step.completed ? 'text-gray-800' : 'text-gray-400'
                                                    }`}>
                                                    {step.label}
                                                </h3>
                                                {step.current && (
                                                    <p className="text-sm text-green-600 mt-1">Current Status</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Order Items */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Items Ordered</h2>

                            <div className="space-y-4">
                                {order.products.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">Product {item.productId}</p>
                                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold text-amber-700">{formatPrice(item.price * item.quantity)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Shipping Address */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <MapPin className="w-5 h-5 mr-2 text-amber-600" />
                                Shipping Address
                            </h2>

                            <div className="space-y-2 text-sm">
                                <p className="flex items-center text-gray-600">
                                    <User className="w-4 h-4 mr-2" />
                                    {order.shippingAddress.name}
                                </p>
                                <p className="flex items-center text-gray-600">
                                    <Phone className="w-4 h-4 mr-2" />
                                    {order.shippingAddress.phone}
                                </p>
                                <p className="text-gray-600 ml-6">
                                    {order.shippingAddress.street}<br />
                                    {order.shippingAddress.city}, {order.shippingAddress.state}<br />
                                    {order.shippingAddress.pincode}
                                </p>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(order.total)}</span>
                                </div>

                                {order.discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount</span>
                                        <span>- {formatPrice(order.discount)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>{order.shippingCost === 0 ? 'FREE' : formatPrice(order.shippingCost)}</span>
                                </div>

                                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-800">
                                    <span>Total</span>
                                    <span>{formatPrice(order.finalTotal)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Cancel Order */}
                        {canCancel && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCancelOrder}
                                disabled={cancelling}
                                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                            >
                                {cancelling ? 'Cancelling...' : 'Cancel Order'}
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;

