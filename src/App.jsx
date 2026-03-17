import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [max, setMax] = useState(0);
  const [box, setBox] = useState([]);

  function rgbN() {
    return Math.floor(Math.random() * 256);
  }

  function fillingBox() {
    const helper = [];
    for (let i = 0; i < 12; i++) {
      helper.push({
        id: `img${i}`,
        name: `card${i + 1}`,
        color: `rgb(${rgbN()}, ${rgbN()}, ${rgbN()})`,
      });
    }
    setBox(helper);
  }

  useEffect(() => {
    fillingBox();
  }, []);

  function Card({ cell }) {
    return (
      <div
        id={cell["id"]}
        klassName="cellGame"
        style={{
          background: `${cell["color"]} center top / contain no-repeat url(${cell["id"]})`,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "end",
          justifyContent: "center",
        }}
      >
        <span
          className="cardName"
          style={{
            fontSize: "1.25em",
            fontWeight: "bold",
            color: "field",
            padding: "0.5rem 0",
            backgroundColor: "rgb(0 0 0 / 0.5)",
            textTransform: "capitalize",
            width: "100%",
          }}
        >
          {cell["name"]}
        </span>
      </div>
    );
  }

  function FieldGame({ line }) {
    return line.map((item) => (
      <div
        key={item["name"]}
        id={item["name"]}
        tabIndex="0"
        className="fieldGame"
        style={{
          width: "200px",
          height: "230px",
          cursor: "pointer",
          border: "thick solid lightgray",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        <Card cell={item} />
      </div>
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
        <section id="spacer">
          <p>Play game</p>
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
          <FieldGame line={box} />
        </section>
      </main>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
