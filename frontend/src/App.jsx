import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import VendorListing from "./pages/VendorListing";
import VendorDetail from "./pages/VendorDetail";
import Explore from "./pages/Explore";
import Stories from "./pages/Stories";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Wishlist from "./pages/Wishlist";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import AdminDashboard from "./pages/AdminDashboard";
import VendorJoin from "./vendorpages/VendorJoin";
import VendorDashboard from "./vendorpages/VendorDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import ConsentBanner from "./components/ConsentBanner";
import EmptyState from "./components/EmptyState";

const App = () => (
  <>
    <div className="route-fade">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/vendor" element={<VendorListing />} />
        <Route path="/vendor/explore" element={<Explore />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/vendorpost/:id" element={<VendorDetail />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />

        <Route path="/vendor/join" element={<ProtectedRoute><VendorJoin /></ProtectedRoute>} />
        <Route path="/vendors/wedding-venues/addpost" element={<ProtectedRoute><VendorJoin /></ProtectedRoute>} />
        <Route path="/vendor/admin" element={<ProtectedRoute><VendorDashboard /></ProtectedRoute>} />
        <Route path="/vendor/admin/:id/leads" element={<ProtectedRoute><VendorDashboard initialTab="Leads & Enquiries" /></ProtectedRoute>} />
        <Route path="/vendor/admin/:id/bookings" element={<ProtectedRoute><VendorDashboard initialTab="Bookings" /></ProtectedRoute>} />
        <Route path="/vendor/admin/:id/media" element={<ProtectedRoute><VendorDashboard initialTab="Media Manager" /></ProtectedRoute>} />
        <Route path="/vendorpost/edit/:id" element={<ProtectedRoute><VendorDashboard initialTab="Settings" /></ProtectedRoute>} />

        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="*" element={<main className="simple-page"><EmptyState title="Page not found" message="The page you requested does not exist." actionLabel="Return home" onAction={() => window.location.assign("/")} /></main>} />
      </Routes>
    </div>
    <ConsentBanner />
  </>
);

export default App;
