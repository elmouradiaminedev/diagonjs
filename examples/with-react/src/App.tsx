import { useEffect, useState } from "react";
import Diagon, { DiagonType, MathTranslationStyle } from "diagonjs";

function App() {
  const [diagon, setDiagon] = useState<DiagonType>();
  const [style, setStyle] = useState<MathTranslationStyle>("Unicode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    Diagon.init().then((instance) => {
      setDiagon(instance);
    });
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <h1>Math expression interpreter</h1>
      {diagon ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyItems: "center",
          }}
        >
          <textarea
            cols={30}
            name="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="f(x) = 1 + x  / (x + 1)"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                margin: "6px",
              }}
              onClick={() => {
                const result = diagon.translate.math(input, {
                  style,
                });
                setOutput(result);
              }}
            >
              Translate
            </button>
            <select
              style={{
                margin: "6px",
              }}
              name="styles"
              id="styles"
              value={style}
              onChange={(e) => {
                setStyle(e.target.value as MathTranslationStyle);
              }}
            >
              <option value="Unicode">Unicode</option>
              <option value="ASCII">ASCII</option>
              <option value="Latex">Latex</option>
            </select>
          </div>
          <textarea cols={30} name="output" value={output} readOnly />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
