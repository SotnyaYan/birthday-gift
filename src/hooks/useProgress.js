import { useState, useEffect } from "react";
import { loadProgress, saveProgress, resetProgress } from "../utils/storage";
import { nextUnlock } from "../utils/timer";

export default function useProgress() {
    const [progress, setProgress] = useState(loadProgress());
    const [now, setNow] = useState(Date.now());

    // Обновляем время каждую секунду для правильной работы таймеров
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    function start() {
        const newProgress = {
            ...progress,
            started: true
        };
        save(newProgress);
    }

    function openGift() {
        const newProgress = {
            ...progress,
            opened: true,
            unlockAt: nextUnlock()
        };
        save(newProgress);
    }

    function nextGift() {
        const newProgress = {
            ...progress,
            currentGift: progress.currentGift + 1,
            opened: false,
            unlockAt: null
        };
        save(newProgress);
    }

    function reset() {
        resetProgress();
        setProgress({
            started: false,
            currentGift: 1,
            opened: false,
            unlockAt: null
        });
        setNow(Date.now());
    }

    function save(data) {
        setProgress(data);
        saveProgress(data);
    }

    return {
        progress,
        now, // Передаем текущее время
        start,
        openGift,
        nextGift,
        resetProgress: reset
    };
}
