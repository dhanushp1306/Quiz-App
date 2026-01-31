import { useState } from "react";
import "./Quiz.css";

const questions = [
    {
        question: "What is the capital of India?",
        options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
        answer: "Delhi",
    },
    {
        question: "Which language runs in a browser?",
        options: ["Python", "Java", "C++", "JavaScript"],
        answer: "JavaScript",
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Central Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Creative Style Sheets",
        ],
        answer: "Cascading Style Sheets",
    },
];

export default function Quiz({ name }) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answers, setAnswers] = useState({});
    const [visited, setVisited] = useState(new Set([0]));
    const [showPopup, setShowPopup] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const handleSubmitAnswer = () => {
        if (!selected) return;

        const updatedAnswers = { ...answers, [current]: selected };
        setAnswers(updatedAnswers);
        setSelected(null);

        if (current < questions.length - 1) {
            const next = current + 1;
            setCurrent(next);
            setVisited(new Set([...visited, next]));
        }
    };

    const handleFinalSubmit = () => setShowPopup(true);

    const confirmSubmit = () => {
        let total = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.answer) total++;
        });
        setScore(total);
        setIsSubmitted(true);
        setShowPopup(false);
    };

    const handleSidebarClick = (index) => {
        setCurrent(index);
        setSelected(answers[index] || null);
        setVisited(new Set([...visited, index]));
    };

    return (
        <div className="quiz-container">
            {!isSubmitted && (
                <div className="sidebar">
                    {questions.map((_, index) => {
                        let statusClass = "not-answered";
                        if (answers[index]) statusClass = "answered"; // green
                        else if (index === current) statusClass = "current"; // blue
                        else if (visited.has(index)) statusClass = "seen"; // red

                        return (
                            <button
                                key={index}
                                className={`sidebar-btn ${statusClass}`}
                                onClick={() => handleSidebarClick(index)}
                            >
                                {index + 1}
                            </button>
                        );
                    })}
                </div>
            )}

            <div className={`quiz-box ${isSubmitted ? "result-theme" : ""}`}>
                {!isSubmitted ? (
                    <>
                        <h2>Welcome, {name}</h2>
                        <div className="question">
                            Q{current + 1}. {questions[current].question}
                        </div>

                        <div className="options">
                            {questions[current].options.map((option, index) => {
                                const isSelected = selected === option;
                                const isAnswered = answers[current] === option;

                                let btnClass = "option-btn";
                                if (isSelected) btnClass += " selected";
                                if (isAnswered) btnClass += " submitted";

                                return (
                                    <button
                                        key={index}
                                        className={btnClass}
                                        onClick={() => setSelected(option)}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="quiz-buttons">
                            <button
                                className="submit-btn"
                                onClick={handleSubmitAnswer}
                                disabled={!selected}
                            >
                                Submit Answer
                            </button>
                            <button className="final-btn" onClick={handleFinalSubmit}>
                                Final Submit
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="result-box">
                        <h1>Quiz Completed</h1>
                        <h2>Candidate: {name}</h2>
                        <h2>
                            Your Total Score is {score} / {questions.length}
                        </h2>
                        <h3>Thank you for playing!</h3>
                    </div>
                )}
            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>Are you sure you want to submit the quiz?</h3>
                        <div className="popup-buttons">
                            <button className="confirm-btn" onClick={confirmSubmit}>
                                Yes
                            </button>
                            <button
                                className="cancel-btn"
                                onClick={() => setShowPopup(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
