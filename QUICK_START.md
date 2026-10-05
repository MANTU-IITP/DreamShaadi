# 🚀 Quick Start Guide - DreamShaadi Premium Home Page

## ✅ Prerequisites

- Node.js installed
- npm or yarn installed
- MongoDB running (for backend)

---

## 🎬 Starting the Application

### 1. Start Backend Server

```bash
cd backend
npm install  # If not already installed
npm start    # or node app.js
```

**Expected Output:**

```
Server running on port 5000
MongoDB connected
```

### 2. Start Frontend Development Server

```bash
cd frontend
npm install  # If not already installed
npm run dev
```

**Expected Output:**

```
  VITE v7.1.2  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 3. Open Browser

Navigate to: **http://localhost:5173/**

---

## 🎨 What You Should See

### Premium Hero Section

- Full-screen wedding photo with burgundy overlay
- Large elegant title: "Your Love Story, Beautifully Told"
- Search bar with city and service dropdowns
- Popular search buttons
- Animated scroll indicator at bottom

### Trust Strip

- Four trust signals: Verified Vendors, Real Reviews, Transparent Pricing, Secure Booking
- Cream background (#fdf6ec)

### Editorial Categories

- 8 category cards with images
- Icons for each service type
- Hover effects showing arrow

### Wedding Traditions

- Featured Bengali wedding card
- 11 additional tradition cards in grid
- Side panel with editorial content

### Destinations

- 3 large destination cards: Jaipur, Goa, Udaipur
- Image overlays with location names

### Featured Vendors

- Grid of vendor cards (if vendors exist in database)
- Or placeholder message if no vendors yet

### Inspiration Gallery

- 4 wedding photos in grid layout
- CTA button to find vendors

### Vendor CTA

- Two-column layout
- "Grow Your Wedding Business" heading
- Image on right side

---

## 🧪 Testing Features

### 1. Search Functionality

- Select a city from dropdown
- Select a service category
- Click "Search" button
- Should navigate to `/vendor?city=XXX&category=XXX`

### 2. Category Navigation

- Click any category card (Photographer, Venue, etc.)
- Should navigate to `/vendor?category=XXX`

### 3. Wedding Traditions

- Scroll to traditions section
- Click any tradition card
- Should navigate to `/weddings/tradition-id`

### 4. Destinations

- Click a destination card
- Should navigate to `/vendor?city=XXX`

### 5. Vendor Cards

- If vendors exist, click on a vendor card
- Should navigate to vendor detail page

### 6. Responsive Design

- Resize browser window
- Test mobile view (< 480px)
- Test tablet view (768px - 992px)
- Test desktop view (> 992px)

---

## 🐛 Troubleshooting

### Issue: Styles Not Loading

**Solution:**

```bash
# Clear Vite cache
rm -rf frontend/node_modules/.vite
npm run dev
```

### Issue: Images Not Loading

**Check:**

- Internet connection (Unsplash images require internet)
- Browser console for CORS errors
- Image URLs in browser

### Issue: Search Not Working

**Check:**

- Backend server is running
- API endpoint `/vendor/post/getall` is accessible
- Check browser console for errors

### Issue: Fonts Look Different

**Note:**

- Playfair Display and DM Sans load from Google Fonts
- Requires internet connection
- Check global.css for font imports

### Issue: Vendor Cards Not Showing

**Possible Causes:**

1. No vendors in database yet
2. Backend not running
3. API endpoint error

**Check:**

- Backend logs for API calls
- Browser Network tab for failed requests
- Database has vendor documents

---

## 📂 File Structure

```
frontend/src/
├── pages/
│   ├── Home.jsx          ← Premium home page component
│   └── Home.css          ← Premium styling
├── components/
│   ├── Navbar.jsx        ← Navigation bar
│   ├── Footer.jsx        ← Footer component
│   ├── VendorCard.jsx    ← Vendor card component
│   ├── LoadingSpinner.jsx ← Loading indicator
│   ├── WeddingTraditions.jsx ← Traditions section
│   └── WeddingTraditions.css ← Traditions styling
├── styles/
│   └── global.css        ← Global styles + Tailwind
└── utils/
    └── api.js            ← Axios API configuration
```

---

## 🎯 Key URLs to Test

1. **Home**: `http://localhost:5173/`
2. **Vendors**: `http://localhost:5173/vendor`
3. **Search**: `http://localhost:5173/vendor?city=Delhi&category=Photographer`
4. **Vendor Detail**: `http://localhost:5173/vendor/:id` (if vendors exist)

---

## 📸 Screenshot Checklist

Test these views and capture screenshots:

- [ ] Hero section (full screen)
- [ ] Trust strip
- [ ] Category grid
- [ ] Wedding traditions featured card
- [ ] Destination cards
- [ ] Featured vendors (if any)
- [ ] Inspiration gallery
- [ ] Vendor CTA
- [ ] Mobile view (iPhone size)
- [ ] Tablet view (iPad size)
- [ ] Search bar interaction
- [ ] Hover effects on categories

---

## 🔧 Development Tips

### Hot Reload

- Vite supports hot module replacement
- Changes to `.jsx` and `.css` files auto-reload
- No need to restart server for most changes

### Browser DevTools

- Open DevTools (F12 or Cmd+Option+I)
- Use Elements tab to inspect styles
- Use Console for JavaScript errors
- Use Network tab for API calls

### Debugging

```javascript
// Add console.log in Home.jsx
console.log("Featured vendors:", featured);
console.log("Loading state:", loading);
console.log("Search state:", search);
```

---

## ✨ Next Steps

After verifying the home page works:

1. **Add Real Content**
   - Upload actual vendor data
   - Replace Unsplash images with real photos
   - Update text content

2. **Connect All Pages**
   - Vendor listing page
   - Vendor detail page
   - Wedding tradition pages
   - Booking flow

3. **SEO Optimization**
   - Add meta tags
   - Implement structured data
   - Add alt text to images

4. **Performance**
   - Optimize images
   - Implement lazy loading
   - Add caching

5. **Analytics**
   - Add Google Analytics
   - Track user interactions
   - Monitor conversions

---

## 📞 Support

If you encounter issues:

1. Check browser console for errors
2. Check backend logs
3. Verify all environment variables are set
4. Ensure MongoDB is running
5. Check network requests in DevTools

---

**Happy Testing! 🎉**
