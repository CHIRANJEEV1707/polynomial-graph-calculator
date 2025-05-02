import { useState } from "react";
import PolynomialInput from "./components/PolynomialInput";
import GraphPlot from "./components/GraphPlot";
import "./App.css";

function App() {
  const [terms, setTerms] = useState([]);

  return (
    <div className="app-container">
      <h1 className="app-title">Polynomial Graphing Calculator</h1>
      <PolynomialInput onUpdate={setTerms} />
      <GraphPlot terms={terms} />
    </div>
  );
}

export default App;
