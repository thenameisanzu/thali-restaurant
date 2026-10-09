"use client";
import { useEffect, useState, useRef } from "react";

const DISHES = [
  // --- SET 1 (Default View: Dishes 1–3) ---
  {
    id: "thali",
    n: "Unlimited Kerala Sadya",
    img: "/hero_thali.jpg",
    tag: "🍛 Unlimited Sadya",
    desc: "18+ Authentic Kerala curries & hot refills",
    baseAngle: 180, // Center Left
    set: 1,
  },
  {
    id: "dosa",
    n: "Crispy Ghee Roast",
    img: "/masala_dosa.jpg",
    tag: "🥞 Crispy Ghee Roast",
    desc: "Golden roasted with pure ghee & chutneys",
    baseAngle: 140, // Top Left
    set: 1,
  },
  {
    id: "biryani",
    n: "Malabar Dum Biryani",
    img: "/chicken_biryani.jpg",
    tag: "🍗 Malabar Biryani",
    desc: "Fragrant kaima rice with tender spiced chicken",
    baseAngle: 220, // Bottom Left
    set: 1,
  },

  // --- SET 2 (Scroll 1: Dishes 4–6) ---
  {
    id: "beef-roast",
    n: "Porotta & Beef Roast",
    img: "/beef_roast.jpg",
    tag: "🥩 Porotta & Beef Fry",
    desc: "Layered flaky porotta with sizzling coconut beef roast",
    baseAngle: 60, // Center Left when rotated 120° (60 + 120 = 180)
    set: 2,
  },
  {
    id: "chicken-dosa",
    n: "Special Chicken Dosa",
    img: "/chicken_dosa.jpg",
    tag: "🥘 Non-Veg Dosa",
    desc: "Crisp dosa stuffed with spicy chicken roast",
    baseAngle: 20, // Top Left when rotated 120° (20 + 120 = 140)
    set: 2,
  },
  {
    id: "fish-curry",
    n: "Kottayam Meen Curry",
    img: "/fish_curry.jpg",
    tag: "🐟 Kottayam Fish Curry",
    desc: "Spicy red kudampuli fish curry with tapioca kappa",
    baseAngle: 100, // Bottom Left when rotated 120° (100 + 120 = 220)
    set: 2,
  },

  // --- SET 3 (Scroll 2: Dishes 7–9) ---
  {
    id: "appam-stew",
    n: "Appam & Chicken Stew",
    img: "/appam_stew.jpg",
    tag: "🍲 Appam & Stew",
    desc: "Lacy soft appams with creamy coconut milk stew",
    baseAngle: 300, // Center Left when rotated 240° (300 + 240 = 540 = 180)
    set: 3,
  },
  {
    id: "payasam",
    n: "Rich Palada Payasam",
    img: "/palada_payasam.jpg",
    tag: "✨ Daily Sweet",
    desc: "Slow-simmered milk payasam with tender ada",
    baseAngle: 260, // Top Left when rotated 240° (260 + 240 = 500 = 140)
    set: 3,
  },
  {
    id: "sambar",
    n: "Kottayam Sambar & Curries",
    img: "/sambar.jpg",
    tag: "🍲 Homestyle Curry",
    desc: "Simmered toor dal with fresh drumsticks & spices",
    baseAngle: 340, // Bottom Left when rotated 240° (340 + 240 = 580 = 220)
    set: 3,
  },
];

export default function Plate() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeSet, setActiveSet] = useState(1); // 1, 2, or 3
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
              // Rotate by 240 degrees total over the scroll (120 deg per set)
              const currentAngle = progress * 240;
              setRotationAngle(currentAngle);

              if (progress < 0.38) {
                setActiveSet(1);
              } else if (progress < 0.76) {
                setActiveSet(2);
              } else {
                setActiveSet(3);
              }
            }
          } else {
            const rot = Math.min(window.scrollY * 0.4, 240);
            setRotationAngle(rot);
            if (rot < 80) setActiveSet(1);
            else if (rot < 160) setActiveSet(2);
            else setActiveSet(3);
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

  const jumpToSet = (targetSet) => {
    const stage = document.getElementById("hero-stage");
    if (stage) {
      const totalScrollable = stage.offsetHeight - window.innerHeight;
      let ratio = 0;
      if (targetSet === 2) ratio = 0.5;
      if (targetSet === 3) ratio = 1.0;
      const targetScroll = stage.offsetTop + totalScrollable * ratio;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    } else {
      const angles = { 1: 0, 2: 120, 3: 240 };
      setRotationAngle(angles[targetSet] || 0);
      setActiveSet(targetSet);
    }
  };

  const stepPrev = () => {
    jumpToSet(Math.max(activeSet - 1, 1));
  };

  const stepNext = () => {
    jumpToSet(Math.min(activeSet + 1, 3));
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
            // Effective position angle on the circle
            const effectiveAngle = (dish.baseAngle + rotationAngle) % 360;
            const normalized = (effectiveAngle + 360) % 360;
            // Visible on the front arc between 110deg and 250deg
            const isVisibleOnArc = normalized >= 110 && normalized <= 250;

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
                    transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, filter 0.35s ease",
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

      {/* Dynamic 9-Dish Controller & Set Indicator */}
      <div className="revolving-controls-bar">
        <button
          type="button"
          className={`disk-nav-btn prev glass ${activeSet === 1 ? "is-disabled" : ""}`}
          onClick={stepPrev}
          aria-label="Previous dishes"
        >
          ‹
        </button>

        <div className="disk-hint-pill glass">
          <span className="disk-spin-icon">🎡</span>
          <span className="disk-set-label">
            {activeSet === 1 && (
              <><strong>Dishes 1–3 of 9</strong> • Scroll to spin next</>
            )}
            {activeSet === 2 && (
              <><strong>Dishes 4–6 of 9</strong> • Scroll to spin next</>
            )}
            {activeSet === 3 && (
              <><strong>Dishes 7–9 of 9</strong> • Scroll for story &amp; menu</>
            )}
          </span>
          <div className="disk-dots">
            <span className={`disk-dot ${activeSet === 1 ? "active" : ""}`} onClick={() => jumpToSet(1)} />
            <span className={`disk-dot ${activeSet === 2 ? "active" : ""}`} onClick={() => jumpToSet(2)} />
            <span className={`disk-dot ${activeSet === 3 ? "active" : ""}`} onClick={() => jumpToSet(3)} />
          </div>
        </div>

        <button
          type="button"
          className={`disk-nav-btn next glass ${activeSet === 3 ? "is-disabled" : ""}`}
          onClick={stepNext}
          aria-label="Next dishes"
        >
          ›
        </button>
      </div>
    </div>
  );
}
