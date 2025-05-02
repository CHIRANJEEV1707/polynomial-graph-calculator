import { useState, useEffect } from "react";
import "./PolynomialInput.css"; // Import your CSS styles

export default function PolynomialInput({ onUpdate }) {
  const [terms, setTerms] = useState([
    { coef: "1", power: 2 },
    { coef: "1", power: 1 },
    { coef: "1", power: 0 },
  ]);

  useEffect(() => {
    onUpdate(terms);
  }, [terms, onUpdate]);

  const handleChange = (index, value) => {
    const updated = [...terms];
    updated[index].coef = value;
    setTerms(updated);
  };

  const addTerm = () => {
    const nextPower =
      terms.length > 0 ? Math.max(...terms.map((t) => t.power)) + 1 : 0;
    setTerms([...terms, { coef: "", power: nextPower }]);
  };

  const removeTerm = (index) => {
    const updated = [...terms];
    updated.splice(index, 1);
    setTerms(updated);
  };

  const getSuperscript = (num) => {
    const superscripts = {
      "0": "⁰",
      "1": "¹",
      "2": "²",
      "3": "³",
      "4": "⁴",
      "5": "⁵",
      "6": "⁶",
      "7": "⁷",
      "8": "⁸",
      "9": "⁹",
      "-": "⁻",
    };
    return num
      .toString()
      .split("")
      .map((char) => superscripts[char] || "")
      .join("");
  };

  return (
    <div className="polynomial-container">
      <div className="polynomial-card">
        <h2 className="title">Polynomial Expression</h2>
        <div className="expression">
          <span className="label">y =</span>

          {terms
            .sort((a, b) => b.power - a.power)
            .map((term, i) => (
              <div className="term" key={i}>
                <input
                  type="number"
                  className="input"
                  value={term.coef}
                  onChange={(e) => handleChange(i, e.target.value)}
                />
                <span className="power">
                  {term.power === 0
                    ? ""
                    : term.power === 1
                    ? "x"
                    : `x${getSuperscript(term.power)}`}
                </span>
                <button className="remove-btn" onClick={() => removeTerm(i)}>
                  ✕
                </button>
                {i < terms.length - 1 && <span className="plus">+</span>}
              </div>
            ))}
        </div>

        <button className="add-btn" onClick={addTerm}>
          + Add Term
        </button>
      </div>
    </div>
  );
}
