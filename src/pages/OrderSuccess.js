import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package } from 'lucide-react';

const OrderSuccess = () => {
    const { orderId } = useParams();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                >
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                </motion.div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Order Placed Successfully!
                </h1>

                <p className="text-gray-600 mb-2">
                    Thank you for your order. Your order has been received and is being processed.
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600 mb-1">Order ID</p>
                    <p className="text-xl font-bold text-amber-700">{orderId}</p>
                </div>

                <p className="text-sm text-gray-500 mb-8">
                    You will receive an email confirmation shortly with your order details.
                </p>

                <div className="space-y-3">
                    <Link to="/orders">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-amber-800 transition-all flex items-center justify-center space-x-2"
                        >
                            <Package className="w-5 h-5" />
                            <span>Track Your Order</span>
                        </motion.button>
                    </Link>

                    <Link to="/products">
                        <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default OrderSuccess;



