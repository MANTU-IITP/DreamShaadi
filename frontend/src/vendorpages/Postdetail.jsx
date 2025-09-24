import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Postdetail.css";

function Postdetail() {
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

  useEffect(() => {
    axios
      .get(`http://localhost:3000/vendor/post/getone/${id}`)
      .then((res) => {
        setVendorData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // handle delete
  const handleDelete = async() => {
    await axios.delete(`http://localhost:3000/vendor/post/delete/${id}`)
    .then((response)=>{
          console.log(response)
          navigate("/vendor")

          

        })
        .catch((error)=>{
            console.log(error)

        })

    
  };

  // handle edit → redirect to edit page
  const handleEdit = () => {
    navigate(`/vendorpost/edit/${id}`);
  };

  return (
    <div className="venue-container">
      {/* Image Section */}
      <div className="venue-gallery">
        <div className="venue-main-image">
          {vendorData.image1 ? (
            <img src={vendorData.image1} alt="Main Venue" />
          ) : (
            <div className="placeholder">No Main Image</div>
          )}
        </div>
        <div className="venue-side-images">
          {vendorData.image2 ? (
            <img src={vendorData.image2} alt="Second Venue" />
          ) : (
            <div className="placeholder">No Image 2</div>
          )}
          {vendorData.image3 ? (
            <img src={vendorData.image3} alt="Third Venue" />
          ) : (
            <div className="placeholder">No Image 3</div>
          )}
        </div>
      </div>

      {/* Details Section */}
      <div className="venue-details">
        <h2>{vendorData.businessname}</h2>
        <p className="venue-meta">
          {vendorData.category} • {vendorData.city}
        </p>
        <p className="venue-price">
          {vendorData.price ? `₹${vendorData.price}` : "Price not set"}
        </p>
        <p className="venue-description">{vendorData.description}</p>
        <p className="venue-landmark">📍 {vendorData.landMark}</p>

        {/* Action buttons */}
        <div className="venue-actions">
          <button className="btn edit-btn" onClick={handleEdit}>
             Edit
          </button>
          <button className="btn delete-btn" onClick={handleDelete}>
             Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Postdetail;


