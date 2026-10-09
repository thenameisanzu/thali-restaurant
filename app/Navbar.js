"use client";
import { useEffect, useState } from "react";
import { PhoneCallIcon } from "./Icons";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sectionIds = ["top", "story", "menu", "gallery", "reviews", "visit", "order", "reserve"];
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      // Check if at bottom
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
    setMobileMenuOpen(false);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`nav liquid-glass-dock ${scrolled ? "is-scrolled" : ""} ${
          mobileMenuOpen ? "is-menu-open" : ""
        }`}
      >
        {/* Specular Edge Refraction Overlay */}
        <div className="dock-specular-highlight" aria-hidden="true" />

        {/* Brand Logo & Name (Always Visible) */}
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

        {/* Desktop Navigation Links with Active Highlighting */}
        <nav className="desktop-nav" aria-label="Main Navigation">
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
            className={`cta cta-pulse nav-item ${
              activeSection === "reserve" ? "active is-reserve-active" : ""
            }`}
            onClick={(e) => handleNavClick(e, "reserve")}
            aria-current={activeSection === "reserve" ? "page" : undefined}
          >
            <span className="nav-label">Reserve</span>
          </a>
        </nav>

        {/* Mobile Header Actions (Visible on Mobile) */}
        <div className="mobile-nav-actions">
          <a
            href="#reserve"
            className="mobile-reserve-cta btn solid"
            onClick={(e) => handleNavClick(e, "reserve")}
          >
            Reserve
          </a>

          {/* Hamburger Menu Toggle Button */}
          <button
            type="button"
            className={`mobile-menu-toggle ${mobileMenuOpen ? "is-active" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-line top" />
            <span className="hamburger-line mid" />
            <span className="hamburger-line bot" />
          </button>
        </div>
      </header>

      {/* Mobile Liquid Glass Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          className="mobile-glass-dropdown liquid-glass"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="mobile-dropdown-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-links-grid">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    className={`mobile-nav-link ${isActive ? "active" : ""}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                  >
                    <span className="mobile-link-text">{link.label}</span>
                    {isActive && <span className="mobile-active-badge">Active</span>}
                  </a>
                );
              })}
              <a
                href="#order"
                className="mobile-nav-link"
                onClick={(e) => handleNavClick(e, "order")}
              >
                <span className="mobile-link-text">Order Online</span>
              </a>
            </div>

            <div className="mobile-dropdown-footer">
              <a
                href="tel:+918111911320"
                className="mobile-call-btn btn ghost btn-icon-row"
              >
                <PhoneCallIcon size={16} />
                <span>Call 081119 11320</span>
              </a>
              <a
                href="#reserve"
                className="btn solid btn-glow"
                onClick={(e) => handleNavClick(e, "reserve")}
              >
                Book a Table
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
