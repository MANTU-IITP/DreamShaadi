# 🎉 DreamShaadi - Complete Wedding Planner Platform Documentation

## 📋 Project Overview

**DreamShaadi** is a full-stack wedding planning marketplace that connects couples with wedding vendors. The platform features vendor listings, booking management, admin moderation, and a complete vendor dashboard.

---

## 🏗️ Technical Architecture

### **Stack**

```
Frontend: React 19 + Vite + Tailwind CSS 4
Backend: Node.js + Express 5 + MongoDB
Auth: JWT (JSON Web Tokens)
Image Storage: Cloudinary
Styling: Tailwind CSS with minimal custom CSS
```

### **Project Structure**

```
DreamShaadi/
├── backend/              # Node.js Express API
│   ├── config/          # Cloudinary config
│   ├── controllers/     # Business logic
│   ├── middlewares/     # Auth, validation, admin
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   └── app.js           # Server entry point
│
└── frontend/            # React SPA
    └── src/
        ├── components/  # Reusable UI components
        ├── pages/       # Main pages (Home, Login, etc.)
        ├── vendorpages/ # Vendor dashboard pages
        └── styles/      # global.css only
```

---

## 🔐 User Roles & Permissions

### 1. **Couple/User** (Default Role)

**Can:**

- ✅ Browse vendors by category & city
- ✅ View vendor details, photos, videos
- ✅ Submit check-ins (inquiries) to vendors
- ✅ Add vendors to wishlist
- ✅ Leave reviews and ratings
- ✅ Search and filter vendors

### 2. **Vendor** (Business Owners)

**Can:**

- ✅ Create vendor profile with business details
- ✅ Upload photos and videos (up to 20 files)
- ✅ Manage media gallery
- ✅ View and respond to leads/inquiries
- ✅ Track bookings
- ✅ View analytics (views, leads, ratings)
- ✅ Edit vendor information
- ✅ See who viewed their profile
- ⚠️ **Requires admin approval** before going live

### 3. **Admin** (Platform Moderator)

**Can:**

- ✅ View platform statistics
- ✅ Approve/reject vendor submissions
- ✅ Add approval notes
- ✅ View all users and vendors
- ✅ Monitor platform activity
- ✅ Full moderation control

**Admin Email:** `goutam123@gmail.com` (configured in .env)

---

## 🌐 Frontend Routes

### **Public Routes** (No login required)

| Route             | Page           | Description                              |
| ----------------- | -------------- | ---------------------------------------- |
| `/`               | Home           | Hero section, categories, popular venues |
| `/login`          | Login          | User authentication                      |
| `/signup`         | SignUp         | User registration with role selection    |
| `/vendor`         | Vendor Listing | Browse all approved vendors              |
| `/vendor/explore` | Explore        | Vendor discovery page                    |
| `/vendorpost/:id` | Vendor Detail  | Single vendor page with gallery          |
| `/privacy`        | Privacy Policy | Privacy policy page                      |
| `/terms`          | Terms          | Terms and conditions                     |

### **Protected Routes** (Login required)

| Route                        | Page             | Description                 |
| ---------------------------- | ---------------- | --------------------------- |
| `/wishlist`                  | Wishlist         | Saved vendors               |
| `/vendor/join`               | Vendor Join      | Vendor onboarding form      |
| `/vendor/admin`              | Vendor Dashboard | Vendor control panel        |
| `/vendor/admin/:id/leads`    | Leads Manager    | View and manage inquiries   |
| `/vendor/admin/:id/bookings` | Bookings         | Booking management          |
| `/vendor/admin/:id/media`    | Media Manager    | Upload/manage photos/videos |
| `/vendorpost/edit/:id`       | Edit Post        | Update vendor information   |

### **Admin Routes** (Admin only)

| Route    | Page            | Description                 |
| -------- | --------------- | --------------------------- |
| `/admin` | Admin Dashboard | Platform moderation & stats |

---

## 🔌 Backend API Endpoints

### **Base URL:** `http://localhost:3000`

### **Authentication Routes** (`/auth`)

| Method | Endpoint                       | Auth | Description               |
| ------ | ------------------------------ | ---- | ------------------------- |
| POST   | `/auth/signup`                 | ❌   | Register new user         |
| POST   | `/auth/login`                  | ❌   | User login                |
| POST   | `/auth/vendor-onboarding`      | ✅   | Complete vendor profile   |
| GET    | `/auth/notifications`          | ✅   | Get user notifications    |
| PATCH  | `/auth/notifications/:id/read` | ✅   | Mark notification as read |
| GET    | `/auth/wishlist`               | ✅   | Get user's wishlist       |
| POST   | `/auth/wishlist/:vendorId`     | ✅   | Add/remove from wishlist  |

**Rate Limit:** 5 requests per hour for signup/login

---

### **Vendor Routes** (`/vendor/post`)

