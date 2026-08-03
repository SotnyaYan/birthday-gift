export const HOUR = 2 * 60 * 60 * 1000;
// Для тестов потом можно заменить на:
// export const HOUR = 10 * 1000;

export function nextUnlock() {
    return Date.now() + HOUR;
}

export function isUnlocked(unlockAt) {

    if (!unlockAt)
        return true;

    return Date.now() >= unlockAt;

}