import React from "react";
import Quiz from "./Quiz";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="quiz-card">
        <h1 className="title">React Quiz App</h1>
        <Quiz />
      </div>
    </div>
  );
}

export default App;
