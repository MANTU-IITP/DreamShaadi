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



// import React from "react";
// import "./vendors.css";

// const Vendor = () => {
//   return (
//     <div className="vendor-dashboard">

//       {/* ---------------- Sidebar ---------------- */}
//       <aside className="sidebar">
//         <h2 className="logo">Vendor Panel</h2>

//         <ul className="menu">
//           <li className="active">Dashboard</li>
//           <li>Bookings</li>
//           <li>Reviews</li>
//           <li>My Services</li>
//           <li>Messages</li>
//           <li>Payments</li>
//           <li>Settings</li>
//         </ul>
//       </aside>

//       {/* ---------------- Main Content ---------------- */}
//       <main className="main">

//         {/* Header */}
//         <header className="header">
//           <h2>Welcome Back, Vendor!</h2>
//           <div className="profile">
//             <img src="https://i.pravatar.cc/50" alt="vendor" />
//           </div>
//         </header>

//         {/* Stats Section */}
//         <section className="stats">
//           <div className="card">
//             <h3>Total Bookings</h3>
//             <p>48</p>
//           </div>
//           <div className="card">
//             <h3>Pending Requests</h3>
//             <p>6</p>
//           </div>
//           <div className="card">
//             <h3>Earnings</h3>
//             <p>₹72,500</p>
//           </div>
//           <div className="card">
//             <h3>Reviews</h3>
//             <p>4.8 ⭐</p>
//           </div>
//         </section>

//         {/* Recent Bookings */}
//         <section className="recent">
//           <h3>Recent Bookings</h3>

//           <table className="bookings-table">
//             <thead>
//               <tr>
//                 <th>Client</th>
//                 <th>Event</th>
//                 <th>Date</th>
//                 <th>Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               <tr>
//                 <td>Aman Singh</td>
//                 <td>Wedding Photography</td>
//                 <td>22 Nov 2025</td>
//                 <td className="status confirm">Confirmed</td>
//               </tr>
//               <tr>
//                 <td>Priya Jain</td>
//                 <td>Bridal Makeup</td>
//                 <td>25 Nov 2025</td>
//                 <td className="status pending">Pending</td>
//               </tr>
//               <tr>
//                 <td>Rahul + Shruti</td>
//                 <td>Pre-Wedding Shoot</td>
//                 <td>12 Dec 2025</td>
//                 <td className="status cancel">Cancelled</td>
//               </tr>
//             </tbody>
//           </table>
//         </section>

//       </main>
//     </div>
//   );
// };

// export default Vendor;
