import clsx from "clsx";
import { FC, PropsWithChildren, useEffect, useRef } from "react";

interface PageProps {
  onVisible?: () => void;
  pages?: number;
}

export const Page: FC<PropsWithChildren & PageProps> = (props) => {
  const ref = useRef(null);

  // When the component becomes visible via the observer, set visible to true
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && props.onVisible) {
          props.onVisible();
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [props]);

  return (
    <div
      className={clsx("w-screen")}
      style={{
        background: "rgb(26, 24, 25)",
        height: props.pages ? props.pages * 100 + "vh" : "100vh",
        boxShadow: "0 -100px 100px rgba(26, 24, 25, 0.8)",
      }}
    >
      {props.children}
    </div>
  );
};
