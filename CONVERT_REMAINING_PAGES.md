# Pages That Need Tailwind Conversion

## Priority 1: Auth Pages (High Traffic)

### 1. Login.jsx

**Current**: Uses `Login.css`
**Action**: Convert form, inputs, buttons to Tailwind
**Estimated Time**: 10 minutes

### 2. SignUp.jsx

**Current**: Uses `SignUp.css`
**Action**: Convert form, inputs, buttons to Tailwind
**Estimated Time**: 10 minutes

## Priority 2: Home Page Components

### 3. GoaWeddingHero.jsx

**Current**: Uses `GoaWeddingHero.css`
**Action**: Convert hero section, background, text styling
**Estimated Time**: 15 minutes

### 4. Popoularvenue.jsx

**Current**: Uses `Popoularvenue.css`
**Action**: Convert venue cards, carousel/slider
**Estimated Time**: 15 minutes

### 5. PopularSearches.jsx

**Current**: Uses `PopularSearches.css`
**Action**: Convert search cards, grid layout
**Estimated Time**: 10 minutes

## Priority 3: Admin Dashboard

### 6. AdminDashboard.jsx

**Current**: Uses `AdminDashboard.css`
**Action**: Convert tables, stats cards, moderation UI
**Estimated Time**: 20 minutes

## Priority 4: Vendor Pages

### 7. Vendors.jsx

**Current**: Uses `Vendors.css`
**Action**: Convert vendor listing, filters, cards
**Estimated Time**: 15 minutes

### 8. VendorHub.jsx

**Current**: Uses `VendorHub.css`
**Action**: Convert hub layout, navigation
**Estimated Time**: 10 minutes

### 9. VendorJoin.jsx

**Current**: Uses `VendorJoin.css`
**Action**: Convert onboarding form
**Estimated Time**: 15 minutes

### 10. VendorAdmin.jsx

**Current**: Uses `VendorAdmin.css`
**Action**: Convert dashboard, stats, navigation
**Estimated Time**: 20 minutes

### 11. VendorLeads.jsx

**Current**: Uses `VendorLeads.css`
**Action**: Convert leads table, filters
**Estimated Time**: 15 minutes

### 12. VendorMediaManager.jsx

**Current**: Uses `VendorMediaManager.css`
**Action**: Convert media grid, upload UI
**Estimated Time**: 15 minutes

### 13. AddPost.jsx

**Current**: Uses `AddPost.css`
**Action**: Convert form, image upload, inputs
**Estimated Time**: 20 minutes

### 14. EditPost.jsx

**Current**: Uses `AddPost.css` (shared)
**Action**: Convert form, image upload, inputs
**Estimated Time**: 15 minutes

### 15. Postdetail.jsx

**Current**: Uses `Postdetail.css`
**Action**: Convert detail view, gallery, reviews
**Estimated Time**: 20 minutes

## Total Estimated Time: ~4 hours

## Quick Conversion Tips

### Form Elements

```jsx
// Old
<input className="form-input" />

// New
<input className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-pink-500 focus:outline-none" />
```

### Buttons

```jsx
// Old
<button className="btn btn-primary">Submit</button>

// New
<button className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors">Submit</button>
```

### Cards

```jsx
// Old
<div className="card">

// New
<div className="bg-white rounded-xl shadow-md p-6">
```

### Grid Layouts

```jsx
// Old
<div className="grid-container">

// New
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

## After Conversion Checklist

For each file:

- [ ] Remove CSS import
- [ ] Convert all classes to Tailwind
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Delete corresponding CSS file
- [ ] Check for any custom animations (move to global.css if needed)
- [ ] Verify hover states work
- [ ] Test form validation styling
