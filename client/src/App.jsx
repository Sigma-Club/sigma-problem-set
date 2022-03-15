import "./App.css";
import Header from "./components/Header";
import ProblemSet from "./components/ProblemSet";
import ToolTip from "./components/Tooltip";
import { useState, useEffect } from "react";

function App() {
  const [solved, setsolved] = useState(
    JSON.parse(localStorage.getItem("SOLVED_PROBLEM") || "{}")
  );

  const onDataChange = (key, value) => {
    setsolved({
      ...solved,
      [key]: value,
    });
  };

  useEffect(() => {
    localStorage.setItem("SOLVED_PROBLEM", JSON.stringify(solved));
  }, [solved]);

  return (
    <div className="App ">
      <Header />
      <ToolTip />
      <div className="table-container">
        <div className="font-defont text-3xl sm:text-4xl md:text-5xl text-head font-bold text-left flex items-center">
          Sigma Pr<span className="flex items-center"><img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/moai_1f5ff.png" className="w-8 h-7 md:w-10 md:h-10 sm:w-9 sm:h-9" /></span>blem Set
        </div>
        <ProblemSet solved={solved} onDataChange={onDataChange} />
      </div>
    </div>
  );
}

export default App;
