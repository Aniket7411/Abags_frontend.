import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Briefcase, Upload, FileImage, X, Send } from 'lucide-react';
import { isValidEmail, isValidPhone } from '../utils/helpers';
import toast from 'react-hot-toast';

const CustomBagRequest = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bagType: '',
        material: '',
        dimensions: '',
        quantity: '',
        color: '',
        features: '',
        budget: '',
        description: '',
    });
    const [referenceImages, setReferenceImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + referenceImages.length > 5) {
            toast.error('Maximum 5 images allowed');
            return;
        }

        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            name: file.name,
        }));

        setReferenceImages([...referenceImages, ...newImages]);
    };

    const removeImage = (index) => {
        const newImages = [...referenceImages];
        URL.revokeObjectURL(newImages[index].preview);
        newImages.splice(index, 1);
        setReferenceImages(newImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!isValidEmail(formData.email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        if (!isValidPhone(formData.phone)) {
            toast.error('Please enter a valid 10-digit phone number');
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            toast.success('Your custom bag request has been submitted! We will contact you soon.');

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                bagType: '',
                material: '',
                dimensions: '',
                quantity: '',
                color: '',
                features: '',
                budget: '',
                description: '',
            });
            setReferenceImages([]);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Custom Bag Request</h1>
                        <p className="text-lg text-gray-600">
                            Design your perfect bag! Share your requirements and reference images, and we'll craft it for you.
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Briefcase className="w-8 h-8 text-amber-700" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">100% Customizable</h3>
                            <p className="text-sm text-gray-600">Design exactly what you need</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileImage className="w-8 h-8 text-amber-700" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Upload References</h3>
                            <p className="text-sm text-gray-600">Share inspiration images</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="w-8 h-8 text-amber-700" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">Expert Consultation</h3>
                            <p className="text-sm text-gray-600">We'll guide you through the process</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Information */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                                placeholder="9876543210"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Quantity Needed *</label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                            required
                                            min="1"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                            placeholder="1"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bag Specifications */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Bag Specifications</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Bag Type *</label>
                                        <select
                                            name="bagType"
                                            value={formData.bagType}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        >
                                            <option value="">Select Type</option>
                                            <option value="office">Office/Briefcase</option>
                                            <option value="ladies">Ladies Handbag</option>
                                            <option value="sling">Sling Bag</option>
                                            <option value="backpack">Backpack</option>
                                            <option value="laptop">Laptop Bag</option>
                                            <option value="travel">Travel/Duffel</option>
                                            <option value="other">Other (Specify in details)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Material Preference *</label>
                                        <select
                                            name="material"
                                            value={formData.material}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        >
                                            <option value="">Select Material</option>
                                            <option value="leather">Genuine Leather</option>
                                            <option value="rexin">Rexin/PU Leather</option>
                                            <option value="canvas">Canvas</option>
                                            <option value="nylon">Nylon/Polyester</option>
                                            <option value="mix">Mixed Materials</option>
                                            <option value="other">Other (Specify in details)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Approximate Dimensions</label>
                                        <input
                                            type="text"
                                            name="dimensions"
                                            value={formData.dimensions}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                            placeholder="e.g., 40cm x 30cm x 15cm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Color Preference</label>
                                        <input
                                            type="text"
                                            name="color"
                                            value={formData.color}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                            placeholder="e.g., Brown, Black, Tan"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Special Features</label>
                                        <input
                                            type="text"
                                            name="features"
                                            value={formData.features}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                            placeholder="e.g., Multiple compartments, padded laptop section, waterproof"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range (₹)</label>
                                        <input
                                            type="text"
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                            placeholder="e.g., 3000-5000"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Detailed Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                                    placeholder="Describe your ideal bag in detail. Include any specific requirements, usage scenarios, or design preferences..."
                                ></textarea>
                            </div>

                            {/* Reference Images */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Reference Images (Optional - Max 5)
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                                    <input
                                        type="file"
                                        id="imageUpload"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="imageUpload"
                                        className="flex flex-col items-center cursor-pointer"
                                    >
                                        <Upload className="w-12 h-12 text-gray-400 mb-3" />
                                        <p className="text-gray-600 mb-1">Click to upload images</p>
                                        <p className="text-sm text-gray-500">PNG, JPG up to 5MB each</p>
                                    </label>
                                </div>

                                {/* Image Preview */}
                                {referenceImages.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                                        {referenceImages.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={image.preview}
                                                    alt={`Reference ${index + 1}`}
                                                    className="w-full h-32 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                                <p className="text-xs text-gray-600 mt-1 truncate">{image.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 rounded-lg font-semibold hover:from-amber-700 hover:to-amber-800 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        <span>Submit Custom Request</span>
                                    </>
                                )}
                            </motion.button>
                        </form>

                        {/* Contact Info */}
                        <div className="mt-8 pt-8 border-t text-center">
                            <p className="text-gray-600 mb-4">Need help with your design?</p>
                            <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8">
                                <a href="tel:+919876543210" className="flex items-center space-x-2 text-amber-700 hover:text-amber-800">
                                    <Phone className="w-5 h-5" />
                                    <span>+91 98765 43210</span>
                                </a>
                                <a href="mailto:custom@kanbags.com" className="flex items-center space-x-2 text-amber-700 hover:text-amber-800">
                                    <Mail className="w-5 h-5" />
                                    <span>custom@kanbags.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CustomBagRequest;

