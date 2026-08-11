import "./globals.css";

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
  openGraph: {
    title: "Max Salon | Deluxe Saloon — An ambient street-corner radio",
    description:
      "Pull up a chair at Max Salon (Deluxe Saloon): a always-on radio playing old-school favourites over an illustrated Indian street corner.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Max Salon | Deluxe Saloon",
    description:
      "A red street-side barbershop in India. An always-on radio playing old-school Hindi favourites at Max Salon.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#1a1208" />
        <link rel="preload" as="image" href="/backdrop.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
