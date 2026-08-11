"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   GENRE PLAYLISTS (YouTube Playlist IDs)
   YouTube handles all video availability — every song plays!
   ═══════════════════════════════════════════════════════════ */
const GENRES = [
  {
    label: "🎵 Old Hindi Classics",
    emoji: "🎵",
    playlists: [
      "PL0CaUqi81mPlQeSCgy5wvNHLRkHV0ZkLe",
      "PLafSq5UblCNWzrBiEOwBeIdoU8AFXfTqp",
      "PLUOEf-vLOCSnKxLaqvfnziciUcPjRkj12",
      "PLKfT935kIlBeRujqLRMudkhy5hU_vLSsg",
    ],
  },
  {
    label: "💕 90s Romantic",
    emoji: "💕",
    playlists: [
      "PLAFjPVdERAkt7jNU1XW7EWXHLyYyf7Sux",
      "PL6VikFWYkZnvc00H1-sjzFd104TF1J0fA",
      "PL6VikFWYkZns-3oi6zVo7t1Fcw5UwGP04",
    ],
  },
  {
    label: "🎤 Modern Hits",
    emoji: "🎤",
    playlists: [
      "PL0Z67tlyTaWq7xmJYR0Im1fwtIhc0T0_6",
      "PLtUuYOHQlyT1vTuyNc4owl0gQgE9keubR",
      "PL03L1hwj_4MxMljTBYD6jG9jgLyuSkn97",
      "PLLlb2C74bLzcvPjI7wiz0OlhSNdrZ-mdG",
    ],
  },
  {
    label: "🪩 Party & Dance",
    emoji: "🪩",
    playlists: [
      "PLnGRV05XmAq2xzqAI9kr-9o11J7uLS19w",
      "PLc6gu5KBaWUS-ZcQAv3TmXiUKp01j-R-Q",
      "PL9bw4S5ePsEFXg-VBA_DR9zOfdC8cpZ17",
      "PLVet2itwf3Bc-oJjmFAPgMy6rnTv1ZKwU",
    ],
  },
  {
    label: "🌙 Ghazals",
    emoji: "🌙",
    playlists: [
      "PL9T9N_Py36f2VbMScwriqbh9FDfPBBK8f",
      "PLJeNQvgQ4Sl_beDke_V6L2OL67jl3CfF4",
      "PLJeNQvgQ4Sl-mNI5aSCy7dEmQrLMwadhS",
    ],
  },
  {
    label: "☕ Nukkad Ki Chai (Morning Rush)",
    emoji: "☕",
    playlists: [
      "PLafSq5UblCNWzrBiEOwBeIdoU8AFXfTqp",
      "PLUOEf-vLOCSnKxLaqvfnziciUcPjRkj12",
    ],
  },
  {
    label: "🌧️ Rainy Day Romance (90s Hits)",
    emoji: "🌧️",
    playlists: [
      "PLAFjPVdERAkt7jNU1XW7EWXHLyYyf7Sux",
      "PL6VikFWYkZnvc00H1-sjzFd104TF1J0fA",
    ],
  },
  {
    label: "🌙 Midnight Ghazals",
    emoji: "🌙",
    playlists: [
      "PL9T9N_Py36f2VbMScwriqbh9FDfPBBK8f",
      "PLJeNQvgQ4Sl_beDke_V6L2OL67jl3CfF4",
    ],
  },
  {
    label: "📿 Sufi Soul & Qawwali",
    emoji: "📿",
    playlists: [
      "PLahHeeDRaiOO3WvdazYlvG3TyqVuKmy-O",
      "PLn0SllVfMyLJMAqRyC91A0tOcIUiR1FOE",
      "PL1qzqizLIWMY5pfPKEHoLIhkTSpInNeCt",
    ],
  },
  {
    label: "🎸 2000s Indie Pop",
    emoji: "🎸",
    playlists: [
      "PLH5aaxSRO1hONPNFk1H6iWb47O--pFYl-",
      "PL1gfuz7ZYcaM2Z7sCGOWORCF0CGmonzOv",
      "PL95yAnbAkHvlNe-_31CQZcmSMSP8LX4AV",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function Home() {
  const [genre, setGenre] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [listeners, setListeners] = useState(0);
  const [clock, setClock] = useState("");
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState("0:00");
  const [dur, setDur] = useState("0:00");
  const [volume, setVolume] = useState(80);
  const [showVolume, setShowVolume] = useState(false);
  const [showGenre, setShowGenre] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [trackTitle, setTrackTitle] = useState("");
  const [trackThumb, setTrackThumb] = useState("");
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [totalTracks, setTotalTracks] = useState(0);
  const [bgImage, setBgImage] = useState("/backdrop.png");
  const [title1, setTitle1] = useState("शर्मा जी का");
  const [title2, setTitle2] = useState("सैलून");
  const [subTitle, setSubTitle] = useState("Sharma ji ka salon · open all hours");
  const [isBuffering, setIsBuffering] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);

  // New Feature States
  const [isNightMode, setIsNightMode] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showTimerMenu, setShowTimerMenu] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [sfxVolumes, setSfxVolumes] = useState({ rain: 0, traffic: 0 });
  const [showSfx, setShowSfx] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { user: "System", text: "Welcome to Max Salon Radio..." }
  ]);
  const [isCrtMode, setIsCrtMode] = useState(false);
  const [environment, setEnvironment] = useState(0);

  const ENVIRONMENTS = [
    { name: "Deluxe Saloon", bg: "/backdrop.png", sfx: { rain: 0, traffic: 40 } },
    { name: "Nukkad Chai", bg: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=2070&auto=format&fit=crop", sfx: { rain: 60, traffic: 20 } },
    { name: "Midnight Highway", bg: "https://images.unsplash.com/photo-1518599904199-0ca897819ddb?q=80&w=2070&auto=format&fit=crop", sfx: { rain: 10, traffic: 80 } },
  ];
  
  const handleEnvChange = (idx) => {
    setEnvironment(idx);
    setBgImage(ENVIRONMENTS[idx].bg);
    setSfxVolumes(ENVIRONMENTS[idx].sfx);
  };

  const sfxPlayersRef = useRef({ rain: null, traffic: null });

  const playerRef = useRef(null);
  const readyRef = useRef(false);
  const timerRef = useRef(null);
  const startedRef = useRef(false);
  const genreRef = useRef(genre);
  const silentAudioRef = useRef(null);

  useEffect(() => { genreRef.current = genre; }, [genre]);

  /* ── Clock & Timer ── */
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = d.getHours() % 12 || 12;
      const m = String(d.getMinutes()).padStart(2, "0");
      setClock(`${h} ${m} ${d.getHours() >= 12 ? "pm" : "am"}`);
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let id;
    if (timerActive && timer > 0) {
      id = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0 && timerActive) {
      setTimerActive(false);
      // Play a tiny beep (optional) or just stop
    }
    return () => clearInterval(id);
  }, [timerActive, timer]);

  /* ── Chat Mocking ── */
  useEffect(() => {
    const chatNames = ["Rohan99", "Aisha_Music", "Guest_482", "SharmaJiFan", "ChaiLover", "DelhiBoy", "RetroVibes"];
    const chatTexts = ["Listening from Mumbai 🌧️", "This track takes me back...", "Perfect vibe for studying", "Can we get more Kishore Kumar?", "Hello from Pune!", "The rain sounds + this song = magic", "Anyone else listening while coding?"];
    
    const id = setInterval(() => {
      setChatMessages(prev => {
        const newMsg = {
          user: chatNames[Math.floor(Math.random() * chatNames.length)],
          text: chatTexts[Math.floor(Math.random() * chatTexts.length)]
        };
        const updated = [...prev, newMsg];
        return updated.length > 5 ? updated.slice(updated.length - 5) : updated;
      });
    }, 45000); // New message every 45s
    return () => clearInterval(id);
  }, []);

  /* ── LocalStorage Load & PWA Setup ── */
  useEffect(() => {
    // LocalStorage
    const savedBg = localStorage.getItem("maxsalon_bg");
    if (savedBg) setBgImage(savedBg);
    const savedT1 = localStorage.getItem("maxsalon_t1");
    if (savedT1) setTitle1(savedT1);
    const savedT2 = localStorage.getItem("maxsalon_t2");
    if (savedT2) setTitle2(savedT2);
    const savedSub = localStorage.getItem("maxsalon_sub");
    if (savedSub) setSubTitle(savedSub);

    // PWA Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    
    // PWA Install Prompt Listener
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then(() => {
        setInstallPrompt(null);
      });
    }
  };

  /* ── Real-Time Listeners ── */
  useEffect(() => {
    const userId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    
    const ping = async () => {
      try {
        const res = await fetch("/api/presence", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId })
        });
        const data = await res.json();
        if (data.count !== undefined) {
          setListeners(data.count);
        }
      } catch (err) {}
    };

    ping();
    const id = setInterval(ping, 10000);
    return () => clearInterval(id);
  }, []);

  /* ── Format seconds ── */
  const fmt = (s) => {
    if (!s || isNaN(s)) return "0:00";
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  };

  /* ── Update track info from player ── */
  const updateTrackInfo = useCallback(() => {
    try {
      const p = playerRef.current;
      if (!p || !readyRef.current) return;
      let title = "";
      let thumb = "";
      if (typeof p.getVideoData === "function") {
        const data = p.getVideoData();
        if (data && data.title) {
          if (data.title !== title) {
            title = data.title;
            setTrackTitle(title);
            setHistory(prev => {
              if (prev[0] === title) return prev;
              const next = [title, ...prev];
              return next.length > 10 ? next.slice(0, 10) : next;
            });
          }
        }
        if (data && data.video_id) {
          thumb = `https://img.youtube.com/vi/${data.video_id}/default.jpg`;
          setTrackThumb(thumb);
        }
      }
      if (typeof p.getPlaylistIndex === "function") {
        setPlaylistIndex(p.getPlaylistIndex() + 1);
      }
      if (typeof p.getPlaylist === "function") {
        const pl = p.getPlaylist();
        if (pl) setTotalTracks(pl.length);
      }

      // Update Media Session for background playback
      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: title || "Max Salon Radio",
          artist: "Max Salon",
          artwork: thumb ? [{ src: thumb, sizes: "120x90", type: "image/jpeg" }] : []
        });
      }
    } catch { }
  }, []);

  /* ── Progress tracker ── */
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      try {
        const p = playerRef.current;
        if (p && readyRef.current && typeof p.getCurrentTime === "function") {
          const ct = p.getCurrentTime();
          const d = p.getDuration();
          setElapsed(fmt(ct));
          setDur(fmt(d));
          setProgress(d > 0 ? (ct / d) * 100 : 0);
        }
      } catch { }
    }, 500);
  }, []);

  /* ── Load YT API ── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.YT && window.YT.Player) return;
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(s);
  }, []);

  /* ── Pick random playlist from genre ── */
  const getPlaylistId = useCallback((genreIdx) => {
    const g = GENRES[genreIdx];
    return g.playlists[Math.floor(Math.random() * g.playlists.length)];
  }, []);

  /* ── Initialize SFX Players Once ── */
  useEffect(() => {
    let checkInterval;
    const initSfx = () => {
      if (window.YT && window.YT.Player) {
        if (!sfxPlayersRef.current.rain) {
          sfxPlayersRef.current.rain = new window.YT.Player("yt-sfx-rain", {
            height: "10", width: "10", videoId: "mPZkdNFkNps",
            playerVars: { autoplay: 1, controls: 0, loop: 1, playlist: "mPZkdNFkNps" },
            events: {
              onReady: (e) => { e.target.setVolume(0); e.target.playVideo(); }
            }
          });
        }
        if (!sfxPlayersRef.current.traffic) {
          sfxPlayersRef.current.traffic = new window.YT.Player("yt-sfx-traffic", {
            height: "10", width: "10", videoId: "92Q5HlV-oEQ",
            playerVars: { autoplay: 1, controls: 0, loop: 1, playlist: "92Q5HlV-oEQ" },
            events: {
              onReady: (e) => { e.target.setVolume(0); e.target.playVideo(); }
            }
          });
        }
        clearInterval(checkInterval);
      }
    };
    checkInterval = setInterval(initSfx, 500);
    return () => clearInterval(checkInterval);
  }, []);

  /* ── Create / load player with playlist ── */
  const loadPlaylist = useCallback((genreIdx) => {
    window.YT.ready(() => {
      // Main Music Player
      playerRef.current = new window.YT.Player("yt-target", {
        height: "200",
        width: "200",
        playerVars: {
          listType: "playlist",
          list: GENRES[genreIdx].playlists[0],
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
        },
        events: {
          onReady: (e) => {
            readyRef.current = true;
            e.target.setVolume(volume);
            e.target.setShuffle(true);
            // Wait a bit, then play
            setTimeout(() => {
              e.target.playVideo();
              startTimer();
            }, 1500);
          },
          onStateChange: (e) => {
            const s = e.data;
            if (s === 1) {
              // PLAYING
              if (silentAudioRef.current) silentAudioRef.current.play().catch(() => { });
              setIsPlaying(true);
              setIsBuffering(false);
              updateTrackInfo();
            } else if (s === 2) {
              if (silentAudioRef.current) silentAudioRef.current.pause();
              setIsPlaying(false);
              setIsBuffering(false);
            } else if (s === 3) {
              // BUFFERING
              setIsBuffering(true);
            } else if (s === 0) {
              // ENDED — YouTube auto-advances in playlist mode
              // But if it's the last track, reload the playlist
              setTimeout(updateTrackInfo, 1000);
            }
          },
          onError: (e) => {
            // In playlist mode, YouTube auto-skips errored videos
            console.warn("YT playlist error:", e.data, "— auto-skipping");
            setTimeout(updateTrackInfo, 2000);
          },
        },
      });
    });
  }, [volume, startTimer, updateTrackInfo]);

  /* ── Volume sync ── */
  useEffect(() => {
    try {
      if (playerRef.current && readyRef.current && typeof playerRef.current.setVolume === "function") {
        playerRef.current.setVolume(volume);
      }
    } catch { }
  }, [volume]);

  /* ── Silent Audio Hack for Mobile Background Play ── */
  const initAndPlaySilentAudio = () => {
    if (!silentAudioRef.current) {
      const audio = new Audio("data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsTOAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsU0AAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsW0AAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsYwAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsagAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQscMAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQseEAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsgAAAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsiMAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQskcAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsmQAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsoQAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsqIAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQssIAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsugAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQswcAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsyYAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQs0UAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQs2MAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQs4EAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQs58AAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQs74AAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQs90AAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQs/wAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf");
      audio.loop = true;
      silentAudioRef.current = audio;
    }
    silentAudioRef.current.play().catch(() => { });
  };

  const pauseSilentAudio = () => {
    if (silentAudioRef.current) {
      silentAudioRef.current.pause();
    }
  };

  /* ── Handlers ── */
  const handlePlayPause = useCallback(() => {
    if (!startedRef.current) {
      initAndPlaySilentAudio();
      startedRef.current = true;
      setHasStarted(true);
      loadPlaylist(genre);
      return;
    }
    try {
      if (playerRef.current && readyRef.current) {
        if (isPlaying) {
          pauseSilentAudio();
          playerRef.current.pauseVideo();
        } else {
          initAndPlaySilentAudio();
          playerRef.current.playVideo();
        }
      } else {
        initAndPlaySilentAudio();
        loadPlaylist(genre);
      }
    } catch {
      initAndPlaySilentAudio();
      loadPlaylist(genre);
    }
  }, [genre, isPlaying, loadPlaylist]);

  const handleNext = useCallback(() => {
    initAndPlaySilentAudio();
    try {
      if (playerRef.current && readyRef.current && typeof playerRef.current.nextVideo === "function") {
        playerRef.current.nextVideo();
        setTimeout(updateTrackInfo, 1500);
      }
    } catch { }
  }, [updateTrackInfo]);

  useEffect(() => {
    try {
      if (sfxPlayersRef.current.rain && typeof sfxPlayersRef.current.rain.setVolume === "function") {
        sfxPlayersRef.current.rain.setVolume(sfxVolumes.rain);
      }
      if (sfxPlayersRef.current.traffic && typeof sfxPlayersRef.current.traffic.setVolume === "function") {
        sfxPlayersRef.current.traffic.setVolume(sfxVolumes.traffic);
      }
    } catch {}
  }, [sfxVolumes]);

  const handlePrev = useCallback(() => {
    initAndPlaySilentAudio();
    try {
      if (playerRef.current && readyRef.current && typeof playerRef.current.previousVideo === "function") {
        playerRef.current.previousVideo();
        setTimeout(updateTrackInfo, 1500);
      }
    } catch { }
  }, [updateTrackInfo]);

  /* ── Keyboard shortcuts & Media Session ── */
  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;
      if (e.code === "Space") { e.preventDefault(); handlePlayPause(); }
      else if (e.code === "ArrowRight") { e.preventDefault(); handleNext(); }
      else if (e.code === "ArrowLeft") { e.preventDefault(); handlePrev(); }
      else if (e.code === "ArrowUp") { e.preventDefault(); setVolume(v => Math.min(100, v + 10)); }
      else if (e.code === "ArrowDown") { e.preventDefault(); setVolume(v => Math.max(0, v - 10)); }
    };
    window.addEventListener("keydown", handler);

    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("play", handlePlayPause);
      navigator.mediaSession.setActionHandler("pause", handlePlayPause);
      navigator.mediaSession.setActionHandler("previoustrack", handlePrev);
      navigator.mediaSession.setActionHandler("nexttrack", handleNext);
    }

    return () => {
      window.removeEventListener("keydown", handler);
      if ("mediaSession" in navigator) {
        navigator.mediaSession.setActionHandler("play", null);
        navigator.mediaSession.setActionHandler("pause", null);
        navigator.mediaSession.setActionHandler("previoustrack", null);
        navigator.mediaSession.setActionHandler("nexttrack", null);
      }
    };
  }, [handlePlayPause, handleNext, handlePrev]);

  const switchGenre = (idx) => {
    setGenre(idx);
    setShowGenre(false);
    if (startedRef.current) {
      // Destroy old player and load new genre
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch { }
        playerRef.current = null;
        readyRef.current = false;
      }
      loadPlaylist(idx);
    }
  };

  const handleBgUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1920;
          const MAX_HEIGHT = 1080;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to JPEG to fit in localStorage (usually 5MB limit)
          const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
          setBgImage(dataUrl);

          try {
            localStorage.setItem("maxsalon_bg", dataUrl);
          } catch (err) {
            console.warn("Storage quota exceeded, unable to cache bg", err);
          }
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const currentGenre = GENRES[genre];

  /* ═══════════ RENDER ═══════════ */
  return (
    <>
      <main className={`saloon-main ${isNightMode ? "night-mode" : ""}`}>
      {/* Feature Expansion: CRT Overlay */}
      {isCrtMode && (
        <>
          <div className="crt-filter" />
          <div className="crt-vignette" />
        </>
      )}

      {/* Backdrop */}
      <picture className="backdrop">
        <img src={bgImage} alt="Illustrated Indian street-corner salon" width={1920} height={1088} />
      </picture>
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      {/* Header */}
      <header className="saloon-header">
        <span className="header-time">{clock}</span>
        <span className="header-live">
          <span className="live-dot-wrap"><span className="ping" /><span className="dot" /></span>
          <span className="listener-num">{listeners}</span>
          <span className="listener-label">online</span>
        </span>
        <nav className="header-links">
          <button onClick={() => setIsCrtMode(!isCrtMode)} className="chip" title="TV Mode" style={{ background: isCrtMode ? "rgba(245,234,214,0.15)" : "" }}>
            📺
          </button>
          <div className="chip" style={{ position: "relative" }}>
            <select 
              value={environment} 
              onChange={(e) => handleEnvChange(parseInt(e.target.value))}
              style={{ background: "transparent", color: "inherit", border: "none", outline: "none", cursor: "pointer", appearance: "none" }}
            >
              {ENVIRONMENTS.map((env, i) => <option key={i} value={i} style={{ color: "#000" }}>{env.name}</option>)}
            </select>
          </div>
          <button onClick={() => setIsNightMode(!isNightMode)} className="chip" title="Toggle Day/Night" style={{ background: isNightMode ? "rgba(245,234,214,0.15)" : "" }}>
            {isNightMode ? "☀️" : "🌙"}
          </button>
          <a href="https://buymeacoffee.com" target="_blank" rel="noopener noreferrer" className="chip" title="Support the Salon">
            ☕ Tip
          </a>
          <button onClick={() => { setShowTimerMenu(!showTimerMenu); setShowSfx(false); setShowHistory(false); }} className="chip" title="Focus Timer" style={{ background: showTimerMenu ? "rgba(245,234,214,0.15)" : "" }}>
            ⏱️ {timer > 0 ? fmt(timer) : ""}
          </button>
          <button onClick={() => { setShowSfx(!showSfx); setShowTimerMenu(false); setShowHistory(false); }} className="chip" title="Mixer" style={{ background: showSfx ? "rgba(245,234,214,0.15)" : "" }}>
            🎛️
          </button>
          <button onClick={() => { setShowHistory(!showHistory); setShowTimerMenu(false); setShowSfx(false); }} className="chip" title="History" style={{ background: showHistory ? "rgba(245,234,214,0.15)" : "" }}>
            📜
          </button>
          <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="chip" title="Spotify">
            <svg viewBox="0 0 24 24" fill="#1ED760"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.12-.899-.48-.12-.421.12-.78.479-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.362 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
            <span>Spotify</span>
          </a>
          <a href="https://music.youtube.com" target="_blank" rel="noopener noreferrer" className="chip" title="YT Music">
            <svg viewBox="0 0 24 24" fill="#FF0033"><path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" /></svg>
            <span>YT Music</span>
          </a>
        </nav>
      </header>

      {/* Floating Menus */}
      {showTimerMenu && (
        <div className="glass-panel" style={{ position: "absolute", top: 70, right: 120, display: "flex", gap: 8 }}>
          <button onClick={() => { setTimer(25 * 60); setTimerActive(true); setShowTimerMenu(false); }} className="chip">25m</button>
          <button onClick={() => { setTimer(50 * 60); setTimerActive(true); setShowTimerMenu(false); }} className="chip">50m</button>
          <button onClick={() => { setTimerActive(false); setTimer(0); setShowTimerMenu(false); }} className="chip">Stop</button>
        </div>
      )}

      {showSfx && (
        <div className="glass-panel sfx-mixer">
          <div className="sfx-row">
            <span>🌧️ Rain</span>
            <input type="range" min="0" max="100" value={sfxVolumes.rain} onChange={e => setSfxVolumes(p => ({ ...p, rain: parseInt(e.target.value) }))} />
          </div>
          <div className="sfx-row">
            <span>🚗 Traffic</span>
            <input type="range" min="0" max="100" value={sfxVolumes.traffic} onChange={e => setSfxVolumes(p => ({ ...p, traffic: parseInt(e.target.value) }))} />
          </div>
        </div>
      )}

      {showHistory && (
        <div className="glass-panel history-panel">
          <div style={{ fontWeight: "bold", paddingBottom: 6, borderBottom: "1px solid var(--glass-border)", marginBottom: 4 }}>Recently Played</div>
          {history.map((h, i) => (
            <div key={i} className={`history-item ${i === 0 ? "playing" : ""}`}>
              {i === 0 ? "▶ " : ""}{h}
            </div>
          ))}
          {history.length === 0 && <div className="history-item">No tracks played yet...</div>}
        </div>
      )}

      {/* Center title */}
      <div className="saloon-center">
        <h1 className="saloon-title" title="Click to edit text!">
          <span
            contentEditable
            suppressContentEditableWarning
            spellCheck="false"
            onBlur={(e) => {
              const val = e.target.innerText;
              setTitle1(val);
              localStorage.setItem("maxsalon_t1", val);
            }}
            style={{ display: "block", outline: "none", cursor: "text" }}
          >
            {title1}
          </span>
          <span
            contentEditable
            suppressContentEditableWarning
            spellCheck="false"
            onBlur={(e) => {
              const val = e.target.innerText;
              setTitle2(val);
              localStorage.setItem("maxsalon_t2", val);
            }}
            style={{ display: "block", outline: "none", cursor: "text" }}
          >
            {title2}
          </span>
        </h1>
        <p
          className="saloon-subtitle"
          contentEditable
          suppressContentEditableWarning
          spellCheck="false"
          title="Click to edit text!"
          onBlur={(e) => {
            const val = e.target.innerText;
            setSubTitle(val);
            localStorage.setItem("maxsalon_sub", val);
          }}
          style={{ outline: "none", cursor: "text" }}
        >
          {subTitle}
        </p>
      </div>

      <div className="spacer" />

      {/* Genre selector */}
      <div className="playlist-toggle-row" style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        <button className="playlist-toggle-btn" onClick={() => setShowGenre(g => !g)}>
          {currentGenre.emoji} {currentGenre.label} ▾
        </button>
        {totalTracks > 0 && (
          <span style={{ fontSize: "0.68rem", color: "rgba(245,234,214,0.35)", alignSelf: "center", fontFamily: "var(--font-mono)" }}>
            Track {playlistIndex}/{totalTracks}
          </span>
        )}
      </div>

      {/* Genre dropdown */}
      {showGenre && (
        <div style={{
          position: "fixed", bottom: 120, left: "50%", transform: "translateX(-50%)",
          width: "90%", maxWidth: 360, background: "rgba(14,11,5,0.94)", border: "1px solid rgba(245,234,214,0.08)",
          borderRadius: 16, backdropFilter: "blur(24px)", zIndex: 200, overflow: "hidden",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.5)",
        }}>
          <div style={{ padding: "12px 16px 8px", borderBottom: "1px solid rgba(245,234,214,0.06)", fontSize: "0.8rem", fontWeight: 700, fontFamily: "var(--font-display)" }}>
            Choose Genre
          </div>
          {GENRES.map((g, i) => (
            <button
              key={i}
              onClick={() => switchGenre(i)}
              style={{
                display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 16px",
                textAlign: "left", background: i === genre ? "rgba(245,234,214,0.06)" : "transparent",
                border: "none", borderBottom: "1px solid rgba(245,234,214,0.04)", color: "#f5ead6",
                fontSize: "0.88rem", fontWeight: i === genre ? 700 : 400, cursor: "pointer",
                transition: "background 0.15s",
              }}
            >
              <span style={{ fontSize: "1.3rem" }}>{g.emoji}</span>
              <span>{g.label}</span>
              {i === genre && <span style={{ marginLeft: "auto", color: "rgba(46,204,113,0.8)", fontSize: "0.75rem" }}>● Playing</span>}
            </button>
          ))}
        </div>
      )}

      {/* Player bar */}
      <div className="player-wrap">
        <div className="player-glass">
          {trackThumb ? (
            <img
              src={trackThumb}
              alt=""
              width={52}
              height={52}
              className={`player-thumb ${isPlaying ? "spinning" : ""}`}
              onError={(e) => { e.target.style.opacity = "0.3"; }}
            />
          ) : (
            <div className={`cassette-wrap ${isPlaying ? "playing" : ""}`}>
              <div className="cassette-label" />
              <div className="cassette-reels">
                <div className="reel" />
                <div className="reel" />
              </div>
            </div>
          )}

          <div className="player-info">
            <div className="player-song">
              {hasStarted && trackTitle ? (
                <>
                  {trackTitle}
                  {isBuffering && <span style={{ opacity: 0.5, fontSize: "0.8em", marginLeft: 6 }}>Buffering...</span>}
                </>
              ) : (hasStarted ? "Loading..." : "Tap ▶ to tune in…")}
            </div>
            <div className="player-artist">
              {hasStarted ? currentGenre.label : "Max Salon Radio"}
            </div>
            <div className="player-progress-row">
              <div className="player-progress-bar">
                <div className="player-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="player-time">{elapsed} / {dur}</span>
            </div>
          </div>

          <div className="player-controls">
            <button className="ctrl-btn" onClick={() => setShowVolume(v => !v)} aria-label="Volume"
              title={`Volume: ${volume}%`}>
              {volume === 0 ? "🔇" : volume < 50 ? "🔉" : "🔊"}
            </button>
            <button className="ctrl-btn" onClick={handlePrev} aria-label="Previous">⏮</button>
            <button className="ctrl-btn ctrl-btn-play" onClick={handlePlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button className="ctrl-btn" onClick={handleNext} aria-label="Next">⏭</button>
          </div>
        </div>

        {/* Volume slider */}
        {showVolume && (
          <div style={{
            display: "flex", alignItems: "center", gap: 10, justifyContent: "center",
            marginTop: 8, padding: "6px 16px",
            background: "rgba(14,11,5,0.8)", borderRadius: 999,
            backdropFilter: "blur(12px)", border: "1px solid rgba(245,234,214,0.08)",
          }}>
            <span style={{ fontSize: "0.7rem", opacity: 0.5, fontFamily: "var(--font-mono)" }}>VOL</span>
            <input type="range" min={0} max={100} value={volume}
              onChange={e => setVolume(Number(e.target.value))}
              style={{ flex: 1, accentColor: "#f5ead6", maxWidth: 200 }} />
            <span style={{ fontSize: "0.7rem", opacity: 0.5, fontFamily: "var(--font-mono)", width: 28 }}>{volume}%</span>
          </div>
        )}
      </div>

      {/* Keyboard shortcuts */}
      <div className="contact-link" style={{ fontSize: "0.6rem", opacity: 0.3 }}>
        ⌨️ Space: play/pause · ←→: prev/next · ↑↓: volume
      </div>

      {/* Disclaimer / Contact */}
      <div style={{
        fontSize: "0.55rem",
        opacity: 0.35,
        textAlign: "center",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "0 20px 20px 20px",
        lineHeight: "1.5",
        fontFamily: "var(--font-sans)",
        position: "relative",
        zIndex: 10
      }}>
        Audio plays through YouTube’s embedded player. Nothing is hosted on this site, and all rights stay with the labels, composers and performers. Song credits are put together from film soundtrack listings.<br /><br />
        If you hold rights to anything here and want it taken off, email <a href="mailto:harshraj0235@gmail.com" style={{ textDecoration: "underline" }}>harshraj0235@gmail.com</a> and it comes down.
      </div>

      {/* Background Image Edit Tool */}
      <label
        className="contact-link"
        style={{
          position: "fixed",
          bottom: 16,
          left: 16,
          cursor: "pointer",
          zIndex: 50,
          background: "rgba(14,11,5,0.8)",
          padding: "6px 12px",
          borderRadius: 999,
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(245,234,214,0.08)"
        }}
      >
        🖼️ Edit Background
        <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleBgUpload} />
      </label>

      {/* PWA Install Button */}
      {installPrompt && (
        <button 
          className="contact-link" 
          onClick={handleInstallClick}
          style={{ 
            position: "fixed", 
            bottom: 16, 
            right: 16, 
            cursor: "pointer", 
            zIndex: 50,
            background: "rgba(14,11,5,0.8)",
            padding: "6px 12px",
            borderRadius: 999,
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(46,204,113,0.5)",
            color: "#2ecc71"
          }}
        >
          📱 Install App
        </button>
      )}

      {/* Mock Chat Box */}
      <div className="chat-box">
        {chatMessages.map((msg, i) => (
          <div key={i} className="chat-msg">
            <span className="chat-user">{msg.user}:</span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      {/* Hidden YT player */}
      <div className="yt-iframe-hidden" id="yt-wrap">
        <div id="yt-target" />
      </div>
      <div className="yt-iframe-hidden">
        <div id="yt-sfx-rain" />
        <div id="yt-sfx-traffic" />
      </div>
    </main>

    <section className="seo-footer">
      <div className="seo-footer-inner">
        <div className="seo-footer-brand">
          <h2 className="seo-footer-title">डीलक्स सलून</h2>
          <div className="seo-footer-subtitle">DELUXE SALOON / MAX SALON</div>
        </div>
        
        <p className="seo-footer-desc">
          90s Hindi film songs, playing round the clock — the kind of tape that never stops at a neighbourhood barber shop. Also written "Deluxe Salon", though the board outside almost always reads saloon. Perfect background ambiance for studying, working, or just relaxing on a rainy Sunday.
        </p>

        <div className="seo-footer-rotations-title">R O T A T I O N S</div>
        
        <div className="seo-footer-rotations-grid">
          {GENRES.map((g, i) => (
            <button key={i} onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              switchGenre(i);
            }}>
              {g.label}
            </button>
          ))}
        </div>

        <div className="seo-footer-buttons">
          <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#1ED760"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.12-.899-.48-.12-.421.12-.78.479-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.362 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" /></svg>
            Spotify
          </a>
          <a href="https://music.youtube.com" target="_blank" rel="noopener noreferrer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF0033"><path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" /></svg>
            YT Music
          </a>
        </div>

        <div className="seo-footer-disclaimer">
          <p>Audio plays through YouTube's embedded player. Nothing is hosted on this site, and all rights stay with the labels, composers and performers. Song credits are put together from film soundtrack listings.</p>
          <br />
          <p>If you hold rights to anything here and want it taken off, email <a href="mailto:harshraj0235@gmail.com">harshraj0235@gmail.com</a> and it comes down.</p>
        </div>

        <div className="seo-footer-bottom">
          <span>© 2026 MAXSALON.IN</span>
          <nav>
            <a href="/about">About</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms</a>
            <a href="/disclaimer">Disclaimer</a>
          </nav>
        </div>
      </div>
    </section>
  </>
  );
}
