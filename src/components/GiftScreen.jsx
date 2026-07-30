import { useState, useEffect } from "react";

import "../App.css";

export default function GiftScreen({ gift, opened, onOpen }) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (opened) {
            setAnimate(true);
        }
    }, [opened]);

    return (
        <div className="screen gift-screen">
            <div className="glass">
                <div className={`image-container ${animate ? "animating" : ""}`}>
                    <img
                        src={gift.image}
                        alt={gift.title}
                    />
                </div>

                <h2>{gift.title}</h2>
                <p>{gift.description}</p>

                {opened ? (
                    <div className="opened-content">
                        <div className="opened-emoji">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </div>

                        <div className="opened-badge">Открыто</div>
                    </div>
                ) : (
                    <button onClick={onOpen} className="open-btn">
                        Открыть подарок
                    </button>
                )}
            </div>
        </div>
    );
}
