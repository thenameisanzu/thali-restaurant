"use client";
import { useEffect, useState, useRef } from "react";

const DISHES = [
  {
    id: "thali",
    n: "Unlimited Kerala Sadya",
    img: "/hero_thali.jpg",
    tag: "🍛 Unlimited Sadya",
    baseAngle: 180,
  },
  {
    id: "dosa",
    n: "Crispy Ghee Roast",
    img: "/masala_dosa.jpg",
    tag: "🥞 Crispy Ghee Roast",
    baseAngle: 140,
  },
  {
    id: "biryani",
    n: "Malabar Dum Biryani",
    img: "/chicken_biryani.jpg",
    tag: "🍗 Malabar Biryani",
    baseAngle: 220,
  },
  {
    id: "beef-roast",
    n: "Porotta & Beef Roast",
    img: "/beef_roast.jpg",
    tag: "🥩 Porotta & Beef Fry",
    baseAngle: 100,
  },
  {
    id: "fish-curry",
    n: "Kottayam Meen Curry",
    img: "/fish_curry.jpg",
    tag: "🐟 Kottayam Fish Curry",
    baseAngle: 260,
  },
  {
    id: "chicken-dosa",
    n: "Special Chicken Dosa",
    img: "/chicken_dosa.jpg",
    tag: "🥘 Non-Veg Dosa",
    baseAngle: 60,
  },
  {
    id: "appam-stew",
    n: "Appam & Chicken Stew",
    img: "/appam_stew.jpg",
    tag: "🍲 Appam & Stew",
    baseAngle: 300,
  },
  {
    id: "payasam",
    n: "Rich Palada Payasam",
    img: "/palada_payasam.jpg",
    tag: "✨ Daily Sweet",
    baseAngle: 20,
  },
  {
    id: "sambar",
    n: "Kottayam Sambar & Curries",
    img: "/sambar.jpg",
    tag: "🍲 Homestyle Curry",
    baseAngle: 340,
  },
];

export default function Plate() {
  const currentAngleRef = useRef(0);
  const targetAngleRef = useRef(0);
  const [rotationAngle, setRotationAngle] = useState(0);

  const currentTiltRef = useRef({ x: 0, y: 0 });
  const targetTiltRef = useRef({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const [activeIndex, setActiveIndex] = useState(0);
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
      if (stage) {
        const rect = stage.getBoundingClientRect();
        const totalScrollable = stage.offsetHeight - window.innerHeight;
        if (totalScrollable > 0) {
          const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
          targetAngleRef.current = progress * 360;

          // Compute mobile active dish index from scroll
          const mobileIdx = Math.min(
            Math.floor(progress * DISHES.length),
            DISHES.length - 1
          );
          setActiveIndex(mobileIdx);
        }
      } else {
        targetAngleRef.current = (window.scrollY * 0.45) % 360;
      }
    };

    // 60/120fps Native App-Like Physics Interpolation
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

  // 3D Tilt for Desktop / iPad
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

  // Mobile & iPad Touch Swipe Gestures
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

    if (isMobile) {
      // Horizontal swipe navigation on mobile
      if (Math.abs(deltaX) > 35) {
        if (deltaX < 0) {
          nextDish();
        } else {
          prevDish();
        }
        isDraggingRef.current = false;
      }
    } else {
      // Fluid circular wheel rotation drag on tablet/desktop
      const touchDelta = deltaY * 0.35 - deltaX * 0.25;
      targetAngleRef.current += touchDelta * 0.2;
    }

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const nextDish = () => {
    if (isMobile) {
      setActiveIndex((prev) => (prev + 1) % DISHES.length);
    } else {
      targetAngleRef.current += 40;
    }
  };

  const prevDish = () => {
    if (isMobile) {
      setActiveIndex((prev) => (prev - 1 + DISHES.length) % DISHES.length);
    } else {
      targetAngleRef.current -= 40;
    }
  };

  const currentMobileDish = DISHES[activeIndex] || DISHES[0];

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

      {/* =========================================
          1. MOBILE DEDICATED APP COVERFLOW (< 768px)
          ========================================= */}
      <div className="mobile-app-dish-stage">
        <div className="mobile-dish-coverflow">
          {[-1, 0, 1].map((offset) => {
            const index = (activeIndex + offset + DISHES.length) % DISHES.length;
            const dish = DISHES[index];
            const isCenter = offset === 0;

            return (
              <div
                key={`${dish.id}-${offset}`}
                className={`mobile-coverflow-card ${isCenter ? "is-center" : offset < 0 ? "is-left" : "is-right"}`}
                onClick={() => {
                  if (offset === -1) prevDish();
                  if (offset === 1) nextDish();
                }}
              >
                <div className="dish-plate-frame">
                  <img
                    src={dish.img}
                    alt={dish.n}
                    className="dish-plate-img"
                    loading="eager"
                    draggable="false"
                  />
                  <div className="wheel-specular-glare" aria-hidden="true" />
                  {isCenter && (
                    <div className="wheel-steam-container" aria-hidden="true">
                      <span className="wheel-steam ws1" />
                      <span className="wheel-steam ws2" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Active Dish Card Info */}
        <div className="mobile-dish-info glass">
          <div className="mobile-dish-tag">{currentMobileDish.tag}</div>
          <div className="mobile-dish-title">{currentMobileDish.n}</div>
        </div>
      </div>

      {/* =========================================
          2. DESKTOP & IPAD 3D CIRCULAR WHEEL (>= 768px)
          ========================================= */}
      <div
        className="wheel-3d-stage desktop-ipad-wheel-stage"
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
            const isVisibleOnArc = normalized >= 60 && normalized <= 300;

            return (
              <div
                key={dish.id}
                className={`wheel-dish-spoke ${isVisibleOnArc ? "is-visible" : "is-hidden"}`}
                style={{
                  transform: `rotate(${dish.baseAngle}deg) translate(var(--wheel-radius)) rotate(-${dish.baseAngle}deg)`,
                }}
              >
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
                      loading="eager"
                      draggable="false"
                    />
                    <div className="wheel-specular-glare" aria-hidden="true" />
                    <div className="wheel-steam-container" aria-hidden="true">
                      <span className="wheel-steam ws1" />
                      <span className="wheel-steam ws2" />
                    </div>
                  </div>

                  <div className="dish-plate-pill glass">
                    <span>{dish.tag}</span>
                  </div>
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
          onClick={prevDish}
          aria-label="Previous dish"
        >
          ‹
        </button>

        <div className="wheel-hint-pill glass">
          <span className="wheel-spin-icon">🎡</span>
          <span>
            <strong>{isMobile ? `Dish ${activeIndex + 1} of 9` : "9 Specialties"}</strong> • {isMobile ? "Swipe or tap to switch" : "Scroll or swipe to spin"}
          </span>
        </div>

        <button
          type="button"
          className="wheel-nav-btn next glass"
          onClick={nextDish}
          aria-label="Next dish"
        >
          ›
        </button>
      </div>
    </div>
  );
}
