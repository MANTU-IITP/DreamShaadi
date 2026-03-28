# Bootstrap Implementation Guide for Wedding Planner Project

## ✅ Bootstrap is Now Installed!

Bootstrap has been successfully added to your project. You can now use Bootstrap classes alongside TailwindCSS.

## 📚 How to Use Bootstrap in Your Components

### 1. Common Bootstrap Components for Your Project

#### Navbar Example

```jsx
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">
      WeddingPlanner
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <a className="nav-link" href="/vendor">
            Vendors
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login">
            Login
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

#### Card Grid for Vendors

```jsx
<div className="container">
  <div className="row row-cols-1 row-cols-md-3 g-4">
    {vendors.map((vendor) => (
      <div className="col" key={vendor._id}>
        <div className="card h-100">
          <img
            src={vendor.image1}
            className="card-img-top"
            alt={vendor.businessname}
          />
          <div className="card-body">
            <h5 className="card-title">{vendor.businessname}</h5>
            <p className="card-text">{vendor.city}</p>
            <span className="badge bg-primary">₹{vendor.price}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
```

#### Form Example

```jsx
<form className="row g-3">
  <div className="col-md-6">
    <label className="form-label">Business Name</label>
    <input type="text" className="form-control" />
  </div>
  <div className="col-md-6">
    <label className="form-label">Category</label>
    <select className="form-select">
      <option>Wedding Venues</option>
      <option>Photographers</option>
    </select>
  </div>
  <div className="col-12">
    <button type="submit" className="btn btn-primary">
      Submit
    </button>
  </div>
</form>
```

#### Modal Example

```jsx
<button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Open Modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Vendor Details</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div className="modal-body">
        Modal content here
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save</button>
      </div>
    </div>
  </div>
</div>
```

### 2. Bootstrap Utility Classes

#### Spacing

- `m-3` = margin all sides
- `mt-4` = margin top
- `p-5` = padding all sides
- `py-3` = padding top and bottom

#### Colors

- `bg-primary`, `bg-success`, `bg-danger`, `bg-light`, `bg-dark`
- `text-primary`, `text-muted`, `text-white`

#### Display & Flexbox

- `d-flex` = display flex
- `justify-content-center` = center horizontally
- `align-items-center` = center vertically
- `gap-3` = gap between flex items

#### Grid System

- `container` or `container-fluid`
- `row` for rows
- `col`, `col-md-6`, `col-lg-4` for columns

### 3. Responsive Design

```jsx
// Different column sizes for different screens
<div className="row">
  <div className="col-12 col-md-6 col-lg-4">
    {/* Full width on mobile, half on tablet, third on desktop */}
  </div>
</div>
```

## 🎨 Using Bootstrap with Your Existing Pages

### Update Your Navbar Component

Replace custom CSS with Bootstrap classes for responsive navbar.

### Update Vendor Cards

Use Bootstrap card components for consistent styling.

### Update Forms

Use Bootstrap form controls for better UX and validation.

### Update Admin Dashboard

Use Bootstrap tables, badges, and buttons for cleaner UI.

## 📖 Bootstrap Resources

- Official Docs: https://getbootstrap.com/docs/5.3/
- Components: https://getbootstrap.com/docs/5.3/components/
- Utilities: https://getbootstrap.com/docs/5.3/utilities/
- Examples: https://getbootstrap.com/docs/5.3/examples/

## 🔄 Bootstrap vs TailwindCSS

You now have both installed. You can:

1. Use Bootstrap for major components (navbar, cards, modals)
2. Use TailwindCSS for custom styling and utilities
3. Gradually migrate to one or the other

## 💡 Next Steps

1. Check the example files created:
   - `frontend/src/components/HomeBootstrapExample.jsx`
   - `frontend/src/pages/LoginBootstrap.jsx`

2. Start converting your existing components to use Bootstrap

3. Run your dev server: `npm run dev` in the frontend folder

4. Visit http://localhost:5173 to see your app
