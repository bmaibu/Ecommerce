# Ekart - Modern E-commerce Platform

Ekart is a full-stack, professional e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js). It features a clean, responsive design and robust functionality for both customers and administrators.

---

## 🚀 Features

### Customer Features
- **Product Discovery**: Browse products with advanced filtering by category, brand, and price range.
- **Dynamic Search**: Real-time product search functionality.
- **Cart Management**: Add/remove products and adjust quantities with automatic total and tax calculations.
- **Checkout Flow**: Integrated Razorpay payment gateway for secure transactions.
- **User Authentication**: Secure signup and login with email verification.
- **Profile Management**: Update user details and profile pictures.
- **Order Tracking**: View personal order history with real-time status updates (Pending, Paid, Failed).

### Admin Features
- **Sales Analytics**: Dashboard with visual charts (Recharts) tracking total users, products, orders, and revenue over the last 30 days.
- **Product Management**: Full CRUD operations for adding and managing inventory.
- **Order Overview**: Monitor all platform orders and view specific customer purchase histories.
- **User Management**: View and inspect registered user accounts.

---

## 🛠️ Technologies Used

### Frontend
- **React (Vite)**: Modern frontend framework and build tool.
- **Redux Toolkit**: Centralized state management for users, products, and cart.
- **Tailwind CSS**: Utility-first CSS for professional and responsive styling.
- **Radix UI**: Accessible UI primitives.
- **Lucide React**: High-quality icon set.
- **Recharts**: Data visualization for admin statistics.
- **Sonner**: Elegant toast notifications.

### Backend
- **Node.js & Express**: Scalable server-side infrastructure.
- **MongoDB & Mongoose**: Flexible NoSQL database with schema modeling.
- **JWT (JSON Web Tokens)**: Secure authentication and session management.
- **Cloudinary**: Cloud-based image management for profile and product images.
- **Razorpay SDK**: Professional payment processing.
- **Nodemailer**: Email services for account verification.

---

## 📦 Installation Instructions

Follow these steps to set up the project locally:

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Ekart
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the configuration listed below.

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the configuration listed below.

---

## ⚙️ Configuration

Set up the following environment variables in their respective folders:

### Backend `.env`
```env
PORT = 8000
MONGO_URI = <your-mongodb-connection-string>
MAIL_USER = <your-email-address>
MAIL_PASS = <your-app-specific-password>
SECRET_KEY = <your-jwt-secret>
CLOUD_NAME = <your-cloudinary-cloud-name>
API_KEY = <your-cloudinary-api-key>
API_SECRET = <your-cloudinary-api-secret>
RAZORPAY_KEY_ID = <your-razorpay-key-id>
RAZORPAY_SECRET = <your-razorpay-secret>
```

### Frontend `.env`
```env
VITE_RAZORPAY_KEY_ID = <your-razorpay-key-id>
VITE_URL = http://localhost:8000
```

---

## 🖥️ Usage

### Running Locally

1. **Start the Backend Server**:
   ```bash
   cd backend
   npm start
   ```
2. **Start the Frontend Development Server**:
   ```bash
   cd frontend
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.
