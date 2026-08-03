import { loadTelegramConfig } from "./storage";

// Запрос к серверному API
async function apiRequest(action, data) {
    const response = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, data }),
    });
    return response.json();
}

// Получить настройки Telegram с сервера
export async function getServerTelegramConfig() {
    return await apiRequest("getTelegramConfig", null);
}

// Сохранить настройки Telegram на сервере
export async function saveServerTelegramConfig(config) {
    return await apiRequest("setTelegramConfig", config);
}

// Отправить уведомление в Telegram через сервер
export async function sendTelegramNotification(message) {
    return await apiRequest("sendNotification", { message });
}

// Формирование сообщения для уведомления
export function formatGiftNotification(gift) {
    return `🎉 <b>гостинец открыт!</b>

🎁 ${gift.title}

<a href="${window.location.origin}${gift.image}">📷</a>

<a href="${window.location.href}">Открыть гостинец</a>`;
}

export function formatWelcomeNotification() {
    return `❤️ <b>Начало прохождения!</b>

Теперь ты можешь открыть первый гостинец!

<a href="${window.location.href}">Перейти к приложению</a>`;
}

export function formatFinalNotification() {
    return `🎉 <b>Все подарки открыты!</b>

Любимая прошла весь путь! 🌟

<a href="${window.location.href}">Посмотреть результат</a>`;
}
