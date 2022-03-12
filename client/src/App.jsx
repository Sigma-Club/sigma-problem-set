import "./App.css";
import Header from "./components/Header";
import ProblemSet from "./components/ProblemSet";
import ToolTip from "./components/Tooltip";

function App() {
  return (
    <div className="App ">
      <Header />
      <ToolTip/>
      <div className="table-container">
        <div className="font-defont text-3xl sm:text-4xl md:text-5xl text-head font-bold text-left ">
          Sigma Pr🗿blem Set
        </div>
        <ProblemSet />
      </div>
    </div>
  );
}

export default App;
