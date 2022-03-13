import "./App.css";
import Header from "./components/Header";
import ProblemSet from "./components/ProblemSet";
import ToolTip from "./components/Tooltip";

function App() {
  const [solved, setsolved] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("SOLVED_PROBLEM");
    if (!data) {
      localStorage.setItem("SOLVED_PROBLEM", JSON.stringify("{}"));
    } else {
      setsolved(JSON.parse(data));
    }
  }, []);

  return (
    <div className="App ">
      <Header />
      <ToolTip />
      <div className="table-container">
        <div className="font-defont text-3xl sm:text-4xl md:text-5xl text-head font-bold text-left ">
          Sigma Pr🗿blem Set
        </div>
        <ProblemSet solved={solved} />
      </div>
    </div>
  );
}

export default App;
