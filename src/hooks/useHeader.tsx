import { HeaderItem } from "@/types";
import { createContext, useContext, useState } from "react";

interface HeaderContextType {
  activeItem: string | null;
  setActiveItem: (item: HeaderItem | null) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);
export const HeaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <HeaderContext.Provider value={{ activeItem, setActiveItem }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
};
