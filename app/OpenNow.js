"use client";
import { useEffect, useState } from "react";

export default function OpenNow() {
  const [status, setStatus] = useState({
    open: true,
    text: "Open today 11:00 am – 10:30 pm",
  });

  useEffect(() => {
    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
        weekday: "short",
      });
      const parts = formatter.formatToParts(now);
      const hour = Number(parts.find(p => p.type === "hour")?.value || 12);
      const minute = Number(parts.find(p => p.type === "minute")?.value || 0);
      const weekday = parts.find(p => p.type === "weekday")?.value;

      const isSunday = weekday === "Sun";
      const closeHour = isSunday ? 22.5 : 22; // 10:30 PM on Sunday, 10:00 PM otherwise
      const currentDecHour = hour + minute / 60;

      const isOpen = currentDecHour >= 11 && currentDecHour < closeHour;

      if (isOpen) {
        setStatus({
          open: true,
          text: `Open now until ${isSunday ? "10:30 pm" : "10:00 pm"}`,
        });
      } else {
        setStatus({
          open: false,
          text: "Closed now • Opens at 11:00 am",
        });
      }
    } catch {
      // Fallback
    }
  }, []);

  return (
    <p className={`open-indicator ${status.open ? "is-open" : "is-closed"}`}>
      <span className="dot" />
      <span className="status-text">{status.text}</span>
    </p>
  );
}
