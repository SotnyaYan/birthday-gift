const STORAGE_KEY = "birthday-app";
const TELEGRAM_KEY = "birthday-telegram";

export function loadProgress() {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
        return {
            started: false,
            currentGift: 1,
            opened: false,
            showToast: false,
            unlockAt: null
        };
    }

    return JSON.parse(data);
}

export function saveProgress(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
}

// Функции для Telegram
export function loadTelegramConfig() {
    const data = localStorage.getItem(TELEGRAM_KEY);
    if (!data) return null;
    return JSON.parse(data);
}

export function saveTelegramConfig(config) {
    localStorage.setItem(TELEGRAM_KEY, JSON.stringify(config));
}

export function clearTelegramConfig() {
    localStorage.removeItem(TELEGRAM_KEY);
}
