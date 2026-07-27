import { useState } from "react";

import "../App.css";

export default function RiddleScreen({ riddle, giftTitle, onAnswer, onSkip }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (index) => {
        setSelectedAnswer(index);
    };

    const handleSubmit = () => {
        if (selectedAnswer === null) return;
        
        setShowResult(true);
        
        if (selectedAnswer === riddle.correct) {
            setTimeout(() => {
                onAnswer(true);
            }, 1500);
        } else {
            setTimeout(() => {
                onAnswer(false);
            }, 1500);
        }
    };

    const handleSkip = () => {
        onAnswer(true);
    };

    return (
        <div className="screen riddle-screen">
            <div className="glass">
                <div className="riddle-icon">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                </div>
                <h2>Ребус для {giftTitle}</h2>
                
                <p className="riddle-text">
                    {riddle.text}
                </p>

                <div className="riddle-options">
                    {riddle.options.map((option, index) => (
                        <button
                            key={index}
                            className={`option-btn ${selectedAnswer === index ? 'selected' : ''} ${showResult ? (index === riddle.correct ? 'correct' : 'wrong') : ''}`}
                            onClick={() => !showResult && handleAnswer(index)}
                            disabled={showResult}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                {showResult && (
                    <div className={`result-message ${selectedAnswer === riddle.correct ? 'success' : 'error'}`}>
                        {selectedAnswer === riddle.correct ? (
                            <div>
                                <p>Верно! Молодец!</p>
                            </div>
                        ) : (
                            <div>
                                <p>Правильный ответ: {riddle.options[riddle.correct]}</p>
                            </div>
                        )}
                    </div>
                )}

                {!showResult && (
                    <button 
                        className="submit-btn" 
                        onClick={handleSubmit}
                        disabled={selectedAnswer === null}
                    >
                        Ответить
                    </button>
                )}

                <button className="skip-btn" onClick={handleSkip}>
                    Пропустить (и открыть сразу)
                </button>
            </div>
        </div>
    );
}
