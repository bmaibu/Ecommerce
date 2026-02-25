# 🛒 E-Kart - Premium MERN E-Commerce Platform

![E-Kart Header](https://raw.githubusercontent.com/bmaibu/Ecommerce/main/frontend/public/Ekart.png)

E-Kart is a sophisticated, full-stack e-commerce solution engineered with the **MERN** stack (MongoDB, Express, React, Node.js). It delivers a seamless shopping experience for customers and a powerful management suite for administrators, featuring modern aesthetics, responsive layouts, and robust security.

---

## ✨ Key Features

### 🛍️ Customer Experience
- **Advanced Product Discovery**: Seamlessly browse and filter products by category, brand, and price.
- **Real-time Search**: Instantaneous product search with dynamic UI updates.
- **Intelligent Cart System**: Automated calculations for subtotals, taxes (5%), and shipping logic.
- **Secure Checkout**: Integrated **Razorpay** payment gateway for a trusted transaction flow.
- **Verified Authentication**: Secure user registration with email verification and JWT-based session management.
- **Personalized Profile**: Customizable user profiles including avatar uploads and order history tracking.

### 📊 Admin Dashboard
- **Sales Analytics**: Visual data representations using **Recharts** to monitor revenue, user growth, and order volume.
- **Inventory Management**: Comprehensive CRUD interface for managing products, images, and pricing.
- **Order Oversight**: Centralized monitoring of all platform orders with status management.
- **User Insights**: Dedicated portal for viewing and inspecting user accounts.

---

## 🛠️ Technical Architecture

### Frontend Layer
- **React (Vite)**: Lightning-fast build and development environment.
- **Redux Toolkit**: Enterprise-grade state management.
- **Tailwind CSS**: Modern utility-first styling for a premium look and feel.
- **Lucide React**: Clean and consistent iconography.

### Backend Layer
- **Node.js & Express**: High-performance asynchronous server architecture.
- **MongoDB & Mongoose**: Scalable NoSQL data modeling.
- **Cloudinary API**: Professional-grade media management for high-quality product images.
- **Nodemailer**: Automated transactional email system.

---

## ⚙️ Quick Start

### 1. Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Cloudinary account
- Razorpay developer account

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/bmaibu/Ecommerce.git
cd Ecommerce

# Setup Backend
cd backend
npm install

# Setup Frontend
cd ../frontend
npm install
```

### 3. Environment Variables
Create `.env` files in both `backend/` and `frontend/` directories:

**Backend (`/backend/.env`):**
```env
PORT=8000
MONGO_URI=your_mongodb_uri
SECRET_KEY=your_jwt_secret
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_key
API_SECRET=your_cloudinary_secret
RAZORPAY_KEY_ID=your_razorpay_id
RAZORPAY_SECRET=your_razorpay_secret
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
```

**Frontend (`/frontend/.env`):**
```env
VITE_URL=http://localhost:8000
VITE_RAZORPAY_KEY_ID=your_razorpay_id
```

### 4. Launch
```bash
# Terminal 1: Backend
cd backend && npm start

# Terminal 2: Frontend
cd frontend && npm run dev
```

---

## 🏗️ Recent Stabilization (v1.1)
The project recently underwent a comprehensive audit and stabilization phase:
- ✅ Fixed critical **Authentication Middleware** token parsing (delimiter mismatch).
- ✅ Standardized all **API endpoints** via environment variables for portability.
- ✅ Implemented **Self-Fetching** in `SingleProduct` view to support direct URL refreshes.
- ✅ Synchronized **Redux-Backend State** for cart and user profile consistency.
- ✅ Corrected **Razorpay integration** UI and theme constraints.

---

## 📄 License
Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  Developed with ❤️ by <a href="https://github.com/bmaibu">B MAIBU</a>
</p>
