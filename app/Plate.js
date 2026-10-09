"use client";
import { useState, useEffect, useRef } from "react";
import { plateDishes } from "./data";

export default function Plate() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showPopout, setShowPopout] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const currentDish = plateDishes[activeIdx];

  // Subtle auto-cycle through dishes only when user is idle & not popped out
  useEffect(() => {
    if (isUserInteracting || showPopout) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % plateDishes.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isUserInteracting, showPopout]);

  const handleOpenDish = (idx) => {
    setIsUserInteracting(true);
    setActiveIdx(idx);
    setShowPopout(true);
  };

  const handleClosePopout = (e) => {
    if (e) e.stopPropagation();
    setShowPopout(false);
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

  const handlePrev = (e) => {
    e.stopPropagation();
    setIsUserInteracting(true);
    setActiveIdx((prev) => (prev - 1 + plateDishes.length) % plateDishes.length);
    setShowPopout(true);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setIsUserInteracting(true);
    setActiveIdx((prev) => (prev + 1) % plateDishes.length);
    setShowPopout(true);
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
            onClick={() => handleOpenDish(activeIdx)}
          />

          {/* Dynamic Spotlight Glow centered on active dish */}
          <div
            className="dish-spotlight-overlay"
            style={{
              background: `radial-gradient(circle 100px at ${currentDish.x}% ${currentDish.y}%, rgba(212, 163, 89, 0.5) 0%, rgba(30, 90, 46, 0.2) 50%, transparent 85%)`,
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
                  aria-label={`Inspect ${dish.n} in 3D popup`}
                  aria-pressed={isSelected}
                  onClick={() => handleOpenDish(idx)}
                  onTouchEnd={() => handleOpenDish(idx)}
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

          {/* =========================================================
              3D POP-UP DISH IMAGE SHOWCASE MODAL
             ========================================================= */}
          {showPopout && (
            <div
              className="dish-3d-image-popup-modal glass"
              key={currentDish.id}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                className="popup-close-btn"
                onClick={handleClosePopout}
                aria-label="Close 3D Dish View"
              >
                ✕
              </button>

              {/* 3D Floating Dish Image Disc with Steam & Glow */}
              <div className="popup-dish-image-hero">
                <div className="dish-img-saucer-glow" aria-hidden="true" />
                <div className="dish-img-frame">
                  <img
                    src={currentDish.img}
                    alt={currentDish.n}
                    className="popup-dish-real-img"
                  />
                  {/* Floating Steam Particles on dish photo */}
                  <div className="popup-steam-container" aria-hidden="true">
                    <span className="popup-steam ps1" />
                    <span className="popup-steam ps2" />
                    <span className="popup-steam ps3" />
                  </div>
                </div>
                <span className="dish-3d-floating-badge">{currentDish.icon}</span>
              </div>

              {/* Dish Meta & Description */}
              <div className="popup-dish-content">
                <div className="popup-badge-row">
                  <span className="popup-position-tag">{currentDish.t}</span>
                  <span className="popup-unlimited-pill">★ Unlimited Refills</span>
                </div>

                <h3 className="popup-dish-title">{currentDish.n}</h3>
                <p className="popup-dish-taste">
                  <span className="taste-bullet">✨</span>
                  <strong>Flavor Profile:</strong> {currentDish.taste}
                </p>
                <p className="popup-dish-desc">{currentDish.p}</p>

                {/* Bottom Navigation & Action */}
                <div className="popup-bottom-bar">
                  <div className="popup-dish-stepper">
                    <button
                      type="button"
                      className="popup-step-btn prev"
                      onClick={handlePrev}
                      aria-label="Previous dish"
                    >
                      ‹
                    </button>
                    <span className="popup-counter-text">
                      {activeIdx + 1} of {plateDishes.length}
                    </span>
                    <button
                      type="button"
                      className="popup-step-btn next"
                      onClick={handleNext}
                      aria-label="Next dish"
                    >
                      ›
                    </button>
                  </div>

                  <a
                    href="#order"
                    className="popup-order-cta btn solid btn-magnetic"
                    onClick={() => setShowPopout(false)}
                  >
                    Order Meal
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Touch prompt instructions hint */}
      <div
        className="plate-touch-hint animate-fade-up"
        onClick={() => handleOpenDish(activeIdx)}
        role="button"
        tabIndex={0}
      >
        <span className="touch-icon">👆</span>
        <span>
          {showPopout
            ? "Showing 3D pop-up of " + currentDish.n + " (Click ✕ to close)"
            : "Tap any dish pin to pop up its 3D close-up image & details"}
        </span>
      </div>
    </div>
  );
}
