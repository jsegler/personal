import { createContext, useEffect, useState } from "react";

import type { FC, ProviderProps } from "react";

interface IScrollPositionContextValue {
  removeScrollIndicator: boolean;
  scrollPosition: number;
  showScrollIndicator: boolean;
}

type ScrollPositionProviderProps = Omit<
  ProviderProps<IScrollPositionContextValue>,
  "value"
>;

export const ScrollPositionContext = createContext(
  {} as IScrollPositionContextValue
);

export const ScrollPositionProvider: FC<ScrollPositionProviderProps> = ({
  children,
}) => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [lastScrollTimeout, setLastScrollTimeout] = useState<number | null>(
    null
  );
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [removeScrollIndicator, setRemoveScrollIndicator] = useState(false);

  const createNewTimeout = (timeoutMs: number = 5000) => {
    const timeout = setTimeout(() => setShowScrollIndicator(true), timeoutMs);
    setLastScrollTimeout(timeout);
  };

  useEffect(() => {
    const updatePosition = () => {
      const updatedScrollPosition = window.scrollY;
      setScrollPosition(updatedScrollPosition);

      if (lastScrollTimeout) {
        clearTimeout(lastScrollTimeout);
      }

      setShowScrollIndicator(false);

      if (updatedScrollPosition > 0) {
        setRemoveScrollIndicator(true);
      }
    };

    createNewTimeout();

    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPosition]);

  const value = {
    removeScrollIndicator,
    scrollPosition,
    showScrollIndicator,
  };

  return (
    <ScrollPositionContext.Provider value={value}>
      {children}
    </ScrollPositionContext.Provider>
  );
};
