import React, { useState } from 'react';
import './AddPost.css';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
const AddPost = () => {
  const initialVendorData = {
    businessname: '',
    description: '',
    image1: '',
    image2: '',
    image3: '',
    category: '',
    price: '',
    city: '',
    landMark: ''
  };

  const [vendorData, setVendorData] = useState(initialVendorData);
  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   await axios.post("http://localhost:3000/vendor/post/create",vendorData)
   .then((response)=>{
    console.log(response)
    navigate("/vendor")

   }).catch((error)=>{
    console.log(error)

   });
   
  };

  return (
    <div className="addpost-container">
      <h2 className="addpost-title">List Your Venue</h2>
      <div className="addpost-card">
        <h3 className="addpost-form-title">Add New Venue</h3>

        <form className="addpost-form" onSubmit={handleSubmit}>
          {/* Business Name */}
          <div className="addpost-field">
            <label htmlFor="businessname">Business Name</label>
            <input
              type="text"
              name="businessname"
              id="businessname"
              placeholder="Enter business name"
              value={vendorData.businessname}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="addpost-field">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Enter venue description"
              rows="4"
              value={vendorData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div className="addpost-field">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              value={vendorData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Banquet Hall">Banquet Hall</option>
              <option value="Resort">Resort</option>
              <option value="Garden">Garden</option>
              <option value="Hotel">Hotel</option>
              <option value="Destination Wedding">Destination Wedding</option>
            </select>
          </div>

          {/* Price */}
          <div className="addpost-field">
            <label htmlFor="price">Price (INR)</label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Enter price"
              value={vendorData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* City */}
          <div className="addpost-field">
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="Enter city"
              value={vendorData.city}
              onChange={handleChange}
              required
            />
          </div>

          {/* Landmark */}
          <div className="addpost-field">
            <label htmlFor="landMark">Landmark</label>
            <input
              type="text"
              name="landMark"
              id="landMark"
              placeholder="Enter nearby landmark"
              value={vendorData.landMark}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image URLs */}
          <div className="addpost-field">
            <label>Venue Images (URLs)</label>
            <input
              type="text"
              name="image1"
              placeholder="Primary Image URL (required)"
              value={vendorData.image1}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="image2"
              placeholder="Secondary Image URL (optional)"
              value={vendorData.image2}
              onChange={handleChange}
            />
            <input
              type="text"
              name="image3"
              placeholder="Third Image URL (optional)"
              value={vendorData.image3}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="addpost-btn">
            Add Venue
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
