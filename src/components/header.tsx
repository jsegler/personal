import { useScrollPosition } from "../hooks/useScrollPosition";
import { useHeader } from "../hooks/useHeader";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { HeaderItem } from "../types";

const headerItems: HeaderItem[] = ["Skills", "Experience", "Contact"];

export const Header: FC = () => {
  const [show, setShow] = useState(false);
  const { activeItem } = useHeader();
  const scrollY = useScrollPosition();

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div
      className={clsx(
        "flex justify-center px-8 py-4 z-[100] fixed top-2 gap-8 items-center duration-1000 transition-all ease-in-out bg-dark-500/20 w-fit left-1/2 translate-x-[-50%] rounded-lg backdrop-blur-[2px]",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      {headerItems.map((item) => (
        <div
          key={item}
          className={clsx(
            "text-white uppercase duration-500 cursor-pointer transition-all hover:text-shadow-white",
            activeItem === item && scrollY > window.innerHeight * 0.9
              ? "text-shadow-white text-xl"
              : "text-shadow-none"
          )}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
