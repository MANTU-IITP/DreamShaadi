import React from 'react'
import Home from './components/Home'



import { Routes,Route } from 'react-router-dom'
import Vendors from './vendorpages/Vendors'
import AddPost from './vendorpages/AddPost'
import Postdetail from './vendorpages/Postdetail'
import EditPost from './vendorpages/EditPost'

import Login from './pages/Login';
import SignUp from './pages/SignUp'
import ProtectedRoute from './components/ProtectedRoute'


const App = () => {
  return (
    <Routes>
     <Route path='/' element={<Home/>} />
     
      <Route path="/vendor" element={<Vendors/>}/>
     <Route path="/vendors/wedding-venues/addpost" element={
     <ProtectedRoute>
      <AddPost/>
     </ProtectedRoute>}/>
      <Route path="/vendorpost/:id" element={<Postdetail/>}/>
     < Route path="/vendorpost/edit/:id" element={
      <ProtectedRoute>
     <EditPost/>
      </ProtectedRoute>
      
     }/>
     <Route path="/login" element={<Login/>}/>
     <Route path='/signup' element={<SignUp/>}/>

    </Routes>
  
  )
}

export default App
