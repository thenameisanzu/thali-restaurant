import Reserve from "./Reserve";
import Plate from "./Plate";
import Menu from "./Menu";
import OpenNow from "./OpenNow";
import SpicesBackground from "./SpicesBackground";
import MarqueeRibbon from "./MarqueeRibbon";
import { reviewsData } from "./data";
import {
  SwiggyBrandIcon,
  ZomatoBrandIcon,
  WhatsAppBrandIcon,
  InstagramBrandIcon,
  GoogleMapsBrandIcon,
  GoogleGIcon,
  PhoneCallIcon,
  MapPinIcon,
} from "./Icons";

const PHONE = "+918111911320";
const PHONE_DISPLAY = "081119 11320";
const INSTA = "https://www.instagram.com/thali.restaurant/?hl=en";
const GOOGLE_MAPS = "https://maps.google.com/?q=Thali+Restaurant+Kottayam+Opp+Malayala+Manorama";
const ext = { target: "_blank", rel: "noopener noreferrer" };

const galleryShots = [
  { img: "/hero_thali.jpg", title: "Authentic Kerala Thali Meals", tag: "Unlimited Refills" },
  { img: "/masala_dosa.jpg", title: "Crispy Masala Dosa with Vada", tag: "Breakfast & Tiffin" },
  { img: "/chicken_biryani.jpg", title: "Malabar Chicken Dum Biryani", tag: "Chef's Special" },
  { img: "/chicken_dosa.jpg", title: "Special Chicken Stuffed Dosa", tag: "House Favorite" },
  { img: "/palada_payasam.jpg", title: "Rich Palada Payasam Dessert", tag: "Daily Sweet" },
  { img: "/dining_hall.jpg", title: "Family Dining Hall & Cafe Ambiance", tag: "Air Conditioned" },
];

