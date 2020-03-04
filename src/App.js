import React, { useState, useEffect } from 'react';
import './styles.css'

function App() {

  const [input, setInput] = useState('');
  const [remaningTime, setRemaningTime] = useState(5);
  const [startGame, setStartGame] = useState(false)



  const handleInput = (e) => {
    const {value} = e.target;
    setInput(value);
    console.log(input)
  }

  const calculateWords = (input) => {
    const numberOfWords = input.trim().split(" ") // remove the spaces from the array 
    const filteredWords = numberOfWords.filter(word => word !== "") // prevent the inicial spaces count as word 
    return filteredWords.length;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
     
      if (remaningTime > 0 && startGame) {
        setRemaningTime((time) => time - 1)
      }
      else if (remaningTime === 0) {
        setStartGame(false)
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
      />
      <h4>Time remaning {remaningTime}</h4>
      <button onClick={() => setStartGame(true)}>Start game</button>
      <h1>word count:</h1>


    </div>
  );
}

export default App;
