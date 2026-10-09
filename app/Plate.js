"use client";
import { useEffect, useState, useRef } from "react";

const REEL_DISHES = [
  {
    id: "thali",
    name: "Kerala Sadya",
    img: "/hero_thali.jpg",
    angle: 0,
  },
  {
    id: "dosa",
    name: "Crispy Dosa",
    img: "/masala_dosa.jpg",
    angle: 60,
  },
  {
    id: "biryani",
    name: "Dum Biryani",
    img: "/chicken_biryani.jpg",
    angle: 120,
  },
  {
    id: "chicken_dosa",
    name: "Chicken Dosa",
    img: "/chicken_dosa.jpg",
    angle: 180,
  },
  {
    id: "payasam",
    name: "Palada Payasam",
    img: "/palada_payasam.jpg",
    angle: 240,
  },
  {
    id: "sambar",
    name: "Kottayam Sambar",
    img: "/sambar.jpg",
    angle: 300,
  },
];

export default function Plate() {
  const [rotation, setRotation] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Continuous scroll progress rotation (0.22 deg per pixel scrolled)
          setRotation(window.scrollY * 0.22);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial sync
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Subtle 3D Magnetic Mouse Tilt on Desktop
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

  return (
    <div
      className="film-reel-showcase"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient Radial Golden Glow */}
      <div className="reel-ambient-glow" aria-hidden="true" />

      {/* 3D Viewport */}
      <div
        className="reel-stage"
        style={{
          transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition:
            tilt.x === 0
              ? "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
              : "transform 0.08s ease-out",
        }}
      >
        {/* Film Reel Wheel Chassis (Rotates with scroll) */}
        <div
          className="reel-chassis"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Metallic / Glass Outer Rim */}
          <div className="reel-outer-rim" aria-hidden="true" />
          <div className="reel-inner-groove" aria-hidden="true" />

          {/* Symmetrical 6 Film Reel Cutouts (Holes) with Counter-Rotating Upright Food Images */}
          {REEL_DISHES.map((dish) => {
            // Total orbital angle for this slot
            const slotAngle = dish.angle;

            return (
              <div
                key={dish.id}
                className="reel-cutout-slot"
                style={{
                  transform: `translate(-50%, -50%) rotate(${slotAngle}deg) translateY(calc(-1 * var(--reel-radius, 126px))) rotate(-${slotAngle + rotation}deg)`,
                }}
              >
                {/* Clean Circular Cutout Housing the Food Photo */}
                <div className="reel-dish-circle">
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className="reel-dish-img"
                    loading="eager"
                  />
                  {/* Subtle Specular Sheen across aperture */}
                  <div className="reel-cutout-sheen" aria-hidden="true" />
                </div>
              </div>
            );
          })}

          {/* Central Hub / Rosette Axle (Inspired by film reel center) */}
          <div className="reel-center-hub" aria-hidden="true">
            <div className="hub-outer-ring" />
            <div className="hub-core-bolt">
              <span className="hub-core-dot" />
            </div>
            <div className="hub-spokes-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}
