import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsGithub, BsLinkedin, BsSpotify } from "react-icons/bs";
import clsx from "clsx";

export const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    _honey: "",
    _captcha: "false",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const boundingTop = entry.boundingClientRect.top;
        const isAbove = boundingTop < 0;

        if (entry.isIntersecting) {
          setIsVisible(true);
        } else if (!entry.isIntersecting && !isAbove) {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("https://formsubmit.co/justin@justinsegler.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          message: "",
          _honey: "",
          _captcha: "false",
        });
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <div
      ref={ref}
      className="lg:w-6/12 sm:w-8/12 w-10/12 mx-auto tracking-wider flex justify-center md:pt-8 pb-40 relative"
    >
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.form
            onSubmit={handleSubmit}
            key="contact-form"
            className="w-full space-y-6"
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 48 }}
            transition={{ duration: 2.0, ease: "easeOut" }}
          >
            <div className="flex md:flex-row flex-col md:gap-8 gap-6">
              <div className="flex flex-1 flex-col gap-4">
                <label className="text-sm text-slate-400" htmlFor="name">
                  Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="px-4 py-2 rounded bg-white text-slate-700 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-700"
                  placeholder="Your name"
                />
              </div>
              <div className="flex flex-1 flex-col gap-4">
                <label className="text-sm text-slate-400" htmlFor="email">
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-4 py-2 rounded bg-white text-slate-700 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-700"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-sm text-slate-400" htmlFor="message">
                Message
              </label>
              <textarea
                required
                name="message"
                id="message"
                rows={10}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-white text-slate-700 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-700"
                placeholder="Your message..."
              />
            </div>

            {/* Honeypot field for spam bots */}
            <input
              type="text"
              name="_honey"
              value={formData._honey}
              onChange={handleChange}
              style={{ display: "none" }}
            />

            {/* CAPTCHA disabled */}
            <input type="hidden" name="_captcha" value="false" />

            <div
              className={clsx(
                "flex md:flex-row flex-col w-full gap-2 mt-4",
                status !== "idle" ? "justify-between" : "justify-end"
              )}
            >
              {status === "success" && (
                <p className="text-green-400 text-sm">
                  Message sent successfully.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-sm">
                  Something went wrong. Try again.
                </p>
              )}
              <button
                type="submit"
                className="px-6 py-2 rounded-lg md:w-auto w-full border border-white text-white font-semibold hover:border-amber-700 hover:text-amber-700 transition"
              >
                Send Message
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute bottom-0 p-8 flex gap-8 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, ease: "easeIn" }}
      >
        <a
          href="https://www.linkedin.com/in/justin-segler/"
          target="_blank"
          rel="noreferrer"
        >
          <BsLinkedin className="w-6 h-6 text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-amber-600 hover:to-amber-700 transition-all duration-300" />
        </a>
        <a href="https://github.com/jsegler" target="_blank" rel="noreferrer">
          <BsGithub className="w-6 h-6 text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-amber-600 hover:to-amber-700 transition-all duration-300" />
        </a>
        <a
          href="https://open.spotify.com/artist/7JDx376VKDiSZw72YB1ha4?si=asJg6TwsSTy69zJ4vlJ9Ug"
          target="_blank"
          rel="noreferrer"
        >
          <BsSpotify className="w-6 h-6 text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-amber-600 hover:to-amber-700 transition-all duration-300" />
        </a>
      </motion.div>
    </div>
  );
};
