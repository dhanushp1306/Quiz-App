import { useState } from "react";
import Quiz from "./Quiz";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [startQuiz, setStartQuiz] = useState(false);

  const handleStart = () => {
    if (name.trim() === "") {
      alert("Please enter your name");
      return;
    }
    setStartQuiz(true);
  };

  return (
    <div className="app">
      {!startQuiz ? (
        <div className="welcome">
          <h1>Welcome to the Quiz App</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleStart}>Start Quiz</button>
        </div>
      ) : (
        <Quiz name={name} />
      )}
    </div>
  );
}

export default App;
