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
    phone: '',
    city: '',
    state: '',
    landMark: '',
    galleryImages: [],
    galleryVideos: [],
    media: []
  };

  const [vendorData, setVendorData] = useState(initialVendorData);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files || []));
  };

  const uploadImages = async () => {
    if (!selectedFiles.length) return { media: [], images: [], videos: [] };
    const token = localStorage.getItem("token") || "";
    if (!token) {
      throw new Error("Please login first");
    }
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    const uploadRes = await axios.post("http://localhost:3000/vendor/post/upload-media", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return uploadRes.data || { media: [], images: [], videos: [] };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();





    try {
      setIsUploading(true);
      const uploadedResult = await uploadImages();
      const payload = { ...vendorData };
      if ((uploadedResult.images || []).length > 0 || (uploadedResult.videos || []).length > 0) {
        payload.media = uploadedResult.media || [];
        payload.galleryImages = uploadedResult.images || [];
        payload.galleryVideos = uploadedResult.videos || [];
        payload.image1 = payload.galleryImages[0] || payload.image1;
        payload.image2 = payload.galleryImages[1] || payload.image2;
        payload.image3 = payload.galleryImages[2] || payload.image3;
      }
      if (!payload.image1) {
        alert("Please upload at least one image file.");
        setIsUploading(false);
        return;
      }

      const res = await axios.post(
        "http://localhost:3000/vendor/post/create",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`
          },
        }
      );


      console.log("Post created:", res.data);
      alert("Post submitted. It will be visible publicly after admin approval.");
      navigate("/vendor");
    } catch (error) {
      console.error("AddPost error:", error.response ?? error);
      if (error?.response?.status === 403) {
        alert("Session expired. Please login again.");
        navigate("/login");
      } else {
        const backendMessage = error?.response?.data?.details || error?.response?.data?.error || error?.message;
        alert(`Upload failed: ${backendMessage || "Unknown error"}`);
      }
    } finally {
      setIsUploading(false);
    }
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

          <div className="addpost-field">
            <label htmlFor="state">State</label>
            <input
              type="text"
              name="state"
              id="state"
              placeholder="Enter state"
              value={vendorData.state}
              onChange={handleChange}
            />
          </div>

          <div className="addpost-field">
            <label htmlFor="phone">Contact Number</label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter contact number"
              value={vendorData.phone}
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

          {/* Media Upload */}
          <div className="addpost-field">
            <label htmlFor="galleryFiles">Upload venue media (images/videos)</label>
            <input
              type="file"
              id="galleryFiles"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
            />
            {selectedFiles.length > 0 && (
              <p>{selectedFiles.length} file(s) selected for Cloudinary upload.</p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="addpost-btn" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Add Venue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
