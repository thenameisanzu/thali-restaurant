"use client";
import { useEffect, useState, useRef } from "react";

const DISHES = [
  {
    id: "thali",
    n: "Unlimited Kerala Sadya",
    img: "/hero_thali.jpg",
    tag: "🍛 Unlimited Meals",
    desc: "18+ Authentic Kerala curries & hot refills",
    baseAngle: 180, // Center Left (Default 1)
  },
  {
    id: "dosa",
    n: "Crispy Ghee Roast",
    img: "/masala_dosa.jpg",
    tag: "🥞 Crispy Tiffin",
    desc: "Golden roasted with pure ghee & chutneys",
    baseAngle: 120, // Top Left (Default 2)
  },
  {
    id: "biryani",
    n: "Malabar Dum Biryani",
    img: "/chicken_biryani.jpg",
    tag: "🍗 Malabar Biryani",
    desc: "Fragrant kaima rice with tender spiced chicken",
    baseAngle: 240, // Bottom Left (Default 3)
  },
  {
    id: "payasam",
    n: "Rich Palada Payasam",
    img: "/palada_payasam.jpg",
    tag: "✨ Daily Sweet",
    desc: "Slow-simmered milk payasam with tender ada",
    baseAngle: 300, // Top Right (Appears on scroll)
  },
  {
    id: "chicken-dosa",
    n: "Special Chicken Dosa",
    img: "/chicken_dosa.jpg",
    tag: "🥘 Non-Veg Dosa",
    desc: "Crisp dosa stuffed with spicy chicken roast",
    baseAngle: 0, // Center Right (Appears on scroll)
  },
  {
    id: "sambar",
    n: "Kottayam Sambar & Curries",
    img: "/sambar.jpg",
    tag: "🍲 Homestyle Curry",
    desc: "Simmered toor dal with fresh drumsticks & spices",
    baseAngle: 60, // Bottom Right (Appears on scroll)
  },
];

export default function Plate() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeSet, setActiveSet] = useState(1); // 1: Dishes 1-3, 2: Dishes 4-6
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
              // Rotate by 180 degrees over the course of the pinned hero scroll
              const currentAngle = progress * 180;
              setRotationAngle(currentAngle);
              setActiveSet(progress >= 0.5 ? 2 : 1);
            }
          } else {
            // Fallback if no stage
            const rot = Math.min(window.scrollY * 0.3, 180);
            setRotationAngle(rot);
            setActiveSet(rot >= 90 ? 2 : 1);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
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

  const toggleSet = (targetSet) => {
    const stage = document.getElementById("hero-stage");
    if (stage) {
      const totalScrollable = stage.offsetHeight - window.innerHeight;
      const targetScroll = stage.offsetTop + (targetSet === 2 ? totalScrollable : 0);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    } else {
      setRotationAngle(targetSet === 2 ? 180 : 0);
      setActiveSet(targetSet);
    }
  };

  return (
    <div
      className="revolving-disk-viewport"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient Radial Golden Aura */}
      <div className="revolving-ambient-glow" aria-hidden="true" />

      {/* Orbit Track Indicator Ring */}
      <div className="orbit-track-ring" aria-hidden="true" />

      {/* 3D Revolving Disk Carousel Stage */}
      <div
        className="revolving-disk-stage"
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition:
            tilt.x === 0
              ? "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
              : "transform 0.08s ease-out",
        }}
      >
        {/* Revolving Rotor Hub */}
        <div
          className="revolving-hub"
          style={{
            transform: `rotate(${rotationAngle}deg)`,
            transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {DISHES.map((dish) => {
            // Calculate effective position angle on the circle
            const effectiveAngle = (dish.baseAngle + rotationAngle) % 360;
            const normalized = (effectiveAngle + 360) % 360;
            // Visible if in the left arc (between 80deg and 280deg)
            const isVisibleOnArc = normalized >= 80 && normalized <= 280;

            return (
              <div
                key={dish.id}
                className={`revolving-dish-spoke ${isVisibleOnArc ? "is-arc-visible" : "is-arc-hidden"}`}
                style={{
                  transform: `rotate(${dish.baseAngle}deg) translate(var(--disk-radius)) rotate(-${dish.baseAngle}deg)`,
                }}
              >
                {/* Counter-rotate the dish so it stays upright while carousel spins */}
                <div
                  className="revolving-dish-unit"
                  style={{
                    transform: `rotate(-${rotationAngle}deg)`,
                    transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
                  }}
                >
                  <div className="dish-wheel-frame">
                    <img
                      src={dish.img}
                      alt={dish.n}
                      className="dish-wheel-img"
                    />
                    <div className="wheel-specular-glare" aria-hidden="true" />

                    {/* Steaming Hot Smoke Vapor */}
                    <div className="wheel-steam-container" aria-hidden="true">
                      <span className="wheel-steam ws1" />
                      <span className="wheel-steam ws2" />
                    </div>

                    <div className="wheel-orbital-ring ring-satellite" aria-hidden="true" />
                  </div>

                  {/* Floating Glass Label Pill */}
                  <div className="revolving-label-pill glass">
                    <span className="pill-tag">{dish.tag}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Carousel Controller & Set Indicator */}
      <div className="revolving-controls-bar">
        <button
          type="button"
          className={`disk-nav-btn prev glass ${activeSet === 1 ? "is-disabled" : ""}`}
          onClick={() => toggleSet(1)}
          aria-label="View first 3 dishes"
        >
          ‹
        </button>

        <div className="disk-hint-pill glass">
          <span className="disk-spin-icon">🎡</span>
          <span className="disk-set-label">
            {activeSet === 1 ? (
              <><strong>Dishes 1–3 of 6</strong> • Scroll to spin next 3</>
            ) : (
              <><strong>Dishes 4–6 of 6</strong> • Scroll for story &amp; menu</>
            )}
          </span>
          <div className="disk-dots">
            <span className={`disk-dot ${activeSet === 1 ? "active" : ""}`} onClick={() => toggleSet(1)} />
            <span className={`disk-dot ${activeSet === 2 ? "active" : ""}`} onClick={() => toggleSet(2)} />
          </div>
        </div>

        <button
          type="button"
          className={`disk-nav-btn next glass ${activeSet === 2 ? "is-disabled" : ""}`}
          onClick={() => toggleSet(2)}
          aria-label="View next 3 dishes"
        >
          ›
        </button>
      </div>
    </div>
  );
}
