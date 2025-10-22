/**
 * Utility helper functions
 */

// Format price in Indian Rupees
export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(price);
};

// Calculate discount percentage
export const calculateDiscount = (originalPrice, currentPrice) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

// Format date
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

// Validate email
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate phone number (Indian)
export const isValidPhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
};

// Validate pincode (Indian)
export const isValidPincode = (pincode) => {
    const pincodeRegex = /^[1-9]\d{5}$/;
    return pincodeRegex.test(pincode);
};

// Get order status color
export const getOrderStatusColor = (status) => {
    const colors = {
        pending: 'bg-yellow-100 text-yellow-800',
        confirmed: 'bg-blue-100 text-blue-800',
        processing: 'bg-indigo-100 text-indigo-800',
        shipped: 'bg-purple-100 text-purple-800',
        delivered: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
};

// Truncate text
export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

// Check if coupon is valid for current date
export const isCouponValid = (coupon) => {
    const today = new Date();
    const validFrom = new Date(coupon.validFrom);
    const validTo = new Date(coupon.validTo);
    return coupon.active && today >= validFrom && today <= validTo;
};

// Generate order tracking steps
export const getOrderTrackingSteps = (status) => {
    const steps = [
        { label: 'Order Placed', status: 'pending' },
        { label: 'Confirmed', status: 'confirmed' },
        { label: 'Processing', status: 'processing' },
        { label: 'Shipped', status: 'shipped' },
        { label: 'Delivered', status: 'delivered' },
    ];

    const statusOrder = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(status);

    return steps.map((step, index) => ({
        ...step,
        completed: index <= currentIndex,
        current: index === currentIndex,
    }));
};



