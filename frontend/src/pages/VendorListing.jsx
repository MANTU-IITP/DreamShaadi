import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VendorCard from "../components/VendorCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import api from "../utils/api";

const categories = ["Photographer", "Venue", "Caterer", "Decorator", "Mehendi", "Makeup", "Music/DJ", "Pandit", "Choreographer", "Invitation", "Transport", "Honeymoon"];
const initialFilters = { q: "", category: "", city: "", minPrice: "", maxPrice: "", rating: "", sort: "newest" };

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
        const response = await api.get("/vendor/post/search", { params: Object.fromEntries(new URLSearchParams(paramsKey).entries()) });
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
      <div className="filter-heading"><h2>Filters</h2><button type="button" onClick={clearFilters}>Clear All</button></div>
      <label>Search<input value={filters.q} onChange={(event) => update("q", event.target.value)} placeholder="Name, style, service..." /></label>
      <label>Category<select value={filters.category} onChange={(event) => update("category", event.target.value)}><option value="">All categories</option>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
      <label>City<input value={filters.city} onChange={(event) => update("city", event.target.value)} placeholder="Delhi, Mumbai, Jaipur..." /></label>
      <div className="price-fields"><label>Min price<input type="number" min="0" value={filters.minPrice} onChange={(event) => update("minPrice", event.target.value)} /></label><label>Max price<input type="number" min="0" value={filters.maxPrice} onChange={(event) => update("maxPrice", event.target.value)} /></label></div>
      <label>Minimum rating<select value={filters.rating} onChange={(event) => update("rating", event.target.value)}><option value="">Any rating</option><option value="4">4★ & above</option><option value="3">3★ & above</option><option value="2">2★ & above</option></select></label>
      <label>Sort by<select value={filters.sort} onChange={(event) => update("sort", event.target.value)}><option value="newest">Newest</option><option value="rating">Top rated</option><option value="price_asc">Price: Low to High</option><option value="price_desc">Price: High to Low</option></select></label>
      <button className="btn btn-primary" type="submit">Apply Filters</button>
    </form>
  );

  return (
    <>
      <Navbar />
      <main className="listing-page">
        <section className={`listing-hero ${explore ? "explore-hero" : ""}`}>
          <span className="eyebrow">{explore ? "Search every possibility" : "Trusted wedding professionals"}</span>
          <h1>{explore ? "Explore DreamShaadi" : "Find Vendors You Will Love"}</h1>
          <p>Compare portfolios, transparent pricing, reviews, and availability in one place.</p>
        </section>
        <div className="listing-toolbar">
          <p>Showing <strong>{result.vendors.length}</strong> of <strong>{result.total}</strong> vendors</p>
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
      </main>
      {mobileFilters && <div className="mobile-filter-drawer"><button type="button" onClick={() => setMobileFilters(false)} aria-label="Close filters">×</button>{filterPanel}</div>}
      <Footer />
    </>
  );
};

export default VendorListing;
