import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VendorCard from "../components/VendorCard";
import EmptyState from "../components/EmptyState";
import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const { vendors } = useWishlist();
  return (
    <>
      <Navbar />
      <main className="simple-page">
        <div className="section-heading"><span className="eyebrow">Saved for later</span><h1>My Wishlist</h1></div>
        {vendors.length ? <div className="vendor-grid">{vendors.map((vendor) => <VendorCard key={vendor._id} vendor={vendor} />)}</div> : <EmptyState title="Your wishlist is empty" message="Save vendors while browsing to compare them here." actionLabel="Browse vendors" onAction={() => window.location.assign("/vendor")} />}
      </main>
      <Footer />
    </>
  );
};

export default Wishlist;
