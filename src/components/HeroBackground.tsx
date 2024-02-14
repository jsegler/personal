import clsx from "clsx";

import { useScrollPosition } from "../hooks/useScrollPosition";

import type { FC } from "react";

interface IHeroBackgroundProps {
  bgColorClassName: string;
}

const PAGE_OFFSET_INCREMENT = 30;

export const HeroBackground: FC<IHeroBackgroundProps> = ({
  bgColorClassName,
}) => {
  const { scrollPosition } = useScrollPosition();
  const getBlobStyle = (props: { initialTop: number }) => ({
    top: `${
      props.initialTop +
      (scrollPosition / window.innerHeight) * PAGE_OFFSET_INCREMENT
    }%`,
  });

  return (
    <>
      <div
        className={clsx(
          "fixed w-screen h-screen transition duration-[3000ms]",
          bgColorClassName
        )}
      />
      <div
        className="fixed rounded-full bg-sunset-400 blur-[300px] w-[149%] h-[182%] left-[-60%]"
        style={getBlobStyle({ initialTop: 0 })}
      />
      <div
        className="fixed rounded-full bg-sunset-300 blur-[400px] w-[88%] h-[98%] left-[-30%]"
        style={getBlobStyle({ initialTop: 33 })}
      />
      <div
        className="fixed rounded-full bg-sunset-200 blur-[300px] w-[44%] h-[66%] left-[-8%]"
        style={getBlobStyle({ initialTop: 72 })}
      />
      <div className="fixed rounded-full bg-sunset-500/60 blur-[100px] w-[125%] h-[78%] left-[27%] top-[90%]" />
    </>
  );
};
