"use client";

export default function MarqueeRibbon({
  text = "★ AUTHENTIC KERALA SADYA ★ CRISPY DOSAS ★ 4.0 GOOGLE RATED ★ SINCE 1983 ★ ALL-YOU-CAN-EAT MEALS",
  speed = "28s",
  reverse = false,
  className = "",
}) {
  return (
    <div className={`kinetic-marquee-wrapper ${className}`} aria-hidden="true">
      <div
        className={`kinetic-marquee-track ${reverse ? "reverse" : ""}`}
        style={{ "--marquee-speed": speed }}
      >
        <span className="marquee-text">{text}</span>
        <span className="marquee-text">{text}</span>
        <span className="marquee-text">{text}</span>
        <span className="marquee-text">{text}</span>
      </div>
    </div>
  );
}
