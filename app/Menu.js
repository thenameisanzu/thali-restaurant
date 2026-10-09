"use client";
import { useState } from "react";
import { menu } from "./data";

export default function Menu() {
  const tabs = Object.keys(menu);
  const [t, setT] = useState(tabs[0]);

  return (
    <div className="menu-wrapper">
      <div className="tabs" role="tablist" aria-label="Menu categories">
        {tabs.map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={k === t}
            onClick={() => setT(k)}
            className={`tab-button ${k === t ? "active-tab" : ""}`}
          >
            {k}
          </button>
        ))}
      </div>

      <ul className="menu-list" key={t} role="tabpanel">
        {menu[t].map((item, index) => (
          <li
            key={item.n}
            className="menu-card glass"
            style={{ "--stagger-delay": `${index * 0.08}s` }}
          >
            <div className="menu-img-wrap">
              <img
                src={item.img}
                alt={item.n}
                className="menu-thumb-img"
                loading="lazy"
              />
              <div className="img-shine-overlay" aria-hidden="true" />
              <span
                className={`diet-icon ${item.veg ? "veg" : "nonveg"}`}
                title={item.veg ? "Vegetarian" : "Non-Vegetarian"}
              >
                <i />
              </span>
            </div>
            <div className="menu-details">
              <div className="menu-head">
                <h3>{item.n}</h3>
                {item.popular && (
                  <span className="badge-popular pulse-badge">
                    🔥 Popular
                  </span>
                )}
              </div>
              <p>{item.d}</p>
              <div className="menu-price-row">
                <b className="price">{item.p}</b>
                <a
                  href="#order"
                  className="btn-order-item"
                >
                  Order Now ↗
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
