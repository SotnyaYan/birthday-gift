import { useState } from "react";

import "../App.css";

import { saveTelegramConfig } from "../utils/storage";

export default function TelegramSetup({ onComplete }) {
    const [botToken, setBotToken] = useState("");
    const [chatId, setChatId] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!botToken || !chatId) {
            setError("Заполни все поля!");
            return;
        }

        setLoading(true);

        try {
            saveTelegramConfig({ botToken, chatId });
            
            const response = await fetch(
                `https://api.telegram.org/bot${botToken}/sendMessage`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: "Настройки работают! Теперь буду присылать уведомления.",
                        parse_mode: "HTML",
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.description || "Ошибка тестового сообщения");
            }

            onComplete(true);
        } catch (err) {
            setError(`Ошибка: ${err.message}`);
            setLoading(false);
        }
    };

    return (
        <div className="screen telegram-setup">
            <div className="glass">
                <div className="setup-icon">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                </div>
                <h2>Настройка Telegram</h2>
                <p>
                    Чтобы получать уведомления об открытии подарков:
                </p>

                <div className="setup-form">
                    <div className="input-group">
                        <label>Telegram Bot Token:</label>
                        <input
                            type="password"
                            value={botToken}
                            onChange={(e) => setBotToken(e.target.value)}
                            placeholder="123456789:ABCdef..."
                        />
                    </div>

                    <div className="input-group">
                        <label>Telegram Chat ID:</label>
                        <input
                            type="text"
                            value={chatId}
                            onChange={(e) => setChatId(e.target.value)}
                            placeholder="123456789"
                        />
                    </div>

                    <div className="hint">
                        <p>Как получить:</p>
                        <ol>
                            <li>Напиши <strong>@BotFather</strong> в Telegram</li>
                            <li>Создай бота: <strong>/newbot</strong></li>
                            <li>Скопируй токен</li>
                            <li>Напиши боту любое сообщение</li>
                            <li>Получи Chat ID: <a href="https://t.me/myidbot" target="_blank" rel="noopener noreferrer">@myidbot</a></li>
                        </ol>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button 
                        className="submit-btn" 
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Проверка..." : "Сохранить и начать"}
                    </button>
                </div>

                <button className="skip-btn" onClick={() => onComplete(false)}>
                    Пропустить настройку
                </button>
            </div>
        </div>
    );
}
