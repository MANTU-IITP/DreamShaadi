import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../utils/api";
import { useToast } from "../context/ToastContext";

const categories = ["Photographer", "Venue", "Caterer", "Decorator", "Mehendi", "Makeup", "Music/DJ", "Pandit", "Choreographer", "Invitation", "Transport", "Honeymoon"];
const newPackage = () => ({ name: "", price: "", description: "", inclusions: "" });

const VendorJoin = () => {
  const [step, setStep] = useState(1);
  const [business, setBusiness] = useState({ businessname: "", category: "", description: "", city: "", state: "", landMark: "", price: "", tags: "", availableCities: "" });
  const [media, setMedia] = useState({ primary: null, secondary: null, third: null, gallery: [] });
  const [contact, setContact] = useState({ phone: "", instagram: "", facebook: "", website: "" });
  const [packages, setPackages] = useState([newPackage()]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const previews = useMemo(() => [media.primary, media.secondary, media.third, ...media.gallery].filter(Boolean).map((file) => ({ file, url: URL.createObjectURL(file) })), [media]);

  const validateStep = () => {
    if (step === 1 && (!business.businessname || !business.category || !business.description || !business.city || !business.price)) return "Complete all required business information.";
    if (step === 2 && !media.primary) return "A primary portfolio image is required.";
    if (step === 3 && !contact.phone) return "Add a phone number so couples can contact you.";
    return "";
  };

  const next = () => {
    const validation = validateStep();
    if (validation) return setError(validation);
    setError("");
    setStep((current) => Math.min(current + 1, 3));
  };

  const updatePackage = (index, field, value) => {
    setPackages((current) => current.map((pack, packIndex) => packIndex === index ? { ...pack, [field]: value } : pack));
  };

  const submit = async (event) => {
    event.preventDefault();
    const validation = validateStep();
    if (validation) return setError(validation);
    try {
      setLoading(true);
      const files = [media.primary, media.secondary, media.third, ...media.gallery].filter(Boolean);
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      const uploadResponse = await api.post("/vendor/post/upload-media", formData, { headers: { "Content-Type": "multipart/form-data" } });
      const images = uploadResponse.data.images || [];
      await api.post("/auth/vendor-onboarding", {
        businessName: business.businessname,
        category: business.category,
        city: business.city,
        phone: contact.phone,
        about: business.description,
        profileImage: images[0] || "",
      });
      await api.post("/vendor/post/create", {
        ...business,
        price: Number(business.price),
        phone: contact.phone,
        image1: images[0],
        image2: images[1] || "",
        image3: images[2] || "",
        galleryImages: images.slice(3),
        media: uploadResponse.data.media || [],
        packages: packages.filter((pack) => pack.name && pack.price).map((pack) => ({
          name: pack.name,
          price: Number(pack.price),
          description: pack.description,
          inclusions: pack.inclusions.split("\n").map((item) => item.trim()).filter(Boolean),
        })),
        availableCities: business.availableCities.split(",").map((item) => item.trim()).filter(Boolean),
        tags: business.tags.split(",").map((item) => item.trim()).filter(Boolean),
        socialLinks: { instagram: contact.instagram, facebook: contact.facebook, website: contact.website },
      });
      showToast("Your listing was submitted for admin approval.", "success");
      navigate("/vendor/admin");
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.response?.data?.error || "Unable to submit your vendor listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="onboarding-page">
        <header className="onboarding-header"><span className="eyebrow">Vendor onboarding</span><h1>Build your DreamShaadi portfolio</h1><p>Share the details couples need to confidently choose your business.</p></header>
        <div className="progress-steps">
          {["Business Info", "Media Upload", "Packages & Contact"].map((label, index) => <div key={label} className={step >= index + 1 ? "active" : ""}><span>{index + 1}</span><strong>{label}</strong></div>)}
        </div>
        <form className="onboarding-card" onSubmit={submit}>
          <p className="step-label">Step {step} of 3</p>
          {step === 1 && (
            <div className="onboarding-fields">
              <div className="form-grid"><label>Business name *<input value={business.businessname} onChange={(event) => setBusiness({ ...business, businessname: event.target.value })} /></label><label>Category *<select value={business.category} onChange={(event) => setBusiness({ ...business, category: event.target.value })}><option value="">Choose category</option>{categories.map((category) => <option key={category}>{category}</option>)}</select></label></div>
              <label>Description *<textarea rows="5" value={business.description} onChange={(event) => setBusiness({ ...business, description: event.target.value })} placeholder="Describe your style, experience, and what makes your service special." /></label>
              <div className="form-grid three"><label>City *<input value={business.city} onChange={(event) => setBusiness({ ...business, city: event.target.value })} /></label><label>State<input value={business.state} onChange={(event) => setBusiness({ ...business, state: event.target.value })} /></label><label>Landmark<input value={business.landMark} onChange={(event) => setBusiness({ ...business, landMark: event.target.value })} /></label></div>
              <div className="form-grid"><label>Starting price (₹) *<input type="number" min="0" value={business.price} onChange={(event) => setBusiness({ ...business, price: event.target.value })} /></label><label>Cities served<input value={business.availableCities} onChange={(event) => setBusiness({ ...business, availableCities: event.target.value })} placeholder="Delhi, Gurgaon, Noida" /></label></div>
              <label>Search tags<input value={business.tags} onChange={(event) => setBusiness({ ...business, tags: event.target.value })} placeholder="destination, candid, luxury" /></label>
            </div>
          )}
          {step === 2 && (
            <div className="onboarding-fields">
              <div className="upload-grid"><label className="upload-box">Primary image *<input type="file" accept="image/*" onChange={(event) => setMedia({ ...media, primary: event.target.files?.[0] || null })} /><span>Choose your strongest portfolio image</span></label><label className="upload-box">Second image<input type="file" accept="image/*" onChange={(event) => setMedia({ ...media, secondary: event.target.files?.[0] || null })} /><span>Optional</span></label><label className="upload-box">Third image<input type="file" accept="image/*" onChange={(event) => setMedia({ ...media, third: event.target.files?.[0] || null })} /><span>Optional</span></label></div>
              <label className="upload-box gallery-upload">Gallery images (up to 5)<input type="file" accept="image/*" multiple onChange={(event) => setMedia({ ...media, gallery: Array.from(event.target.files || []).slice(0, 5) })} /><span>Select multiple images</span></label>
              <div className="preview-grid">{previews.map(({ file, url }) => <img key={`${file.name}-${file.lastModified}`} src={url} alt={`Preview ${file.name}`} />)}</div>
            </div>
          )}
          {step === 3 && (
            <div className="onboarding-fields">
              <div className="package-editor"><div className="editor-heading"><h2>Packages</h2>{packages.length < 3 && <button type="button" className="text-link" onClick={() => setPackages([...packages, newPackage()])}>+ Add package</button>}</div>{packages.map((pack, index) => <div className="package-edit-card" key={`package-${index + 1}`}><div className="form-grid"><label>Package name<input value={pack.name} onChange={(event) => updatePackage(index, "name", event.target.value)} placeholder="Gold" /></label><label>Price (₹)<input type="number" min="0" value={pack.price} onChange={(event) => updatePackage(index, "price", event.target.value)} /></label></div><label>Description<input value={pack.description} onChange={(event) => updatePackage(index, "description", event.target.value)} /></label><label>Inclusions, one per line<textarea value={pack.inclusions} onChange={(event) => updatePackage(index, "inclusions", event.target.value)} /></label>{packages.length > 1 && <button type="button" className="remove-button" onClick={() => setPackages(packages.filter((_, packIndex) => packIndex !== index))}>Remove package</button>}</div>)}</div>
              <div className="form-grid"><label>Phone number *<input value={contact.phone} onChange={(event) => setContact({ ...contact, phone: event.target.value })} /></label><label>Instagram URL<input type="url" value={contact.instagram} onChange={(event) => setContact({ ...contact, instagram: event.target.value })} /></label><label>Facebook URL<input type="url" value={contact.facebook} onChange={(event) => setContact({ ...contact, facebook: event.target.value })} /></label><label>Website URL<input type="url" value={contact.website} onChange={(event) => setContact({ ...contact, website: event.target.value })} /></label></div>
            </div>
          )}
          {error && <p className="form-error">{error}</p>}
          <div className="form-actions">{step > 1 && <button type="button" className="btn btn-outline" onClick={() => { setStep(step - 1); setError(""); }}>Back</button>}{step < 3 ? <button type="button" className="btn btn-primary" onClick={next}>Continue</button> : <button className="btn btn-primary" disabled={loading}>{loading ? "Submitting..." : "Submit for Approval"}</button>}</div>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default VendorJoin;
