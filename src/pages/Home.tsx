import clsx from "clsx";
import { useEffect, useState } from "react";

import { useScrollPosition } from "../hooks";
import {
  FloatingArrowSection,
  Header,
  HeroBackground,
  HeroTitleSection,
  StarsSection,
} from "../components";
import { twMerge } from "tailwind-merge";

const NUMBER_OF_SCREEN_HEIGHTS_AFTER_HERO = 6;
export const Home = () => {
  const [isTitleTextLoaded, setIsTitleTextLoaded] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const { scrollPosition } = useScrollPosition();
  const [screenHeight, setScreenHeight] = useState(0);
  const [bgColorClassName, setBgColorClassName] = useState("bg-sunset-600/80");

  useEffect(() => {
    setTimeout(() => {
      setIsTitleTextLoaded(true);
      setIsPageLoaded(true);
    }, 200);
    setScreenHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    if (scrollPosition && scrollPosition > 0.5 * screenHeight) {
      setIsTitleTextLoaded(false);
    } else {
      setIsTitleTextLoaded(true);
    }

    if (scrollPosition && scrollPosition > 2 * screenHeight) {
      setBgColorClassName("bg-sunset-700");
    } else {
      setBgColorClassName("bg-sunset-600/80");
    }
  }, [screenHeight, scrollPosition]);

  return (
    <div className="relative w-full h-screen">
      <Header />
      <HeroBackground bgColorClassName={bgColorClassName} />
      <HeroTitleSection isTitleTextLoaded={isTitleTextLoaded} />
      {[...Array(NUMBER_OF_SCREEN_HEIGHTS_AFTER_HERO).keys()].map((i) => (
        <div key={i} className="h-screen" />
      ))}
      {isPageLoaded && (
        <div
          className={clsx(
            "fixed inset-0 h-screen w-screen",
            "font-secondary text-white"
          )}
          style={{
            top: Math.min(
              0,
              NUMBER_OF_SCREEN_HEIGHTS_AFTER_HERO * screenHeight -
                scrollPosition
            ),
          }}
        >
          <StarsSection />
          <div
            className={twMerge(
              "absolute flex h-screen w-screen m-auto justify-center items-center transition",
              scrollPosition < 2.5 * screenHeight
                ? "opacity-0 duration-[100ms]"
                : "opacity-100 translate-y-[-4rem] duration-[1000ms]"
            )}
          >
            <p className="h-fit">
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
              ipsum lorem ipsum lorem ipsum
            </p>
          </div>
        </div>
      )}
      <div className="h-screen bg-sunset-700" />
      <FloatingArrowSection />
    </div>
  );
};