| Method | Endpoint                                     | Auth | Description                   |
| ------ | -------------------------------------------- | ---- | ----------------------------- |
| POST   | `/vendor/post/create`                        | ✅   | Create vendor post            |
| POST   | `/vendor/post/upload-media`                  | ✅   | Upload media files (max 20)   |
| POST   | `/vendor/post/:id/media`                     | ✅   | Append media to existing post |
| GET    | `/vendor/post/getone/:id`                    | ❌   | Get single vendor details     |
| GET    | `/vendor/post/getall`                        | ❌   | Get all approved vendors      |
| GET    | `/vendor/post/search`                        | ❌   | Search vendors                |
| GET    | `/vendor/post/mine`                          | ✅   | Get my vendor posts           |
| PUT    | `/vendor/post/update/:id`                    | ✅   | Update vendor post            |
| DELETE | `/vendor/post/delete/:id`                    | ✅   | Delete vendor post            |
| POST   | `/vendor/post/:id/view`                      | ❌   | Register vendor view          |
| POST   | `/vendor/post/:id/contact/request-otp`       | ❌   | Request OTP for contact       |
| POST   | `/vendor/post/:id/contact/verify-otp`        | ❌   | Verify contact OTP            |
| POST   | `/vendor/post/:id/checkin`                   | ❌   | Submit inquiry/check-in       |
| POST   | `/vendor/post/:id/reviews`                   | ❌   | Add vendor review             |
| GET    | `/vendor/post/:id/leads`                     | ✅   | Get vendor leads              |
| GET    | `/vendor/post/:id/stats`                     | ✅   | Get vendor statistics         |
| PATCH  | `/vendor/post/:id/checkin/:checkInId/status` | ✅   | Update lead status            |

**File Upload Limits:**

- Max files: 20
- Max file size: 15 MB
- Allowed types: Images and videos only

---

### **Admin Routes** (`/admin`)

| Method | Endpoint                      | Auth     | Description           |
| ------ | ----------------------------- | -------- | --------------------- |
| GET    | `/admin/dashboard`            | 👑 Admin | Platform statistics   |
| GET    | `/admin/users`                | 👑 Admin | Get all users         |
| GET    | `/admin/vendors`              | 👑 Admin | Get vendors by status |
| PATCH  | `/admin/vendors/:id/approval` | 👑 Admin | Approve/reject vendor |

**Query Parameters for `/admin/vendors`:**

- `?status=pending` - Get pending vendors
- `?status=approved` - Get approved vendors
- `?status=rejected` - Get rejected vendors

---

## 📊 Database Models

