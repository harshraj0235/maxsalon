import "./globals.css";

export const metadata = {
  title: "मैक्स सैलून — an ambient street-corner radio",
  description:
    "Pull up a chair at Max Salon: an always-on radio playing old-school Hindi favourites over an illustrated Indian street corner, with a live count of everyone listening.",
  authors: [{ name: "Max Salon" }],
  openGraph: {
    title: "मैक्स सैलून — an ambient street-corner radio",
    description:
      "Pull up a chair at Max Salon: an always-on radio playing old-school Hindi favourites over an illustrated Indian street corner.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "मैक्स सैलून — an ambient street-corner radio",
    description:
      "An always-on radio playing old-school Hindi favourites at Max Salon.",
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
      </head>
      <body>{children}</body>
    </html>
  );
}
