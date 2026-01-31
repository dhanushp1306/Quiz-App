import React, { useState } from "react";
import questions from "./data";

function Quiz() {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleAnswer = (selected) => {
        if (selected === questions[current].answer) {
            setScore(score + 1);
        }

        const next = current + 1;
        if (next < questions.length) {
            setCurrent(next);
        } else {
            setShowScore(true);
        }
    };

    const restartQuiz = () => {
        setCurrent(0);
        setScore(0);
        setShowScore(false);
    };

    return (
        <div className="quiz">
            {showScore ? (
                <div className="result">
                    <h2>Your Score</h2>
                    <p>{score} / {questions.length}</p>
                    <button className="restart-btn" onClick={restartQuiz}>
                        Restart Quiz
                    </button>
                </div>
            ) : (
                <>
                    <div className="question-section">
                        <h2>Question {current + 1}</h2>
                        <p>{questions[current].question}</p>
                    </div>

                    <div className="options">
                        {questions[current].options.map((option, index) => (
                            <button
                                key={index}
                                className="option-btn"
                                onClick={() => handleAnswer(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Quiz;
