import {
  ListMusic,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
} from "lucide-react";

function Player({
  song,
  isPlaying,
  currentTime,
  duration,
  onPlayPause,
  onPrevious,
  onNext,
  onSeek,
  onNextClick,
  onPlaylist,
}) {
  if (!song) {
    return null;
  }

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="mx-auto w-[460px] max-w-[calc(100vw-24px)]">
      {/* PLAYER */}
      <div
        className="
          flex
          h-[68px]
          items-center
          gap-2.5
          rounded-full
          border
          border-white/15
          bg-black/35
          px-2.5
          shadow-[0_12px_35px_rgba(0,0,0,0.4)]
          backdrop-blur-xl
        "
      >
        {/* =========================
            ALBUM
        ========================= */}

        <img
          src={song.thumbnail}
          alt={song.title}
          className={`
            h-12
            w-12
            shrink-0
            rounded-full
            object-cover
            ring-1
            ring-white/15
            transition-all
            duration-300
            ${isPlaying ? "animate-spin [animation-duration:8s]" : ""}
          `}
        />

        {/* =========================
            SONG INFO
        ========================= */}

        <div className="min-w-0 flex-1">
          <h3
            className="
              truncate
              text-[12px]
              font-bold
              leading-tight
              text-white
            "
          >
            {song.title}
          </h3>

          <p
            className="
              mt-[2px]
              truncate
              text-[9px]
              text-white/50
            "
          >
            {song.channel}
          </p>

          {/* Progress */}

          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="w-6 text-[7px] text-white/45">
              {formatTime(currentTime)}
            </span>

            <div className="relative h-[2px] flex-1">
              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                  bg-white/20
                "
              />

              <div
                className="
                  absolute
                  left-0
                  top-0
                  h-full
                  rounded-full
                  bg-white
                "
                style={{
                  width: `${progress}%`,
                }}
              />

              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={(e) => onSeek(Number(e.target.value))}
                className="
                  absolute
                  -top-[7px]
                  left-0
                  h-4
                  w-full
                  cursor-pointer
                  opacity-0
                "
              />
            </div>

            <span className="w-6 text-right text-[7px] text-white/45">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* =========================
            CONTROLS
        ========================= */}

        <div className="flex shrink-0 items-center gap-0.5">
          {/* Shuffle */}

          <button
            type="button"
            className="
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-full
              text-white/45
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <Shuffle size={11} />
          </button>

          {/* Previous */}

          <button
            type="button"
            onClick={onPrevious}
            className="
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-full
              text-white/65
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <SkipBack size={12} fill="currentColor" />
          </button>

          {/* PLAY */}

          <button
            type="button"
            onClick={onPlayPause}
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white
              text-black
              shadow-[0_4px_14px_rgba(0,0,0,0.35)]
              transition
              hover:scale-105
              active:scale-95
            "
          >
            {isPlaying ? (
              <Pause size={16} fill="currentColor" />
            ) : (
              <Play size={16} fill="currentColor" />
            )}
          </button>

          {/* Next */}

          <button
            onClick={() => {
              onNextClick();
              onNext();
            }}
            className="
    flex h-7 w-7
    items-center
    justify-center
    rounded-full
    text-white/70
    transition
    hover:bg-white/10
    hover:text-white
  "
          >
            <SkipForward size={14} fill="currentColor" />
          </button>

          {/* Playlist */}

          <button
            type="button"
            onClick={onPlaylist}
            className="
    flex
    h-6
    w-6
    items-center
    justify-center
    rounded-full
    text-white/60
    transition
    hover:bg-white/10
    hover:text-white
  "
          >
            <ListMusic size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
