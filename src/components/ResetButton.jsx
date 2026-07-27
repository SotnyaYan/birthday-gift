import "../App.css";

export default function ResetButton({ onReset }) {
    const handleReset = () => {
        if (window.confirm("Ты точно хочешь начать всё заново?")) {
            onReset();
        }
    };

    return (
        <button className="reset-btn" onClick={handleReset}>
            Сбросить прогресс
        </button>
    );
}
