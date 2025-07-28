import { BsArrowDownCircleFill } from "react-icons/bs";
import { useScrollPosition } from "../hooks/useScrollPosition";
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
        backgroundImage: "url('/images/hero.png')",
        backgroundPosition: "center -250px",
      }}
    >
      <div
        className={clsx(
          "fixed text-white font-libre max-w-4xl text-center mb-60 transition-all ease-out"
        )}
        style={{
          opacity: !show ? 0 : 1 - scrollY / 40 / 0.2,
          transform: `translateY(${
            !show ? 20 : -(scrollY / window.innerHeight / 0.2) * 20
          }px)`,
          transitionDuration: scrollY === 0 ? "2s" : "0.5s",
        }}
      >
        <h1
          style={{
            fontSize: "5em",
          }}
        >
          I'm Justin.
        </h1>
        <h2 className="text-2xl leading-loose">
          Full-stack engineer and product leader specializing in React, AI, and
          UX. I build scalable, intuitive apps to solve complex problems.
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
