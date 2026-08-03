import { useState, useEffect } from "react";

import "../App.css";

export default function WaitingScreen({ unlockAt, now }) {
    const [timeLeft, setTimeLeft] = useState(unlockAt - now);

    useEffect(() => {
        setTimeLeft(unlockAt - now);
    }, [now, unlockAt]);

    const diff = timeLeft;
    const minutes = Math.floor(diff / 1000 / 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (diff <= 0) {
        return (
            <div className="screen ready">
                <div className="glass">
                    <h2>Готово!</h2>
                    <p>Следующий гостинец уже ждет тебя!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="screen">
            <div className="glass">
                <div className="waiting-icon">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                </div>
                <h2>Осталось времени</h2>
                <p>Следующий сюрприз уже совсем близко...</p>
                <div className="timer">
                    {minutes}:{seconds.toString().padStart(2, "0")}
                </div>
            </div>
        </div>
    );
}
