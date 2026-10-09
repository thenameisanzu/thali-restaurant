"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 40, suffix: "+", label: "Years of Culinary Tradition" },
  { value: 2874, suffix: "+", label: "Google 5-Star Reviews" },
  { value: 25, suffix: "+", label: "Authentic Kerala Dishes" },
  { value: 100, suffix: "%", label: "Pure & Fresh Spices" },
];

function CounterItem({ item, started }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const end = item.value;
    const duration = 1800; // ms
    const stepTime = 20; // 50 fps
    const totalSteps = duration / stepTime;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [started, item.value]);

  return (
    <div className="stat-card glass">
      <div className="stat-number">
        {count.toLocaleString()}
        <span className="stat-suffix">{item.suffix}</span>
      </div>
      <div className="stat-label">{item.label}</div>
    </div>
  );
}

export default function StatsCounter() {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
        }
      },
      { threshold: 0.25 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="stats-row" ref={ref}>
      {STATS.map((item, idx) => (
        <CounterItem key={idx} item={item} started={started} />
      ))}
    </div>
  );
}
