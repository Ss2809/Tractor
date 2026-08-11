import { useEffect, useState } from "react";

import Player from "./components/Player";
import YouTubePlayer from "./components/YouTubePlayer";
import Playlist from "./components/Playlist";
import { getPlaylistSongs } from "./services/youtubeApi";
import HornButton from "./components/HornButton";
import useBackgroundSlider from "./hooks/useBackgroundSlider";
function App() {
  const [songs, setSongs] = useState([]);
  const [player, setPlayer] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  // =========================
  // CURRENT SONG INDEX
  // =========================

  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedIndex = localStorage.getItem("currentSongIndex");

    if (savedIndex !== null) {
      return Number(savedIndex);
    }

    return -1;
  });

  const currentSong = songs[currentIndex];
  const captions = [
    "रानात मेहनत, मनात संगीत",
    "मातीशी नातं, मनात गाणं",
    "शेतकऱ्याच्या कष्टाला सलाम",
    "मातीचा सुगंध, सुरांची साथ",
    "शेती हीच शान",
    "कष्टातून समृद्धी",
    "रानवाटेवर सुरांची सफर",
    " मिट्टी का राजा",
    "खेतों का राजा",
    "किसान की ताकत",
    "मिट्टी में जुनून",
    "मेहनत की पहचान",
  ];

  const [captionIndex, setCaptionIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCaptionIndex((prev) => (prev + 1) % captions.length);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  // =========================
  // LIVE CLOCK
  // =========================

  const [currentTimeClock, setCurrentTimeClock] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimeClock(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // =========================
  // GET PLAYLIST SONGS
  // =========================
  const { backgroundImage, handleNextClick } = useBackgroundSlider();
  useEffect(() => {
    async function loadSongs() {
      try {
        const data = await getPlaylistSongs();

        setSongs(data);

        // Check saved song
        const savedIndex = localStorage.getItem("currentSongIndex");

        if (savedIndex !== null) {
          const index = Number(savedIndex);

          // Make sure saved index is valid
          if (index >= 0 && index < data.length) {
            setCurrentIndex(index);
          } else {
            setRandomSong(data);
          }
        } else {
          // New visitor → random song
          setRandomSong(data);
        }
      } catch (error) {
        console.error("Playlist Error:", error);
      }
    }

    loadSongs();
  }, []);

  // =========================
  // RANDOM SONG
  // =========================

  const setRandomSong = (data) => {
    if (!data || data.length === 0) return;

    const randomIndex = Math.floor(Math.random() * data.length);

    setCurrentIndex(randomIndex);

    localStorage.setItem("currentSongIndex", randomIndex.toString());
  };

  // =========================
  // SAVE CURRENT SONG
  // =========================

  useEffect(() => {
    if (currentIndex >= 0) {
      localStorage.setItem("currentSongIndex", currentIndex.toString());
    }
  }, [currentIndex]);

  // =========================
  // CHANGE SONG
  // =========================

  useEffect(() => {
    if (!player || !currentSong) return;

    if (typeof player.loadVideoById === "function") {
      player.loadVideoById(currentSong.id);
    }

    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [currentIndex, player]);

  // =========================
  // UPDATE PROGRESS
  // =========================

  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      if (typeof player.getCurrentTime === "function") {
        setCurrentTime(player.getCurrentTime());
      }

      if (typeof player.getDuration === "function") {
        setDuration(player.getDuration());
      }
    }, 500);

    return () => clearInterval(interval);
  }, [player]);

  // =========================
  // PLAY / PAUSE
  // =========================

  const handlePlayPause = () => {
    if (!player) return;

    if (isPlaying) {
      player.pauseVideo();
      setIsPlaying(false);
    } else {
      player.playVideo();
      setIsPlaying(true);
    }
  };

  // =========================
  // PREVIOUS
  // =========================

  const handlePrevious = () => {
    if (songs.length === 0) return;

    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return songs.length - 1;
      }

      return prev - 1;
    });
  };

  // =========================
  // NEXT
  // =========================

  const handleNext = () => {
    if (songs.length === 0) return;

    setCurrentIndex((prev) => {
      if (prev >= songs.length - 1) {
        return 0;
      }

      return prev + 1;
    });
  };

  // =========================
  // SEEK
  // =========================

  const handleSeek = (time) => {
    if (!player) return;

    player.seekTo(time, true);
    setCurrentTime(time);
  };

  // =========================
  // YOUTUBE READY
  // =========================

  const handlePlayerReady = (ytPlayer) => {
    setPlayer(ytPlayer);

    if (typeof ytPlayer.getDuration === "function") {
      setDuration(ytPlayer.getDuration());
    }
  };

  // =========================
  // YOUTUBE STATE
  // =========================

  const handleStateChange = (event) => {
    // Playing
    if (event.data === 1) {
      setIsPlaying(true);
    }

    // Paused
    if (event.data === 2) {
      setIsPlaying(false);
    }

    // Ended
    if (event.data === 0) {
      handleNext();
    }
  };

  // =========================
  // LOADING
  // =========================

  if (!currentSong) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#08090d] text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />

          <p className="text-sm text-white/50">Loading your music...</p>
        </div>
      </main>
    );
  }

  return (
   <main className="relative z-10 min-h-[100dvh] overflow-hidden bg-black text-white">
      {/* =========================
          TRACTOR BACKGROUND
      ========================= */}

      <div className="fixed inset-0">
        <img
          src={backgroundImage}
          alt="Background"
          className="
    h-full
    w-full
    object-cover
    object-center
    transition-opacity
    duration-700
  "
        />
        {/* Dark overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/20
            via-transparent
            to-black/75
          "
        />

        {/* Bottom shade */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-[45%]
            bg-gradient-to-t
            from-black/70
            via-red-950/15
            to-transparent
          "
        />
      </div>

      {/* =========================
          HIDDEN YOUTUBE PLAYER
      ========================= */}

      <YouTubePlayer
        videoId={currentSong.id}
        onReady={handlePlayerReady}
        onStateChange={handleStateChange}
      />

      {/* =========================
    TOP BAR
========================= */}

      <div
        className="
    fixed
    left-0
    right-0
    top-[23px]
    z-[100]
    flex
    items-center
    px-10
  "
      >
        {/* TIME */}
        <div
          className="
      relative
      left-[25px]
      text-sm
      font-semibold
      tracking-wide
      text-white/80
      drop-shadow-lg
    "
        >
          {currentTimeClock
            .toLocaleTimeString("en-IN", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
            .toLowerCase()}
        </div>

        {/* CENTER */}
        <div
          className="
      absolute
      left-1/2
      -translate-x-1/2
      flex
      items-center
      gap-2
      rounded-full
      border
      border-white/10
      bg-black/20
      px-4
      py-2
      backdrop-blur-md
    "
        >
          <span
            className="
        h-2
        w-2
        rounded-full
        bg-emerald-400
        shadow-[0_0_10px_rgba(52,211,153,0.8)]
      "
          />

          <span className="text-xs font-medium tracking-wide text-white/75">
            शेताच्या वाटेवर
          </span>
        </div>

        {/* RIGHT BUTTON */}
        <button
          type="button"
          onClick={() =>
            window.open(
              "https://youtube.com/playlist?list=PLgObA3pAqvOh87Z03QG8Z4xE-uqlAWSBy",
              "_blank",
              "noopener,noreferrer",
            )
          }
          className="
      absolute
      right-[40px]
      flex
      h-9
      w-9
      items-center
      justify-center
      rounded-full
      border
      border-white/15
      bg-white/10
      text-white/80
      backdrop-blur-md
      transition
      hover:scale-110
      hover:bg-red-500/20
      hover:text-red-400
    "
        >
          <span className="text-[11px] font-bold">▶</span>
        </button>
      </div>

      {/* =========================
          TRACTOR WALA
      ========================= */}
      <HornButton />
      <section
        className="
          absolute
          left-0
          right-0
          top-[20%]
          z-10
          flex
          justify-center
          px-4
        "
      >
        <div className="text-center">
          <h1
            className="
              text-[clamp(48px,6vw,88px)]
              font-bold
              leading-none
              tracking-tight
              text-white
              drop-shadow-[0_6px_25px_rgba(0,0,0,0.6)]
            "
          >
            ट्रॅक्टर वाला
          </h1>

          <div
            className="
              mx-auto
              mt-5
              h-[2px]
              w-24
              rounded-full
              bg-gradient-to-r
              from-transparent
              via-red-400
              to-transparent
              shadow-[0_0_14px_rgba(248,113,113,0.5)]
            "
          />
        </div>
      </section>
      {/* =========================
    ROTATING CAPTION
========================= */}

      <div
        className="
    fixed
    bottom-[155px]
    left-1/2
    z-40
    -translate-x-1/2
    text-center
  "
      >
        <p
          key={captionIndex}
          className="
    whitespace-nowrap
    text-base
    font-extrabold
    tracking-wide
    text-white
    drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)]
    transition-all
    duration-500
  "
        >
          {captions[captionIndex]}
        </p>
      </div>

      {/* =========================
          MUSIC PLAYER
      ========================= */}

      <div
        className="
          fixed
          bottom-[75px]
          left-0
          right-0
          z-50
          flex
          justify-center
          px-4
        "
      >
       <Player
  song={currentSong}
  isPlaying={isPlaying}
  currentTime={currentTime}
  duration={duration}
  onPlayPause={handlePlayPause}
  onPrevious={handlePrevious}
  onNext={handleNext}
  onSeek={handleSeek}
  onNextClick={handleNextClick}
        onPlaylist={() => setShowPlaylist((prev) => !prev)}
/>
      </div>
      {showPlaylist && (
        <div
          className="
      fixed
      bottom-[150px]
      right-6
      z-[60]
    "
        >
          <Playlist
            songs={songs}
            currentIndex={currentIndex}
            onSelect={(index) => {
              setCurrentIndex(index);
              setShowPlaylist(false);
            }}
            onClose={() => setShowPlaylist(false)}
          />
        </div>
      )}
    </main>
  );
}

export default App;
