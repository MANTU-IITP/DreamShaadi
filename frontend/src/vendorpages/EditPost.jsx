import React, { useEffect, useState } from "react";
import "./AddPost.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vendorData, setVendorData] = useState({
    businessname: "",
    description: "",
    image1: "",
    image2: "",
    image3: "",
    category: "",
    price: "",
    city: "",
    landMark: "",
  });

  // Fetch existing vendor data
  useEffect(() => {
    axios
      .get(`http://localhost:3000/vendor/post/getone/${id}`)
      .then((res) => {
        setVendorData((prev) => ({ ...prev, ...res.data })); // safe merge
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // Handle input changes
  const inputhandeler = (e) => {
    const { name, value } = e.target;
    setVendorData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit (update)
  const formsubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/vendor/post/update/${id}`,
        vendorData
      );
      console.log("Updated:", response.data);
      navigate("/vendor"); // go back after success
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addpost-container">
      <h2 className="addpost-title">Edit Your Venue</h2>
      <div className="addpost-card">
        <h3 className="addpost-form-title">Update Venue Details</h3>

        <form className="addpost-form" onSubmit={formsubmit}>
          {/* Business Name */}
          <div className="addpost-field">
            <label htmlFor="businessname">Business Name</label>
            <input
              type="text"
              name="businessname"
              id="businessname"
              placeholder="Enter business name"
              onChange={inputhandeler}
              value={vendorData.businessname}
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
              onChange={inputhandeler}
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
              onChange={inputhandeler}
              required
            >
              <option value="">Select category</option>
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
              onChange={inputhandeler}
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
              onChange={inputhandeler}
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
              onChange={inputhandeler}
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
              onChange={inputhandeler}
              required
            />
            <input
              type="text"
              name="image2"
              placeholder="Secondary Image URL (optional)"
              value={vendorData.image2}
              onChange={inputhandeler}
            />
            <input
              type="text"
              name="image3"
              placeholder="Third Image URL (optional)"
              value={vendorData.image3}
              onChange={inputhandeler}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="addpost-btn">
            Update Venue
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
