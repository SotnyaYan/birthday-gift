import "../App.css";

export default function SuccessScreen({ onReset }) {
    return (
        <div className="screen success-screen">
            <div className="glass">
                <div className="success-icon">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <h2>Все подарки открыты!</h2>
                <p>
                    Поздравляю! 🌟<br/><br/>
                    Надеюсь, тебе понравился этот сюрприз.<br/>
                    Ты — самое прекрасное в моей жизни!
                </p>
                <p style={{ fontSize: "18px", fontWeight: "600", color: "var(--accent)" }}>
                    С Днем рождения!
                </p>
                <button onClick={onReset}>
                    Начать заново
                </button>
            </div>
        </div>
    );
}
