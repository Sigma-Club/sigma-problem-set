import "./App.css";
import Header from "./components/Header";
import ProblemSet from "./components/ProblemSet";

function App() {
  return (
    <div className="App ">
      <Header />
      <div className="container">
        <div className="font-defonts text-5xl text-head font-bold text-left">
          🗿 Sigma Problem Set
        </div>
        <ProblemSet />
      </div>
    </div>
  );
}

export default App;
