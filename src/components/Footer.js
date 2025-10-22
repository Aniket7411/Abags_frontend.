import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-[#3E2723] to-[#5D4037] text-white mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-bold text-amber-300 mb-4">KanBags</h3>
                        <p className="text-sm text-gray-300 mb-4">
                            Premium quality leather bags handcrafted in Kanpur, India's leather hub.
                            We bring you the finest collection of bags for every occasion.
                        </p>
                        <div className="flex space-x-4">
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                href="#"
                                className="hover:text-amber-300 transition-colors"
                            >
                                <Facebook className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                href="#"
                                className="hover:text-amber-300 transition-colors"
                            >
                                <Instagram className="w-5 h-5" />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                href="#"
                                className="hover:text-amber-300 transition-colors"
                            >
                                <Twitter className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-amber-300 mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="hover:text-amber-300 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="hover:text-amber-300 transition-colors">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/bulk-inquiry" className="hover:text-amber-300 transition-colors">
                                    Bulk Orders
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-amber-300 transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold text-amber-300 mb-4">Customer Service</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/shipping" className="hover:text-amber-300 transition-colors">
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link to="/returns" className="hover:text-amber-300 transition-colors">
                                    Returns & Exchange
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="hover:text-amber-300 transition-colors">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-amber-300 transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-amber-300 mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start space-x-2">
                                <MapPin className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
                                <span>Leather Market, Kanpur, Uttar Pradesh 208001</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Phone className="w-5 h-5 text-amber-300" />
                                <a href="tel:+919876543210" className="hover:text-amber-300">
                                    +91 98765 43210
                                </a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail className="w-5 h-5 text-amber-300" />
                                <a href="mailto:info@kanbags.com" className="hover:text-amber-300">
                                    info@kanbags.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-amber-900 mt-8 pt-6 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} KanBags. All rights reserved.</p>
                    <p className="mt-2">
                        <Link to="/privacy" className="hover:text-amber-300 transition-colors">
                            Privacy Policy
                        </Link>
                        {' '} | {' '}
                        <Link to="/terms" className="hover:text-amber-300 transition-colors">
                            Terms & Conditions
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;



