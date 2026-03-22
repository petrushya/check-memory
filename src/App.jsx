import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [max, setMax] = useState(0);
  const [box, setBox] = useState([]);
  const [pack, setPack] = useState([]);
  const [finish, setFinish] = useState(false);

  function color() {
    const n = () => Math.floor(Math.random() * 256);
    return `rgb(${n()}, ${n()}, ${n()})`;
  }

  function mixBox(arr) {
    setBox([...arr].sort((a, b) => Math.random() - 0.5));
  }

  const getData = async () => {
    const responce = await fetch("/pics/pictures.json");
    const record = await responce.json();
    const filler = record.map((item) => {
      return {
        img: Object.values(item)[0],
        name: Object.keys(item)[0],
        color: color(),
      };
    });
    mixBox(filler);
  };

  useEffect(() => {
    getData();
  }, []);

  function handleClick(ident) {
    if (finish) return;
    if (pack.includes(ident)) {
      setFinish(true);
      return;
    }
    if (max == 11) {
      setFinish(true);
      setScore(score + 1);
      setMax(score + 1);
      return;
    }
    setPack([...pack, ident]);
    mixBox(box);
    setScore(score + 1);
    if (score + 1 > max) setMax(score + 1);
  }

  function handleGame() {
    setScore(0);
    setPack([]);
    setFinish(false);
    mixBox(box);
    if (max == 12) setMax(0);
  }

  function FieldGame() {
    return (
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1ch",
          maxWidth: "85%",
          margin: "0 auto",
          paddingBlockEnd: "2em",
        }}
      >
        {box.map((cell) => (
          <button
            key={cell.name}
            name={cell.name}
            className="fieldGame"
            onClick={() => handleClick(cell.name)}
            style={{
              background: `${cell.color} center top / contain no-repeat url(${cell.img})`,
              width: "11em",
              height: "13.25em",
              padding: "0",
              border: "thick solid lightgray",
              overflow: "hidden",
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "column",
            }}
          >
            <span
              className="cardName"
              style={{
                fontSize: "1.25em",
                fontWeight: "bold",
                color: "field",
                padding: "0.125em 0",
                backgroundColor: "rgba(0 0 0 / 0.5)",
                textTransform: "capitalize",
                width: "100%",
              }}
            >
              {cell.name}
            </span>
          </button>
        ))}
      </section>
    );
  }

  return (
    <>
      <main>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            placeItems: "end",
            padding: "0.5rem 0.5ch",
            marginBlockStart: "1rem",
            gap: "0.75ch",
          }}
        >
          <h1>Memory card game</h1>
          <div style={{ flex: "1 0 17ch" }}>
            <p
              style={{
                display: "flex",
                columnGap: "0.75ch",
                justifyContent: "flex-end",
              }}
            >
              <span>Score:</span>
              <span style={{ flexBasis: "5ch", textAlign: "start" }}>
                {score}
              </span>
            </p>
            <p
              style={{
                display: "flex",
                columnGap: "0.75ch",
                justifyContent: "flex-end",
                alignItems: "end",
              }}
            >
              <span style={{ textAlign: "right" }}>Max score:</span>
              <span style={{ flex: "0 0 5ch", textAlign: "start" }}>{max}</span>
            </p>
          </div>
        </header>
        <section
          id="spacer"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <h3 style={{ width: "15ch" }}>
            {finish && max == 12
              ? "Fantastic!"
              : finish
                ? "Fiasco"
                : "Play game"}
          </h3>
          <button name="next" disabled={!finish} onClick={handleGame}>
            {max < 12 ? "Next attempt" : "New Game"}
          </button>
        </section>
        <FieldGame />
      </main>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
