import { useEffect, useState } from "react";

function BackgroundSlider({ nextClick }) {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    if (nextClick > 0 && nextClick % 3 === 0) {
      setImageIndex((prev) => (prev === 0 ? 1 : 0));
    }
  }, [nextClick]);

  return (
    <div className="fixed inset-0 z-0 h-[100dvh] w-full overflow-hidden">
      
      <img
        src={
          imageIndex === 0
            ? "/truck-bg.jpg"
            : "/tractor-bg.jpg"
        }
        alt=""
        className="
          absolute
          inset-0
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
          bottom-0
          left-0
          right-0
          h-[45%]
          bg-gradient-to-t
          from-black/70
          via-red-950/15
          to-transparent
        "
      />
    </div>
  );
}

export default BackgroundSlider;