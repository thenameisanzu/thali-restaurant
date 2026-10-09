"use client";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#top", id: "top", label: "Home" },
  { href: "#menu", id: "menu", label: "Menu" },
  { href: "#story", id: "story", label: "About" },
  { href: "#gallery", id: "gallery", label: "Gallery" },
  { href: "#visit", id: "visit", label: "Visit" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("top");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionIds = ["top", "story", "menu", "gallery", "reviews", "visit", "order", "reserve"];
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      // Special check for bottom of page -> reserve
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80
      ) {
        setActiveSection("reserve");
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            // Map reviews/order to appropriate parent nav item if needed
            if (id === "reviews") {
              setActiveSection("gallery");
            } else if (id === "order") {
              setActiveSection("visit");
            } else {
              setActiveSection(id);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setActiveSection(targetId);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`nav liquid-glass-dock ${scrolled ? "is-scrolled" : ""}`}>
      {/* Specular Edge Refraction Overlay */}
      <div className="dock-specular-highlight" aria-hidden="true" />

      {/* Brand Logo & Name (Visible on Desktop) */}
      <a className="brand" href="#top" onClick={(e) => handleNavClick(e, "top")}>
        <img
          src="/logo.png"
          alt="Thali Restaurant Logo"
          className="nav-logo-img logo-spin-subtle"
        />
        <div className="brand-text">
          <span className="brand-logo">THALI</span>
          <span className="brand-sub">Café &amp; Restaurant</span>
        </div>
      </a>

      {/* Navigation Links with Active Highlighting */}
      <nav aria-label="Main Navigation">
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <a
              key={link.id}
              href={link.href}
              className={`nav-item ${isActive ? "active" : ""}`}
              onClick={(e) => handleNavClick(e, link.id)}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="nav-label">{link.label}</span>
              {isActive && <span className="nav-active-pill-dot" aria-hidden="true" />}
            </a>
          );
        })}

        {/* CTA Reserve Button */}
        <a
          href="#reserve"
          className={`cta cta-pulse nav-item ${activeSection === "reserve" ? "active is-reserve-active" : ""}`}
          onClick={(e) => handleNavClick(e, "reserve")}
          aria-current={activeSection === "reserve" ? "page" : undefined}
        >
          <span className="nav-label">Reserve</span>
        </a>
      </nav>
    </header>
  );
}
