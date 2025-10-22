import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ArrowLeft, Package, Shield, Truck } from 'lucide-react';
import { productService } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { isAuthenticated, isAdmin } = useAuth();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await productService.getProduct(id);
            if (response.success) {
                setProduct(response.product);
            } else {
                toast.error('Product not found');
                navigate('/products');
            }
            setLoading(false);
        };

        fetchProduct();
    }, [id, navigate]);

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            toast.error('Please login to add items to cart');
            return;
        }

        if (isAdmin()) {
            toast.error('Admin cannot add items to cart');
            return;
        }

        addToCart(product, quantity);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
            </div>
        );
    }

    if (!product) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                </button>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
                        {/* Product Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full rounded-lg shadow-md"
                            />
                            {product.discount > 0 && (
                                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg text-lg font-semibold">
                                    {product.discount}% OFF
                                </div>
                            )}
                            {product.featured && (
                                <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                                    Featured
                                </div>
                            )}
                        </motion.div>

                        {/* Product Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col"
                        >
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(product.rating)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-lg font-medium text-gray-700">
                                    {product.rating}
                                </span>
                                <span className="text-gray-500">({product.reviews} reviews)</span>
                            </div>

                            {/* Material */}
                            <div className="mb-4">
                                <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full capitalize text-sm font-semibold">
                                    {product.material === 'leather' && 'Genuine Leather'}
                                    {product.material === 'rexin' && 'Rexin'}
                                    {product.material === 'mix' && 'Mixed Material'}
                                </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center space-x-4 mb-6">
                                <span className="text-4xl font-bold text-amber-700">
                                    {formatPrice(product.price)}
                                </span>
                                {product.originalPrice > product.price && (
                                    <>
                                        <span className="text-2xl text-gray-500 line-through">
                                            {formatPrice(product.originalPrice)}
                                        </span>
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-semibold">
                                            Save {formatPrice(product.originalPrice - product.price)}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {product.description}
                            </p>

                            {/* Stock Status */}
                            <div className="mb-6">
                                {product.stock > 0 ? (
                                    <div className="flex items-center space-x-2 text-green-600">
                                        <Package className="w-5 h-5" />
                                        <span className="font-semibold">
                                            {product.stock < 10
                                                ? `Only ${product.stock} left in stock!`
                                                : 'In Stock'}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2 text-red-600">
                                        <Package className="w-5 h-5" />
                                        <span className="font-semibold">Out of Stock</span>
                                    </div>
                                )}
                            </div>

                            {/* Quantity Selector & Add to Cart */}
                            {isAuthenticated && !isAdmin() && (
                                <div className="flex items-center space-x-4 mb-8">
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-4 py-2 hover:bg-gray-100 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="px-6 py-2 font-semibold">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            className="px-4 py-2 hover:bg-gray-100 transition-colors"
                                            disabled={quantity >= product.stock}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleAddToCart}
                                        disabled={product.stock === 0}
                                        className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors ${product.stock === 0
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800'
                                            }`}
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                                    </motion.button>
                                </div>
                            )}

                            {/* Features */}
                            <div className="border-t pt-6 space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Shield className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-800">100% Genuine</h4>
                                        <p className="text-sm text-gray-600">Authentic products guaranteed</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <Truck className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Free Shipping</h4>
                                        <p className="text-sm text-gray-600">On orders above ₹1000</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;



