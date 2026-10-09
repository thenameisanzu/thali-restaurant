"use client";
import { useState, useEffect, useRef } from "react";
import { plateDishes } from "./data";

export default function Plate() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const currentDish = plateDishes[activeIdx];

  // Subtle auto-cycle through dishes only when user is idle
  useEffect(() => {
    if (isUserInteracting) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % plateDishes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isUserInteracting]);

  const handleSelectDish = (idx) => {
    setIsUserInteracting(true);
    setActiveIdx(idx);
  };

  // 3D Magnetic Mouse Tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12; // 3D tilt
    const rotateY = ((x - centerX) / centerX) * 12;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className="plate-showcase-clean"
      ref={containerRef}
      onMouseEnter={() => setIsUserInteracting(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => setIsUserInteracting(true)}
    >
      {/* Floating Ambient Halo behind the platter */}
      <div className="platter-ambient-glow" aria-hidden="true" />

      {/* Interactive 3D Platter Viewport */}
      <div
        className="plate-viewport-clean"
        style={{
          transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition:
            tilt.x === 0
              ? "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
              : "transform 0.08s ease-out",
        }}
      >
        {/* Platter Disc with Specular Rim */}
        <div className="plate-disc-clean">
          <img
            src="/hero_thali.jpg"
            alt="Authentic Kerala Thali Meals at Thali Restaurant"
            className="plate-main-image"
          />

          {/* Dynamic Spotlight Glow centered on active dish */}
          <div
            className="dish-spotlight-overlay"
            style={{
              background: `radial-gradient(circle 100px at ${currentDish.x}% ${currentDish.y}%, rgba(212, 163, 89, 0.5) 0%, rgba(30, 90, 46, 0.18) 50%, transparent 85%)`,
            }}
            aria-hidden="true"
          />

          {/* Holographic Specular Shine */}
          <div className="plate-specular-sheen" aria-hidden="true" />

          {/* Steaming Smoke Effect on Platter */}
          <div className="steam-container" aria-hidden="true">
            <span className="steam-particle s1" />
            <span className="steam-particle s2" />
            <span className="steam-particle s3" />
            <span className="steam-particle s4" />
          </div>

          {/* Dish Interactive Pins on Platter */}
          {plateDishes.map((dish, idx) => {
            const isSelected = activeIdx === idx;

            return (
              <div
                key={dish.id}
                className={`dish-hotspot-wrapper ${
                  isSelected ? "is-active 3d-pin-pop" : ""
                }`}
                style={{
                  left: `${dish.x}%`,
                  top: `${dish.y}%`,
                }}
              >
                <button
                  type="button"
                  className="dish-pin"
                  aria-label={`Select ${dish.n}`}
                  aria-pressed={isSelected}
                  onClick={() => handleSelectDish(idx)}
                  onMouseEnter={() => handleSelectDish(idx)}
                >
                  <span className="pin-core-dot" />
                  {isSelected && (
                    <>
                      <span className="pin-radar-wave wave-1" />
                      <span className="pin-radar-wave wave-2" />
                      <span className="pin-3d-beacon-ring" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Minimal Apple Liquid Dish Capsule (Morphs smoothly on select) */}
      <div className="dish-capsule liquid-glass" key={currentDish.id}>
        <span className="capsule-icon">{currentDish.icon}</span>
        <div className="capsule-content">
          <strong className="capsule-title">{currentDish.n}</strong>
          <span className="capsule-divider">•</span>
          <span className="capsule-taste">{currentDish.taste}</span>
          <span className="capsule-divider desc-divider">•</span>
          <span className="capsule-desc">{currentDish.p}</span>
        </div>
        <span className="capsule-tag">Unlimited Refill</span>
      </div>

      {/* Satellite Quick-Select Dish Pills */}
      <div className="platter-satellite-chips" aria-label="Quick select dishes">
        {plateDishes.map((d, i) => (
          <button
            key={d.id}
            type="button"
            className={`satellite-chip glass ${activeIdx === i ? "is-active" : ""}`}
            onClick={() => handleSelectDish(i)}
          >
            <span className="chip-icon">{d.icon}</span>
            <span className="chip-name">{d.n.split(" ")[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
