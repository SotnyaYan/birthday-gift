import "../App.css";

export default function ProgressIndicator({ progress, total }) {
    const current = progress.currentGift || 1;
    
    return (
        <div className="progress-container">
            <div className="progress-bar">
                <span className="progress-text">
                    Подарок {current} из {total}
                </span>
                <div className="progress-dots">
                    {Array.from({ length: total }, (_, i) => {
                        const giftNum = i + 1;
                        const isActive = giftNum === current;
                        const isCompleted = giftNum < current;
                        
                        return (
                            <div
                                key={giftNum}
                                className={`progress-dot ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
