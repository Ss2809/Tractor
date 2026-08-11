import { Play, X } from "lucide-react";

function Playlist({ songs, currentIndex, onSelect, onClose }) {
  return (
    <div
      className="
        w-[340px]
        max-w-[calc(100vw-24px)]
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-black/55
        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        backdrop-blur-2xl
      "
    >
      {/* =========================
          HEADER
      ========================= */}

      <div
        className="
          flex
          items-center
          justify-between
          px-4
          py-3.5
        "
      >
        <div className="min-w-0">
          <p className="text-[10px] font-extrabold tracking-[0.18em] text-white/55">
            PLAYLIST
          </p>
        </div>

        {/* Close */}

        <button
          type="button"
          onClick={onClose}
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            text-white/40
            transition
            hover:bg-white/10
            hover:text-white
          "
        >
          <X size={14} />
        </button>
      </div>

      {/* =========================
          SONG LIST
      ========================= */}

      <div
        className="
          max-h-[330px]
          overflow-y-auto
          px-2
          pb-2
        "
      >
        {songs.map((song, index) => {
          const active = index === currentIndex;

          return (
            <button
              key={song.id}
              type="button"
              onClick={() => onSelect(index)}
              className={`
                group
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-2.5
                py-2
                text-left
                transition-all
                duration-200

                ${active ? "bg-white/10" : "hover:bg-white/[0.06]"}
              `}
            >
              {/* Thumbnail */}

              <div className="relative shrink-0">
                <img
                  src={song.thumbnail}
                  alt={song.title}
                  className={`
                    h-10
                    w-10
                    rounded-lg
                    object-cover
                    transition
                    ${active ? "ring-1 ring-white/30" : ""}
                  `}
                />

                {/* Active overlay */}

                {active && (
                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      rounded-lg
                      bg-black/35
                    "
                  >
                    <Play size={12} fill="white" className="text-white" />
                  </div>
                )}
              </div>

              {/* Song details */}

              <div className="min-w-0 flex-1">
                <p
                  className={`
                    truncate
                    text-[11px]
                    font-semibold
                    leading-tight
                    ${active ? "text-white" : "text-white/75"}
                  `}
                >
                  {song.title}
                </p>

                <p
                  className="
                    mt-1
                    truncate
                    text-[8px]
                    text-white/35
                  "
                >
                  {song.channel}
                </p>
              </div>

              {/* Active indicator */}

              {active && (
                <div
                  className="
                    mr-1
                    flex
                    items-center
                    gap-[2px]
                  "
                >
                  <span className="h-2 w-[2px] rounded-full bg-white/70" />
                  <span className="h-3 w-[2px] rounded-full bg-white/70" />
                  <span className="h-1.5 w-[2px] rounded-full bg-white/70" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Playlist;
