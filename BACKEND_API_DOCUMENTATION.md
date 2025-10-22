# Backend API Documentation for KanBags E-Commerce

This document provides comprehensive documentation for all backend APIs needed for the KanBags e-commerce application.

## Table of Contents
- [Authentication APIs](#authentication-apis)
- [Product APIs](#product-apis)
- [Order APIs](#order-apis)
- [Coupon APIs](#coupon-apis)
- [Advertisement APIs](#advertisement-apis)
- [Inquiry APIs](#inquiry-apis)
- [Data Models](#data-models)

---

## Base URL
```
Production: https://api.kanbags.com/v1
Development: http://localhost:5000/api/v1
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication APIs

### 1. User Registration (Signup)
**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "9876543210"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "u123",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "buyer"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

### 2. User Login
**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "u123",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "buyer"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 3. Verify Token
**Endpoint:** `GET /auth/verify`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "id": "u123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "buyer"
  }
}
```

---

## Product APIs

### 1. Get All Products (with filters)
**Endpoint:** `GET /products`

**Query Parameters:**
- `category` (optional): Filter by category (office, ladies, mens-sling, etc.)
- `material` (optional): Filter by material (leather, rexin, mix)
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price
- `search` (optional): Search by product name
- `sortBy` (optional): Sort by price-low, price-high, rating
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Example:**
```
GET /products?category=office&material=leather&minPrice=1000&maxPrice=5000&sortBy=price-low
```

**Response (200 OK):**
```json
{
  "success": true,
  "products": [
    {
      "id": "p1",
      "name": "Executive Leather Briefcase",
      "category": "office",
      "material": "leather",
      "price": 3499,
      "originalPrice": 4999,
      "discount": 30,
      "description": "Premium genuine leather briefcase...",
      "image": "https://example.com/image.jpg",
      "stock": 25,
      "featured": true,
      "rating": 4.5,
      "reviews": 124
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "pages": 3
  }
}
```

---

### 2. Get Single Product
**Endpoint:** `GET /products/:productId`

**Response (200 OK):**
```json
{
  "success": true,
  "product": {
    "id": "p1",
    "name": "Executive Leather Briefcase",
    "category": "office",
    "material": "leather",
    "price": 3499,
    "originalPrice": 4999,
    "discount": 30,
    "description": "Premium genuine leather briefcase...",
    "image": "https://example.com/image.jpg",
    "stock": 25,
    "featured": true,
    "rating": 4.5,
    "reviews": 124
  }
}
```

---

### 3. Get Featured Products
**Endpoint:** `GET /products/featured`

**Response:** Same as Get All Products

---

### 4. Add Product (Admin Only)
**Endpoint:** `POST /products`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "New Product",
  "category": "office",
  "material": "leather",
  "price": 2999,
  "originalPrice": 3999,
  "discount": 25,
  "description": "Product description...",
  "image": "https://example.com/image.jpg",
  "stock": 50,
  "featured": false
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Product added successfully",
  "product": { /* product object */ }
}
```

---

### 5. Update Product (Admin Only)
**Endpoint:** `PUT /products/:productId`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:** Same as Add Product

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "product": { /* updated product object */ }
}
```

---

### 6. Delete Product (Admin Only)
**Endpoint:** `DELETE /products/:productId`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## Order APIs

### 1. Place Order
**Endpoint:** `POST /orders`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "products": [
    {
      "productId": "p1",
      "quantity": 2,
      "price": 3499
    }
  ],
  "shippingAddress": {
    "name": "John Doe",
    "phone": "9876543210",
    "street": "123 Main Street",
    "city": "Kanpur",
    "state": "Uttar Pradesh",
    "pincode": "208001"
  },
  "total": 6998,
  "discount": 0,
  "shippingCost": 0,
  "finalTotal": 6998,
  "couponCode": "LAUNCH50"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "order": {
    "id": "ord123",
    "userId": "u123",
    "products": [...],
    "shippingAddress": {...},
    "total": 6998,
    "discount": 0,
    "finalTotal": 6998,
    "status": "pending",
    "orderDate": "2024-10-21",
    "paymentMethod": "cod"
  }
}
```

---

### 2. Get User Orders
**Endpoint:** `GET /orders/user/:userId`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "orders": [
    {
      "id": "ord123",
      "userId": "u123",
      "products": [...],
      "total": 6998,
      "status": "delivered",
      "orderDate": "2024-09-15",
      "deliveryDate": "2024-09-20"
    }
  ]
}
```

---

### 3. Get All Orders (Admin Only)
**Endpoint:** `GET /orders`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `status` (optional): Filter by order status
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:** Same structure as Get User Orders

---

### 4. Get Single Order
**Endpoint:** `GET /orders/:orderId`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "order": {
    "id": "ord123",
    "userId": "u123",
    "products": [...],
    "shippingAddress": {...},
    "total": 6998,
    "discount": 0,
    "finalTotal": 6998,
    "status": "delivered",
    "orderDate": "2024-09-15",
    "deliveryDate": "2024-09-20"
  }
}
```

---

### 5. Update Order Status (Admin Only)
**Endpoint:** `PUT /orders/:orderId/status`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "status": "shipped"
}
```

**Valid Status Values:**
- `pending`
- `confirmed`
- `processing`
- `shipped`
- `delivered`
- `cancelled`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Order status updated",
  "order": { /* updated order */ }
}
```

---

### 6. Cancel Order
**Endpoint:** `PUT /orders/:orderId/cancel`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Order cancelled successfully",
  "order": { /* cancelled order */ }
}
```

---

## Coupon APIs

### 1. Get All Active Coupons
**Endpoint:** `GET /coupons`

**Response (200 OK):**
```json
{
  "success": true,
  "coupons": [
    {
      "id": "c1",
      "code": "LAUNCH50",
      "discount": 50,
      "discountType": "percentage",
      "minPurchase": 1000,
      "maxDiscount": 500,
      "validFrom": "2024-01-01",
      "validTo": "2025-12-31",
      "active": true,
      "description": "Launch offer - Get 50% off"
    }
  ]
}
```

---

### 2. Validate Coupon
**Endpoint:** `POST /coupons/validate`

**Request Body:**
```json
{
  "code": "LAUNCH50",
  "cartTotal": 2500
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Coupon is valid",
  "discount": 500,
  "coupon": { /* coupon details */ }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Minimum purchase of ₹1000 required"
}
```

---

### 3. Add Coupon (Admin Only)
**Endpoint:** `POST /coupons`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "code": "SUMMER30",
  "discount": 30,
  "discountType": "percentage",
  "minPurchase": 1500,
  "maxDiscount": 1000,
  "validFrom": "2024-06-01",
  "validTo": "2024-08-31",
  "description": "Summer special offer",
  "active": true
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Coupon created successfully",
  "coupon": { /* coupon object */ }
}
```

---

### 4. Update Coupon (Admin Only)
**Endpoint:** `PUT /coupons/:couponId`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:** Same as Add Coupon

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Coupon updated successfully",
  "coupon": { /* updated coupon */ }
}
```

---

### 5. Delete Coupon (Admin Only)
**Endpoint:** `DELETE /coupons/:couponId`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Coupon deleted successfully"
}
```

---

## Advertisement APIs

### 1. Get Active Advertisements
**Endpoint:** `GET /advertisements/active`

**Response (200 OK):**
```json
{
  "success": true,
  "advertisements": [
    {
      "id": "ad1",
      "title": "Premium Leather Collection",
      "description": "Handcrafted in Kanpur",
      "image": "https://example.com/banner.jpg",
      "link": "/products?category=leather",
      "active": true,
      "startDate": "2024-01-01",
      "endDate": "2025-12-31"
    }
  ]
}
```

---

### 2. Get All Advertisements (Admin Only)
**Endpoint:** `GET /advertisements`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:** Same structure as Get Active Advertisements

---

### 3. Add Advertisement (Admin Only)
**Endpoint:** `POST /advertisements`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "title": "New Year Sale",
  "description": "Up to 60% off",
  "image": "https://example.com/banner.jpg",
  "link": "/products",
  "startDate": "2024-12-25",
  "endDate": "2025-01-10",
  "active": true
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Advertisement created successfully",
  "advertisement": { /* advertisement object */ }
}
```

---

### 4. Update Advertisement (Admin Only)
**Endpoint:** `PUT /advertisements/:adId`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:** Same as Add Advertisement

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Advertisement updated successfully",
  "advertisement": { /* updated advertisement */ }
}
```

---

### 5. Delete Advertisement (Admin Only)
**Endpoint:** `DELETE /advertisements/:adId`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Advertisement deleted successfully"
}
```

