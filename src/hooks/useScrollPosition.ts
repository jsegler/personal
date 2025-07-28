import { useEffect, useState } from "react";

export const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Set overscroll behavior to none when scrolled down
      if (window.scrollY > 0) {
        document.body.style.overscrollBehaviorY = "none";
      }
      // Reset overscroll behavior when at the top
      else {
        document.body.style.overscrollBehaviorY = "auto";
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
};
