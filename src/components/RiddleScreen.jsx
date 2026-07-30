import { useState, useRef, useEffect } from "react";

import "../App.css";

export default function RiddleScreen({ gift, onAnswer }) {
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const normalizedInput = input.trim().toLowerCase();
        const normalizedAnswer = gift.riddleAnswer.toLowerCase();
        
        if (normalizedInput === normalizedAnswer) {
            onAnswer(true);
        } else {
            setError(true);
            setInput("");
            setTimeout(() => setError(false), 500);
        }
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
                <h2>{gift.title}</h2>
                <p style={{ marginBottom: "20px", fontSize: "15px" }}>
                    Введи слово, чтобы открыть подарок:
                </p>

                <div className="riddle-image">
                    <img src={gift.image} alt={gift.title} />
                </div>

                {gift.riddleDescription && (
                    <div className="riddle-hint">
                        💡 {gift.riddleDescription}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className={`input-wrapper ${error ? "shake" : ""}`}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Введи слово..."
                            autoComplete="off"
                        />
                        <button type="submit">Открыть</button>
                    </div>
                </form>

                {error && (
                    <div className="riddle-error">
                        Неверно, попробуй ещё раз!
                    </div>
                )}
            </div>
        </div>
    );
}