export default function Home() {
  return (
    <main className="main-wrapper">
      {/* Floating Ambient Kinetic Spices Canvas */}
      <SpicesBackground />

      {/* Top Floating Navbar (Apple Liquid Glass Dock) */}
      <header className="nav glass nav-animated">
        <a className="brand" href="#top">
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
        <nav aria-label="Main Navigation">
          <a href="#top">Home</a>
          <a href="#menu">Menu</a>
          <a href="#story">About</a>
          <a href="#gallery">Gallery</a>
          <a href="#visit">Visit</a>
          <a href="#reserve" className="cta cta-pulse">Reserve</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="top" className="hero hero-motion">
        {/* Floating Ambient Glow Orbs */}
        <div className="ambient-orbs-container" aria-hidden="true">
          <div className="ambient-orb orb-1" />
          <div className="ambient-orb orb-2" />
          <div className="ambient-orb orb-3" />
        </div>

        <div className="hero-badge animate-fade-down">
          <span className="badge-star star-glow">★ 4.0</span>
          <span>(2,874+ Google Reviews) • Multi-Cuisine &amp; Tiffin</span>
        </div>
        
        <p className="kicker animate-fade-down delay-1">Opposite Malayala Manorama, KK Road, Kottayam</p>
        
        <h1 className="hero-title animated-brand-title" aria-label="Thali">
          {"Thali".split("").map((char, index) => (
            <span
              key={index}
              className="animated-letter"
              style={{ "--char-index": index }}
            >
              {char}
            </span>
          ))}
        </h1>

        <p className="sub-title animate-fade-down delay-2">
          Traditional Kerala Meals • Specialty Dosas • Dum Biryani
        </p>

        {/* Interactive 3D Platter */}
        <Plate />

        <div className="row center hero-buttons animate-fade-up delay-1">
          <a className="btn solid btn-glow btn-magnetic" href="#order">
            Order Online
          </a>
          <a className="btn ghost btn-icon-row btn-magnetic" href={`tel:${PHONE}`}>
            <PhoneCallIcon size={18} />
            <span>Call {PHONE_DISPLAY}</span>
          </a>
          <a className="btn outline-dark btn-magnetic" href="#reserve">
            Reserve Table
          </a>
        </div>
      </section>

      {/* Kinetic Typography Marquee Ribbon 1 */}
      <MarqueeRibbon
        text="★ KOTTAYAM'S FAMOUS KERALA SADYA ★ CRISPY SPECIALTY DOSAS ★ MALABAR CHICKEN DUM BIRYANI ★ UNLIMITED REFILLS ★ SERVING SINCE 1983"
        speed="32s"
        className="ribbon-hero"
      />

      {/* Story / About Section */}
      <section id="story" className="wrap story">
        <div className="story-content">
          <span className="section-tag animate-slide-right">Our Culinary Tradition</span>
          <h2 className="story-heading">
            Authentic Kerala Meals, served unlimited the way it is eaten at home.
          </h2>
          <p className="story-desc">
            Located right opposite Malayala Manorama on KK Road, <strong>Thali Restaurant &amp; Café</strong> is Kottayam's beloved food destination for traditional Kerala banana leaf meals, hot crispy specialty dosas, fresh juice shakes, and flavourful Malabar biryanis.
          </p>
          <div className="feature-grid">
            <div className="feature-item hover-card-motion glass">
              <span className="f-icon float-icon">🍚</span>
              <div>
                <strong>All-You-Can-Eat</strong>
                <p>Hot refills of rice, sambar, rasam, and curries before you ask.</p>
              </div>
            </div>
            <div className="feature-item hover-card-motion glass">
              <span className="f-icon float-icon-alt">🌱</span>
              <div>
                <strong>Pure &amp; Fresh Ingredients</strong>
                <p>Kudampuli, cold-pressed coconut oil, fresh grated coconut and home ground spices.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="story-images">
          <div className="story-img-card s1 3d-card-hover">
            <img src="/dining_hall.jpg" alt="Thali Restaurant Kottayam Interior & Dining" />
            <span className="img-caption floating-badge">Family Dining Hall</span>
          </div>
          <div className="story-img-card s2 3d-card-hover">
            <img src="/masala_dosa.jpg" alt="Crispy Masala Dosa with Sambar and Chutneys" />
            <span className="img-caption floating-badge-alt">Specialty Dosas</span>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="wrap">
        <div className="section-head">
          <div>
            <span className="section-tag">Freshly Prepared Daily</span>
            <h2>Our Menu Highlights</h2>
          </div>
          <p className="head-desc">
            Price range: ₹100 – ₹300. Vegetarian &amp; Non-Vegetarian specialties cooked fresh on order.
          </p>
        </div>
        <Menu />
      </section>

      {/* Kinetic Typography Marquee Ribbon 2 (Reverse Direction) */}
      <MarqueeRibbon
        text="★ HOMESTYLE KUDAMPULI FISH CURRY ★ CRISPY GHEE ROAST ★ FRESH TENDER COCONUT PUDDING ★ PALADA PAYASAM ★ ALL-DAY TIFFIN"
        speed="28s"
        reverse={true}
        className="ribbon-menu"
      />

      {/* Gallery Section with Motion Rail */}
      <section id="gallery" className="gal">
        <div className="wrap head">
          <div>
            <span className="section-tag">Visual Feast</span>
            <h2>Inside Thali Kottayam</h2>
          </div>
          <a className="btn ghost btn-icon-row btn-instagram-link hover-tilt" href={INSTA} {...ext}>
            <InstagramBrandIcon size={22} />
            <span>Follow @thali.restaurant</span>
          </a>
        </div>
        <div className="rail-container">
          <div className="rail" tabIndex={0} aria-label="Photo gallery">
            {galleryShots.map((shot, idx) => (
              <div key={idx} className="photo-card glass photo-card-motion 3d-tilt-hover">
                <div className="photo-img-wrapper">
                  <img src={shot.img} alt={shot.title} loading="lazy" />
                  <div className="photo-overlay-glow" aria-hidden="true" />
                </div>
                <div className="photo-info">
                  <span className="photo-tag">{shot.tag}</span>
                  <h4>{shot.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section id="reviews" className="wrap">
        <div className="section-head text-center">
          <span className="section-tag">Customer Love</span>
          <h2>Rated 4.0 Stars on Google</h2>
          <p className="head-desc">Over 2,874+ genuine reviews from diners across Kerala and travellers on KK Road.</p>
        </div>
        
        <div className="reviews-grid">
          {reviewsData.map((rev, i) => (
            <figure key={i} className="review-card glass review-card-motion 3d-card-hover">
              <div className="review-stars-motion">
                <span className="stars-glint">★★★★★</span>
              </div>
              <blockquote>"{rev.quote}"</blockquote>
              <figcaption>
                <strong>{rev.author}</strong>
                <span>{rev.time}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        
        <div className="row center">
          <a className="btn ghost btn-icon-row btn-google-link hover-tilt btn-magnetic" href={GOOGLE_MAPS} {...ext}>
            <GoogleGIcon size={20} />
            <span>Read all 2,870+ Google Reviews ↗</span>
          </a>
        </div>
      </section>

      {/* Visit Us / Location Section */}
      <section id="visit" className="wrap split-location">
        <div className="location-info glass location-card-motion">
          <span className="section-tag">Find Us</span>
          <h2>Visit Our Restaurant</h2>
          <OpenNow />
          
          <address>
            <strong>Thali Restaurant &amp; Café</strong>
            <br />
            Opposite Malayala Manorama,
            <br />
            KK Road, Kottayam, Kerala 686001
          </address>

          <div className="contact-details">
            <div className="contact-row">
              <span className="c-label">Phone:</span>
              <a href={`tel:${PHONE}`} className="c-val btn-inline-link">
                <PhoneCallIcon size={16} />
                <span>{PHONE_DISPLAY}</span>
              </a>
            </div>
            <div className="contact-row">
              <span className="c-label">WhatsApp:</span>
              <a
                href={`https://wa.me/918111911320`}
                className="c-val btn-inline-link"
                {...ext}
              >
                <WhatsAppBrandIcon size={18} />
                <span>+91 81119 11320</span>
              </a>
            </div>
            <div className="contact-row">
              <span className="c-label">Cuisine:</span>
              <span className="c-val">South Indian Meals, Specialty Dosas, Biryani, Juices</span>
            </div>
            <div className="contact-row">
              <span className="c-label">Avg. Cost:</span>
              <span className="c-val">₹200 – ₹400 for two</span>
            </div>
          </div>

          <dl className="hours">
            <div>
              <dt>Monday – Saturday</dt>
              <dd>11:00 am – 10:00 pm</dd>
            </div>
            <div>
              <dt>Sunday</dt>
              <dd>11:00 am – 10:30 pm</dd>
            </div>
          </dl>

          <div className="row">
            <a className="btn solid btn-icon-row btn-glow btn-magnetic" href={`tel:${PHONE}`}>
              <PhoneCallIcon size={18} />
              <span>Call ({PHONE_DISPLAY})</span>
            </a>
            <a className="btn ghost btn-icon-row btn-google-map-action hover-tilt btn-magnetic" href={GOOGLE_MAPS} {...ext}>
              <GoogleMapsBrandIcon size={20} />
              <span>Get Directions</span>
            </a>
          </div>
        </div>

        <div className="map-wrapper glass map-hover-motion">
          <iframe
            title="Thali Restaurant Kottayam Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.33144883181!2d76.527318!3d9.591238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062ba1e98d9e1b%3A0x6b2450d035e5d36e!2sMalayala%20Manorama%2C%20Kottayam!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "360px", borderRadius: "20px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* Online Delivery Band */}
      <section id="order" className="band band-animated">
        <div className="wrap">
          <span className="band-tag animate-pulse-glow">Instant Online Delivery</span>
          <h2>Thali, Delivered to Your Doorstep.</h2>
          <p>Order fresh Kerala meals, crispy dosas, and biryanis directly to your home or office in Kottayam.</p>
          <div className="row center delivery-row">
            <a
              className="btn btn-brand-zomato btn-icon-row brand-hover-pulse btn-magnetic"
              href="https://www.zomato.com/kottayam/restaurants"
              {...ext}
            >
              <ZomatoBrandIcon size={26} />
              <span>Order on Zomato</span>
            </a>
            <a
              className="btn btn-brand-swiggy btn-icon-row brand-hover-pulse btn-magnetic"
              href="https://www.swiggy.com/restaurants-in-kottayam"
              {...ext}
            >
              <SwiggyBrandIcon size={26} />
              <span>Order on Swiggy</span>
            </a>
            <a
              className="btn btn-brand-phone btn-icon-row brand-hover-pulse btn-magnetic"
              href={`tel:${PHONE}`}
            >
              <PhoneCallIcon size={20} />
              <span>Takeaway: {PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reserve" className="wrap split">
        <div>
          <span className="section-tag">Dine With Us</span>
          <h2>Reserve a Table</h2>
          <p className="lede">
            Planning a lunch with family or an evening team dinner? Book your table in advance and get instant WhatsApp confirmation.
          </p>
          <div className="reserve-perks">
            <p className="perk-item-motion">✓ Priority seating during peak rush hours</p>
            <p className="perk-item-motion delay-1">✓ Customized group meals &amp; thali platters</p>
            <p className="perk-item-motion delay-2">✓ Clean air-conditioned family dining hall</p>
          </div>
        </div>
        <Reserve />
      </section>

      {/* Footer */}
      <footer className="wrap foot">
        <div className="foot-brand">
          <img
            src="/logo.png"
            alt="Thali Restaurant Kottayam Since 1983"
            className="foot-logo-img logo-spin-subtle"
          />
          <div>
            <strong>Thali Restaurant &amp; Café</strong>
            <p className="foot-tagline">Serving Good Food Since 1983</p>
            <p>Opposite Malayala Manorama, KK Road, Kottayam, Kerala 686001</p>
            <p>
              Call:{" "}
              <a href={`tel:${PHONE}`} className="foot-phone-link">
                <PhoneCallIcon size={14} />
                <span>{PHONE_DISPLAY}</span>
              </a>
            </p>
          </div>
        </div>
        <div className="foot-links">
          <a href={INSTA} className="foot-brand-link hover-tilt" {...ext}>
            <InstagramBrandIcon size={20} />
            <span>Instagram</span>
          </a>
          <a href={GOOGLE_MAPS} className="foot-brand-link hover-tilt" {...ext}>
            <GoogleMapsBrandIcon size={20} />
            <span>Google Maps (4.0 ★)</span>
          </a>
          <a
            href={`https://wa.me/918111911320`}
            className="foot-brand-link hover-tilt"
            {...ext}
          >
            <WhatsAppBrandIcon size={20} />
            <span>WhatsApp</span>
          </a>
          <a href="#menu" className="hover-underline">Menu</a>
          <a href="#reserve" className="hover-underline">Table Reservation</a>
        </div>
        <span className="copy">© {new Date().getFullYear()} Thali Cafe &amp; Restaurant. All rights reserved.</span>
      </footer>
    </main>
  );
}
