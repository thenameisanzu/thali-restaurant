"use client";
import { useEffect, useState } from "react";

export default function Spotlight() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsDesktop(true);
    }

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isDesktop) return null;

  return (
    <div
      className="ambient-cursor-spotlight"
      style={{
        transform: `translate3d(${pos.x - 300}px, ${pos.y - 300}px, 0)`,
      }}
      aria-hidden="true"
    />
  );
}
