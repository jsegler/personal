import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "@/utils/constants";
import clsx from "clsx";

const ExperienceItem = ({
  period,
  title,
  company,
  subcompany,
  description,
  technologies,
  image,
  url,
}: {
  period?: string;
  title: string;
  company: string;
  subcompany?: string;
  description: string;
  technologies?: string[];
  image?: string;
  url: string;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const boundingTop = entry.boundingClientRect.top;
        const isAbove = boundingTop < 0;

        if (entry.isIntersecting) {
          setIsVisible(true);
        } else if (!entry.isIntersecting && !isAbove) {
          // Only hide when scrolling downward past the bottom
          setIsVisible(false);
        }
      },
      {
        threshold: 0.2,
      }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <li
      ref={ref}
      className={clsx("md:mb-10", image && "mt-8", "transition-all")}
    >
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key="visible-content"
            className="group relative grid transition-all sm:grid-cols-8 gap-8 cursor-pointer py-4 my-auto"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => {
              // Open up url in new tab
              if (url) {
                window.open(url, "_blank", "noopener,noreferrer");
              }
            }}
          >
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

            <motion.header
              className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex flex-col gap-4 items-center">
                {image && <img src={image} alt={company} className="w-32" />}
                {period}
              </div>
            </motion.header>

            <motion.div
              className="z-10 sm:col-span-6 my-auto"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-medium leading-snug text-slate-200">
                <p className="inline-flex items-baseline font-medium leading-tight text-slate-200/70 group/link text-base">
                  {title} {subcompany ? `· ${subcompany}` : ""}
                </p>
              </h3>
              <p className="mt-1 text-xs uppercase font-semibold text-slate-400/50">
                {company}
              </p>
              <p className="my-2 text-sm leading-normal text-slate-500/70">
                {description}
              </p>
              {technologies && (
                <ul
                  className="mt-2 flex flex-wrap"
                  aria-label="Technologies used"
                >
                  {technologies.map((tech, i) => (
                    <li key={`${tech}${i}`} className="mr-1.5 mt-2">
                      <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-slate-400">
                        {tech}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export const Experience = () => {
  return (
    <div
      id="experience"
      className="min-h-screen py-24 flex lg:w-6/12 sm:w-8/12 w-10/12 mx-auto tracking-wider"
    >
      <ol className="group/list w-full">
        {experiences.map((experience, eIndex) =>
          experience.items.map((item, iIndex) => (
            <ExperienceItem
              key={`${eIndex}${item.description}`}
              {...item}
              period={iIndex === 0 ? experience.period : undefined}
              image={iIndex === 0 ? experience.image : undefined}
              company={experience.company}
            />
          ))
        )}
      </ol>
    </div>
  );
};
