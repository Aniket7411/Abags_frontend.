/**
 * API Service Layer
 * 
 * This file contains all API calls with dummy data.
 * When backend is ready, replace the dummy implementations with actual axios calls.
 * All function signatures and return structures will remain the same.
 */

import {
    dummyProducts,
    dummyUsers,
    dummyCoupons,
    dummyAdvertisements,
    dummyOrders,
} from '../data/dummyData';

// Simulate API delay
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate dummy JWT token
const generateToken = (user) => {
    return `dummy_token_${user.id}_${Date.now()}`;
};

// ==================== AUTH APIs ====================

export const authService = {
    // Login
    login: async (email, password) => {
        await delay();
        const user = dummyUsers.find(
            (u) => u.email === email && u.password === password
        );

        if (user) {
            const { password, ...userWithoutPassword } = user;
            return {
                success: true,
                user: userWithoutPassword,
                token: generateToken(user),
            };
        }

        return { success: false, message: 'Invalid credentials' };
    },

    // Signup
    signup: async (userData) => {
        await delay();

        // Check if email already exists
        const existingUser = dummyUsers.find((u) => u.email === userData.email);
        if (existingUser) {
            return { success: false, message: 'Email already registered' };
        }

        const newUser = {
            id: `u${dummyUsers.length + 1}`,
            ...userData,
            role: 'buyer',
        };

        dummyUsers.push(newUser);

        const { password, ...userWithoutPassword } = newUser;
        return {
            success: true,
            user: userWithoutPassword,
            token: generateToken(newUser),
        };
    },

    // Verify Token (for protected routes)
    verifyToken: async (token) => {
        await delay(100);
        return { success: true, valid: true };
    },
};

// ==================== PRODUCT APIs ====================

export const productService = {
    // Get all products with optional filters
    getProducts: async (filters = {}) => {
        await delay();

        let filteredProducts = [...dummyProducts];

        // Filter by category
        if (filters.category && filters.category !== 'all') {
            filteredProducts = filteredProducts.filter(
                (p) => p.category === filters.category
            );
        }

        // Filter by material
        if (filters.material && filters.material !== 'all') {
            filteredProducts = filteredProducts.filter(
                (p) => p.material === filters.material
            );
        }

        // Filter by price range
        if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
            filteredProducts = filteredProducts.filter((p) => {
                const min = filters.minPrice || 0;
                const max = filters.maxPrice || Infinity;
                return p.price >= min && p.price <= max;
            });
        }

        // Search by name
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filteredProducts = filteredProducts.filter((p) =>
                p.name.toLowerCase().includes(searchLower)
            );
        }

        // Sort
        if (filters.sortBy) {
            switch (filters.sortBy) {
                case 'price-low':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'rating':
                    filteredProducts.sort((a, b) => b.rating - a.rating);
                    break;
                default:
                    break;
            }
        }

        return { success: true, products: filteredProducts };
    },

    // Get single product by ID
    getProduct: async (productId) => {
        await delay();
        const product = dummyProducts.find((p) => p.id === productId);

        if (product) {
            return { success: true, product };
        }
        return { success: false, message: 'Product not found' };
    },

    // Get featured products
    getFeaturedProducts: async () => {
        await delay();
        const featured = dummyProducts.filter((p) => p.featured);
        return { success: true, products: featured };
    },

    // Add new product (Admin only)
    addProduct: async (productData) => {
        await delay();
        const newProduct = {
            id: `p${dummyProducts.length + 1}`,
            ...productData,
            rating: 0,
            reviews: 0,
        };
        dummyProducts.push(newProduct);
        return { success: true, product: newProduct };
    },

    // Update product (Admin only)
    updateProduct: async (productId, productData) => {
        await delay();
        const index = dummyProducts.findIndex((p) => p.id === productId);

        if (index !== -1) {
            dummyProducts[index] = { ...dummyProducts[index], ...productData };
            return { success: true, product: dummyProducts[index] };
        }
        return { success: false, message: 'Product not found' };
    },

    // Delete product (Admin only)
    deleteProduct: async (productId) => {
        await delay();
        const index = dummyProducts.findIndex((p) => p.id === productId);

        if (index !== -1) {
            dummyProducts.splice(index, 1);
            return { success: true };
        }
        return { success: false, message: 'Product not found' };
    },
};

// ==================== ORDER APIs ====================

export const orderService = {
    // Place new order
    placeOrder: async (orderData) => {
        await delay();
        const newOrder = {
            id: `ord${dummyOrders.length + 1}`,
            ...orderData,
            status: 'pending',
            orderDate: new Date().toISOString().split('T')[0],
        };
        dummyOrders.push(newOrder);
        return { success: true, order: newOrder };
    },

    // Get user orders
    getUserOrders: async (userId) => {
        await delay();
        const orders = dummyOrders.filter((o) => o.userId === userId);
        return { success: true, orders };
    },

    // Get all orders (Admin only)
    getAllOrders: async () => {
        await delay();
        return { success: true, orders: dummyOrders };
    },

    // Get single order
    getOrder: async (orderId) => {
        await delay();
        const order = dummyOrders.find((o) => o.id === orderId);

        if (order) {
            return { success: true, order };
        }
        return { success: false, message: 'Order not found' };
    },

    // Update order status (Admin only)
    updateOrderStatus: async (orderId, status) => {
        await delay();
        const index = dummyOrders.findIndex((o) => o.id === orderId);

        if (index !== -1) {
            dummyOrders[index].status = status;
            if (status === 'delivered') {
                dummyOrders[index].deliveryDate = new Date().toISOString().split('T')[0];
            }
            return { success: true, order: dummyOrders[index] };
        }
        return { success: false, message: 'Order not found' };
    },

    // Cancel order
    cancelOrder: async (orderId, reason) => {
        await delay();
        const index = dummyOrders.findIndex((o) => o.id === orderId);

        if (index !== -1) {
            dummyOrders[index].status = 'cancelled';
            dummyOrders[index].cancellationReason = reason;
            dummyOrders[index].cancellationDate = new Date().toISOString().split('T')[0];
            return { success: true, order: dummyOrders[index] };
        }
        return { success: false, message: 'Order not found' };
    },
};

