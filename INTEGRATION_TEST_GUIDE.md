# 🧪 Integration Test Guide - Premium Components

## Overview

This guide helps you test the newly updated VendorCard and LoadingSpinner components across the DreamShaadi application.

---

## 🎯 Components Affected

The following pages automatically use the updated components:

### 1. **Home Page** (`/`)

- **Component:** LoadingSpinner, VendorCard
- **Location:** Featured vendors section
- **What to test:** 6 featured vendors display with premium cards

### 2. **Vendor Listing** (`/vendor`)

- **Component:** LoadingSpinner, VendorCard
- **Location:** Main vendor grid
- **What to test:** All vendors in grid layout with filters

### 3. **Vendor Search** (`/vendor?city=Delhi&category=Photographer`)

- **Component:** LoadingSpinner, VendorCard
- **Location:** Filtered results
- **What to test:** Search and filter functionality with new cards

### 4. **Explore Page** (`/explore`)

- **Component:** LoadingSpinner, VendorCard
- **Location:** Browse all vendors
- **What to test:** Exploration without initial filters

---

## ✅ Test Checklist

### A. Home Page Tests

Start the application and navigate to `http://localhost:5173/`

**Loading State:**

- [ ] Premium spinner appears while fetching vendors
- [ ] Flower symbol (✳) rotates and blooms
- [ ] Progress bar animates smoothly
- [ ] Label reads "Finding exceptional vendors..."

**Featured Vendors Section:**

- [ ] 6 vendor cards display in 3-column grid
- [ ] Each card has proper image (or fallback)
- [ ] Premium badge shows on premium vendors
- [ ] Category badges display correctly
- [ ] Location shows city and state
- [ ] Ratings display properly
- [ ] Prices format as ₹1,25,000 (Indian format)
- [ ] "Contact for pricing" shows when no price

**Hover Effects:**

- [ ] Card lifts up (-5px) on hover
- [ ] Image zooms slightly (1.055 scale)
- [ ] Arrow icon fills with burgundy
- [ ] Shadow increases on hover
- [ ] Wishlist button scales on hover

**Wishlist Interaction:**

- [ ] Heart button is visible on each card
- [ ] Click heart to save vendor
- [ ] Heart fills with red color when saved
- [ ] Click again to unsave
- [ ] Background changes to pink when saved

**Navigation:**

- [ ] Click anywhere on card navigates to vendor detail
- [ ] URL changes to `/vendorpost/:id`
- [ ] Wishlist button doesn't trigger navigation

---

### B. Vendor Listing Page Tests

Navigate to `http://localhost:5173/vendor`

**Initial Load:**

- [ ] Loading spinner appears
- [ ] Vendors load in grid (3 columns)
- [ ] Filter panel on left side
- [ ] Count shows "Showing X of Y vendors"

**Grid Layout:**

- [ ] Cards maintain consistent height
- [ ] Images crop properly (1.3 aspect ratio)
- [ ] Text doesn't overflow
- [ ] Cards align properly in grid
- [ ] Gap between cards is consistent

**Filter Panel:**

- [ ] Search by name works
- [ ] Category filter updates cards
- [ ] City filter updates cards
- [ ] Price range filter works
- [ ] Rating filter works
- [ ] Sort options work
- [ ] "Clear All" resets filters
- [ ] "Apply Filters" button works

**Loading States:**

- [ ] Spinner shows during filter apply
- [ ] Spinner shows during load more
- [ ] Smooth transition from loading to cards

**Empty States:**

- [ ] Shows "No vendors found" when no results
- [ ] "Clear filters" action appears
- [ ] Error state shows if API fails

---

### C. Search Results Tests

Navigate to `http://localhost:5173/vendor?city=Delhi&category=Photographer`

**URL Parameters:**

- [ ] City pre-selected in filter
- [ ] Category pre-selected in filter
- [ ] Results match filters
- [ ] URL updates when filters change

**Card Content:**

- [ ] Only matching vendors show
- [ ] Category badge matches filter
- [ ] Location shows correct city
- [ ] Count is accurate

---

### D. Mobile Responsive Tests

Resize browser to mobile width (< 768px)

**Home Page:**

