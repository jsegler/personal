import { MainScrollable } from "./components/main";
import { Stars } from "./components/stars";

const App = () => {
  return (
    <div className="font-sourceSansPro">
      <Stars />
      <MainScrollable />
    </div>
  );
};

export default App;
