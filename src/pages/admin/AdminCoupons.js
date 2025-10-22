import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';
import { couponService } from '../../services/api';
import { formatPrice, formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';
import { dummyCoupons } from '../../data/dummyData';

const AdminCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState(null);
    const [formData, setFormData] = useState({
        code: '',
        discount: '',
        discountType: 'percentage',
        minPurchase: '',
        maxDiscount: '',
        validFrom: '',
        validTo: '',
        description: '',
        active: true,
    });

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        // In real app, this would fetch from API
        setCoupons(dummyCoupons);
        setLoading(false);
    };

    const handleOpenModal = (coupon = null) => {
        if (coupon) {
            setEditingCoupon(coupon);
            setFormData({
                code: coupon.code,
                discount: coupon.discount,
                discountType: coupon.discountType,
                minPurchase: coupon.minPurchase,
                maxDiscount: coupon.maxDiscount,
                validFrom: coupon.validFrom,
                validTo: coupon.validTo,
                description: coupon.description,
                active: coupon.active,
            });
        } else {
            setEditingCoupon(null);
            setFormData({
                code: '',
                discount: '',
                discountType: 'percentage',
                minPurchase: '',
                maxDiscount: '',
                validFrom: '',
                validTo: '',
                description: '',
                active: true,
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingCoupon(null);
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const couponData = {
            ...formData,
            discount: parseFloat(formData.discount),
            minPurchase: parseFloat(formData.minPurchase),
            maxDiscount: parseFloat(formData.maxDiscount),
        };

        let response;
        if (editingCoupon) {
            response = await couponService.updateCoupon(editingCoupon.id, couponData);
            toast.success('Coupon updated successfully');
        } else {
            response = await couponService.addCoupon(couponData);
            toast.success('Coupon added successfully');
        }

        if (response.success) {
            fetchCoupons();
            handleCloseModal();
        }
    };

    const handleDelete = async (couponId) => {
        if (!window.confirm('Are you sure you want to delete this coupon?')) {
            return;
        }

        const response = await couponService.deleteCoupon(couponId);
        if (response.success) {
            toast.success('Coupon deleted successfully');
            fetchCoupons();
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Manage Coupons</h1>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleOpenModal()}
                        className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Coupon</span>
                    </motion.button>
                </div>

                {/* Coupons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coupons.map((coupon) => (
                        <motion.div
                            key={coupon.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 text-white">
                                <div className="flex items-center justify-between mb-2">
                                    <Tag className="w-6 h-6" />
                                    <span className={`px-2 py-1 rounded-full text-xs ${coupon.active ? 'bg-green-500' : 'bg-gray-500'}`}>
                                        {coupon.active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold">{coupon.code}</h3>
                            </div>

                            <div className="p-4">
                                <p className="text-sm text-gray-600 mb-4">{coupon.description}</p>

                                <div className="space-y-2 text-sm mb-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Discount:</span>
                                        <span className="font-semibold text-gray-800">
                                            {coupon.discountType === 'percentage'
                                                ? `${coupon.discount}%`
                                                : formatPrice(coupon.discount)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Min Purchase:</span>
                                        <span className="font-semibold text-gray-800">{formatPrice(coupon.minPurchase)}</span>
                                    </div>

                                    {coupon.discountType === 'percentage' && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Max Discount:</span>
                                            <span className="font-semibold text-gray-800">{formatPrice(coupon.maxDiscount)}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Valid Until:</span>
                                        <span className="font-semibold text-gray-800">{formatDate(coupon.validTo)}</span>
                                    </div>
                                </div>

                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleOpenModal(coupon)}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center space-x-1"
                                    >
                                        <Edit className="w-4 h-4" />
                                        <span>Edit</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(coupon.id)}
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center space-x-1"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                    {editingCoupon ? 'Edit Coupon' : 'Add Coupon'}
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Coupon Code *</label>
                                        <input
                                            type="text"
                                            name="code"
                                            value={formData.code}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 uppercase"
                                            placeholder="SUMMER2024"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type *</label>
                                            <select
                                                name="discountType"
                                                value={formData.discountType}
                                                onChange={handleChange}
                                                required
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                                            >
                                                <option value="percentage">Percentage</option>
                                                <option value="fixed">Fixed Amount</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Discount {formData.discountType === 'percentage' ? '(%)' : '(₹)'} *
                                            </label>
                                            <input
                                                type="number"
                                                name="discount"
                                                value={formData.discount}
                                                onChange={handleChange}
                                                required
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Purchase (₹) *</label>
                                            <input
                                                type="number"
                                                name="minPurchase"
                                                value={formData.minPurchase}
                                                onChange={handleChange}
                                                required
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Max Discount (₹) *</label>
                                            <input
                                                type="number"
                                                name="maxDiscount"
                                                value={formData.maxDiscount}
                                                onChange={handleChange}
                                                required
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Valid From *</label>
                                            <input
                                                type="date"
                                                name="validFrom"
                                                value={formData.validFrom}
                                                onChange={handleChange}
                                                required
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Valid To *</label>
                                            <input
                                                type="date"
                                                name="validTo"
                                                value={formData.validTo}
                                                onChange={handleChange}
                                                required
                                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                            rows="2"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="active"
                                                checked={formData.active}
                                                onChange={handleChange}
                                                className="mr-2"
                                            />
                                            <span className="text-sm font-medium text-gray-700">Active</span>
                                        </label>
                                    </div>

                                    <div className="flex space-x-3 pt-4">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-semibold"
                                        >
                                            {editingCoupon ? 'Update' : 'Add'} Coupon
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCloseModal}
                                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-lg font-semibold"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCoupons;



