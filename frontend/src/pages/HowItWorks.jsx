import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./EditorialPages.css";

const steps = [
  {
    number: "01",
    label: "START WITH A VISION",
    title: "Imagine your celebration.",
    description:
      "Think about your style, traditions, location, guest list and the moments that matter most. You don't need every detail figured out to begin.",
    tip: "A mood, a colour or a tradition is a beautiful place to start.",
    icon: "✳",
  },
  {
    number: "02",
    label: "EXPLORE YOUR OPTIONS",
    title: "Discover the right vendors.",
    description:
      "Browse photographers, venues, caterers, makeup artists, decorators and more. Explore profiles to find services and styles that suit your plans.",
    tip: "Explore categories one at a time to keep planning manageable.",
    icon: "⌕",
  },
  {
    number: "03",
    label: "KEEP YOUR FAVOURITES",
    title: "Create your shortlist.",
    description:
      "Save vendors you love to your wishlist, revisit your favourites and compare their profiles as your preferences become clearer.",
    tip: "A shortlist helps you keep promising options in one place.",
    icon: "♡",
  },
  {
    number: "04",
    label: "MAKE IT HAPPEN",
    title: "Connect and plan the details.",
    description:
      "Use the contact or enquiry options provided on vendor profiles to discuss availability, pricing, requirements and the details of your celebration.",
    tip: "Confirm all terms, availability and costs directly with the vendor.",
    icon: "↗",
  },
];

const planningCategories = [
  { name: "Wedding Venues", category: "Venue", number: "01" },
  { name: "Photography", category: "Photographer", number: "02" },
  { name: "Food & Catering", category: "Caterer", number: "03" },
  { name: "Décor & Flowers", category: "Decorator", number: "04" },
  { name: "Bridal Makeup", category: "Makeup", number: "05" },
  { name: "Music & Entertainment", category: "Music/DJ", number: "06" },
];

const faqs = [
  {
    question: "Can I explore vendors before I decide on my wedding style?",
    answer:
      "Yes. Start by browsing vendor categories and their profiles. You can explore different styles first and refine your preferences as your plans take shape.",
  },
  {
    question: "How do I save vendors I like?",
    answer:
      "Use the wishlist feature when you're signed in. Your saved vendors help you revisit your favourites while you continue exploring.",
  },
  {
    question: "Can I plan a wedding that honours different traditions?",
    answer:
      "Absolutely. Your celebration can reflect your family's customs, personal preferences and the traditions that matter to you. Explore vendors and discuss your specific requirements with them.",
  },
  {
    question: "Does DreamShaadi confirm vendor availability or prices?",
    answer:
      "Availability, final pricing, deliverables and booking terms should be confirmed directly with the vendor. Review the details carefully before making a commitment.",
  },
];

