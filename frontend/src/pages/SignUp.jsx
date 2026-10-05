import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useToast } from "../context/ToastContext";

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "couple", terms: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (form.name.trim().length < 3) nextErrors.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (form.password.length < 4) nextErrors.password = "Use at least 4 characters.";
    if (form.password !== form.confirmPassword) nextErrors.confirmPassword = "Passwords do not match.";
    if (!form.terms) nextErrors.terms = "Accept the terms to create your account.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      setLoading(true);
      await api.post("/auth/signup", {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      });
      showToast("Account created. You can now log in.", "success");
      navigate("/login");
    } catch (requestError) {
      setErrors({ form: requestError.response?.data?.message || "Unable to create your account." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-visual signup-visual">
        <Link to="/" className="auth-brand">Dream<span>Shaadi</span></Link>
        <blockquote>“Every dream wedding begins with the right people.”</blockquote>
        <p>Join couples and wedding professionals building meaningful celebrations.</p>
      </section>
      <section className="auth-form-panel">
        <div className="auth-form-wrap signup-form-wrap">
          <span className="eyebrow">Join DreamShaadi</span><h1>Create your account</h1><p>Tell us how you plan to use the marketplace.</p>
          <form onSubmit={submit}>
            <div className="role-selector">
              <button type="button" className={form.role === "couple" ? "active" : ""} onClick={() => setForm({ ...form, role: "couple" })}><span>💍</span><strong>I'm a Couple</strong><small>Find and book vendors</small></button>
              <button type="button" className={form.role === "vendor" ? "active" : ""} onClick={() => setForm({ ...form, role: "vendor" })}><span>✦</span><strong>I'm a Vendor</strong><small>Grow my business</small></button>
            </div>
            <label>Full name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />{errors.name && <small className="form-error">{errors.name}</small>}</label>
            <label>Email address<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />{errors.email && <small className="form-error">{errors.email}</small>}</label>
            <div className="form-grid"><label>Password<input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />{errors.password && <small className="form-error">{errors.password}</small>}</label><label>Confirm password<input type="password" value={form.confirmPassword} onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })} />{errors.confirmPassword && <small className="form-error">{errors.confirmPassword}</small>}</label></div>
            <label className="check-label"><input type="checkbox" checked={form.terms} onChange={(event) => setForm({ ...form, terms: event.target.checked })} /> I agree to the <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Policy</Link>.</label>
            {errors.terms && <small className="form-error">{errors.terms}</small>}{errors.form && <p className="form-error">{errors.form}</p>}
            <button className="btn btn-primary auth-submit" disabled={loading}>{loading ? "Creating account..." : "Create Account"}</button>
          </form>
          <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
