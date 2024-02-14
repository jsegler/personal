import { ScrollPositionProvider } from "./contexts";

import type { FC } from "react";

interface IProvidersProps {
  children: React.ReactNode;
}

export const Providers: FC<IProvidersProps> = ({ children }) => {
  return <ScrollPositionProvider>{children}</ScrollPositionProvider>;
};
