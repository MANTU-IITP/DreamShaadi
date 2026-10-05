import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VendorCard from "../components/VendorCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import api from "../utils/api";
import "./VendorListing.css";

const categories = ["Photographer", "Venue", "Caterer", "Decorator", "Mehendi", "Makeup",
  "Music/DJ", "Pandit", "Choreographer", "Invitation", "Transport", "Honeymoon"];

const initialFilters = {
  q: "",
  category: "",
  city: "",
  minPrice: "",
  maxPrice: "",
  rating: "",
  sort: "newest",
};

const VendorListing = ({ explore = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsKey = searchParams.toString();
  const initial = useMemo(() => ({
    ...initialFilters,
    ...Object.fromEntries(new URLSearchParams(paramsKey).entries()),
  }), [paramsKey]);
  const [filters, setFilters] = useState(initial);
  const [result, setResult] = useState({ vendors: [], total: 0, page: 1, pages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => setFilters(initial), [initial]);

  useEffect(() => {
    const loadVendors = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get("/vendor/post/search", {
          params: Object.fromEntries(new URLSearchParams(paramsKey).entries()),
        });
        setResult(response.data);
      } catch {
        setError("We could not load vendors right now.");
      } finally {
        setLoading(false);
      }
    };
    loadVendors();
  }, [paramsKey]);

  const applyFilters = (event) => {
    event?.preventDefault();
    const next = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "") next[key] = value;
    });
    setSearchParams(next);
    setMobileFilters(false);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setSearchParams({});
  };

  const update = (key, value) => setFilters((current) => ({ ...current, [key]: value }));

  const filterPanel = (
    <form className="filter-panel" onSubmit={applyFilters}>
      <div className="filter-heading">
        <div>
          <span className="eyebrow">REFINE YOUR SEARCH</span>
          <h2>Find your fit.</h2>
        </div>
        <button type="button" onClick={clearFilters}>Clear all</button>
      </div>
      
      <label className="filter-field">Search vendors
        <span className="filter-input-wrap">
          <span aria-hidden="true">⌕</span>
          <input value={filters.q} onChange={(event) => update("q", event.target.value)} placeholder="Name, style, service..." />
        </span>
      </label>
      
      <label className="filter-field">Category
        <select value={filters.category} onChange={(event) => update("category", event.target.value)}>
          <option value="">All categories</option>
          {categories.map((category) => <option key={category}>{category}</option>)}
        </select>
      </label>
      
      <label className="filter-field">City
        <input value={filters.city} onChange={(event) => update("city", event.target.value)} placeholder="Delhi, Mumbai, Jaipur..." />
      </label>
      
      <div className="filter-field-group">
        <span className="filter-group-label">Budget range (₹)</span>
        <div className="price-fields">
          <label>
            <span className="sr-only">Minimum price</span>
            <input type="number" min="0" value={filters.minPrice} onChange={(event) => update("minPrice", event.target.value)} placeholder="Min" />
          </label>
          <span className="price-range-dash">—</span>
          <label>
            <span className="sr-only">Maximum price</span>
            <input type="number" min="0" value={filters.maxPrice} onChange={(event) => update("maxPrice", event.target.value)} placeholder="Max" />
          </label>
        </div>
      </div>
      
      <label className="filter-field">Minimum rating
        <select value={filters.rating} onChange={(event) => update("rating", event.target.value)}>
          <option value="">Any rating</option>
          <option value="4">4★ & above</option>
          <option value="3">3★ & above</option>
          <option value="2">2★ & above</option>
        </select>
      </label>
      
      <label className="filter-field">Sort by
        <select value={filters.sort} onChange={(event) => update("sort", event.target.value)}>
          <option value="newest">Newest</option>
          <option value="rating">Top rated</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </label>
      
      <button className="btn btn-primary filter-apply" type="submit">
        Apply filters <span aria-hidden="true">→</span>
      </button>
      
      <p className="filter-reassurance">
        <span aria-hidden="true">✳</span>
        Every vendor is reviewed before joining the marketplace.
      </p>
    </form>
  );

  return (
    <>
      <Navbar />
      <main className="listing-page">
        <section className={`listing-hero ${explore ? "explore-hero" : ""}`}>
          <div className="listing-hero-inner">
            <div className="listing-hero-copy">
              <span className="eyebrow listing-eyebrow">
                <span /> {explore ? "SEARCH EVERY POSSIBILITY" : "TRUSTED WEDDING PROFESSIONALS"}
              </span>
              <h1>
                {explore ? (
                  <>Explore <em>DreamShaadi</em></>
                ) : (
                  <>Find Vendors <em>You Will Love</em></>
                )}
              </h1>
              <p>Compare portfolios, transparent pricing, reviews, and availability in one place.</p>
              
              <div className="listing-hero-points">
                <span><i>✳</i> Verified professionals</span>
                <span><i>♡</i> Save your favourites</span>
                <span><i>↗</i> Direct enquiries</span>
              </div>
            </div>
            
            <div className="listing-hero-art" aria-hidden="true">
              <div className="listing-hero-art-frame">
                <div className="listing-hero-art-inner">
                  <span className="listing-art-sun" />
                  <span className="listing-art-flower">✳</span>
                  <span className="listing-art-vase" />
                  <span className="listing-art-stem stem-one" />
                  <span className="listing-art-stem stem-two" />
                </div>
              </div>
              <div className="listing-hero-stamp">
                <span>EST.</span>
                <strong>2026</strong>
                <span>DREAMSHAADI</span>
              </div>
              <span className="listing-art-caption">YOUR DAY, YOUR WAY</span>
            </div>
          </div>
          <div className="listing-hero-bottom">
            <span className="listing-hero-rule" />
            <span>FIND YOUR PERFECT MATCH</span>
            <span className="listing-hero-rule" />
          </div>
        </section>

        <div className="listing-main-shell">
          <div className="listing-toolbar">
            <div>
              <span className="eyebrow">RESULTS</span>
              <p>Showing <strong>{result.vendors.length}</strong> of <strong>{result.total}</strong> vendors</p>
            </div>
            <button type="button" className="btn btn-outline mobile-filter-button" onClick={() => setMobileFilters(true)}>Filters</button>
          </div>
          
          <div className="listing-layout">
            <aside className="desktop-filters">{filterPanel}</aside>
            <section>
              {loading && <LoadingSpinner label="Curating vendors for you..." />}
              {!loading && error && <EmptyState title="Something went wrong" message={error} actionLabel="Try again" onAction={applyFilters} />}
              {!loading && !error && result.vendors.length === 0 && <EmptyState title="No vendors found" message="Try a nearby city, a broader category, or a different budget." actionLabel="Clear filters" onAction={clearFilters} />}
              {!loading && !error && <div className="vendor-grid listing-grid">{result.vendors.map((vendor) => <VendorCard key={vendor._id} vendor={vendor} />)}</div>}
              {result.page < result.pages && <button type="button" className="btn btn-outline load-more" onClick={() => setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: String(result.page + 1) })}>Load More</button>}
            </section>
          </div>
        </div>
      </main>
      {mobileFilters && (
        <div className="mobile-filter-drawer">
          <button type="button" onClick={() => setMobileFilters(false)} aria-label="Close filters">×</button>
          {filterPanel}
        </div>
      )}
      <Footer />
    </>
  );
};

export default VendorListing;
