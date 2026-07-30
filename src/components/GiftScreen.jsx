import { useState, useEffect } from "react";

import "../App.css";
import { gifts as allGifts } from "../data/gifts";

export default function GiftScreen({ gift, opened, onOpen }) {
    const [animate, setAnimate] = useState(false);
    const isPsGift = gift.id === 6;
    const riddleGifts = allGifts.filter((item) => item.riddleAnswer);

    useEffect(() => {
        if (opened) {
            setAnimate(true);
        }
    }, [opened]);

    return (
        <div className={`screen gift-screen${isPsGift ? " ps-screen" : ""}`}>
            <div className={`glass${isPsGift ? " ps-glass" : ""}`}>
                {isPsGift && opened && gift.images ? (
                    <div className="ps-gallery">
                        {gift.images.map((src, index) => (
                            <div
                                key={src}
                                className={`image-container ps-gallery-item ${animate ? "animating" : ""}`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <img src={src} alt={`${gift.title} ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={`image-container ${animate ? "animating" : ""}`}>
                        <img
                            src={gift.image}
                            alt={gift.title}
                        />
                    </div>
                )}

                <h2>{gift.title}</h2>

                {opened ? (
                    <div className="opened-content">
                        <div className="opened-emoji">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </div>
                        <p>{gift.description}</p>

                        {isPsGift && (
                            <div className="riddle-recap">
                                <h3>Разгадки ребусов</h3>
                                {riddleGifts.map((riddleGift) => (
                                    <div key={riddleGift.id} className="riddle-recap-item">
                                        <span className="riddle-recap-title">{riddleGift.title}</span>
                                        <span className="riddle-recap-answer">{riddleGift.riddleAnswer}</span>
                                        <p>{riddleGift.riddleDescription}</p>
                                    </div>
                                ))}
                            </div>
                        )}

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
