"use client";
import { useEffect, useState, useRef } from "react";

const HERO_DISHES = [
  {
    id: "main-thali",
    n: "Unlimited Kerala Sadya",
    img: "/hero_thali.jpg",
    tag: "🍛 House Special",
    isPrimary: true,
  },
  {
    id: "masala-dosa",
    n: "Crispy Ghee Roast",
    img: "/masala_dosa.jpg",
    tag: "🥞 Tiffin Favorite",
    speed: 0.5,
  },
  {
    id: "chicken-biryani",
    n: "Malabar Dum Biryani",
    img: "/chicken_biryani.jpg",
    tag: "🍗 Chef's Choice",
    speed: -0.45,
  },
  {
    id: "palada-payasam",
    n: "Rich Palada Payasam",
    img: "/palada_payasam.jpg",
    tag: "✨ Daily Sweet",
    speed: 0.4,
  },
  {
    id: "chicken-dosa",
    n: "Special Chicken Dosa",
    img: "/chicken_dosa.jpg",
    tag: "🥘 Non-Veg Dosa",
    speed: -0.5,
  },
  {
    id: "kottayam-sambar",
    n: "Kottayam Sambar & Sides",
    img: "/sambar.jpg",
    tag: "🍲 Homestyle Curry",
    speed: 0.42,
  },
];

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

  // 3D Magnetic Mouse Tilt
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

  const primaryDish = HERO_DISHES[0];
  const satelliteDishes = HERO_DISHES.slice(1);

  return (
    <div
      className="kinetic-separated-showcase"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient Radial Golden Glow */}
      <div className="wheels-ambient-glow" aria-hidden="true" />

      {/* 3D Multi-Wheel Stage (6 Separated Food Items) */}
      <div
        className="wheels-stage-separated"
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition:
            tilt.x === 0
              ? "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
              : "transform 0.08s ease-out",
        }}
      >
        {/* ========================================================
            PRIMARY WHEEL: Authentic Kerala Thali Platter
           ======================================================== */}
        <div className="wheel-primary-box">
          <div className="dish-wheel wheel-main-separated">
            <div
              className="wheel-disc-rotor"
              style={{ transform: `rotate(${scrollY * 0.2}deg)` }}
            >
              <img
                src={primaryDish.img}
                alt={primaryDish.n}
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

            {/* Kinetic Orbital Ring */}
            <div className="wheel-orbital-ring ring-main" aria-hidden="true" />

            <div className="wheel-label-pill glass">
              <span>{primaryDish.tag}</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            RIGHT CLUSTER: 5 Separated Satellite Dish Wheels
           ======================================================== */}
        <div className="wheels-satellite-grid">
          {satelliteDishes.map((dish, idx) => {
            const rot = scrollY * (dish.speed || 0.45);
            return (
              <div key={dish.id} className="dish-wheel wheel-side-item">
                <div
                  className="wheel-disc-rotor"
                  style={{ transform: `rotate(${rot}deg)` }}
                >
                  <img
                    src={dish.img}
                    alt={dish.n}
                    className="wheel-img"
                  />
                  <div className="wheel-specular-glare" aria-hidden="true" />
                </div>

                <div className="wheel-steam-container" aria-hidden="true">
                  <span className={`wheel-steam ws${(idx % 3) + 1}`} />
                  <span className={`wheel-steam ws${((idx + 1) % 3) + 1}`} />
                </div>

                <div
                  className={`wheel-orbital-ring ring-satellite ring-${(idx % 2) + 1}`}
                  aria-hidden="true"
                />

                <div className="wheel-label-pill glass">
                  <span>{dish.tag}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
