import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Menu, X, ShoppingCart, User, LogOut, LayoutDashboard } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const { user, logout, isAuthenticated, isAdmin } = useAuth();
    const { getCartCount } = useCart();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setMobileMenuOpen(false);
    };

    const getNavLinks = () => {
        if (isAdmin()) return NAV_LINKS.admin;
        if (isAuthenticated) return NAV_LINKS.buyer;
        return NAV_LINKS.guest;
    };

    const navLinks = getNavLinks();

    return (
        <header className="bg-gradient-to-r from-[#3E2723] to-[#5D4037] text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-2xl font-bold text-amber-300"
                        >
                            KanBags
                        </motion.div>
                        <span className="text-xs text-amber-200 hidden sm:block">Kanpur's Leather Hub</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="hover:text-amber-300 transition-colors duration-200 font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side icons */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated && !isAdmin() && (
                            <Link to="/cart" className="relative">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                    <ShoppingCart className="w-6 h-6" />
                                    {getCartCount() > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {getCartCount()}
                                        </span>
                                    )}
                                </motion.div>
                            </Link>
                        )}

                        {isAuthenticated ? (
                            <div className="hidden md:flex items-center space-x-4">
                                <Link to={isAdmin() ? '/admin' : '/orders'}>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center space-x-2 bg-amber-700 px-3 py-2 rounded-lg"
                                    >
                                        {isAdmin() ? <LayoutDashboard className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                        <span className="text-sm">{user?.name}</span>
                                    </motion.div>
                                </Link>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </motion.button>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center space-x-3">
                                <Link to="/login">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Login
                                    </motion.button>
                                </Link>
                                <Link to="/signup">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Sign Up
                                    </motion.button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden py-4 space-y-3"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block py-2 hover:text-amber-300 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to={isAdmin() ? '/admin' : '/orders'}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-2 hover:text-amber-300"
                                    >
                                        {user?.name}'s {isAdmin() ? 'Dashboard' : 'Profile'}
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left py-2 text-red-400 hover:text-red-300"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-2 bg-amber-600 hover:bg-amber-700 text-center rounded-lg"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block py-2 bg-green-600 hover:bg-green-700 text-center rounded-lg"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Header;



