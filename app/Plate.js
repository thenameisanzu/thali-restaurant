"use client";
import { useEffect, useState, useRef } from "react";

const DISHES = [
  {
    id: "thali",
    n: "Unlimited Kerala Sadya",
    img: "/hero_thali.jpg",
    tag: "🍛 Unlimited Meals",
    desc: "18+ Authentic Kerala curries & hot refills",
  },
  {
    id: "dosa",
    n: "Crispy Ghee Roast",
    img: "/masala_dosa.jpg",
    tag: "🥞 Crispy Tiffin",
    desc: "Golden roasted with pure ghee & chutneys",
  },
  {
    id: "biryani",
    n: "Malabar Dum Biryani",
    img: "/chicken_biryani.jpg",
    tag: "🍗 Chef's Dum Biryani",
    desc: "Fragrant kaima rice with tender spiced chicken",
  },
  {
    id: "payasam",
    n: "Rich Palada Payasam",
    img: "/palada_payasam.jpg",
    tag: "✨ Daily Sweet",
    desc: "Slow-simmered milk payasam with tender ada",
  },
  {
    id: "chicken-dosa",
    n: "Special Chicken Dosa",
    img: "/chicken_dosa.jpg",
    tag: "🥘 Non-Veg Dosa",
    desc: "Crisp dosa stuffed with spicy chicken roast",
  },
  {
    id: "sambar",
    n: "Kottayam Sambar & Curries",
    img: "/sambar.jpg",
    tag: "🍲 Homestyle Curry",
    desc: "Simmered toor dal with fresh drumsticks & spices",
  },
];

export default function Plate() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Calculate rotation from scroll position
          const rot = window.scrollY * 0.35;
          setRotationAngle(rot);
          
          // Calculate which dish is currently closest to the front (angle % 360)
          const normalized = ((-rot % 360) + 360) % 360;
          const index = Math.round(normalized / 60) % DISHES.length;
          setActiveIdx(index);

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

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const spinPrev = () => {
    setRotationAngle((prev) => prev - 60);
  };

  const spinNext = () => {
    setRotationAngle((prev) => prev + 60);
  };

  const totalDishes = DISHES.length;
  const angleStep = 360 / totalDishes; // 60 deg each

  return (
    <div
      className="revolving-disk-viewport"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient Radial Golden Glow */}
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
            transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {DISHES.map((dish, i) => {
            const currentItemAngle = i * angleStep;

            return (
              <div
                key={dish.id}
                className="revolving-dish-spoke"
                style={{
                  transform: `rotate(${currentItemAngle}deg) translate(var(--disk-radius)) rotate(-${currentItemAngle}deg)`,
                }}
              >
                {/* Counter-rotate the dish so it stays upright while carousel spins */}
                <div
                  className="revolving-dish-unit"
                  style={{
                    transform: `rotate(-${rotationAngle}deg)`,
                    transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
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

      {/* Manual Spin Quick Controls & Indicator */}
      <div className="revolving-controls-bar">
        <button
          type="button"
          className="disk-nav-btn prev glass"
          onClick={spinPrev}
          aria-label="Rotate previous dishes"
        >
          ‹
        </button>
        <div className="disk-hint-pill glass">
          <span className="disk-spin-icon">🎡</span>
          <span>Scroll down to spin carousel (3 visible at a time)</span>
        </div>
        <button
          type="button"
          className="disk-nav-btn next glass"
          onClick={spinNext}
          aria-label="Rotate next dishes"
        >
          ›
        </button>
      </div>
    </div>
  );
}
