import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (form.password.length < 4) nextErrors.password = "Password must be at least 4 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      setLoading(true);
      const response = await api.post("/auth/login", form);
      const data = response.data;
      login({
        name: data.name,
        email: data.email,
        role: data.role,
        isAdmin: data.isAdmin,
        vendorProfile: data.vendorProfile,
      }, data.jwtToken);
      showToast("Welcome back to DreamShaadi.", "success");
      navigate(location.state?.from || (data.isAdmin ? "/admin" : data.role === "vendor" ? "/vendor/admin" : "/"));
    } catch (requestError) {
      setErrors({ form: requestError.response?.data?.message || "Email or password is incorrect." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <Link to="/" className="auth-brand">Dream<span>Shaadi</span></Link>
        <blockquote>“A celebration this meaningful deserves planning that feels effortless.”</blockquote>
        <p>Discover trusted wedding professionals across India.</p>
      </section>
      <section className="auth-form-panel">
        <div className="auth-form-wrap">
          <span className="eyebrow">Welcome back</span><h1>Login to your account</h1><p>Continue planning your celebration.</p>
          <form onSubmit={submit}>
            <label>Email address<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" />{errors.email && <small className="form-error">{errors.email}</small>}</label>
            <label>Password<input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Your password" />{errors.password && <small className="form-error">{errors.password}</small>}</label>
            <div className="auth-row"><label className="check-label"><input type="checkbox" /> Remember me</label><button type="button" className="text-link" onClick={() => showToast("Password recovery will be available soon.", "info")}>Forgot password?</button></div>
            {errors.form && <p className="form-error">{errors.form}</p>}
            <button className="btn btn-primary auth-submit" disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
          </form>
          <div className="auth-divider"><span>or</span></div>
          <button type="button" className="social-button" onClick={() => showToast("Google sign-in will be available soon.", "info")}>G&nbsp;&nbsp; Continue with Google</button>
          <p className="auth-switch">New to DreamShaadi? <Link to="/signup">Create an account</Link></p>
        </div>
      </section>
    </main>
  );
};

export default Login;
