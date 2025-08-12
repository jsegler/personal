import { BsArrowDownCircleFill } from "react-icons/bs";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const Hero = () => {
  const scrollY = useScrollPosition();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div
      className="h-screen bg-bottom bg-cover flex items-center justify-center"
      style={{
        backgroundImage: `url('images/hero.png')`,
        backgroundPosition: "center bottom",
      }}
    >
      <div
        className={clsx(
          "fixed text-white lg:max-w-3xl sm:max-w-md max-w-xs text-center lg:mb-80 sm:mb-40 mb-20 transition-all ease-out"
        )}
        style={{
          opacity: !show ? 0 : 1 - scrollY / 40 / 0.2,
          transform: `translateY(${
            !show ? 20 : -(scrollY / window.innerHeight / 0.2) * 20
          }px)`,
          transitionDuration: scrollY === 0 ? "2s" : "0.5s",
        }}
      >
        <h1 className="font-libre md:text-[5em] text-[3em]">I'm Justin.</h1>
        <h2 className="md:text-2xl text-lg mt-4" style={{ lineHeight: 2 }}>
          Full-stack engineer turning bold ideas into beautiful, scalable
          products — from startup MVPs to enterprise platforms.
        </h2>
      </div>
      <div
        className={clsx([
          "fixed bottom-8 transition-all cursor-pointer duration-1000 ease-in-out",
          show && scrollY === 0 ? "animate-pulse-twice" : "animate-fade-out",
        ])}
        onClick={() => {
          window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
        }}
      >
        <BsArrowDownCircleFill size={32} fill="white" />
      </div>
    </div>
  );
};
