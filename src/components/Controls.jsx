import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react";

function Controls({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
}) {
  return (
    <div className="flex items-center justify-center gap-6">

      {/* Previous */}
      <button
        onClick={onPrevious}
        className="
          text-white/80
          transition
          hover:scale-110
          hover:text-white
        "
      >
        <SkipBack
          size={24}
          fill="currentColor"
        />
      </button>

      {/* Play / Pause */}
      <button
        onClick={onPlayPause}
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-white
          text-black
          shadow-lg
          transition
          hover:scale-105
          active:scale-95
        "
      >
        {isPlaying ? (
          <Pause
            size={24}
            fill="currentColor"
          />
        ) : (
          <Play
            size={24}
            fill="currentColor"
          />
        )}
      </button>

      {/* Next */}
      <button
        onClick={onNext}
        className="
          text-white/80
          transition
          hover:scale-110
          hover:text-white
        "
      >
        <SkipForward
          size={24}
          fill="currentColor"
        />
      </button>

    </div>
  );
}

export default Controls;