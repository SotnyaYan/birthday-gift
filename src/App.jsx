import "./App.css";

import { useState, useEffect, useCallback } from "react";

import Welcome from "./components/Welcome";
import RiddleScreen from "./components/RiddleScreen";
import GiftScreen from "./components/GiftScreen";
import WaitingScreen from "./components/WaitingScreen";
import SuccessScreen from "./components/SuccessScreen";
import ProgressIndicator from "./components/ProgressIndicator";
import ResetButton from "./components/ResetButton";
import ToastNotification from "./components/ToastNotification";
import TelegramSetup from "./components/TelegramSetup";

import useProgress from "./hooks/useProgress";
import { sendTelegramNotification, formatGiftNotification, formatWelcomeNotification, formatFinalNotification } from "./utils/telegram";
import { loadTelegramConfig } from "./utils/storage";

import { gifts } from "./data/gifts";

function App() {
    const {
        progress,
        now,
        start,
        openGift,
        nextGift,
        resetProgress
    } = useProgress();

    // Состояния для ресурсов и уведомлений
    const [showRiddle, setShowRiddle] = useState(false);
    const [currentGift, setCurrentGift] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [telegramConfigured, setTelegramConfigured] = useState(false);
    const [showTelegramSetup, setShowTelegramSetup] = useState(false);

    // Проверка: все ли подарки открыты
    const allGiftsOpened = progress.currentGift > gifts.length;

    // Проверка настроек Telegram при загрузке
    useEffect(() => {
        const config = loadTelegramConfig();
        if (config && config.botToken && config.chatId) {
            setTelegramConfigured(true);
            
            // Отправляем уведомление о начале прохождения
            if (!progress.started) {
                sendTelegramNotification(formatWelcomeNotification());
            }
        } else if (!progress.started) {
            setShowTelegramSetup(true);
        }
    }, []);

    // Отправка уведомления в Telegram при открытии подарка
    useEffect(() => {
        if (progress.opened && !progress.showToast) {
            setToastMessage("Подарок открыт! Можно забрать! 🎁");
            setShowToast(true);
            
            // Отправляем в Telegram
            const gift = gifts.find(g => g.id === progress.currentGift);
            if (gift && telegramConfigured) {
                sendTelegramNotification(formatGiftNotification(gift));
            }
            
            // Обновляем прогресс, чтобы уведомление не повторялось
            const newProgress = {
                ...progress,
                showToast: true
            };
            
            // Не сохраняем, чтобы не вызывать рекурсию
        }
    }, [progress.opened, progress.showToast, telegramConfigured]);

    // Отправка финального уведомления
    useEffect(() => {
        if (allGiftsOpened && telegramConfigured) {
            sendTelegramNotification(formatFinalNotification());
        }
    }, [allGiftsOpened, telegramConfigured]);

    // Эффект для автоматического перехода к следующему подарку
    useEffect(() => {
        if (progress.opened && progress.unlockAt && now >= progress.unlockAt) {
            nextGift();
        }
    }, [progress.opened, progress.unlockAt, now, nextGift]);

    const handleRiddleAnswer = useCallback((correct) => {
        setShowRiddle(false);
        openGift();
    }, [openGift]);

    const handleSkipRiddle = useCallback(() => {
        setShowRiddle(false);
        openGift();
    }, [openGift]);

    const handleOpenGift = useCallback(() => {
        const gift = gifts.find(g => g.id === progress.currentGift);
        
        if (gift && gift.riddle) {
            setCurrentGift(gift);
            setShowRiddle(true);
        } else {
            openGift();
        }
    }, [progress.currentGift, openGift]);

    const handleCloseToast = useCallback(() => {
        setShowToast(false);
    }, []);

    const handleTelegramSetupComplete = useCallback((configured) => {
        setTelegramConfigured(configured);
        setShowTelegramSetup(false);
        start();
    }, [start]);

    if (showTelegramSetup) {
        return (
            <TelegramSetup onComplete={handleTelegramSetupComplete} />
        );
    }

    if (!progress.started) {
        return (
            <>
                <Welcome onStart={start} />
                {showToast && (
                    <ToastNotification 
                        message={toastMessage} 
                        onClose={handleCloseToast} 
                    />
                )}
            </>
        );
    }

    if (allGiftsOpened) {
        return (
            <>
                <ProgressIndicator progress={progress} total={gifts.length} />
                <SuccessScreen onReset={resetProgress} />
                {showToast && (
                    <ToastNotification 
                        message={toastMessage} 
                        onClose={handleCloseToast} 
                    />
                )}
            </>
        );
    }

    // Показываем экран загадки
    if (showRiddle && currentGift) {
        return (
            <>
                <ProgressIndicator progress={progress} total={gifts.length} />
                <RiddleScreen
                    riddle={currentGift.riddle}
                    giftTitle={currentGift.title}
                    onAnswer={handleRiddleAnswer}
                    onSkip={handleSkipRiddle}
                />
            </>
        );
    }

    // Показываем экран ожидания
    if (progress.opened && progress.unlockAt && now < progress.unlockAt) {
        return (
            <>
                <ProgressIndicator progress={progress} total={gifts.length} />
                <WaitingScreen unlockAt={progress.unlockAt} now={now} />
                {showToast && (
                    <ToastNotification 
                        message={toastMessage} 
                        onClose={handleCloseToast} 
                    />
                )}
            </>
        );
    }

    const gift = gifts.find(g => g.id === progress.currentGift);

    return (
        <>
            <ProgressIndicator progress={progress} total={gifts.length} />
            <GiftScreen
                gift={gift}
                opened={progress.opened}
                onOpen={handleOpenGift}
            />
            <ResetButton onReset={resetProgress} />
            {showToast && (
                <ToastNotification 
                    message={toastMessage} 
                    onClose={handleCloseToast} 
                />
            )}
        </>
    );
}

export default App;