- [ ] Cards stack in single column
- [ ] Search bar adapts to mobile
- [ ] Images maintain aspect ratio
- [ ] Text remains readable
- [ ] Buttons are tappable (44px min)

**Vendor Listing:**

- [ ] Filter button appears in toolbar
- [ ] Filters open in drawer
- [ ] Cards stack in single column
- [ ] "Load More" button full width
- [ ] Drawer closes on apply

**VendorCard:**

- [ ] Image aspect ratio changes to 1.25
- [ ] Meta info stacks vertically then horizontally
- [ ] Font sizes scale appropriately
- [ ] Wishlist button remains accessible
- [ ] Premium badge remains visible

---

### E. Accessibility Tests

**Keyboard Navigation:**

- [ ] Tab through cards in logical order
- [ ] Tab skips over image (tabindex="-1")
- [ ] Wishlist button receives focus
- [ ] Focus indicator visible on wishlist
- [ ] Enter key activates buttons
- [ ] Links open with Enter key

**Screen Reader:**

- [ ] Card announces as "article"
- [ ] Link announces vendor name
- [ ] Wishlist button announces state
- [ ] "Save to wishlist" / "Remove from wishlist"
- [ ] Loading spinner announces status
- [ ] "Loading" text available to SR

**Focus Indicators:**

- [ ] Card outline appears on focus-within
- [ ] Wishlist outline appears on focus
- [ ] Outline is visible (2px solid)
- [ ] Outline offset is clear (3px)

---

### F. Performance Tests

**Image Loading:**

- [ ] Images load progressively
- [ ] Lazy loading attribute present
- [ ] Fallback works when image fails
- [ ] No layout shift during load
- [ ] Decoding is async

**Animation Performance:**

- [ ] No jank during scroll
- [ ] Hover transitions smooth
- [ ] Loading spinner smooth at 60fps
- [ ] No lag with many cards

**Reduced Motion:**
Open DevTools > Rendering > "Emulate CSS prefers-reduced-motion"

- [ ] Card hover transform disabled
- [ ] Image zoom disabled
- [ ] Spinner animations stop
- [ ] Progress bar shows full width
- [ ] Focus indicators still work

---

### G. Data Validation Tests

**Prices:**
Test with various price values:

- [ ] `price: 125000` → Shows "₹1,25,000"
- [ ] `price: 0` → Shows "Contact for pricing"
- [ ] `price: null` → Shows "Contact for pricing"
- [ ] `price: undefined` → Shows "Contact for pricing"
- [ ] `price: ""` → Shows "Contact for pricing"
- [ ] `price: -100` → Shows "Contact for pricing"
- [ ] `price: 50000` → Shows "₹50,000"

**Ratings:**
Test with various rating values:

- [ ] `rating: 4.5` → Shows 4.5 stars + "4.5"
- [ ] `rating: 0` → Shows "New to marketplace"
- [ ] `rating: null` → Shows "New to marketplace"
- [ ] `rating: undefined` → Shows "New to marketplace"
- [ ] `rating: 5.0` → Shows 5.0 stars + "5.0"

**Images:**

- [ ] Valid image URL → Displays image
- [ ] Invalid image URL → Shows fallback
- [ ] Empty image URL → Shows fallback
- [ ] Network error → Shows fallback

**Premium Status:**

- [ ] `isPremium: true` → Shows "✦ Featured"
- [ ] `isPremium: false` → No badge
- [ ] `isPremium: null` → No badge
- [ ] `isPremium: undefined` → No badge

---

### H. Browser Compatibility Tests

Test in multiple browsers:

**Chrome/Edge:**

- [ ] All features work
- [ ] Animations smooth
- [ ] Grid layout correct
- [ ] Focus indicators visible

**Firefox:**

- [ ] All features work
- [ ] Animations smooth
- [ ] Grid layout correct
- [ ] Focus indicators visible

**Safari:**

- [ ] All features work
- [ ] Animations smooth
- [ ] Grid layout correct
- [ ] Backdrop-filter works
- [ ] Focus indicators visible

**Mobile Safari (iOS):**

- [ ] Touch targets 44px minimum
- [ ] Hover effects disabled on touch
- [ ] Tap feedback works
- [ ] No double-tap zoom
- [ ] Smooth scrolling

