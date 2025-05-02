import Plot from "react-plotly.js";

export default function GraphPlot({ terms }) {
  const xValues = [];
  const yValues = [];

  const validTerms = terms.filter(
    (t) => t.coef !== "" && t.power !== "" && !isNaN(t.coef) && !isNaN(t.power)
  );

  for (let x = -10; x <= 10; x += 0.1) {
    let y = 0;
    for (let term of validTerms) {
      y += parseFloat(term.coef) * Math.pow(x, parseInt(term.power));
    }
    xValues.push(x);
    yValues.push(y);
  }

  const displayExpr = validTerms
    .map((t) => `${t.coef}x^${t.power}`)
    .join(" + ")
    .replace(/\+\s\-/g, "- ");

  return (
    <div className="w-full max-w-2xl">
      <Plot
        data={[
          {
            x: xValues,
            y: yValues,
            type: "scatter",
            mode: "lines",
            marker: { color: "green" },
          },
        ]}
        layout={{
          title: `Graph of y = ${displayExpr || "..."}`,
          xaxis: { title: "x" },
          yaxis: { title: "y" },
          width: 600,
          height: 400,
        }}
      />
    </div>
  );
}
