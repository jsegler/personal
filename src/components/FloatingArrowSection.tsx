import clsx from "clsx";

import { useScrollPosition } from "../hooks";

import DownArrow from "../assets/icons/down-arrow.svg";

export const FloatingArrowSection = () => {
  const { removeScrollIndicator, showScrollIndicator } = useScrollPosition();

  return (
    <div
      className={clsx(
        "fixed bottom-0 flex w-screen px-16 py-8 justify-between transition",
        !removeScrollIndicator && showScrollIndicator
          ? "opacity-100 duration-[2000ms]"
          : "opacity-0"
      )}
    >
      <img
        src={DownArrow}
        className="w-8 drop-shadow-md transition animate-pulse"
      />
      <img
        src={DownArrow}
        className="w-8 drop-shadow-md transition animate-pulse"
      />
    </div>
  );
};
