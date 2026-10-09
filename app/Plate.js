"use client";
import { useEffect, useState, useRef } from "react";

const DISHES = [
  {
    id: "thali",
    n: "Unlimited Kerala Sadya",
    img: "/hero_thali.jpg",
    tag: "🍛 Unlimited Sadya",
    baseAngle: 180, // Center Left
  },
  {
    id: "dosa",
    n: "Crispy Ghee Roast",
    img: "/masala_dosa.jpg",
    tag: "🥞 Crispy Ghee Roast",
    baseAngle: 140, // Upper Left
  },
  {
    id: "biryani",
    n: "Malabar Dum Biryani",
    img: "/chicken_biryani.jpg",
    tag: "🍗 Malabar Biryani",
    baseAngle: 220, // Lower Left
  },
  {
    id: "beef-roast",
    n: "Porotta & Beef Roast",
    img: "/beef_roast.jpg",
    tag: "🥩 Porotta & Beef Fry",
    baseAngle: 100, // Top Arc
  },
  {
    id: "fish-curry",
    n: "Kottayam Meen Curry",
    img: "/fish_curry.jpg",
    tag: "🐟 Kottayam Fish Curry",
    baseAngle: 260, // Bottom Arc
  },
  {
    id: "chicken-dosa",
    n: "Special Chicken Dosa",
    img: "/chicken_dosa.jpg",
    tag: "🥘 Non-Veg Dosa",
    baseAngle: 60, // Top Right Entry
  },
  {
    id: "appam-stew",
    n: "Appam & Chicken Stew",
    img: "/appam_stew.jpg",
    tag: "🍲 Appam & Stew",
    baseAngle: 300, // Bottom Right Entry
  },
  {
    id: "payasam",
    n: "Rich Palada Payasam",
    img: "/palada_payasam.jpg",
    tag: "✨ Daily Sweet",
    baseAngle: 20, // Offscreen Right
  },
  {
    id: "sambar",
    n: "Kottayam Sambar & Curries",
    img: "/sambar.jpg",
    tag: "🍲 Homestyle Curry",
    baseAngle: 340, // Offscreen Right
  },
];

export default function Plate() {
  const currentAngleRef = useRef(0);
  const targetAngleRef = useRef(0);
  const [rotationAngle, setRotationAngle] = useState(0);

  const currentTiltRef = useRef({ x: 0, y: 0 });
  const targetTiltRef = useRef({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      const stage = document.getElementById("hero-stage");
      if (stage) {
        const rect = stage.getBoundingClientRect();
        const totalScrollable = stage.offsetHeight - window.innerHeight;
        if (totalScrollable > 0) {
          const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
          targetAngleRef.current = progress * 360;
        }
      } else {
        targetAngleRef.current = (window.scrollY * 0.4) % 360;
      }
    };

    // 60/120fps Inertia Damping Physics Loop (Ultra Smooth Gliding)
    const physicsLoop = () => {
      // 1. Rotation angle damping
      const angleDiff = targetAngleRef.current - currentAngleRef.current;
      if (Math.abs(angleDiff) > 0.005) {
        currentAngleRef.current += angleDiff * 0.082;
        setRotationAngle(currentAngleRef.current);
      }

      // 2. Mouse 3D tilt damping
      const tiltXDiff = targetTiltRef.current.x - currentTiltRef.current.x;
      const tiltYDiff = targetTiltRef.current.y - currentTiltRef.current.y;
      if (Math.abs(tiltXDiff) > 0.01 || Math.abs(tiltYDiff) > 0.01) {
        currentTiltRef.current.x += tiltXDiff * 0.1;
        currentTiltRef.current.y += tiltYDiff * 0.1;
        setTilt({ ...currentTiltRef.current });
      }

      animationFrameId = requestAnimationFrame(physicsLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    animationFrameId = requestAnimationFrame(physicsLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 3D Magnetic Mouse Tilt with Smooth Target Tracking
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    targetTiltRef.current = {
      x: ((y - centerY) / centerY) * -5.5,
      y: ((x - centerX) / centerX) * 5.5,
    };
  };

  const handleMouseLeave = () => {
    targetTiltRef.current = { x: 0, y: 0 };
  };

  const spinStep = (dir) => {
    targetAngleRef.current += dir * 40;
  };

  return (
    <div
      className="revolving-wheel-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient Radial Golden Aura */}
      <div className="wheel-ambient-glow" aria-hidden="true" />

      {/* 3D Revolving Stage */}
      <div
        className="wheel-3d-stage"
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg)`,
        }}
      >
        {/* Revolving Rotor Hub (Silky direct frame transforms) */}
        <div
          className="wheel-rotor-hub"
          style={{
            transform: `rotate(${rotationAngle.toFixed(2)}deg)`,
          }}
        >
          {DISHES.map((dish) => {
            // Effective angle on the 360 circle
            const effectiveAngle = (dish.baseAngle + rotationAngle) % 360;
            const normalized = (effectiveAngle + 360) % 360;
            // Visible along the curved front arc (between 60deg and 300deg)
            const isVisibleOnArc = normalized >= 60 && normalized <= 300;

            return (
              <div
                key={dish.id}
                className={`wheel-dish-spoke ${isVisibleOnArc ? "is-visible" : "is-hidden"}`}
                style={{
                  transform: `rotate(${dish.baseAngle}deg) translate(var(--wheel-radius)) rotate(-${dish.baseAngle}deg)`,
                }}
              >
                {/* Counter-rotate the dish unit so food image stays upright */}
                <div
                  className="wheel-dish-unit"
                  style={{
                    transform: `rotate(-${rotationAngle.toFixed(2)}deg)`,
                  }}
                >
                  <div className="dish-plate-frame">
                    <img
                      src={dish.img}
                      alt={dish.n}
                      className="dish-plate-img"
                    />
                    <div className="wheel-specular-glare" aria-hidden="true" />

                    {/* Steaming Hot Smoke Vapor */}
                    <div className="wheel-steam-container" aria-hidden="true">
                      <span className="wheel-steam ws1" />
                      <span className="wheel-steam ws2" />
                    </div>
                  </div>

                  {/* Floating Glass Label Pill */}
                  <div className="dish-plate-pill glass">
                    <span>{dish.tag}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clean Bottom Controls Bar */}
      <div className="wheel-controls-bar">
        <button
          type="button"
          className="wheel-nav-btn prev glass"
          onClick={() => spinStep(-1)}
          aria-label="Previous dish"
        >
          ‹
        </button>

        <div className="wheel-hint-pill glass">
          <span className="wheel-spin-icon">🎡</span>
          <span>
            <strong>9 Specialties</strong> • Scroll down to revolve
          </span>
        </div>

        <button
          type="button"
          className="wheel-nav-btn next glass"
          onClick={() => spinStep(1)}
          aria-label="Next dish"
        >
          ›
        </button>
      </div>
    </div>
  );
}
