# KanBags - Premium Leather Bags E-Commerce Platform

A full-featured e-commerce website for selling premium leather bags from Kanpur, India's leather hub. Built with React.js, Tailwind CSS, and modern web technologies.

![KanBags](https://placehold.co/1200x400/8B4513/FFFFFF?text=KanBags+-+Kanpur%27s+Leather+Hub)

## 🌟 Features

### For Customers (Buyers)
- **Browse Products**: View extensive collection of bags across multiple categories
- **Advanced Filtering**: Filter by name, material (leather/rexin/mixed), and price range
- **Product Details**: Detailed product pages with ratings, reviews, and specifications
- **Shopping Cart**: Add to cart with quantity management
- **Coupon System**: Apply discount coupons at checkout
- **Order Management**: Track orders from placement to delivery
- **Order History**: View all past orders with status tracking
- **Bulk Inquiry**: Special form for wholesale/bulk orders
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### For Admin
- **Dashboard**: Overview of products, orders, and revenue
- **Product Management**: Add, edit, delete products with stock management
- **Order Management**: Update order status and track deliveries
- **Coupon Management**: Create and manage discount coupons with date ranges
- **Advertisement Management**: Control homepage banner carousel
- **Comprehensive Analytics**: Track sales and inventory

## 🛠️ Technology Stack

### Frontend
- **React.js** (v19.2.0) - UI framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS** (v3.4.18) - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Swiper** - Modern carousel/slider
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - Elegant notifications
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form handling
- **JWT Decode** - Token management
- **Date-fns** - Date formatting

### Backend (To be integrated)
- **Node.js** & **Express** - Server framework
- **MongoDB** - Database
- **JWT** - Authentication
- See `BACKEND_API_DOCUMENTATION.md` for complete API details

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd bags/abags
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

The application will open at `http://localhost:3000`

## 🚀 Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (one-way operation)
npm run eject
```

## 🎨 Color Scheme

The website uses a warm leather-inspired color palette:
- **Primary**: Brown shades (#3E2723, #5D4037, #8B4513)
- **Accent**: Amber (#D97706, #F59E0B)
- **Background**: Light warm tones (#FEF3C7, #FDE68A)

## 📱 Responsive Design

- **Mobile**: 2 products per row, hamburger menu
- **Tablet**: 3 products per row
- **Desktop**: 4+ products per row, full navigation

## 🔐 Demo Credentials

### Admin Access
```
Email: admin@kanbags.com
Password: admin123
```

### Buyer Access
```
Email: john@example.com
Password: buyer123
```

## 📂 Project Structure

```
abags/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/        # Reusable components
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── ProductCard.js
│   │   ├── CategoryCarousel.js
│   │   └── ProtectedRoute.js
│   ├── pages/            # Page components
│   │   ├── Home.js
│   │   ├── Products.js
│   │   ├── ProductDetail.js
│   │   ├── Cart.js
│   │   ├── Checkout.js
│   │   ├── Orders.js
│   │   ├── OrderDetail.js
│   │   ├── BulkInquiry.js
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   └── admin/
│   │       ├── AdminDashboard.js
│   │       ├── AdminProducts.js
│   │       ├── AdminOrders.js
│   │       ├── AdminCoupons.js
│   │       └── AdminAdvertisements.js
│   ├── contexts/         # React Context providers
│   │   ├── AuthContext.js
│   │   └── CartContext.js
│   ├── services/         # API service layer
│   │   └── api.js
│   ├── data/            # Dummy data
│   │   └── dummyData.js
│   ├── constants/       # App constants
│   │   └── index.js
│   ├── utils/           # Helper functions
│   │   └── helpers.js
│   ├── App.js           # Main app component
│   ├── index.js         # Entry point
│   └── index.css        # Global styles
├── BACKEND_API_DOCUMENTATION.md
├── package.json
├── tailwind.config.js
└── README.md
```

## 🔌 API Integration

The application is currently using dummy data. To integrate with a real backend:

1. **Update the API base URL** in `src/services/api.js`
2. **Replace dummy implementations** with actual Axios calls
3. **Follow the API documentation** in `BACKEND_API_DOCUMENTATION.md`

Example:
```javascript
// Current (Dummy)
export const productService = {
  getProducts: async (filters) => {
    await delay();
    return { success: true, products: dummyProducts };
  }
};

// After Backend Integration
export const productService = {
  getProducts: async (filters) => {
    const response = await axios.get('/api/v1/products', { params: filters });
    return response.data;
  }
};
```

## 🎯 Key Features Details

### 1. Authentication
- JWT-based authentication
- Role-based access control (Buyer/Admin)
- Protected routes
- Persistent sessions with localStorage

### 2. Shopping Experience
- Real-time cart updates
- Stock availability checking
- Coupon validation
- Multiple filters and sorting options
- Product recommendations

### 3. Order Management
- Complete order lifecycle tracking
- Status updates: Pending → Confirmed → Processing → Shipped → Delivered
- Order cancellation (before processing)
- Detailed order history

### 4. Admin Panel
- Intuitive dashboard with statistics
- Easy product CRUD operations
- Order status management
- Dynamic coupon creation
- Homepage banner management

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Deployment Options
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `build/` folder
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload `build/` folder

## 🔧 Configuration

### Tailwind Configuration
Edit `tailwind.config.js` to customize colors, spacing, etc.

### Environment Variables
Create `.env` file for environment-specific settings:
```env
REACT_APP_API_URL=http://localhost:5000/api/v1
REACT_APP_ENV=development
```

## 📝 Future Enhancements

- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Email notifications for orders
- [ ] Product reviews and ratings system
- [ ] Wishlist functionality
- [ ] Social media sharing
- [ ] Multi-language support
- [ ] Analytics dashboard for admin
- [ ] Advanced search with AI recommendations
- [ ] Mobile app (React Native)

## 🤝 Contributing

This is a custom e-commerce solution for KanBags. For contributions or customizations, please contact the development team.

## 📄 License

Proprietary - All rights reserved by KanBags

## 📞 Support

For support or queries:
- **Email**: info@kanbags.com
- **Phone**: +91 98765 43210
- **Address**: Leather Market, Kanpur, Uttar Pradesh 208001

## 👨‍💻 Developer Notes

### Dummy Data
The application uses dummy data located in `src/data/dummyData.js`. This includes:
- 16 sample products across 6 categories
- 2 demo users (admin and buyer)
- 3 sample coupons
- 3 sample advertisements
- 1 sample order

### API Service Layer
All API calls are abstracted in `src/services/api.js`. This makes it easy to:
- Switch from dummy data to real API
- Mock API responses for testing
- Handle errors consistently
- Add request/response interceptors

### State Management
- **Authentication**: Context API (`AuthContext`)
- **Shopping Cart**: Context API (`CartContext`)
- **Local State**: React hooks for component-specific state

## 🎉 Acknowledgments

- Built with Create React App
- UI Icons from Lucide React
- Placeholder images from placehold.co
- Inspired by modern e-commerce platforms

---

**Made with ❤️ for Kanpur's Leather Industry**
