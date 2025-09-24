import React from 'react'
import Home from './components/Home'



import { Routes,Route } from 'react-router-dom'
import Vendors from './vendorpages/Vendors'
import AddPost from './vendorpages/AddPost'
import Postdetail from './vendorpages/Postdetail'
import EditPost from './vendorpages/EditPost'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/vendor" element={<Vendors/>}/>
     <Route path="/vendors/wedding-venues/addpost" element={<AddPost/>}/>
      <Route path="/vendorpost/:id" element={<Postdetail/>}/>
     < Route path="/vendorpost/edit/:id" element={<EditPost/>}/>

    </Routes>
  
  )
}

export default App
