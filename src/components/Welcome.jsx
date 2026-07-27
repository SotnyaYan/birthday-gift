import "../App.css";

export default function Welcome({ onStart }) {
    return (
        <div className="screen welcome">
            <div className="glass">
                <div className="welcome-icon">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </div>
                <h2>С Днем рождения!</h2>
                <p>
                    Я подготовил для тебя особенный сюрприз<br/>
                    6 подарков, которые я хочешь открыть с тобой...
                </p>
                <p style={{ color: "var(--accent)", fontWeight: "600" }}>
                    Каждый ждет своего времени 😉
                </p>
                <button onClick={onStart}>
                    Начать путешествие
                </button>
            </div>
        </div>
    );
}
