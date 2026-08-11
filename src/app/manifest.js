export default function manifest() {
  return {
    name: 'Max Salon Radio',
    short_name: 'Max Salon',
    description: 'An always-on radio playing old-school favourites over an illustrated Indian street corner.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1208',
    theme_color: '#1a1208',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/favicon.ico',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon.ico',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
