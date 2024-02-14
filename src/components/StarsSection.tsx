import clsx from "clsx";

import { useScrollPosition } from "../hooks/useScrollPosition";
import { useEffect, useState } from "react";

interface IStar {
  top: number;
  left: number;
  transitionDelay: string;
}

export const StarsSection = () => {
  const { scrollPosition } = useScrollPosition();

  const [stars, setStars] = useState<IStar[]>([]);

  useEffect(() => {
    setStars(
      [...Array(200).keys()].map((_) => ({
        top: (Math.random() * window.innerHeight) / 2,
        left: Math.random() * window.innerWidth,
        transitionDelay: `${Math.random() * 6000 + 500}ms`,
      }))
    );
  }, []);

  return (
    <div
      className={clsx(
        "absolute w-screen h-[50%] duration-[500ms]",
        scrollPosition < 2.5 * window.innerHeight ? "opacity-0" : "opacity-100"
      )}
    >
      {stars.map(({ transitionDelay, top, left }) => {
        return (
          <div
            key={`${top},${left}`}
            className={clsx(
              "absolute w-[2px] h-[2px] animate-pulse",
              top / window.innerHeight > 0.4
                ? "bg-star-100/25"
                : "bg-star-100/75"
            )}
            style={{
              top,
              left,
              animation: `pulse ${transitionDelay} cubic-bezier(0.4, 0, 0.6, 1) infinite`,
            }}
          />
        );
      })}
    </div>
  );
};
