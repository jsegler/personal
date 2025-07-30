import { useScrollPosition } from "../hooks/useScrollPosition";
import { FC, useEffect, useMemo, useRef, useState } from "react";

type Star = {
  i: number;
  x: number;
  y: number;
  r: number;
  opacity: number;
};

type ShootingStarSegment = {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  baseOpacity: number;
  age: number;
};

export const Stars: FC = () => {
  const scrollY = useScrollPosition();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const offsetRef = useRef(0);
  const [shootingSegments, setShootingSegments] = useState<
    ShootingStarSegment[]
  >([]);
  const segmentsRef = useRef<ShootingStarSegment[]>([]);

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

  // Drift animation for static stars
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const circles = Array.from(svg.querySelectorAll("circle"));
    const speed = 0.02;

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
  }, [stars]);

  // Shooting star trail logic with fade and shrink effect
  useEffect(() => {
    let animationFrame: number;
    let timeoutId: number;

    const spawnShootingStar = () => {
      const trailLength = 10;
      const id = Date.now();
      const xStart = Math.random() * window.innerWidth * 0.8;
      const yStart = Math.random() * window.innerHeight * 0.4;
      const angle = (Math.random() * 20 + 10) * (Math.PI / 180);
      const segmentLength = 10 + Math.random() * 5;

      const segments: ShootingStarSegment[] = [];

      for (let i = 0; i < trailLength; i++) {
        const progress = i / trailLength;
        const length = segmentLength * (1 + 0.1 * i);
        const dx = Math.cos(angle) * length;
        const dy = Math.sin(angle) * length;

        segments.push({
          id: id + i,
          x1: xStart + dx,
          y1: yStart + dy,
          x2: xStart + dx + Math.cos(angle) * segmentLength,
          y2: yStart + dy + Math.sin(angle) * segmentLength,
          baseOpacity: 0.15 + 0.08 * (1 - progress), // front is brightest
          age: 0,
        });
      }

      segmentsRef.current = [...segmentsRef.current, ...segments];
      setShootingSegments([...segmentsRef.current]);

      const animate = () => {
        segmentsRef.current = segmentsRef.current.map((seg) => ({
          ...seg,
          x1: seg.x1 + 0.5,
          y1: seg.y1 + 0.15,
          x2: seg.x2 + 0.5,
          y2: seg.y2 + 0.15,
          age: seg.age + 1,
        }));

        // Remove old segments after full lifetime
        segmentsRef.current = segmentsRef.current.filter(
          (seg) => seg.age < 100
        );
        setShootingSegments([...segmentsRef.current]);

        if (segmentsRef.current.length > 0) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          timeoutId = window.setTimeout(
            spawnShootingStar,
            4000 + Math.random() * 6000
          );
        }
      };

      animationFrame = requestAnimationFrame(animate);
    };

    timeoutId = window.setTimeout(
      spawnShootingStar,
      2000 + Math.random() * 3000
    );

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timeoutId);
    };
  }, []);

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

        {shootingSegments.map(({ id, x1, y1, x2, y2, baseOpacity, age }) => {
          const lifetime = 50;

          // Fade-in/out opacity calculation
          let opacity = 0;
          if (age < lifetime * 0.2) {
            opacity = (age / (lifetime * 0.2)) * baseOpacity;
          } else {
            opacity =
              baseOpacity * (1 - (age - lifetime * 0.2) / (lifetime * 0.8));
          }
          opacity = Math.max(0, Math.min(opacity, baseOpacity));

          // Shrink factor: from 1 to 0 over lifetime
          const shrinkFactor = 1 - age / lifetime;

          // Interpolate x2, y2 towards x1, y1 to shrink line
          const currX2 = x1 + (x2 - x1) * shrinkFactor;
          const currY2 = y1 + (y2 - y1) * shrinkFactor;

          return (
            <line
              key={id}
              x1={x1}
              y1={y1}
              x2={currX2}
              y2={currY2}
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
              opacity={opacity}
            />
          );
        })}
      </svg>
    </div>
  );
};
