import { useContext } from "react";
import { ScrollPositionContext } from "../contexts";

export const useScrollPosition = () => useContext(ScrollPositionContext);
