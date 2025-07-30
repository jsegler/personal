import { HeaderProvider } from "../hooks/useHeader";
import { Contact } from "./contact";
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
        <Page headerId="Skills" style={{ height: "100vh" }}>
          <WordCloud />
        </Page>
        <Page headerId="Experience" pages={1.85}>
          <Experience />
        </Page>
        <Page headerId="Contact" pages={0.8}>
          <Contact />
        </Page>
      </div>
    </HeaderProvider>
  );
};
