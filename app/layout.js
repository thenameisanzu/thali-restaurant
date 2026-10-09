import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--serif",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://thalikottayam.com"),
  title: "Thali Restaurant & Café | KK Road, Kottayam",
  description:
    "Authentic Kerala meals on banana leaf, specialty dosas, and Malabar biryani. Serving good food since 1983. Opposite Malayala Manorama, KK Road, Kottayam. Phone: 081119 11320.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  keywords: [
    "Thali Restaurant Kottayam",
    "Thali Cafe Kottayam",
    "Kerala Meals KK Road",
    "Best restaurant near Malayala Manorama Kottayam",
    "Masala Dosa Kottayam",
    "Chicken Dosa Kottayam",
    "South Indian Meals Kottayam",
  ],
  openGraph: {
    title: "Thali Restaurant & Café | Kottayam",
    description: "Multi-cuisine South Indian restaurant serving traditional meals and specialty dosas. Rated 4.0 on Google with 2,870+ reviews.",
    url: "https://thalikottayam.com",
    siteName: "Thali Restaurant Kottayam",
    images: [
      {
        url: "/hero_thali.jpg",
        width: 1200,
        height: 800,
        alt: "Thali Restaurant Kerala Meals",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1a472a",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Thali Restaurant & Café",
    image: "/hero_thali.jpg",
    telephone: "+918111911320",
    url: "https://thalikottayam.com",
    servesCuisine: ["South Indian", "Kerala Traditional Meals", "Dosas", "Biryani"],
    priceRange: "₹200 - ₹400",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Opposite Malayala Manorama, KK Road",
      addressLocality: "Kottayam",
      addressRegion: "Kerala",
      postalCode: "686001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "9.5912",
      longitude: "76.5273",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.0",
      reviewCount: "2874",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "11:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "11:00",
        closes: "22:30",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${serif.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
