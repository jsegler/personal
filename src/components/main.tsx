import { HeaderProvider } from "../hooks/useHeader";
import { Experience } from "./experience";
import { Header } from "./header";
import { Hero } from "./hero";
import { Page } from "./page";
import { WordCloud } from "./skills";

export const MainScrollable = () => {
  return (
    <HeaderProvider>
      <div className="w-screen absolute">
        <Header />
        <Hero />
        <Page>
          <WordCloud />
        </Page>
        <Page pages={2}>
          <Experience />
        </Page>
      </div>
    </HeaderProvider>
  );
};
