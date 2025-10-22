import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatPrice } from '../utils/helpers';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { isAuthenticated, isAdmin } = useAuth();

    const handleAddToCart = (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            toast.error('Please login to add items to cart');
            return;
        }

        if (isAdmin()) {
            toast.error('Admin cannot add items to cart');
            return;
        }

        addToCart(product);
    };

    return (
        <Link to={`/product/${product.id}`}>
            <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
            >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-200" style={{ paddingTop: '100%' }}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />

                    {/* Discount Badge */}
                    {product.discount > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                            {product.discount}% OFF
                        </div>
                    )}

                    {/* Featured Badge */}
                    {product.featured && (
                        <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                            Featured
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
                        {product.name}
                    </h3>

                    {/* Material Badge */}
                    <div className="mb-2">
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full capitalize">
                            {product.material}
                        </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-3">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-2 mb-4 mt-auto">
                        <span className="text-xl font-bold text-amber-700">
                            {formatPrice(product.price)}
                        </span>
                        {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                                {formatPrice(product.originalPrice)}
                            </span>
                        )}
                    </div>

                    {/* Stock Status */}
                    {product.stock < 10 && product.stock > 0 && (
                        <p className="text-xs text-orange-600 mb-2">
                            Only {product.stock} left in stock!
                        </p>
                    )}

                    {product.stock === 0 && (
                        <p className="text-xs text-red-600 mb-2">Out of Stock</p>
                    )}

                    {/* Add to Cart Button */}
                    {isAuthenticated && !isAdmin() && (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className={`w-full py-2 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors ${product.stock === 0
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800'
                                }`}
                        >
                            <ShoppingCart className="w-4 h-4" />
                            <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                        </motion.button>
                    )}
                </div>
            </motion.div>
        </Link>
    );
};

export default ProductCard;



