import Die from "./components/Die.jsx";
import { useEffect, useState, useRef } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());

  const gameWon = dice.every(
    (obj) => obj.value === dice[0].value && obj.isHeld
  );
  const winBtn = useRef(null);

  useEffect(() => {
    if (gameWon) {
      winBtn.current.focus();
    }
  }, [gameWon]);

  function generateAllNewDice() {
    const numbersList = [];
    for (let i = 0; i < 10; i++) {
      const randomNum = Math.floor(Math.random() * 6 + 1);
      const dieObject = {
        value: randomNum,
        isHeld: false,
        id: nanoid(),
      };

      numbersList.push(dieObject);
    }

    return numbersList;
  }

  function rollDice() {
    if (gameWon) {
      return setDice(generateAllNewDice());
    }
    setDice((oldDice) => {
      return oldDice.map((item) => {
        return item.isHeld
          ? item
          : { ...item, value: Math.floor(Math.random() * 6 + 1) };
      });
    });
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={hold}
    />
  ));

  function hold(id) {
    setDice((prevDice) => {
      return prevDice.map((dieObj) => {
        if (dieObj.id === id) {
          return {
            ...dieObj,
            isHeld: !dieObj.isHeld,
          };
        } else {
          return dieObj;
        }
      });
    });
  }

  return (
    <main>
      <div className="container">
        <div className="game-container">
          {gameWon ? <Confetti /> : undefined}
          <div aria-live="polite" className="sr-only">
            {gameWon && (
              <p>Congratulations! You won! Press "New Game" to start again.</p>
            )}
          </div>
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="die-container">{diceElements}</div>
          <button onClick={rollDice} ref={winBtn} className="roll-btn">
            {gameWon ? "New game" : "Roll"}
          </button>
        </div>
      </div>
    </main>
  );
}
