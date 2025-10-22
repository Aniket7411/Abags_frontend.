import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { ArrowRight, Shield, Truck, Award, Phone } from 'lucide-react';
import CategoryCarousel from '../components/CategoryCarousel';
import ProductCard from '../components/ProductCard';
import { productService, advertisementService } from '../services/api';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [advertisements, setAdvertisements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const [productsRes, adsRes] = await Promise.all([
                productService.getFeaturedProducts(),
                advertisementService.getActiveAds(),
            ]);

            if (productsRes.success) {
                setFeaturedProducts(productsRes.products);
            }

            if (adsRes.success) {
                setAdvertisements(adsRes.advertisements);
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Carousel */}
            <section className="bg-gradient-to-br from-amber-50 to-orange-100">
                {advertisements.length > 0 ? (
                    <Swiper
                        modules={[Autoplay, Pagination, EffectFade]}
                        effect="fade"
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        className="hero-swiper"
                    >
                        {advertisements.map((ad) => (
                            <SwiperSlide key={ad.id}>
                                <Link to={ad.link}>
                                    <div className="relative h-[400px] md:h-[500px]">
                                        <img
                                            src={ad.image}
                                            alt={ad.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                                            <div className="container mx-auto px-4">
                                                <motion.div
                                                    initial={{ opacity: 0, x: -50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.2 }}
                                                    className="max-w-xl text-white"
                                                >
                                                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                                        {ad.title}
                                                    </h1>
                                                    <p className="text-xl md:text-2xl mb-8">
                                                        {ad.description}
                                                    </p>
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2"
                                                    >
                                                        <span>Shop Now</span>
                                                        <ArrowRight className="w-5 h-5" />
                                                    </motion.button>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="h-[400px] md:h-[500px] flex items-center justify-center">
                        <div className="container mx-auto px-4 text-center">
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
                                Premium Leather Bags
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-600 mb-8">
                                Handcrafted in Kanpur - India's Leather Hub
                            </p>
                            <Link to="/products">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 mx-auto"
                                >
                                    <span>Explore Collection</span>
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                )}

                <style jsx>{`
          .hero-swiper :global(.swiper-pagination-bullet-active) {
            background-color: #d97706;
          }
        `}</style>
            </section>

            {/* Category Carousel */}
            <section className="container mx-auto px-4 py-12">
                <CategoryCarousel />
            </section>

            {/* Featured Products */}
            <section className="container mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
                    <Link
                        to="/products"
                        className="text-amber-700 hover:text-amber-800 font-semibold flex items-center space-x-2"
                    >
                        <span>View All</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-gray-200 rounded-lg h-96 animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {featuredProducts.slice(0, 8).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            {/* Features Section */}
            <section className="bg-gradient-to-r from-amber-700 to-amber-800 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="text-center"
                        >
                            <Shield className="w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">100% Genuine</h3>
                            <p className="text-amber-100">Authentic leather products</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="text-center"
                        >
                            <Truck className="w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                            <p className="text-amber-100">On orders above ₹1000</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="text-center"
                        >
                            <Award className="w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
                            <p className="text-amber-100">Premium craftsmanship</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="text-center"
                        >
                            <Phone className="w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                            <p className="text-amber-100">Always here to help</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Bulk Inquiry CTA */}
            <section className="container mx-auto px-4 py-16">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 text-white text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Looking for Bulk Orders?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Contact us for wholesale rates and special pricing for retailers
                    </p>
                    <Link to="/bulk-inquiry">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold"
                        >
                            Get Bulk Pricing
                        </motion.button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;



