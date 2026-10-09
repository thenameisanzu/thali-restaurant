"use client";
import { useState } from "react";
import { WhatsAppBrandIcon } from "./Icons";

export default function Reserve() {
  const [sent, setSent] = useState(null);
  const today = new Date().toISOString().split("T")[0];

  function submit(e) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget));
    setSent(d);
  }

  const whatsappMessage = sent
    ? encodeURIComponent(
        `Hello Thali Restaurant Kottayam, I would like to reserve a table for ${sent.guests} guest(s) under the name ${sent.name} on ${sent.date} at ${sent.time}. Contact: ${sent.phone}`
      )
    : "";

  if (sent)
    return (
      <div className="glass reserve-done animate-celebrate" role="status">
        <div className="reserve-success-icon animate-bounce-in">✓</div>
        <h3>Table Reservation Request Received!</h3>
        <p>
          Thank you <strong>{sent.name}</strong>. We have received your booking request for <strong>{sent.guests} guest(s)</strong> on <strong>{sent.date}</strong> at <strong>{sent.time}</strong>.
        </p>
        <div className="reserve-actions">
          <a
            href={`https://wa.me/918111911320?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp pulse-glow"
          >
            <WhatsAppBrandIcon size={24} />
            <span>Send Details on WhatsApp (+91 81119 11320)</span>
          </a>
          <button className="btn ghost" onClick={() => setSent(null)}>
            Edit Request
          </button>
        </div>
      </div>
    );

  return (
    <form className="glass reserve" onSubmit={submit}>
      <label>
        Full Name
        <input name="name" required autoComplete="name" placeholder="Your name" />
      </label>
      <label>
        Phone Number
        <input
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="e.g. +91 98765 43210"
        />
      </label>
      <label>
        Date
        <input name="date" type="date" required min={today} defaultValue={today} />
      </label>
      <label>
        Time
        <input name="time" type="time" required defaultValue="13:00" />
      </label>
      <label className="wide">
        Number of Guests
        <select name="guests" defaultValue="2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "Guest" : "Guests"}
            </option>
          ))}
          <option value="9+">9 or more (Large Group)</option>
        </select>
      </label>
      <button className="btn solid wide btn-submit-reserve" type="submit">
        <span>Request Table Reservation</span>
        <span className="btn-arrow-motion">→</span>
      </button>
    </form>
  );
}
