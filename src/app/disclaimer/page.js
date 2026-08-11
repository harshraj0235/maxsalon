export const metadata = {
  title: "Disclaimer | Max Salon",
  description: "Legal disclaimer for Max Salon Radio.",
};

export default function Disclaimer() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <h1>Disclaimer</h1>
        <p>If you require any more information or have any questions about our site's disclaimer, please feel free to contact us by email at harshraj0235@gmail.com.</p>
        
        <h2>Audio & Content Disclaimer</h2>
        <p>All audio played on Max Salon is streamed directly from YouTube via the official YouTube Iframe API. <strong>Nothing is hosted on this site</strong>, and all rights remain with the original record labels, composers, and performers. Song credits and playback are handled entirely by YouTube.</p>
        <p>This website serves only as a front-end aesthetic wrapper for publicly available YouTube playlists. We do not claim ownership over any of the audio content.</p>

        <h2>Takedown Requests</h2>
        <p>If you hold the rights to any content embedded here and wish for it to be removed from our curated playlists, please email us directly at harshraj0235@gmail.com and we will remove the playlist ID from our rotation immediately.</p>

        <h2>Consent</h2>
        <p>By using our website, you hereby consent to our disclaimer and agree to its terms.</p>
        <br />
        <a href="/" className="back-link">← Back to Radio</a>
      </div>
    </div>
  );
}
