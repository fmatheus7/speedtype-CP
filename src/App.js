import React, { useState, useEffect, useRef } from 'react';
import './styles.css'

function App() {



  const STARTING_TIME = 5;

  const [input, setInput] = useState('');
  const [remaningTime, setRemaningTime] = useState(STARTING_TIME);
  const [startGame, setStartGame] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [enableButton, setEnableButton] = useState(true);
  const textBoxRef = useRef(null);

  const handleInput = (e) => {
    const {value} = e.target;
    setInput(value);
  }

  const calculateWords = (input) => {
    const numberOfWords = input.trim().split(" ") // remove the spaces from the array 
    const filteredWords = numberOfWords.filter(word => word !== "") // prevent the inicial spaces count as word 
    setWordCount(filteredWords.length); 
  }

  function startClock() {
    setStartGame(true);
    setRemaningTime(STARTING_TIME);
    setInput('');
    setEnableButton(false);
    textBoxRef.current.disabled = false;
    textBoxRef.current.focus();
  }

  function endGame() {
    setStartGame(false);
    calculateWords(input);
    setEnableButton(true);
  }


  useEffect(() => {
    const timer = setTimeout(() => {
     
      if (remaningTime > 0 && startGame) {
        setRemaningTime((time) => time - 1)
      }
      else if (remaningTime === 0) {
        endGame();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [remaningTime, startGame]);


  return (
    <div className="App">
      <h1>Hello world</h1>
      <textarea 
        onChange={handleInput}
        value={input} 
        ref={textBoxRef}
        disabled={(enableButton) ? "disabled" : ""}
      />
      <h4>Time remaning {remaningTime}</h4>
      <button disabled={(enableButton) ? "" : "disabled"}onClick={startClock}>Start game</button>
      <h1>word count:{wordCount}</h1>


    </div>
  );
}

export default App;
