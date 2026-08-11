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
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/icon.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/icon.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
    ],
  }
}
