import { HeaderProvider } from "../hooks/useHeader";
import { Header } from "./header";
import { Hero } from "./hero";
import { Page } from "./page";
import { WordCloud } from "./word-cloud";

export const MainScrollable = () => {
  return (
    <HeaderProvider>
      <div className="w-screen absolute">
        <Header />
        <Hero />
        <Page>
          <WordCloud />
        </Page>
      </div>
    </HeaderProvider>
  );
};
