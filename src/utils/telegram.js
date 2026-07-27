import { loadTelegramConfig } from "./storage";

// Отправка уведомления в Telegram
export async function sendTelegramNotification(message) {
    const config = loadTelegramConfig();
    
    if (!config || !config.botToken || !config.chatId) {
        console.warn("Telegram не настроен");
        return { success: false, error: "Не настроен" };
    }

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${config.botToken}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: config.chatId,
                    text: message,
                    parse_mode: "HTML",
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.description || "Ошибка отправки");
        }

        return { success: true, data };
    } catch (error) {
        console.error("Ошибка отправки в Telegram:", error);
        return { success: false, error: error.message };
    }
}

// Формирование сообщения для уведомления
export function formatGiftNotification(gift) {
    return `🎉 <b>Подарок открыт!</b>

🎁 ${gift.title}

<a href="${window.location.origin}${gift.image}">📷</a>

<a href="${window.location.href}">Открыть подарок</a>`;
}

export function formatWelcomeNotification() {
    return `❤️ <b>Начало прохождения!</b>

Теперь ты можешь открыть первый подарок!

<a href="${window.location.href}">Перейти к приложению</a>`;
}

export function formatFinalNotification() {
    return `🎉 <b>Все подарки открыты!</b>

Любимая прошла весь путь! 🌟

<a href="${window.location.href}">Посмотреть результат</a>`;
}
