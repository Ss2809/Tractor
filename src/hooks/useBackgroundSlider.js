import { useEffect, useState } from "react";

function useBackgroundSlider() {
  const [imageIndex, setImageIndex] = useState(0);
  const [nextCount, setNextCount] = useState(0);

  const advanceBackground = () => {
    setImageIndex((prevImage) => (prevImage === 0 ? 1 : 0));
  };

  const handleNextClick = () => {
    setNextCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (nextCount !== 3) return;

    advanceBackground();
    setNextCount(0);
  }, [nextCount]);

  useEffect(() => {
    const timer = setInterval(() => {
      advanceBackground();
    }, 5 * 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  const backgroundImage =
    imageIndex === 0
      ? "/truck-bg.jpg"
      : "/tractor-bg.jpg";

  return {
    backgroundImage,
    handleNextClick,
  };
}

export default useBackgroundSlider;