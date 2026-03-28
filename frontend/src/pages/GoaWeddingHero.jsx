import React from "react";
import { useNavigate } from "react-router-dom";

const GoaWeddingHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center text-center">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3835638/pexels-photo-3835638.jpeg')",
        }}
      ></div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

      {/* Content */}
      <div className="relative z-10 px-4 max-w-3xl text-white">

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-wide leading-tight mb-6 animate-fadeInUp">
          Plan Your Dream Goa Wedding 💍
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-8">
          Discover the best venues, photographers, and planners in Goa
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <button
            onClick={() => navigate("/vendor?city=goa")}
            className="px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-full text-white font-semibold shadow-lg transition transform hover:-translate-y-1"
          >
            Explore Vendors
          </button>

          <button
            onClick={() => navigate("/vendor")}
            className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 transition"
          >
            Browse All
          </button>

        </div>
      </div>
    </section>
  );
};

export default GoaWeddingHero;