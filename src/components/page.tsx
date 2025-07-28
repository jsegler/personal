import { FC, PropsWithChildren, useEffect, useRef } from "react";

interface PageProps {
  onVisible?: () => void;
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
      className="w-screen h-screen"
      style={{ background: "rgb(26, 24, 25)" }}
    >
      {props.children}
    </div>
  );
};
