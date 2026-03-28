# Wedding Planner Platform - Complete Project Documentation

## 🎯 Project Overview

A full-stack wedding planning marketplace connecting couples with wedding vendors. The platform allows vendors to showcase their services, couples to browse and book vendors, and admins to moderate content.

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React 19, React Router, Vite, TailwindCSS, Bootstrap 5
- **Backend**: Node.js, Express 5, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens), bcryptjs
- **File Upload**: Cloudinary, Multer
- **State Management**: React Hooks (useState, useEffect)

### Project Structure

```
wedding-planner/
├── backend/
│   ├── config/          # Cloudinary configuration
│   ├── controllers/     # Business logic (auth, vendor, admin)
│   ├── middlewares/     # Auth & validation middleware
│   ├── models/          # MongoDB schemas (User, Vendor)
│   ├── routes/          # API endpoints
│   └── app.js           # Express server setup
│
└── frontend/
    └── src/
        ├── components/  # Reusable components (Navbar, Footer, etc.)
        ├── pages/       # Main pages (Login, SignUp, AdminDashboard)
        └── vendorpages/ # Vendor-specific pages
```

## 👥 User Roles & Features

### 1. Couple/User Role

- Browse wedding vendors by category and city
- View vendor details, photos, videos
- Submit inquiries (check-ins) to vendors
- Leave reviews and ratings
- Create account and login

### 2. Vendor Role

- Create vendor profile with business details
- Add vendor posts with images/videos
- Manage media gallery
- View and respond to leads (check-ins)
- Track profile views and analytics
- Edit vendor information
- Requires admin approval before going live

### 3. Admin Role

- View platform statistics (users, vendors, approvals)
- Approve/reject vendor submissions
- Add approval notes
- View all users
- Monitor platform activity
- Full moderation control

## 🔐 Authentication System

### Registration Flow

1. User signs up with name, email, password, role (couple/vendor)
2. Password is hashed with bcrypt (10 salt rounds)
3. User data stored in MongoDB
4. Redirect to login page

### Login Flow

1. User enters email and password
2. Backend validates credentials
3. JWT token generated (24h expiry)
4. Token + user data stored in localStorage
5. Role-based redirect (admin → admin dashboard, vendor → vendor hub, couple → home)

### Protected Routes

- `ProtectedRoute`: Requires authentication
- `AdminRoute`: Requires admin role
- Token sent in Authorization header for API calls

## 📊 Database Models

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (couple/vendor/admin),
  vendorProfile: {
    businessName: String,
    category: String,
    city: String,
    phone: String,
    about: String,
    profileImage: String,
    completed: Boolean
  },
  vendor: [ObjectId] // References to Vendor posts
}
```

### Vendor Model

```javascript
{
  businessname: String (required),
  description: String (required),
  image1: String (required),
  image2, image3: String,
  galleryImages: [String],
  galleryVideos: [String],
  media: [{ url, type }],
  price: Number (required),
  phone: String (required),
  city: String (required),
  state: String,
  landMark: String,
  category: String (required),
  user: ObjectId (required),
  approvalStatus: String (pending/approved/rejected),
  approvalNote: String,
  approvedAt: Date,
  approvedBy: ObjectId,
  rating: Number (0-5),
  viewsCount: Number,
  viewLogs: [{ viewerName, viewerEmail, viewerPhone, viewedAt }],
  reviews: [{ name, rating, comment, createdAt }],
  checkIns: [{ name, email, phone, eventDate, guests, message, status, createdAt }],
  isBooked: Boolean
}
```

## 🛣️ API Endpoints

### Authentication Routes (`/auth`)

- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/vendor-onboarding` - Complete vendor profile (protected)

### Vendor Routes (`/vendor/post`)

- `GET /vendor/post` - Get all approved vendors
- `GET /vendor/post/:id` - Get single vendor
- `POST /vendor/post` - Create vendor post (protected)
- `PUT /vendor/post/:id` - Update vendor post (protected)
- `DELETE /vendor/post/:id` - Delete vendor post (protected)
- `POST /vendor/post/:id/checkin` - Submit inquiry
- `POST /vendor/post/:id/review` - Add review
- `GET /vendor/post/user/:userId` - Get user's vendors

### Admin Routes (`/admin`)

- `GET /admin/dashboard` - Get platform stats (protected, admin only)
- `GET /admin/vendors?status=pending` - Get vendors by status (protected, admin only)
- `GET /admin/users` - Get all users (protected, admin only)
- `PATCH /admin/vendors/:id/approval` - Approve/reject vendor (protected, admin only)

