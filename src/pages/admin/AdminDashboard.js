import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ShoppingCart, Tag, Image, TrendingUp, Users } from 'lucide-react';
import { productService, orderService } from '../../services/api';
import { formatPrice } from '../../utils/helpers';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        pendingOrders: 0,
        totalRevenue: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const [productsRes, ordersRes] = await Promise.all([
                productService.getProducts(),
                orderService.getAllOrders(),
            ]);

            if (productsRes.success && ordersRes.success) {
                const totalRevenue = ordersRes.orders
                    .filter((o) => o.status !== 'cancelled')
                    .reduce((sum, order) => sum + order.finalTotal, 0);

                const pendingOrders = ordersRes.orders.filter(
                    (o) => o.status === 'pending' || o.status === 'confirmed'
                ).length;

                setStats({
                    totalProducts: productsRes.products.length,
                    totalOrders: ordersRes.orders.length,
                    pendingOrders,
                    totalRevenue,
                });
            }

            setLoading(false);
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            title: 'Total Products',
            value: stats.totalProducts,
            icon: Package,
            color: 'bg-blue-500',
            link: '/admin/products',
        },
        {
            title: 'Total Orders',
            value: stats.totalOrders,
            icon: ShoppingCart,
            color: 'bg-green-500',
            link: '/admin/orders',
        },
        {
            title: 'Pending Orders',
            value: stats.pendingOrders,
            icon: TrendingUp,
            color: 'bg-orange-500',
            link: '/admin/orders',
        },
        {
            title: 'Total Revenue',
            value: formatPrice(stats.totalRevenue),
            icon: Users,
            color: 'bg-purple-500',
            link: '/admin/orders',
        },
    ];

    const quickLinks = [
        {
            title: 'Manage Products',
            description: 'Add, edit, or remove products',
            icon: Package,
            link: '/admin/products',
            color: 'from-blue-500 to-blue-600',
        },
        {
            title: 'View Orders',
            description: 'Manage customer orders',
            icon: ShoppingCart,
            link: '/admin/orders',
            color: 'from-green-500 to-green-600',
        },
        {
            title: 'Manage Coupons',
            description: 'Create and edit discount coupons',
            icon: Tag,
            link: '/admin/coupons',
            color: 'from-amber-500 to-amber-600',
        },
        {
            title: 'Advertisements',
            description: 'Manage homepage banners',
            icon: Image,
            link: '/admin/advertisements',
            color: 'from-purple-500 to-purple-600',
        },
    ];

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
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statCards.map((stat, index) => (
                        <Link key={index} to={stat.link}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-lg shadow-md p-6 cursor-pointer"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`${stat.color} p-3 rounded-lg`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Quick Links */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {quickLinks.map((link, index) => (
                        <Link key={index} to={link.link}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className={`bg-gradient-to-r ${link.color} rounded-lg shadow-lg p-6 text-white cursor-pointer`}
                            >
                                <link.icon className="w-10 h-10 mb-4" />
                                <h3 className="text-xl font-bold mb-2">{link.title}</h3>
                                <p className="text-white/90">{link.description}</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;



