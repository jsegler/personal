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
        <Page headerId="Skills">
          <WordCloud />
        </Page>
        <Page headerId="Experience" pages={1.75}>
          <Experience />
        </Page>
      </div>
    </HeaderProvider>
  );
};