// ==================== COUPON APIs ====================

export const couponService = {
    // Get all coupons
    getCoupons: async () => {
        await delay();
        return { success: true, coupons: dummyCoupons.filter((c) => c.active) };
    },

    // Validate coupon
    validateCoupon: async (code, cartTotal) => {
        await delay();
        const coupon = dummyCoupons.find(
            (c) => c.code === code && c.active
        );

        if (!coupon) {
            return { success: false, message: 'Invalid coupon code' };
        }

        // Check if valid date
        const today = new Date();
        const validFrom = new Date(coupon.validFrom);
        const validTo = new Date(coupon.validTo);

        if (today < validFrom || today > validTo) {
            return { success: false, message: 'Coupon expired' };
        }

        // Check minimum purchase
        if (cartTotal < coupon.minPurchase) {
            return {
                success: false,
                message: `Minimum purchase of ₹${coupon.minPurchase} required`,
            };
        }

        // Calculate discount
        let discount = 0;
        if (coupon.discountType === 'percentage') {
            discount = (cartTotal * coupon.discount) / 100;
            discount = Math.min(discount, coupon.maxDiscount);
        } else {
            discount = coupon.discount;
        }

        return { success: true, discount, coupon };
    },

    // Add coupon (Admin only)
    addCoupon: async (couponData) => {
        await delay();
        const newCoupon = {
            id: `c${dummyCoupons.length + 1}`,
            ...couponData,
        };
        dummyCoupons.push(newCoupon);
        return { success: true, coupon: newCoupon };
    },

    // Update coupon (Admin only)
    updateCoupon: async (couponId, couponData) => {
        await delay();
        const index = dummyCoupons.findIndex((c) => c.id === couponId);

        if (index !== -1) {
            dummyCoupons[index] = { ...dummyCoupons[index], ...couponData };
            return { success: true, coupon: dummyCoupons[index] };
        }
        return { success: false, message: 'Coupon not found' };
    },

    // Delete coupon (Admin only)
    deleteCoupon: async (couponId) => {
        await delay();
        const index = dummyCoupons.findIndex((c) => c.id === couponId);

        if (index !== -1) {
            dummyCoupons.splice(index, 1);
            return { success: true };
        }
        return { success: false, message: 'Coupon not found' };
    },
};

// ==================== ADVERTISEMENT APIs ====================

export const advertisementService = {
    // Get active advertisements
    getActiveAds: async () => {
        await delay();
        const today = new Date();
        const activeAds = dummyAdvertisements.filter((ad) => {
            if (!ad.active) return false;
            const startDate = new Date(ad.startDate);
            const endDate = new Date(ad.endDate);
            return today >= startDate && today <= endDate;
        });
        return { success: true, advertisements: activeAds };
    },

    // Get all advertisements (Admin only)
    getAllAds: async () => {
        await delay();
        return { success: true, advertisements: dummyAdvertisements };
    },

    // Add advertisement (Admin only)
    addAdvertisement: async (adData) => {
        await delay();
        const newAd = {
            id: `ad${dummyAdvertisements.length + 1}`,
            ...adData,
        };
        dummyAdvertisements.push(newAd);
        return { success: true, advertisement: newAd };
    },

    // Update advertisement (Admin only)
    updateAdvertisement: async (adId, adData) => {
        await delay();
        const index = dummyAdvertisements.findIndex((ad) => ad.id === adId);

        if (index !== -1) {
            dummyAdvertisements[index] = { ...dummyAdvertisements[index], ...adData };
            return { success: true, advertisement: dummyAdvertisements[index] };
        }
        return { success: false, message: 'Advertisement not found' };
    },

    // Delete advertisement (Admin only)
    deleteAdvertisement: async (adId) => {
        await delay();
        const index = dummyAdvertisements.findIndex((ad) => ad.id === adId);

        if (index !== -1) {
            dummyAdvertisements.splice(index, 1);
            return { success: true };
        }
        return { success: false, message: 'Advertisement not found' };
    },
};

// ==================== BULK INQUIRY APIs ====================

export const inquiryService = {
    // Submit bulk inquiry
    submitInquiry: async (inquiryData) => {
        await delay();
        console.log('Bulk Inquiry Submitted:', inquiryData);
        // In real implementation, this would send email or save to database
        return {
            success: true,
            message: 'Your inquiry has been submitted. We will contact you soon!',
        };
    },
};

