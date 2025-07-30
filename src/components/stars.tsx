import { useScrollPosition } from "../hooks/useScrollPosition";
import { FC, useEffect, useMemo, useRef } from "react";

type Star = {
  i: number;
  x: number;
  y: number;
  r: number;
  opacity: number;
};

export const Stars: FC = () => {
  const scrollY = useScrollPosition();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 150 }).map((_, i) => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const r = Math.random() * 1.2 + 0.1;

      let opacity;
      if (y < window.innerHeight / 2) {
        opacity = Math.random() * 0.2 + 0.8;
      } else {
        const fadeStart = window.innerHeight * 0.4;
        const fadeEnd = window.innerHeight * 0.6;
        let fade = 1;
        if (y >= fadeStart) {
          fade = 1 - (y - fadeStart) / (fadeEnd - fadeStart);
          fade = Math.max(0, Math.min(1, fade));
        }
        opacity = (Math.random() * 0.2 + 0.8) * fade;
      }

      return { i, x, y, r, opacity };
    });
  }, []);

  const offsetRef = useRef(0);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const circles = Array.from(svg.querySelectorAll("circle"));
    const speed = 0.02; // adjust for slower/faster drift

    const animate = () => {
      offsetRef.current += speed;
      if (offsetRef.current > window.innerWidth) {
        offsetRef.current = 0;
      }

      circles.forEach((circle, i) => {
        const star = stars[i];
        const driftedX = (star.x + offsetRef.current) % window.innerWidth;
        circle.setAttribute("cx", driftedX.toString());
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // No cleanup needed since stars are static and component is fixed
  }, [stars]);

  return (
    <div
      className="w-screen h-screen fixed"
      style={{
        top: -scrollY * 0.6,
        background:
          "linear-gradient(to bottom, #181617 20%, #2a2022 36%, #5a3935 50%, #c55930 65%)",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <svg
        ref={svgRef}
        width="100vw"
        height="100vh"
        style={{ width: "100vw", height: "100vh", display: "block" }}
      >
        {stars.map(({ i, x, y, r, opacity }) => (
          <circle key={i} cx={x} cy={y} r={r} fill="white" opacity={opacity} />
        ))}
      </svg>
    </div>
  );
};
