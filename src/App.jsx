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

  async function fillBox() {
    try {
      const responce = await fetch(
        "https://pokeapi.co/api/v2/pokemon?offset=162&limit=12",
      );
      const record = await responce.json();
      const helper = await Promise.all(
        record.results.map((item, index) => {
          return {
            id:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/" +
              "sprites/pokemon/other/home/" +
              (index + 163) +
              ".png",
            name: item.name,
            color: color(),
          };
        }),
      );
      mixBox(helper);
    } catch (error) {
      const helper = [];
      for (let i = 0; i < 12; i++) {
        helper.push({
          id: `img${i}`,
          name: `card${i + 1}`,
          color: color(),
        });
      }
      mixBox(helper);
    }
  }

  useEffect(() => {
    fillBox();
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

  function Card({ cell }) {
    return (
      <>
        <img
          src={cell["id"]}
          alt={cell["name"]}
          className="cellGame"
          style={{ width: "100%" }}
        />
        <span
          className="cardName"
          style={{
            fontSize: "1.25em",
            fontWeight: "bold",
            color: "field",
            padding: "0.25em 0",
            backgroundColor: "rgb(0 0 0 / 0.5)",
            textTransform: "capitalize",
            width: "100%",
          }}
        >
          {cell["name"]}
        </span>
      </>
    );
  }

  function FieldGame() {
    return box.map((item) => (
      <button
        key={item["name"]}
        name={item["name"]}
        className="fieldGame"
        onClick={() => handleClick(item["name"])}
        style={{
          background: `${item["color"]} center top / contain no-repeat url(${item["id"]})`,
          width: "11em",
          height: "13em",
          padding: "0",
          color: "var(--text)",
          border: "thick solid lightgray",
          overflow: "hidden",
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
        }}
      >
        <Card cell={item} />
      </button>
    ));
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
        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1ch",
            maxWidth: "85%",
            margin: "0 auto",
          }}
        >
          <FieldGame />
        </section>
      </main>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
