import { useState } from "react";
import { Link } from "react-router-dom";
import "./WeddingTraditions.css";

const traditions = [
  {
    id: "bengali",
    name: "Bengali Weddings",
    description: "Alpana, shubho drishti, and timeless Bengali rituals.",
    image:
      "https://images.unsplash.com/photo-1599409593844-6d4e1b03f0e1?auto=format&fit=crop&w=1200&q=85",
    tag: "Eastern India",
    symbol: "✳",
    featured: true,
  },
  {
    id: "punjabi",
    name: "Punjabi Weddings",
    description: "Joyful celebrations, vibrant attire, and music.",
    image:
      "https://images.unsplash.com/photo-1591604466107-ec97de7fba76?auto=format&fit=crop&w=900&q=85",
    tag: "North India",
    symbol: "✳",
  },
  {
    id: "tamil",
    name: "Tamil Weddings",
    description: "Sacred ceremonies and beautiful South Indian traditions.",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=85",
    tag: "Tamil Nadu",
    symbol: "✳",
  },
  {
    id: "telugu",
    name: "Telugu Weddings",
    description: "Meaningful rituals from Andhra Pradesh and Telangana.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
    tag: "South India",
    symbol: "✳",
  },
  {
    id: "gujarati",
    name: "Gujarati Weddings",
    description: "Colourful festivities, family traditions, and garba.",
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=85",
    tag: "Western India",
    symbol: "✳",
  },
  {
    id: "marathi",
    name: "Marathi Weddings",
    description: "A celebration of Maharashtrian customs and heritage.",
    image:
      "https://images.unsplash.com/photo-1617122793830-209e78344eaa?auto=format&fit=crop&w=900&q=85",
    tag: "Maharashtra",
    symbol: "✳",
  },
  {
    id: "muslim",
    name: "Muslim Weddings",
    description: "Discover Nikah ceremonies and diverse wedding customs.",
    image:
      "https://images.unsplash.com/photo-1605106702842-01a887a31122?auto=format&fit=crop&w=900&q=85",
    tag: "Across India",
    symbol: "✳",
  },
  {
    id: "christian",
    name: "Christian Weddings",
    description: "Church ceremonies, meaningful vows, and receptions.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
    tag: "Across India",
    symbol: "✳",
  },
  {
    id: "sikh",
    name: "Sikh Weddings",
    description: "Explore Anand Karaj and Sikh wedding celebrations.",
    image:
      "https://images.unsplash.com/photo-1591604466107-ec97de7fba76?auto=format&fit=crop&w=900&q=85",
    tag: "Punjab & beyond",
    symbol: "✳",
  },
  {
    id: "malayali",
    name: "Malayali Weddings",
    description: "Kerala traditions, elegant attire, and family celebrations.",
    image:
      "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?auto=format&fit=crop&w=900&q=85",
    tag: "Kerala",
    symbol: "✳",
  },
  {
    id: "rajasthani",
    name: "Rajasthani Weddings",
    description: "Heritage-inspired celebrations and royal aesthetics.",
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=85",
    tag: "Rajasthan",
    symbol: "✳",
  },
  {
    id: "interfaith",
    name: "Interfaith Weddings",
    description: "Personal celebrations that honour more than one tradition.",
    image:
      "https://images.unsplash.com/photo-1591604466107-ec97de7fba76?auto=format&fit=crop&w=900&q=85",
    tag: "Every love story",
    symbol: "✳",
  },
];

function TraditionImage({ tradition, featured = false }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="tradition-image">
      {!imageFailed ? (
        <img
          src={tradition.image}
          alt={`${tradition.name} wedding inspiration`}
          loading={featured ? "eager" : "lazy"}
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="tradition-image-fallback" aria-hidden="true">
          <span>✳</span>
          <span>{tradition.tag}</span>
        </div>
      )}
    </div>
  );
}

function TraditionCard({ tradition, featured = false }) {
  return (
    <Link
      to={`/weddings/${tradition.id}`}
      className={`tradition-card ${
        featured ? "tradition-card-featured" : ""
      }`}
      aria-label={`Explore ${tradition.name}`}
    >
      <TraditionImage tradition={tradition} featured={featured} />

      <div className="tradition-card-overlay" />

      <div className="tradition-card-content">
        <span className="tradition-card-tag">
          <span className="tradition-tag-dot" />
          {tradition.tag}
        </span>

        <h3>{tradition.name}</h3>
        <p>{tradition.description}</p>

        <span className="tradition-card-link">
          Explore traditions
          <span className="tradition-arrow" aria-hidden="true">
            ↗
          </span>
        </span>
      </div>

      <span className="tradition-card-ornament" aria-hidden="true">
        {tradition.symbol}
      </span>
    </Link>
  );
}

export default function WeddingTraditions() {
  const featured = traditions[0];
  const remaining = traditions.slice(1);

  return (
    <section className="wedding-traditions" aria-labelledby="traditions-title">
      <div className="traditions-container">
        <header className="traditions-heading">
          <span className="traditions-eyebrow">
            <span className="traditions-eyebrow-line" />
            INDIA, IN ALL ITS BEAUTY
            <span className="traditions-eyebrow-line" />
          </span>

          <h2 id="traditions-title">
            Every tradition.
            <br />
            <span>One beautiful beginning.</span>
          </h2>

          <p className="traditions-intro">
            From timeless rituals to modern celebrations, discover wedding
            professionals who understand what makes your story special.
          </p>
        </header>

        <div className="traditions-featured-layout">
          <TraditionCard tradition={featured} featured />

          <div className="traditions-side-note">
            <span className="traditions-note-symbol" aria-hidden="true">
              ❋
            </span>
            <p className="traditions-note-label">A celebration of you</p>
            <h3>Your customs. Your people. Your kind of magic.</h3>
            <p>
              Find photographers, venues, makeup artists, decorators, and
              planners for the wedding you have always imagined.
            </p>
            <Link to="/vendor" className="traditions-text-link">
              Discover wedding vendors <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="traditions-grid-heading">
          <div>
            <span className="traditions-section-kicker">FIND YOUR TRADITION</span>
            <h3>Love, celebrated your way.</h3>
          </div>

          <span className="traditions-count">
            {traditions.length.toString().padStart(2, "0")} traditions
          </span>
        </div>

        <div className="traditions-grid">
          {remaining.map((tradition) => (
            <TraditionCard key={tradition.id} tradition={tradition} />
          ))}
        </div>

        <div className="traditions-footer">
          <span className="traditions-footer-flower" aria-hidden="true">
            ✳
          </span>
          <p>
            Every wedding is unique. Many couples beautifully blend
            traditions, customs, and personal touches.
          </p>
          <Link to="/vendor" className="traditions-footer-link">
            Find your perfect vendors <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
