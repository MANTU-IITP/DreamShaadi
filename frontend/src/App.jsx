import React from 'react'
import Home from './components/Home'



import { Routes,Route } from 'react-router-dom'
import Vendors from './vendorpages/Vendors'
import VendorHub from './vendorpages/VendorHub'
import VendorJoin from './vendorpages/VendorJoin'
import AddPost from './vendorpages/AddPost'
import Postdetail from './vendorpages/Postdetail'
import EditPost from './vendorpages/EditPost'
import VendorAdmin from './vendorpages/VendorAdmin'
import VendorLeads from './vendorpages/VendorLeads'
import VendorMediaManager from './vendorpages/VendorMediaManager'
import AdminDashboard from './pages/AdminDashboard'

import Login from './pages/Login';
import SignUp from './pages/SignUp'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'


const App = () => {
  return (
    <Routes>
     <Route path='/' element={<Home/>} />
     
      <Route path="/vendor" element={<Vendors/>}/>
      <Route path="/vendor/explore" element={<VendorHub/>}/>
      <Route path="/vendor/join" element={
      <ProtectedRoute>
        <VendorJoin />
      </ProtectedRoute>
     }/>
     <Route path="/vendor/admin" element={
      <ProtectedRoute>
        <VendorAdmin />
      </ProtectedRoute>
     }/>
     <Route path="/vendor/admin/:id/leads" element={
      <ProtectedRoute>
        <VendorLeads />
      </ProtectedRoute>
     }/>
     <Route path="/vendor/admin/:id/media" element={
      <ProtectedRoute>
        <VendorMediaManager />
      </ProtectedRoute>
     }/>
     <Route path="/admin" element={
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
     }/>
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
