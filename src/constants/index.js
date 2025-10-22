// User Roles
export const ROLES = {
    BUYER: 'buyer',
    ADMIN: 'admin',
};

// Bag Categories
export const CATEGORIES = [
    { id: 'office', name: 'Office Bags', icon: '💼' },
    { id: 'ladies', name: 'Ladies Bags', icon: '👜' },
    { id: 'mens-sling', name: "Men's Sling Bags", icon: '🎒' },
    { id: 'backpack', name: 'Backpacks', icon: '🎒' },
    { id: 'laptop', name: 'Laptop Bags', icon: '💻' },
    { id: 'travel', name: 'Travel Bags', icon: '🧳' },
];

// Material Types
export const MATERIALS = [
    { id: 'leather', name: 'Genuine Leather' },
    { id: 'rexin', name: 'Rexin' },
    { id: 'mix', name: 'Mixed Material' },
];

// Order Status
export const ORDER_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
};

// Price Ranges for Filters
export const PRICE_RANGES = [
    { id: 'all', label: 'All Prices', min: 0, max: Infinity },
    { id: 'under-1000', label: 'Under ₹1,000', min: 0, max: 1000 },
    { id: '1000-2500', label: '₹1,000 - ₹2,500', min: 1000, max: 2500 },
    { id: '2500-5000', label: '₹2,500 - ₹5,000', min: 2500, max: 5000 },
    { id: 'above-5000', label: 'Above ₹5,000', min: 5000, max: Infinity },
];

// Navigation Links
export const NAV_LINKS = {
    buyer: [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'My Orders', path: '/orders' },
        { name: 'Cart', path: '/cart' },
        { name: 'Custom Bag', path: '/custom-bag-request' },
        { name: 'Bulk Inquiry', path: '/bulk-inquiry' },
    ],
    admin: [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'Dashboard', path: '/admin' },
        { name: 'Manage Products', path: '/admin/products' },
        { name: 'Orders', path: '/admin/orders' },
        { name: 'Coupons', path: '/admin/coupons' },
        { name: 'Ads', path: '/admin/advertisements' },
    ],
    guest: [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'Custom Bag', path: '/custom-bag-request' },
        { name: 'Bulk Inquiry', path: '/bulk-inquiry' },
    ],
};

