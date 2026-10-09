"use client";
import { useEffect, useState } from "react";

const SPICE_ITEMS = [
  { icon: "🍃", size: "1.4rem", left: "8%", delay: "0s", duration: "16s", type: "leaf" },
  { icon: "✨", size: "1rem", left: "22%", delay: "3s", duration: "12s", type: "sparkle" },
  { icon: "🍃", size: "1.1rem", left: "38%", delay: "7s", duration: "18s", type: "leaf" },
  { icon: "🌿", size: "1.3rem", left: "55%", delay: "2s", duration: "15s", type: "herb" },
  { icon: "✨", size: "0.9rem", left: "72%", delay: "5s", duration: "13s", type: "sparkle" },
  { icon: "🍃", size: "1.2rem", left: "88%", delay: "1s", duration: "17s", type: "leaf" },
  { icon: "⭐", size: "0.8rem", left: "94%", delay: "8s", duration: "14s", type: "sparkle" },
  { icon: "🌿", size: "1rem", left: "15%", delay: "9s", duration: "19s", type: "herb" },
];

export default function SpicesBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="spices-canvas" aria-hidden="true">
      {SPICE_ITEMS.map((item, idx) => (
        <span
          key={idx}
          className={`floating-spice-particle ${item.type}`}
          style={{
            left: item.left,
            fontSize: item.size,
            animationDelay: item.delay,
            animationDuration: item.duration,
          }}
        >
          {item.icon}
        </span>
      ))}
    </div>
  );
}
