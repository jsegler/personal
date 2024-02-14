import clsx from "clsx";
import { useState } from "react";

import { useScrollPosition } from "../hooks/useScrollPosition";

const headerItems = [
  {
    label: "Item 1",
    href: "#",
  },
  {
    label: "Item 2",
    href: "#",
  },
  {
    label: "Item 3",
    href: "#",
  },
];
export const Header = () => {
  const { scrollPosition } = useScrollPosition();
  const [isMouseAtHeader, setIsMouseAtHeader] = useState(false);

  return (
    <div
      className={clsx("fixed text-xl font-secondary w-screen z-[2] px-8 py-4")}
      onMouseEnter={() => setIsMouseAtHeader(true)}
      onMouseLeave={() => setIsMouseAtHeader(false)}
    >
      <ul
        className={clsx(
          "flex gap-10 justify-end text-white transition",
          isMouseAtHeader || scrollPosition === 0
            ? "opacity-100 translate-y-0 duration-[200ms]"
            : "opacity-0 translate-y-[-100%] duration-[1000ms]"
        )}
      >
        {headerItems.map(({ label, href }) => (
          <li key={label}>
            <a href={href} className="no-underline hover:cursor-pointer">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
