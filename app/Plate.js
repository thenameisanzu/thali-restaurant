"use client";
import { useEffect, useState, useRef } from "react";

const DISHES = [
  {
    id: "thali",
    n: "Unlimited Kerala Sadya",
    img: "/hero_thali.jpg",
    tag: "🍛 Unlimited Sadya",
    desc: "18+ Authentic Kerala curries & hot refills",
    baseAngle: 180, // Index 0 (Center initial)
  },
  {
    id: "dosa",
    n: "Crispy Ghee Roast",
    img: "/masala_dosa.jpg",
    tag: "🥞 Crispy Ghee Roast",
    desc: "Golden roasted with pure ghee & chutneys",
    baseAngle: 125, // Index 1 (Top initial)
  },
  {
    id: "biryani",
    n: "Malabar Dum Biryani",
    img: "/chicken_biryani.jpg",
    tag: "🍗 Malabar Biryani",
    desc: "Fragrant kaima rice with tender spiced chicken",
    baseAngle: 235, // Index 2 (Bottom initial)
  },
  {
    id: "beef-roast",
    n: "Porotta & Beef Roast",
    img: "/beef_roast.jpg",
    tag: "🥩 Porotta & Beef Fry",
    desc: "Layered flaky porotta with sizzling coconut beef roast",
    baseAngle: 70, // Index 3
  },
  {
    id: "fish-curry",
    n: "Kottayam Meen Curry",
    img: "/fish_curry.jpg",
    tag: "🐟 Kottayam Fish Curry",
    desc: "Spicy red kudampuli fish curry with tapioca kappa",
    baseAngle: 290, // Index 4
  },
  {
    id: "chicken-dosa",
    n: "Special Chicken Dosa",
    img: "/chicken_dosa.jpg",
    tag: "🥘 Non-Veg Dosa",
    desc: "Crisp dosa stuffed with spicy chicken roast",
    baseAngle: 15, // Index 5
  },
  {
    id: "appam-stew",
    n: "Appam & Chicken Stew",
    img: "/appam_stew.jpg",
    tag: "🍲 Appam & Stew",
    desc: "Lacy soft appams with creamy coconut milk stew",
    baseAngle: 345, // Index 6
  },
  {
    id: "payasam",
    n: "Rich Palada Payasam",
    img: "/palada_payasam.jpg",
    tag: "✨ Daily Sweet",
    desc: "Slow-simmered milk payasam with tender ada",
    baseAngle: 200, // Index 7
  },
  {
    id: "sambar",
    n: "Kottayam Sambar & Curries",
    img: "/sambar.jpg",
    tag: "🍲 Homestyle Curry",
    desc: "Simmered toor dal with fresh drumsticks & spices",
    baseAngle: 255, // Index 8
  },
];

// Spaced evenly at 40° intervals: [180, 140, 220, 100, 260, 60, 300, 20, 340]
const SPACED_DISHES = DISHES.map((dish, idx) => {
  const angleMap = [180, 125, 235, 70, 290, 15, 345, 200, 255];
  // Uniform 40° spacing around 360°
  const uniformAngles = [180, 140, 220, 100, 260, 60, 300, 20, 340];
  return {
    ...dish,
    baseAngle: uniformAngles[idx],
  };
});

export default function Plate() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeDishName, setActiveDishName] = useState(SPACED_DISHES[0].n);
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
              // Rotate by 360° across the pinned scroll
              const rot = progress * 360;
              setRotationAngle(rot);
            }
          } else {
            const rot = (window.scrollY * 0.35) % 360;
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

  // Find the currently featured active center dish
  useEffect(() => {
    let closestDish = SPACED_DISHES[0];
    let minDiff = 360;

    SPACED_DISHES.forEach((dish) => {
      const currentAngle = (((dish.baseAngle + rotationAngle) % 360) + 360) % 360;
      const diff = Math.abs(currentAngle - 180);
      if (diff < minDiff) {
        minDiff = diff;
        closestDish = dish;
      }
    });

    if (closestDish) {
      setActiveDishName(closestDish.n);
    }
  }, [rotationAngle]);

  // 3D Magnetic Mouse Tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const spinStep = (dir) => {
    setRotationAngle((prev) => prev + dir * 40);
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
            transition: "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {SPACED_DISHES.map((dish) => {
            // Effective position angle on the circle
            const effectiveAngle = (((dish.baseAngle + rotationAngle) % 360) + 360) % 360;
            const diffFromCenter = Math.abs(effectiveAngle - 180);

            // Active center hero dish
            const isHeroCenter = diffFromCenter <= 24;
            // Adjacent visible dishes on the clean 3-dish arc
            const isVisibleOnArc = diffFromCenter <= 68;

            // Compute scale & opacity smoothly based on distance from center (180deg)
            const scaleFactor = isHeroCenter
              ? 1.16
              : isVisibleOnArc
              ? 0.88
              : 0.6;

            const opacityFactor = isHeroCenter
              ? 1
              : isVisibleOnArc
              ? 0.85
              : 0;

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
                  className={`revolving-dish-unit ${isHeroCenter ? "is-hero-center" : "is-flank-dish"}`}
                  style={{
                    transform: `rotate(-${rotationAngle}deg) scale(${scaleFactor})`,
                    opacity: opacityFactor,
                    transition:
                      "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease",
                  }}
                >
                  <div className="dish-wheel-frame">
                    <img
                      src={dish.img}
                      alt={dish.n}
                      className="dish-wheel-img"
                    />
                    <div className="wheel-specular-glare" aria-hidden="true" />

                    {/* Steaming Hot Smoke Vapor on Active Center Dish */}
                    {isHeroCenter && (
                      <div className="wheel-steam-container" aria-hidden="true">
                        <span className="wheel-steam ws1" />
                        <span className="wheel-steam ws2" />
                      </div>
                    )}

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

      {/* Dynamic Dedicated Controls Bar (Zero Overlap with Plates) */}
      <div className="revolving-controls-bar">
        <button
          type="button"
          className="disk-nav-btn prev glass"
          onClick={() => spinStep(-1)}
          aria-label="Previous specialty"
        >
          ‹
        </button>

        <div className="disk-hint-pill glass">
          <span className="disk-spin-icon">🎡</span>
          <span className="disk-set-label">
            <strong>{activeDishName}</strong> • Scroll to rotate
          </span>
        </div>

        <button
          type="button"
          className="disk-nav-btn next glass"
          onClick={() => spinStep(1)}
          aria-label="Next specialty"
        >
          ›
        </button>
      </div>
    </div>
  );
}
