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
    return `rgb(${n()} ${n()} ${n()})`;
  }

  function mixBox(arr) {
    setBox([...arr].sort((a, b) => Math.random() - 0.5));
  }

  const getData = async () => {
    const responce = await fetch("/check-memory/pics/pictures.json");
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
    if (score + 1 == 12) {
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
      <section className="field flx f-wr j-cn">
        {box.map((cell) => (
          <button
            key={cell.name}
            name={cell.name}
            className="gameButton flx dir-c j-e"
            onClick={() => handleClick(cell.name)}
            style={{
              background: `${cell.color} center top / contain no-repeat url(${cell.img})`,
            }}
          >
            <span className="buttonName">{cell.name}</span>
          </button>
        ))}
      </section>
    );
  }

  return (
    <>
      <main>
      <h1>Memory card game</h1>
      <p>One image &ndash; one click</p>
        <section id="spacer" className="flx j-a aln-c">
          <h3 className="info txt-l">
            {finish && max == 12
              ? "Fantastic!"
              : finish
                ? "Fiasco"
                : "You can play"}
          </h3>
          <div className="count">
            <p className="flx j-e">
              <span>Score:</span>
              <span className="score txt-l">{score}</span>
            </p>
            <p className="max-p flx j-e">
              <span className="txt-r">
                {max < 12 ? "Best score" : "Maximum"}:
              </span>
              <span className="max txt-l">{max}</span>
            </p>
          </div>
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
