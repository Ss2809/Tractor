import { useEffect, useRef, useState } from "react";

function YouTubePlayer({ videoId, onReady, onStateChange }) {
  const playerRef = useRef(null);
  const [showPlaylist, setShowPlaylist] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const createPlayer = () => {
      if (cancelled) return;

      // Already created
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player("youtube-player", {
        width: "480",
        height: "270",

        videoId,

        playerVars: {
          autoplay: 0,
          controls: 0,
          rel: 0,
          playsinline: 1,
        },

        events: {
          onReady: (event) => {
            if (!cancelled) {
              onReady(event.target);
            }
          },

          onStateChange: (event) => {
            if (!cancelled) {
              onStateChange(event);
            }
          },
        },
      });
    };

    if (
      window.YT &&
      typeof window.YT.Player === "function"
    ) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;

      const existingScript = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      );

      if (!existingScript) {
        const script = document.createElement("script");

        script.src =
          "https://www.youtube.com/iframe_api";

        script.async = true;

        document.body.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
    };
  }, []); // ⭐ IMPORTANT — videoId नाही

  return (
    <div
      style={{
        position: "fixed",
        width: "480px",
        height: "270px",
        left: "-10000px",
        top: "-10000px",
        opacity: 0,
        pointerEvents: "none",
      }}
    >
      <div id="youtube-player" />
    </div>
  );
}

export default YouTubePlayer;