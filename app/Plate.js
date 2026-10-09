"use client";
import { useEffect, useState, useRef } from "react";

export default function Plate() {
  const [scrollY, setScrollY] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3D Magnetic Mouse Tilt for desktop
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Scroll Rotation calculations
  const rot1 = scrollY * 0.25; // Main plate subtle rotation
  const rot2 = scrollY * 0.55; // Secondary wheel clockwise
  const rot3 = -scrollY * 0.45; // Tertiary wheel counter-clockwise

  return (
    <div
      className="kinetic-wheels-showcase"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient Radial Golden Glow */}
      <div className="wheels-ambient-glow" aria-hidden="true" />

      {/* 3D Multi-Wheel Stage */}
      <div
        className="wheels-stage"
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 ? "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" : "transform 0.08s ease-out",
        }}
      >
        {/* ========================================================
            WHEEL 1: Main Centerpiece Platter (Authentic Kerala Sadya)
           ======================================================== */}
        <div className="dish-wheel wheel-main">
          <div
            className="wheel-disc-rotor"
            style={{ transform: `rotate(${rot1}deg)` }}
          >
            <img
              src="/hero_thali.jpg"
              alt="Authentic Kerala Thali Meals at Thali Restaurant Kottayam"
              className="wheel-img"
            />
            <div className="wheel-specular-glare" aria-hidden="true" />
          </div>

          {/* Steaming Hot Smoke Vapor */}
          <div className="wheel-steam-container" aria-hidden="true">
            <span className="wheel-steam ws1" />
            <span className="wheel-steam ws2" />
            <span className="wheel-steam ws3" />
          </div>

          {/* Kinetic Orbit Rim Ring */}
          <div className="wheel-orbital-ring ring-main" aria-hidden="true" />
          
          <div className="wheel-label-pill glass">
            <span>🍛 Unlimited Kerala Sadya</span>
          </div>
        </div>

        {/* ========================================================
            WHEEL 2: Top-Right Spinning Dish Wheel (Crispy Masala Dosa)
           ======================================================== */}
        <div className="dish-wheel wheel-satellite-top">
          <div
            className="wheel-disc-rotor"
            style={{ transform: `rotate(${rot2}deg)` }}
          >
            <img
              src="/masala_dosa.jpg"
              alt="Crispy Specialty Masala Dosa"
              className="wheel-img"
            />
            <div className="wheel-specular-glare" aria-hidden="true" />
          </div>

          {/* Steam Effect */}
          <div className="wheel-steam-container" aria-hidden="true">
            <span className="wheel-steam ws1" />
            <span className="wheel-steam ws2" />
          </div>

          {/* Kinetic Orbit Rim Ring */}
          <div className="wheel-orbital-ring ring-satellite" aria-hidden="true" />

          <div className="wheel-label-pill glass">
            <span>🥞 Crispy Ghee Roast</span>
          </div>
        </div>

        {/* ========================================================
            WHEEL 3: Bottom-Right Spinning Dish Wheel (Malabar Dum Biryani)
           ======================================================== */}
        <div className="dish-wheel wheel-satellite-bot">
          <div
            className="wheel-disc-rotor"
            style={{ transform: `rotate(${rot3}deg)` }}
          >
            <img
              src="/chicken_biryani.jpg"
              alt="Malabar Chicken Dum Biryani"
              className="wheel-img"
            />
            <div className="wheel-specular-glare" aria-hidden="true" />
          </div>

          {/* Steam Effect */}
          <div className="wheel-steam-container" aria-hidden="true">
            <span className="wheel-steam ws2" />
            <span className="wheel-steam ws3" />
          </div>

          {/* Kinetic Orbit Rim Ring */}
          <div className="wheel-orbital-ring ring-satellite" aria-hidden="true" />

          <div className="wheel-label-pill glass">
            <span>🍗 Malabar Dum Biryani</span>
          </div>
        </div>
      </div>
    </div>
  );
}
