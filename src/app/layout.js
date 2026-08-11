import "./globals.css";

export const viewport = {
  themeColor: "#1a1208",
};

export const metadata = {
  title: "Max Salon | Deluxe Saloon — An ambient street-corner radio",
  description:
    "Pull up a chair at Max Salon (Deluxe Saloon): a always-on radio playing old-school favourites over an illustrated Indian street corner. Experience a red street-side barbershop in India with continuous Truck Driver songs, vintage Hindi music, and classic Bollywood hits.",
  keywords: [
    "max salon",
    "salon song",
    "Deluxe Saloon: a always-on radio playing old-school favourites over an illustrated Indian street corner",
    "a red street-side barbershop in India",
    "a barber",
    "Deluxe Saloon",
    "Truck Driver songs",
    "old hindi songs",
    "ambient radio",
    "bollywood classics",
    "90s romantic songs",
    "retro hindi music",
    "Sharma ji ka salon",
    "indian barbershop radio",
    "vintage hindi playlist",
    "continuous hindi music",
    "lata mangeshkar kishore kumar hits",
    "hindi ghazals",
    "indian street corner aesthetic"
  ],
  authors: [{ name: "Max Salon" }],
  alternates: {
    canonical: "https://maxsalon.moneycal.in",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Max Salon | Deluxe Saloon — An ambient street-corner radio",
    description:
      "Pull up a chair at Max Salon (Deluxe Saloon): a always-on radio playing old-school favourites over an illustrated Indian street corner.",
    url: "https://maxsalon.moneycal.in",
    type: "website",
    images: [
      {
        url: "/backdrop.png",
        width: 1920,
        height: 1088,
        alt: "Max Salon Background",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Max Salon | Deluxe Saloon",
    description:
      "A red street-side barbershop in India. An always-on radio playing old-school Hindi favourites at Max Salon.",
    images: ["/backdrop.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preload" as="image" href="/backdrop.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RadioStation",
              "name": "Max Salon Radio",
              "alternateName": "Deluxe Saloon",
              "url": "https://maxsalon.moneycal.in",
              "description": "An always-on internet radio playing old-school 90s Hindi film songs and retro Indian music over an ambient street-corner background.",
              "genre": ["Retro Hindi Music", "90s Bollywood", "Lofi"],
              "image": "https://maxsalon.moneycal.in/backdrop.png"
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
