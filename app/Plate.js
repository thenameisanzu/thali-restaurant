"use client";
import { useState, useEffect, useRef } from "react";
import { plateDishes } from "./data";

export default function Plate() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const displayIdx = hoveredIdx !== null ? hoveredIdx : activeIdx;
  const currentDish = plateDishes[displayIdx];

  // Subtle auto-cycle through dishes only if user is idle
  useEffect(() => {
    if (isUserInteracting) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % plateDishes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isUserInteracting]);

  const handleSelect = (idx) => {
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

    const rotateX = ((y - centerY) / centerY) * -9; // Max 9 deg tilt
    const rotateY = ((x - centerX) / centerX) * 9;

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
      {/* Platter with 3D Interactive Tilt Engine */}
      <div
        className="plate-viewport-clean"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 ? "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" : "transform 0.1s ease-out",
        }}
      >
        {/* Platter Disc with Specular Rim & Ambient Smoke */}
        <div className="plate-disc-clean">
          <img
            src="/hero_thali.jpg"
            alt="Authentic Kerala Thali Meals at Thali Restaurant"
            className="plate-main-image"
          />

          {/* Holographic Specular Shine */}
          <div className="plate-specular-sheen" aria-hidden="true" />

          {/* Steaming Smoke Effect */}
          <div className="steam-container" aria-hidden="true">
            <span className="steam-particle s1" />
            <span className="steam-particle s2" />
            <span className="steam-particle s3" />
            <span className="steam-particle s4" />
          </div>

          {/* Dish Hotspots */}
          {plateDishes.map((dish, idx) => {
            const isSelected = activeIdx === idx;
            const isHovered = hoveredIdx === idx;
            const isHighlighted = isSelected || isHovered;

            return (
              <div
                key={dish.id}
                className={`dish-hotspot-wrapper ${isHighlighted ? "is-active" : ""}`}
                style={{
                  left: `${dish.x}%`,
                  top: `${dish.y}%`,
                }}
              >
                {/* Floating Tooltip Card on Hover */}
                {isHovered && (
                  <div className="dish-hover-tooltip" role="tooltip">
                    <span className="tooltip-icon">{dish.icon}</span>
                    <div className="tooltip-text">
                      <strong>{dish.n}</strong>
                      <small>{dish.taste}</small>
                    </div>
                  </div>
                )}

                {/* Pin Button */}
                <button
                  type="button"
                  className="dish-pin"
                  aria-label={`Select ${dish.n}`}
                  aria-pressed={isSelected}
                  onClick={() => {
                    handleSelect(idx);
                    setHoveredIdx(idx);
                  }}
                  onMouseEnter={() => {
                    handleSelect(idx);
                    setHoveredIdx(idx);
                  }}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <span className="pin-core-dot" />
                  <span className="pin-radar-wave" />
                  <span className="pin-radar-wave-2" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Minimal Elegant Dish Status Capsule */}
      <div className="dish-capsule glass" key={currentDish.id}>
        <span className="capsule-icon">{currentDish.icon}</span>
        <div className="capsule-content">
          <strong>{currentDish.n}</strong>
          <span className="capsule-divider">•</span>
          <span className="capsule-desc">{currentDish.p}</span>
        </div>
        <span className="capsule-tag">Unlimited Refill</span>
      </div>
    </div>
  );
}
