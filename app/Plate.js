"use client";
import { useEffect, useState, useRef } from "react";

const SATELLITE_DISHES = [
  {
    id: "dosa",
    n: "Crispy Ghee Roast",
    img: "/masala_dosa.jpg",
    tag: "🥞 Crispy Ghee Roast",
    angle: 0,
  },
  {
    id: "biryani",
    n: "Malabar Dum Biryani",
    img: "/chicken_biryani.jpg",
    tag: "🍗 Malabar Biryani",
    angle: 45,
  },
  {
    id: "beef-roast",
    n: "Porotta & Beef Roast",
    img: "/beef_roast.jpg",
    tag: "🥩 Porotta & Beef Fry",
    angle: 90,
  },
  {
    id: "fish-curry",
    n: "Kottayam Meen Curry",
    img: "/fish_curry.jpg",
    tag: "🐟 Kottayam Fish Curry",
    angle: 135,
  },
  {
    id: "chicken-dosa",
    n: "Special Chicken Dosa",
    img: "/chicken_dosa.jpg",
    tag: "🥘 Non-Veg Dosa",
    angle: 180,
  },
  {
    id: "appam-stew",
    n: "Appam & Chicken Stew",
    img: "/appam_stew.jpg",
    tag: "🍲 Appam & Stew",
    angle: 225,
  },
  {
    id: "payasam",
    n: "Rich Palada Payasam",
    img: "/palada_payasam.jpg",
    tag: "✨ Daily Sweet",
    angle: 270,
  },
  {
    id: "sambar",
    n: "Kottayam Sambar & Curries",
    img: "/sambar.jpg",
    tag: "🍲 Homestyle Curry",
    angle: 315,
  },
];

export default function Plate() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const stage = document.getElementById("hero-stage");
          if (stage) {
            const rect = stage.getBoundingClientRect();
            const totalScrollable = stage.offsetHeight - window.innerHeight;
            if (totalScrollable > 0) {
              const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
              setRotationAngle(progress * 360);
            }
          } else {
            const rot = (window.scrollY * 0.4) % 360;
            setRotationAngle(rot);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3D Magnetic Mouse Tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const spinStep = (dir) => {
    setRotationAngle((prev) => prev + dir * 45);
  };

  return (
    <div
      className="hero-dish-showcase"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient Radial Golden Aura */}
      <div className="showcase-ambient-glow" aria-hidden="true" />

      {/* 3D Kinetic Orbital Stage */}
      <div
        className="showcase-stage"
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition:
            tilt.x === 0
              ? "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
              : "transform 0.08s ease-out",
        }}
      >
        {/* CENTERPIECE: Signature Thali Sadya (Fills Center Void) */}
        <div className="centerpiece-dish-wrapper">
          <div className="centerpiece-frame">
            <img
              src="/hero_thali.jpg"
              alt="Authentic Kerala Unlimited Thali Sadya"
              className="centerpiece-img"
            />
            <div className="wheel-specular-glare" aria-hidden="true" />

            {/* Steaming Hot Aroma Smoke */}
            <div className="wheel-steam-container" aria-hidden="true">
              <span className="wheel-steam ws1" />
              <span className="wheel-steam ws2" />
            </div>

            <div className="centerpiece-ring" aria-hidden="true" />
          </div>

          <div className="centerpiece-label-pill glass">
            <span className="center-pill-star">★</span>
            <span className="center-pill-text">Unlimited Kerala Sadya</span>
          </div>
        </div>

        {/* REVOLVING SATELLITE DISHES ORBIT */}
        <div
          className="satellite-orbit-hub"
          style={{
            transform: `rotate(${rotationAngle}deg)`,
            transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {SATELLITE_DISHES.map((dish) => (
            <div
              key={dish.id}
              className="satellite-dish-spoke"
              style={{
                transform: `rotate(${dish.angle}deg) translate(var(--satellite-radius)) rotate(-${dish.angle}deg)`,
              }}
            >
              {/* Counter-rotate dish so food image stays upright */}
              <div
                className="satellite-dish-unit"
                style={{
                  transform: `rotate(-${rotationAngle}deg)`,
                  transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div className="satellite-wheel-frame">
                  <img
                    src={dish.img}
                    alt={dish.n}
                    className="satellite-wheel-img"
                  />
                  <div className="wheel-specular-glare" aria-hidden="true" />

                  {/* Steaming Smoke Effect */}
                  <div className="wheel-steam-container" aria-hidden="true">
                    <span className="wheel-steam ws1" />
                  </div>
                </div>

                {/* Floating Glass Label Pill */}
                <div className="satellite-label-pill glass">
                  <span>{dish.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clean Bottom Controls Bar (Zero Overlap) */}
      <div className="showcase-controls-bar">
        <button
          type="button"
          className="showcase-nav-btn prev glass"
          onClick={() => spinStep(-1)}
          aria-label="Previous dishes"
        >
          ‹
        </button>

        <div className="showcase-hint-pill glass">
          <span className="showcase-spin-icon">🎡</span>
          <span>
            <strong>9 Kerala Specialties</strong> • Scroll to revolve
          </span>
        </div>

        <button
          type="button"
          className="showcase-nav-btn next glass"
          onClick={() => spinStep(1)}
          aria-label="Next dishes"
        >
          ›
        </button>
      </div>
    </div>
  );
}