---

## Inquiry APIs

### 1. Submit Bulk Inquiry
**Endpoint:** `POST /inquiries/bulk`

**Request Body:**
```json
{
  "name": "Rajesh Kumar",
  "email": "rajesh@business.com",
  "phone": "9876543210",
  "businessName": "Kumar Retail",
  "businessType": "retailer",
  "quantity": "100 pieces per month",
  "message": "Looking for wholesale rates for office bags"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Your inquiry has been submitted. We will contact you soon!"
}
```

---

## Data Models

### User Schema
```javascript
{
  id: String (unique),
  name: String (required),
  email: String (unique, required),
  password: String (hashed, required),
  phone: String (required),
  role: String (enum: ['buyer', 'admin'], default: 'buyer'),
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Product Schema
```javascript
{
  id: String (unique),
  name: String (required),
  category: String (enum: ['office', 'ladies', 'mens-sling', 'backpack', 'laptop', 'travel'], required),
  material: String (enum: ['leather', 'rexin', 'mix'], required),
  price: Number (required),
  originalPrice: Number (required),
  discount: Number (calculated percentage),
  description: String (required),
  image: String (URL, required),
  stock: Number (required, default: 0),
  featured: Boolean (default: false),
  rating: Number (default: 0),
  reviews: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Order Schema
```javascript
{
  id: String (unique),
  userId: String (ref: User, required),
  products: [{
    productId: String (ref: Product),
    quantity: Number,
    price: Number
  }],
  shippingAddress: {
    name: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  total: Number (required),
  discount: Number (default: 0),
  shippingCost: Number (default: 0),
  finalTotal: Number (required),
  status: String (enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending'),
  couponCode: String,
  paymentMethod: String (enum: ['cod', 'online'], default: 'cod'),
  orderDate: Date (required),
  deliveryDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Coupon Schema
```javascript
{
  id: String (unique),
  code: String (unique, required),
  discount: Number (required),
  discountType: String (enum: ['percentage', 'fixed'], required),
  minPurchase: Number (required),
  maxDiscount: Number (required),
  validFrom: Date (required),
  validTo: Date (required),
  description: String (required),
  active: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Advertisement Schema
```javascript
{
  id: String (unique),
  title: String (required),
  description: String (required),
  image: String (URL, required),
  link: String (required),
  startDate: Date (required),
  endDate: Date (required),
  active: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Environment Variables (Backend .env)

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb://localhost:27017/kanbags
# OR for MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kanbags

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Email (for notifications)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# File Upload (if using cloud storage)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## Implementation Notes

### 1. Security Considerations
- Use bcrypt for password hashing (salt rounds: 10)
- Implement JWT with proper expiration
- Use HTTPS in production
- Implement rate limiting for API endpoints
- Sanitize all user inputs
- Use CORS with proper origin configuration

### 2. Database Indexes
Create indexes on frequently queried fields:
- User: email (unique)
- Product: category, material, price, featured
- Order: userId, status, orderDate
- Coupon: code (unique)

### 3. Error Handling
All APIs should return consistent error format:
```json
{
  "success": false,
  "message": "Error message here",
  "errors": [] // Array of specific errors if applicable
}
```

### 4. Pagination
For list endpoints, implement pagination:
- Default page size: 20 items
- Include pagination metadata in response
- Support custom page size (max 100)

### 5. Image Upload
- Implement file upload endpoint for product images
- Use cloud storage (Cloudinary, AWS S3, etc.)
- Validate file types (jpg, png, webp)
- Implement image optimization/resizing

---

## Testing Credentials

### Admin Account
```
Email: admin@kanbags.com
Password: admin123
```

### Buyer Account
```
Email: john@example.com
Password: buyer123
```

---

## Support
For any API-related queries, contact:
- Email: dev@kanbags.com
- Documentation: https://docs.kanbags.com

---

**Version:** 1.0.0  
**Last Updated:** October 2024



