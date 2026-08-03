import "../App.css";

export default function FirstGift({ onNext }) {
    return (
        <div className="screen gift-screen">
            <div className="glass">
                <div className={`image-container animating`}>
                    <img
                        src="/images/myacat.jpg"
                        alt="Первый гостинец"
                    />
                </div>

                <h2>🎁 Это ты!</h2>
                <p>
                    А это я и Коржик ❤️
                </p>

                <div className="opened-content">
                    <div className="opened-emoji">
                        🎉
                    </div>
                    <p>
                        Самый главный подарок — это мы вместе!
                    </p>
                </div>

                <button onClick={onNext} className="open-btn">
                    Дальше!
                </button>
            </div>
        </div>
    );
}
