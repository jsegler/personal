import clsx from "clsx";

import type { FC } from "react";

interface IHeroTitleSectionProps {
  isTitleTextLoaded: boolean;
}

const subheaderItems = ["Technologist", "Creative", "Innovator"];

export const HeroTitleSection: FC<IHeroTitleSectionProps> = ({
  isTitleTextLoaded,
}) => {
  return (
    <div className="flex w-full h-screen justify-end">
      <div className="my-auto mr-[10%] text-white">
        <h1
          className={clsx(
            "font-primary font-bold uppercase text-[4rem] text-end transition duration-[1500ms]",
            isTitleTextLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-[-0.5rem]"
          )}
        >
          Justin Segler
        </h1>
        <h2 className="flex gap-4 font-secondary justify-end text-xl">
          {subheaderItems.map((item, i) => (
            <span
              key={item}
              style={{
                transitionDelay: `${500 + (subheaderItems.length - i) * 250}ms`,
              }}
              className={clsx(
                "opacity-0 transition duration-1000 delay-1000",
                isTitleTextLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-[0.5rem]"
              )}
            >
              {item}.
            </span>
          ))}
        </h2>
      </div>
    </div>
  );
};
