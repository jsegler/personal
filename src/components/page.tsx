import { HeaderItem } from "@/types";
import { useHeader } from "@/hooks/useHeader";
import clsx from "clsx";
import { CSSProperties, FC, PropsWithChildren, useEffect, useRef } from "react";

interface PageProps {
  headerId: HeaderItem;
  pages?: number;
  style?: CSSProperties;
}

export const Page: FC<PropsWithChildren & PageProps> = (props) => {
  const { setActiveItem } = useHeader();
  const ref = useRef(null);

  // When the component becomes visible via the observer, set visible to true
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveItem(props.headerId);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <div
      ref={ref}
      className={clsx("w-screen bg-dark-500")}
      style={{
        boxShadow: "0 -100px 100px rgba(26, 24, 25, 0.8)",
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
};
