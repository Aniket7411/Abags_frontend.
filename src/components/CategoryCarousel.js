import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../constants';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CategoryCarousel = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (categoryId) => {
        navigate(`/products?category=${categoryId}`);
    };

    return (
        <div className="py-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Browse by Category
            </h2>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={2}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                    1280: { slidesPerView: 6 },
                }}
                className="category-swiper"
            >
                {CATEGORIES.map((category) => (
                    <SwiperSlide key={category.id}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCategoryClick(category.id)}
                            className="cursor-pointer"
                        >
                            <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-shadow">
                                <div className="text-5xl mb-3">{category.icon}</div>
                                <h3 className="font-semibold text-gray-800 text-sm">
                                    {category.name}
                                </h3>
                            </div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <style jsx>{`
        .category-swiper :global(.swiper-button-next),
        .category-swiper :global(.swiper-button-prev) {
          color: #92400e;
        }
        
        .category-swiper :global(.swiper-pagination-bullet-active) {
          background-color: #92400e;
        }
      `}</style>
        </div>
    );
};

export default CategoryCarousel;



