import { useState } from "react";
import { Link } from "react-router-dom";

const ConsentBanner = () => {
  const [visible, setVisible] = useState(() => !localStorage.getItem("dreamshaadi_consent"));
  const accept = () => {
    localStorage.setItem("dreamshaadi_consent", new Date().toISOString());
    setVisible(false);
  };
  if (!visible) return null;

  return (
    <aside className="consent-banner">
      <p>DreamShaadi collects your name, phone, and email to connect you with wedding vendors. By using this site, you consent to our <Link to="/privacy">Privacy Policy</Link>.</p>
      <div>
        <Link to="/privacy" className="btn btn-outline">Learn More</Link>
        <button type="button" className="btn btn-primary" onClick={accept}>I Accept</button>
      </div>
    </aside>
  );
};

export default ConsentBanner;
