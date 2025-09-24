import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMapMarkerAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Vendors.css'; // We'll create this CSS file
import { useNavigate,Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Vendors = () => {
 let navigate=useNavigate()

 const[vendors,setvendors]=useState([])

 let handlebtn=()=>{
    navigate("/vendors/wedding-venues/addpost")
 }

 useEffect(()=>{
    const fetchData=async () => {
        const response=await axios.get("http://localhost:3000/vendor/post/getall")
        setvendors(response.data)
        console.log(response.data)
         
    }
    fetchData()
 },[])

  return (
    <>
      <div className="vendor-container">
        <h1 className="vendor-heading">Premium Wedding Venues</h1>
        
        <div className="vendor-action-bar">
          <button type="button" className="vendor-add-btn"  onClick={handlebtn}>
            <FontAwesomeIcon icon={faPlus} /> Add Your Venue
          </button>
        </div>

        <div className="vendor-venue-container">
          {vendors.map(data => (
            <div key={data.id} className="vendor-venue-card">
              <div className="vendor-img-container">
                <img src={data.image1} alt={data.businessname} className="vendor-venue-img" />
                <span className="vendor-venue-badge">{data.category}</span>
              </div>
              
              <div className="vendor-venue-details">
                <h3 className="vendor-venue-name">{data.businessname}</h3>
                <div className="vendor-venue-meta">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <span>{data.city}</span>
                </div>
                
                <div className="vendor-venue-price">
                  <span>Starting from:</span>
                  <strong>₹{data.price.toLocaleString('en-IN')}</strong>
                </div>

                <Link to={`/vendorpost/${data._id}`} className="vendor-venue-button">
                  View Details <FontAwesomeIcon icon={faArrowRight} /></Link>
               
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Vendors;