## 🎨 Frontend Pages

### Public Pages

- `/` - Home page with hero, popular venues, categories
- `/vendor` - Vendor listing page
- `/vendor/explore` - Vendor hub/explore page
- `/vendorpost/:id` - Vendor detail page

### Auth Pages

- `/login` - Login page
- `/signup` - Signup page with role selection

### Protected Pages (Require Login)

- `/vendor/join` - Vendor onboarding form
- `/vendor/admin` - Vendor dashboard
- `/vendor/admin/:id/leads` - Vendor leads management
- `/vendor/admin/:id/media` - Vendor media manager
- `/vendors/wedding-venues/addpost` - Add new vendor post
- `/vendorpost/edit/:id` - Edit vendor post

### Admin Pages (Require Admin Role)

- `/admin` - Admin dashboard with moderation queue

## 🔧 Key Features Implementation

### 1. Image Upload (Cloudinary)

- Multer handles multipart form data
- Images uploaded to Cloudinary
- URLs stored in MongoDB
- Supports multiple images and videos

### 2. Vendor Approval Workflow

1. Vendor creates post → status: "pending"
2. Admin reviews in dashboard
3. Admin approves/rejects with optional note
4. Only approved vendors visible to public
5. Vendor notified of status change

### 3. Lead Management

- Couples submit check-ins with event details
- Vendors see leads in dashboard
- Track lead status (new/contacted/closed)
- Email and phone captured for follow-up

### 4. Reviews & Ratings

- Couples leave reviews after viewing vendor
- 1-5 star rating system
- Average rating calculated and displayed
- Reviews shown on vendor detail page

### 5. Analytics

- View count tracking
- Viewer information logged
- Lead conversion tracking
- Admin sees platform-wide stats

## 🚀 Getting Started

### Backend Setup

```bash
cd backend
npm install
# Create .env file with:
# JWT_SECRET=your_secret
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### MongoDB Setup

- Install MongoDB locally or use MongoDB Atlas
- Database name: `wedplaner`
- Connection: `mongodb://127.0.0.1:27017/wedplaner`

## 📱 Responsive Design

- Mobile-first approach
- TailwindCSS utilities for responsive breakpoints
- Bootstrap grid system for layouts
- Responsive navbar with hamburger menu
- Card grids adapt to screen size

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes with middleware
- Role-based access control
- CORS configuration for frontend-backend communication
- Input validation with Joi

## 🎯 Future Enhancements

1. Email notifications for vendors
2. Payment integration for bookings
3. Calendar availability system
4. Advanced search filters
5. Vendor comparison feature
6. Chat system between couples and vendors
7. Photo gallery lightbox
8. Social media integration
9. SEO optimization
10. Progressive Web App (PWA)

## 📝 Environment Variables

### Backend (.env)

```
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
MONGODB_URI=mongodb://127.0.0.1:27017/wedplaner
PORT=3000
```

### Frontend

- API URL: `http://localhost:3000`
- Frontend URL: `http://localhost:5173`

## 🐛 Common Issues & Solutions

1. **CORS Error**: Check backend CORS configuration matches frontend URL
2. **Token Expired**: JWT expires after 24h, user needs to login again
3. **Image Upload Fails**: Verify Cloudinary credentials in .env
4. **MongoDB Connection**: Ensure MongoDB is running locally
5. **Protected Route Access**: Check token in localStorage and Authorization header

## 📚 Dependencies

### Backend

- express: Web framework
- mongoose: MongoDB ODM
- bcryptjs: Password hashing
- jsonwebtoken: JWT authentication
- multer: File upload handling
- cloudinary: Image hosting
- cors: Cross-origin resource sharing
- dotenv: Environment variables
- joi: Input validation

### Frontend

- react: UI library
- react-router-dom: Routing
- axios: HTTP client
- tailwindcss: Utility-first CSS
- bootstrap: Component library
- react-icons: Icon library
- @fortawesome/react-fontawesome: Font Awesome icons

## 👨‍💻 Development Workflow

1. Start MongoDB
2. Run backend: `cd backend && npm run dev`
3. Run frontend: `cd frontend && npm run dev`
4. Access app at http://localhost:5173
5. API runs at http://localhost:3000

## 🎨 Styling Approach

You now have both TailwindCSS and Bootstrap installed:

- Use Bootstrap for major components (navbar, cards, forms, modals)
- Use TailwindCSS for custom utilities and spacing
- Mix both as needed for rapid development
- See BOOTSTRAP_GUIDE.md for Bootstrap examples
