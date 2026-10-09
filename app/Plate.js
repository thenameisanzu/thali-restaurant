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
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      const stage = document.getElementById("hero-stage");
      if (stage && window.innerWidth >= 768) {
        const rect = stage.getBoundingClientRect();
        const totalScrollable = stage.offsetHeight - window.innerHeight;
        if (totalScrollable > 0) {
          const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
          targetAngleRef.current = progress * 360;
          return;
        }
      }
      targetAngleRef.current = (window.scrollY * 0.4) % 360;
    };

    // 60/120fps Inertia Damping Physics Loop
    const physicsLoop = () => {
      const angleDiff = targetAngleRef.current - currentAngleRef.current;
      if (Math.abs(angleDiff) > 0.005) {
        currentAngleRef.current += angleDiff * 0.088;
        setRotationAngle(currentAngleRef.current);
      }

      const tiltXDiff = targetTiltRef.current.x - currentTiltRef.current.x;
      const tiltYDiff = targetTiltRef.current.y - currentTiltRef.current.y;
      if (Math.abs(tiltXDiff) > 0.01 || Math.abs(tiltYDiff) > 0.01) {
        currentTiltRef.current.x += tiltXDiff * 0.12;
        currentTiltRef.current.y += tiltYDiff * 0.12;
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

  // 3D Magnetic Tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current || isMobile) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    targetTiltRef.current = {
      x: ((y - centerY) / centerY) * -5,
      y: ((x - centerX) / centerX) * 5,
    };
  };

  const handleMouseLeave = () => {
    targetTiltRef.current = { x: 0, y: 0 };
  };

  // Touch Swipe & Flick Drag Gestures for Mobile / iPad
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
    isDraggingRef.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaX = touch.clientX - touchStartRef.current.x;

    const touchDelta = deltaY * 0.45 - deltaX * 0.3;
    targetAngleRef.current += touchDelta * 0.28;

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
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
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {/* Ambient Radial Golden Aura */}
      <div className="wheel-ambient-glow" aria-hidden="true" />

      {/* 3D Circular Wheel Stage */}
      <div
        className="wheel-3d-stage"
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg)`,
        }}
      >
        <div
          className="wheel-rotor-hub"
          style={{
            transform: `rotate(${rotationAngle.toFixed(2)}deg)`,
          }}
        >
          {DISHES.map((dish) => {
            const effectiveAngle = (dish.baseAngle + rotationAngle) % 360;
            const normalized = (effectiveAngle + 360) % 360;
            const distFromCenter = Math.abs(normalized - 180);

            // On mobile: strictly 3 dishes in the arc (130° to 230°). On desktop: 4-5 dishes (60° to 300°)
            const isVisibleOnArc = isMobile
              ? normalized >= 130 && normalized <= 230
              : normalized >= 60 && normalized <= 300;

            const isCenterFocus = distFromCenter <= 22;

            return (
              <div
                key={dish.id}
                className={`wheel-dish-spoke ${isVisibleOnArc ? "is-visible" : "is-hidden"}`}
                style={{
                  transform: `rotate(${dish.baseAngle}deg) translate(var(--wheel-radius)) rotate(-${dish.baseAngle}deg)`,
                }}
              >
                {/* Counter-rotate dish unit so food image stays upright */}
                <div
                  className={`wheel-dish-unit ${isCenterFocus ? "is-center-focus" : "is-flank"}`}
                  style={{
                    transform: `rotate(-${rotationAngle.toFixed(2)}deg)`,
                  }}
                >
                  <div className={`dish-plate-frame ${isCenterFocus ? "frame-glow" : ""}`}>
                    <img
                      src={dish.img}
                      alt={dish.n}
                      className="dish-plate-img"
                      loading="eager"
                      draggable="false"
                    />
                    <div className="wheel-specular-glare" aria-hidden="true" />
                  </div>

                  {/* Show tag pill only for center dish on mobile, or all visible on desktop */}
                  {(!isMobile || isCenterFocus) && (
                    <div className={`dish-plate-pill glass ${isCenterFocus ? "pill-active" : ""}`}>
                      <span>{dish.tag}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Touch-Optimized Bottom Controls Bar */}
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
            <strong>9 Specialties</strong> • Scroll or swipe to spin
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
