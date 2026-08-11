import { Volume2 } from "lucide-react";

function HornButton() {
  const playHorn = () => {
    const audio = new Audio("/tractor-horn.mp3");

    audio.currentTime = 0;

    audio.play().catch((error) => {
      console.error("Horn Error:", error);
    });
  };

  return (
    <button
      type="button"
      onClick={playHorn}
      className="
        fixed
        left-8
        top-[45%]
        z-[100]

        flex
        w-[160px]
        items-center
        gap-2

        rounded-full
        border
        border-white/20
        bg-white/10

        p-1.5

        text-white

        backdrop-blur-xl
        shadow-[0_8px_30px_rgba(0,0,0,0.3)]

        transition-all
        duration-200

        hover:scale-105
        hover:bg-white/15
        active:scale-95
      "
    >
      {/* ICON CIRCLE */}

      <span
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-white/15
          border
          border-white/15
        "
      >
        <Volume2
          size={19}
          strokeWidth={2}
        />
      </span>

      {/* TEXT AREA */}

      <div
        className="
          min-w-0
          flex-1
          overflow-hidden
          pr-2
          text-left
        "
      >
        <p
          className="
            truncate
            text-[11px]
            font-extrabold
            leading-tight
            text-white
          "
        >
          हॉर्न ओके प्लीज
        </p>

        <p
          className="
            truncate
            text-[8px]
            font-medium
            leading-tight
            text-white/50
          "
        >
          Horn ok pleaseeeee
        </p>
      </div>
    </button>
  );
}

export default HornButton;