**Mobile Chrome (Android):**

- [ ] Touch targets accessible
- [ ] No tap highlight flash
- [ ] Smooth animations
- [ ] Grid responsive

---

### I. Wishlist Context Tests

**Save Vendor:**

- [ ] Click heart on card
- [ ] Heart fills and changes color
- [ ] Vendor ID added to context
- [ ] State persists on page refresh
- [ ] Shows in wishlist page

**Remove Vendor:**

- [ ] Click filled heart
- [ ] Heart empties
- [ ] Vendor ID removed from context
- [ ] State persists on page refresh
- [ ] Removed from wishlist page

**Multiple Cards:**

- [ ] Save multiple vendors
- [ ] Each heart updates independently
- [ ] Context tracks all IDs
- [ ] State consistent across pages

---

### J. Error Handling Tests

**Network Errors:**

- [ ] API fails → Error state shows
- [ ] Retry button works
- [ ] Loading spinner disappears
- [ ] Error message clear

**Missing Data:**

- [ ] Vendor with no image → Fallback shows
- [ ] Vendor with no price → "Contact for pricing"
- [ ] Vendor with no rating → "New to marketplace"
- [ ] Vendor with no location → Category only

**Invalid Data:**

- [ ] Negative price → "Contact for pricing"
- [ ] Invalid rating → "New to marketplace"
- [ ] Malformed image URL → Fallback shows

---

## 🐛 Common Issues & Solutions

### Issue: Cards look broken or unstyled

**Solution:**

1. Check that `VendorCard.css` is imported in `VendorCard.jsx`
2. Clear browser cache and hard refresh (Ctrl+Shift+R)
3. Check browser console for CSS errors
4. Verify no conflicting `.vendor-card` styles

### Issue: Wishlist button not working

**Solution:**

1. Verify WishlistContext is wrapped around App
2. Check that `toggle` function exists in context
3. Console log `ids` array to verify structure
4. Ensure vendor `_id` is consistent type (string)

### Issue: Loading spinner not showing

**Solution:**

1. Verify CSS was added to `global.css`
2. Check that component is imported correctly
3. Verify `loading` state is `true` before data loads
4. Check browser console for errors

### Issue: Images not loading

**Solution:**

1. Check internet connection (Unsplash requires online)
2. Verify image URL is valid
3. Check browser console for CORS errors
4. Fallback should show if primary fails

### Issue: Prices showing incorrectly

**Solution:**

1. Verify price is a number (not string)
2. Check that `formatPrice` function is called
3. Console log price value to debug
4. Ensure backend returns numeric price

---

## 📊 Test Report Template

```markdown
## Test Report: Premium Components

**Date:** [Date]
**Tester:** [Name]
**Browser:** [Chrome/Firefox/Safari]
**Device:** [Desktop/Mobile]

### Home Page

- Loading Spinner: ✅ / ❌
- Vendor Cards: ✅ / ❌
- Hover Effects: ✅ / ❌
- Wishlist: ✅ / ❌

### Vendor Listing

- Grid Layout: ✅ / ❌
- Filters: ✅ / ❌
- Search: ✅ / ❌
- Load More: ✅ / ❌

### Mobile Responsive

- Card Stacking: ✅ / ❌
- Touch Targets: ✅ / ❌
- Filter Drawer: ✅ / ❌

### Accessibility

- Keyboard Nav: ✅ / ❌
- Screen Reader: ✅ / ❌
- Focus Indicators: ✅ / ❌

### Issues Found

1. [Description]
2. [Description]

### Notes

[Any additional observations]
```

---

## ✨ Success Criteria

All tests should pass for production readiness:

- ✅ All cards display correctly
- ✅ All hover effects work smoothly
- ✅ Wishlist interaction works
- ✅ Loading spinner appears properly
- ✅ Prices format correctly (Indian style)
- ✅ Ratings display accurately
- ✅ Images load or fallback gracefully
- ✅ Mobile responsive works
- ✅ Keyboard navigation works
- ✅ Screen readers work
- ✅ No console errors
- ✅ Performance is smooth

---

**Happy Testing!** 🚀
