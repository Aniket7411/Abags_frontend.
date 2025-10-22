import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { productService } from '../services/api';
import { CATEGORIES, MATERIALS, PRICE_RANGES } from '../constants';

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
    const [selectedMaterial, setSelectedMaterial] = useState('all');
    const [selectedPriceRange, setSelectedPriceRange] = useState('all');
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, selectedMaterial, selectedPriceRange, sortBy, searchQuery]);

    const fetchProducts = async () => {
        setLoading(true);

        const priceRange = PRICE_RANGES.find((r) => r.id === selectedPriceRange);

        const filters = {
            category: selectedCategory !== 'all' ? selectedCategory : undefined,
            material: selectedMaterial !== 'all' ? selectedMaterial : undefined,
            minPrice: priceRange?.min,
            maxPrice: priceRange?.max !== Infinity ? priceRange?.max : undefined,
            search: searchQuery || undefined,
            sortBy: sortBy || undefined,
        };

        const response = await productService.getProducts(filters);

        if (response.success) {
            setProducts(response.products);
        }

        setLoading(false);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category !== 'all') {
            setSearchParams({ category });
        } else {
            setSearchParams({});
        }
    };

    const clearFilters = () => {
        setSelectedCategory('all');
        setSelectedMaterial('all');
        setSelectedPriceRange('all');
        setSortBy('');
        setSearchQuery('');
        setSearchParams({});
    };

    const FilterSection = () => (
        <div className="space-y-6">
            {/* Search */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Search Products
                </label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search by name..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Category Filter */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                </label>
                <div className="space-y-2">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === 'all'}
                            onChange={() => handleCategoryChange('all')}
                            className="text-amber-600 focus:ring-amber-500"
                        />
                        <span className="ml-2">All Categories</span>
                    </label>
                    {CATEGORIES.map((category) => (
                        <label key={category.id} className="flex items-center">
                            <input
                                type="radio"
                                name="category"
                                checked={selectedCategory === category.id}
                                onChange={() => handleCategoryChange(category.id)}
                                className="text-amber-600 focus:ring-amber-500"
                            />
                            <span className="ml-2">
                                {category.icon} {category.name}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Material Filter */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Material
                </label>
                <div className="space-y-2">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="material"
                            checked={selectedMaterial === 'all'}
                            onChange={() => setSelectedMaterial('all')}
                            className="text-amber-600 focus:ring-amber-500"
                        />
                        <span className="ml-2">All Materials</span>
                    </label>
                    {MATERIALS.map((material) => (
                        <label key={material.id} className="flex items-center">
                            <input
                                type="radio"
                                name="material"
                                checked={selectedMaterial === material.id}
                                onChange={() => setSelectedMaterial(material.id)}
                                className="text-amber-600 focus:ring-amber-500"
                            />
                            <span className="ml-2">{material.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range Filter */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price Range
                </label>
                <div className="space-y-2">
                    {PRICE_RANGES.map((range) => (
                        <label key={range.id} className="flex items-center">
                            <input
                                type="radio"
                                name="priceRange"
                                checked={selectedPriceRange === range.id}
                                onChange={() => setSelectedPriceRange(range.id)}
                                className="text-amber-600 focus:ring-amber-500"
                            />
                            <span className="ml-2">{range.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Clear Filters */}
            <button
                onClick={clearFilters}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold transition-colors"
            >
                Clear All Filters
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Our Collection
                        </h1>
                        <p className="text-gray-600">
                            {products.length} {products.length === 1 ? 'product' : 'products'} found
                        </p>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Sort By */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        >
                            <option value="">Sort By</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Rating</option>
                        </select>

                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                            className="lg:hidden bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                        >
                            <Filter className="w-5 h-5" />
                            <span>Filters</span>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop Filters */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <Filter className="w-5 h-5 mr-2" />
                                Filters
                            </h2>
                            <FilterSection />
                        </div>
                    </div>

                    {/* Mobile Filters */}
                    {mobileFiltersOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
                            onClick={() => setMobileFiltersOpen(false)}
                        >
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                className="bg-white h-full w-80 max-w-full overflow-y-auto p-6"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                        <Filter className="w-5 h-5 mr-2" />
                                        Filters
                                    </h2>
                                    <button onClick={() => setMobileFiltersOpen(false)}>
                                        <X className="w-6 h-6 text-gray-600" />
                                    </button>
                                </div>
                                <FilterSection />
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Products Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="bg-gray-200 rounded-lg h-96 animate-pulse"></div>
                                ))}
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-xl text-gray-600 mb-4">No products found</p>
                                <button
                                    onClick={clearFilters}
                                    className="text-amber-700 hover:text-amber-800 font-semibold"
                                >
                                    Clear filters to see all products
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;