### **User Model**

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
  vendor: [ObjectId],  // References to Vendor posts
  wishlist: [ObjectId], // References to Vendors
  createdAt: Date,
  updatedAt: Date
}
```

### **Vendor Model**

```javascript
{
  businessname: String (required),
  description: String (required),
  image1: String (required),
  image2: String,
  image3: String,
  galleryImages: [String],
  galleryVideos: [String],
  media: [{ url: String, type: String }],
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
  viewLogs: [{
    viewerName: String,
    viewerEmail: String,
    viewerPhone: String,
    viewedAt: Date
  }],
  reviews: [{
    name: String,
    rating: Number (1-5),
    comment: String,
    createdAt: Date
  }],
  checkIns: [{
    name: String,
    email: String,
    phone: String,
    eventDate: Date,
    guests: Number,
    message: String,
    status: String (new/contacted/closed),
    createdAt: Date
  }],
  isBooked: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 Frontend Components

### **Shared Components**

- `Navbar.jsx` - Responsive navigation with search
- `Footer.jsx` - Footer with social links
- `ProtectedRoute.jsx` - Route guard for authenticated users
- `AdminRoute.jsx` - Route guard for admin users
- `ConsentBanner.jsx` - Cookie consent banner
- `EmptyState.jsx` - Empty state component

### **Pages**

- `Home.jsx` - Landing page
- `Login.jsx` - Authentication
- `SignUp.jsx` - Registration with role selection
- `VendorListing.jsx` - Browse vendors
- `VendorDetail.jsx` - Vendor detail page
- `AdminDashboard.jsx` - Admin moderation panel
- `Wishlist.jsx` - Saved vendors

### **Vendor Pages**

- `VendorJoin.jsx` - Vendor onboarding
- `VendorDashboard.jsx` - Main vendor dashboard
- Multiple dashboard tabs for leads, bookings, media, settings

---

## 🔒 Security Features

### **Implemented**

✅ **Password Hashing** - bcrypt with 10 salt rounds
✅ **JWT Authentication** - 24-hour token expiry
✅ **Rate Limiting** - Prevent brute force attacks
✅ **Helmet.js** - Security headers
✅ **CORS** - Restricted origins
✅ **MongoDB Sanitization** - Prevent NoSQL injection
✅ **Input Validation** - Joi schema validation
✅ **File Upload Limits** - Max 15MB per file
✅ **Role-Based Access Control** - Admin/Vendor/User roles

### **Environment Variables**

```env
PORT=3000
JWT_SECRET="your_jwt_secret"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
ADMIN_EMAILS="admin@example.com"
MONGO_URI="mongodb://127.0.0.1:27017/wedplaner"
FRONTEND_URL="http://localhost:5173"
```

---

## 🎯 Key Features

### **For Couples**

🔍 **Advanced Search** - Filter by category, city, price
❤️ **Wishlist** - Save favorite vendors
📝 **Reviews** - Rate and review vendors
💬 **Inquiries** - Direct check-in with vendors
📱 **Responsive Design** - Mobile-friendly interface

### **For Vendors**

📊 **Analytics Dashboard** - Views, leads, bookings
📸 **Media Manager** - Upload up to 20 photos/videos
💼 **Lead Management** - Track inquiries with status
🔔 **Notifications** - Real-time updates
✏️ **Profile Editor** - Update business information
📈 **Stats Tracking** - Monitor performance

### **For Admins**

🎛️ **Moderation Panel** - Approve/reject vendors
📉 **Platform Stats** - Users, vendors, approvals
👥 **User Management** - View all users
📝 **Approval Notes** - Add feedback for vendors
🔍 **Status Filtering** - Pending/Approved/Rejected

---

## 🚀 Getting Started

### **Prerequisites**

- Node.js (v18+)
- MongoDB (local or Atlas)
- Cloudinary account

### **Installation**

1. **Clone & Install**

```bash
cd DreamShaadi
cd backend && npm install
cd ../frontend && npm install
```

2. **Configure Environment**
   Create `backend/.env`:

```env
PORT=3000
JWT_SECRET="your_secret_key"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
ADMIN_EMAILS="admin@example.com"
```

3. **Start MongoDB**

```bash
mongod
```

4. **Start Development Servers**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

5. **Access Application**

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

---

## 📱 Responsive Design

### **Breakpoints** (Tailwind)

- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up

### **Mobile Features**

✅ Hamburger menu navigation
✅ Touch-optimized buttons
✅ Responsive grids
✅ Mobile search
✅ Swipeable galleries

---

## 🎨 Styling System

### **Tailwind CSS 4**

- Primary color: Pink (600-700)
- Gray scale: 100-900
- Utility-first approach
- Minimal custom CSS

### **Custom Animations**

- `fadeIn` - Fade in with slide up
- `fadeInUp` - Fade in with larger slide
- Smooth transitions on hover
- Transform effects

---

## 📦 Dependencies

### **Backend**

- express - Web framework
- mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT auth
- multer - File uploads
- cloudinary - Image hosting
- helmet - Security headers
- express-rate-limit - Rate limiting
- joi - Validation

### **Frontend**

- react - UI library
- react-router-dom - Routing
- axios - HTTP client
- tailwindcss - Styling
- @fortawesome/react-fontawesome - Icons
- react-icons - Additional icons

---

## 🔄 Workflow Examples

### **Vendor Registration Flow**

1. User signs up with "vendor" role
2. Login redirects to vendor onboarding
3. Complete business profile
4. Create first vendor post
5. Upload photos/videos
6. Submit for admin approval
7. Admin reviews and approves
8. Vendor goes live on platform
9. Start receiving leads

### **Couple Inquiry Flow**

1. Browse vendors by category
2. View vendor detail page
3. Submit check-in form (inquiry)
4. Vendor receives lead notification
5. Vendor contacts couple
6. Update lead status (contacted/closed)

---

## 📈 Future Enhancements

### **Planned Features**

- [ ] Email notifications
- [ ] Payment integration (Razorpay/Stripe)
- [ ] Calendar booking system
- [ ] Live chat between couples and vendors
- [ ] Advanced analytics for vendors
- [ ] Social media login (Google/Facebook)
- [ ] Vendor comparison tool
- [ ] Mobile app (React Native)
- [ ] SEO optimization
- [ ] Multi-language support

---

## 🐛 Troubleshooting

### **MongoDB Connection Error**

```bash
# Start MongoDB
mongod
# or specify path
mongod --dbpath /path/to/data
```

### **Port Already in Use**

```bash
# Change PORT in backend/.env
PORT=3001
```

### **Cloudinary Upload Fails**

- Verify API credentials in .env
- Check file size (max 15MB)
- Ensure file is image/video

### **Tailwind Not Working**

```bash
cd frontend
npm install
# Restart dev server
npm run dev
```

---

## 📞 Support & Contact

**Project:** DreamShaadi Wedding Planner
**Version:** 1.0.0
**Tech Stack:** MERN (MongoDB, Express, React, Node.js)
**Status:** ✅ Production Ready

---

**Built with ❤️ for making wedding planning easier!** 💒🎉