const HowItWorks = () => {
  return (
    <>
      <Navbar />
      
      <main className="editorial-page how-page">
        <section className="editorial-hero how-hero">
          <div className="editorial-hero-copy">
            <span className="editorial-eyebrow">
              <span className="eyebrow-line" />
              A MORE THOUGHTFUL WAY TO PLAN
            </span>
            
            <h1>
              Your dream day,
              <br />
              one <em>step at a time.</em>
            </h1>
            
            <p>
              Wedding planning doesn't have to feel overwhelming. Explore
              ideas, discover vendors you love and build a celebration
              that feels completely yours.
            </p>
            
            <div className="editorial-hero-actions">
              <Link to="/vendor" className="editorial-button">
                Find your vendors <span aria-hidden="true">↗</span>
              </Link>
              <a href="#planning-steps" className="editorial-text-link">
                See how it works <span aria-hidden="true">↓</span>
              </a>
            </div>
            
            <div className="how-hero-promise">
              <span aria-hidden="true">✳</span>
              <span>Your vision leads. Your choices shape the day.</span>
            </div>
          </div>
          
          <div className="how-hero-visual">
            <img
              src="https://themangalamtours.com/blog-3.webp"
              alt="Elegant wedding mandap in a palace courtyard"
              fetchPriority="high"
            />
            <div className="how-hero-image-label">
              <span>YOUR DAY, YOUR WAY</span>
              <span>THE DREAMSHAADI GUIDE</span>
            </div>
            
            <div className="how-floating-note">
              <span className="floating-note-icon" aria-hidden="true">
                ♡
              </span>
              <span>
                <strong>It's personal.</strong>
                <small>Make every detail yours.</small>
              </span>
            </div>
          </div>
        </section>
        
        <section className="how-intro">
          <span className="editorial-eyebrow">FOUR SIMPLE STEPS</span>
          <h2>
            Less overwhelm.
            <br />
            <em>More moments to look forward to.</em>
          </h2>
          <p>
            Start wherever you are. You can explore ideas, save options
            and make decisions at your own pace.
          </p>
        </section>
        
        <section className="how-steps-section editorial-section" id="planning-steps">
          <div className="how-step-list">
            {steps.map((step, index) => (
              <article className="how-step" key={step.number}>
                <div className="how-step-rail" aria-hidden="true">
                  <span className="how-step-number">{step.number}</span>
                  {index !== steps.length - 1 && (
                    <span className="how-step-line" />
                  )}
                </div>
                
                <div className="how-step-copy">
                  <span className="editorial-eyebrow">{step.label}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <div className="how-step-tip">
                    <span aria-hidden="true">✳</span>
                    {step.tip}
                  </div>
                </div>
                
                <div className="how-step-symbol" aria-hidden="true">
                  {step.icon}
                </div>
              </article>
            ))}
          </div>
        </section>
        
        <section className="how-categories-section">
          <div className="editorial-section-heading">
            <div>
              <span className="editorial-eyebrow">YOUR CELEBRATION, PIECE BY PIECE</span>
              <h2>Find what you need.</h2>
            </div>
            <p>
              Explore individual services at your own pace.
              <br />
              Your plan can grow as your ideas do.
            </p>
          </div>
          
          <div className="how-category-grid">
            {planningCategories.map((item) => (
              <Link
                key={item.category}
                to={`/vendor?category=${encodeURIComponent(item.category)}`}
                className="how-category-card"
              >
                <span className="how-category-number">{item.number}</span>
                <span className="how-category-name">{item.name}</span>
                <span className="how-category-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </div>
          
          <div className="how-all-vendors">
            <Link to="/vendor" className="editorial-text-link">
              Explore all vendors <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
        
        <section className="how-planning-note">
          <div className="how-planning-note-symbol" aria-hidden="true">
            ✳
          </div>
          <div>
            <span className="editorial-eyebrow">A NOTE TO REMEMBER</span>
            <h2>
              Your traditions.
              <br />
              Your people. <em>Your story.</em>
            </h2>
            <p>
              Whether your wedding is intimate or grand, rooted in family
              traditions or a blend of cultures, there is no single right
              way to celebrate. Focus on the people, rituals and details
              that mean the most to you.
            </p>
          </div>
        </section>
        
        <section className="how-faq-section editorial-section">
          <div className="editorial-section-heading">
            <div>
              <span className="editorial-eyebrow">A FEW HELPFUL ANSWERS</span>
              <h2>Good to know.</h2>
            </div>
            <p>
              A little clarity can make
              <br />
              the journey feel easier.
            </p>
          </div>
          
          <div className="how-faq-list">
            {faqs.map((faq, index) => (
              <details className="how-faq" key={faq.question}>
                <summary>
                  <span className="how-faq-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="how-faq-question">{faq.question}</span>
                  <span className="how-faq-toggle" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        
        <section className="editorial-cta">
          <div className="editorial-cta-mark" aria-hidden="true">
            ✳
          </div>
          <span className="editorial-eyebrow">READY WHEN YOU ARE</span>
          <h2>
            Let's make room
            <br />
            for <em>something beautiful.</em>
          </h2>
          <p>
            Take the first step, explore your options and start shaping
            your wedding vision.
          </p>
          <Link to="/vendor" className="editorial-button">
            Begin exploring <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default HowItWorks;
