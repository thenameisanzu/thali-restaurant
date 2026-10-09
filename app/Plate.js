"use client";
import { useState, useEffect, useRef } from "react";
import { plateDishes } from "./data";

export default function Plate() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPopped, setIsPopped] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const currentDish = plateDishes[activeIdx];

  // Subtle auto-cycle through dishes only when user is idle
  useEffect(() => {
    if (isUserInteracting) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % plateDishes.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isUserInteracting]);

  const handleSelectDish = (idx) => {
    setIsUserInteracting(true);
    setActiveIdx(idx);
    setIsPopped(true);
  };

  // 3D Magnetic Mouse Tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -11; // Max 11 deg 3D tilt
    const rotateY = ((x - centerX) / centerX) * 11;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setIsUserInteracting(true);
    setActiveIdx((prev) => (prev - 1 + plateDishes.length) % plateDishes.length);
    setIsPopped(true);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setIsUserInteracting(true);
    setActiveIdx((prev) => (prev + 1) % plateDishes.length);
    setIsPopped(true);
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
      {/* Interactive 3D Platter Viewport */}
      <div
        className="plate-viewport-clean"
        style={{
          transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 ? "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" : "transform 0.08s ease-out",
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
              background: `radial-gradient(circle 90px at ${currentDish.x}% ${currentDish.y}%, rgba(212, 163, 89, 0.45) 0%, rgba(30, 90, 46, 0.15) 50%, transparent 80%)`,
            }}
            aria-hidden="true"
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

          {/* Dish Interactive 3D Hotspot Pins */}
          {plateDishes.map((dish, idx) => {
            const isSelected = activeIdx === idx;

            return (
              <div
                key={dish.id}
                className={`dish-hotspot-wrapper ${isSelected ? "is-active 3d-pin-pop" : ""}`}
                style={{
                  left: `${dish.x}%`,
                  top: `${dish.y}%`,
                }}
              >
                {/* 3D Touch Pin Button */}
                <button
                  type="button"
                  className="dish-pin 3d-pop-trigger"
                  aria-label={`Inspect ${dish.n} on platter`}
                  aria-pressed={isSelected}
                  onClick={() => handleSelectDish(idx)}
                  onTouchEnd={() => handleSelectDish(idx)}
                >
                  <span className="pin-core-dot" />
                  {isSelected && (
                    <>
                      <span className="pin-radar-wave wave-1" />
                      <span className="pin-radar-wave wave-2" />
                      <span className="pin-radar-wave wave-3" />
                      <span className="pin-3d-beacon-ring" />
                    </>
                  )}
                </button>
              </div>
            );
          })}

          {/* 3D Floating Pop-Up Modal Card over Selected Dish */}
          <div
            className="dish-3d-popup-bubble glass"
            key={currentDish.id}
            style={{
              left: `${Math.min(Math.max(currentDish.x, 24), 76)}%`,
              top: `${Math.min(Math.max(currentDish.y, 22), 74)}%`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="popup-glow-backdrop" aria-hidden="true" />
            
            {/* Pop-up Top Row */}
            <div className="popup-header">
              <span className="popup-3d-icon">{currentDish.icon}</span>
              <div className="popup-title-wrap">
                <span className="popup-position-tag">{currentDish.t}</span>
                <h4 className="popup-title">{currentDish.n}</h4>
              </div>
            </div>

            {/* Pop-up Description */}
            <p className="popup-desc">{currentDish.p}</p>

            {/* Pop-up Badges & Quick Nav */}
            <div className="popup-footer">
              <span className="popup-taste-pill">
                <span className="taste-bullet">✨</span>
                {currentDish.taste}
              </span>
              <div className="popup-nav-controls">
                <button
                  type="button"
                  className="popup-nav-btn prev"
                  onClick={handlePrev}
                  aria-label="Previous dish"
                >
                  ‹
                </button>
                <span className="popup-step-counter">
                  {activeIdx + 1}/{plateDishes.length}
                </span>
                <button
                  type="button"
                  className="popup-nav-btn next"
                  onClick={handleNext}
                  aria-label="Next dish"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Touch prompt instructions hint */}
      <div className="plate-touch-hint animate-fade-up">
        <span className="touch-icon">👆</span>
        <span>Touch or click any dish pin on the platter to explore ingredients &amp; tastes</span>
      </div>
    </div>
  );
}
