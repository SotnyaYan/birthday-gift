import "./App.css";

import { useState, useEffect, useCallback, useRef } from "react";

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
import { sendTelegramNotification, formatGiftNotification, formatWelcomeNotification, formatFinalNotification, getServerTelegramConfig } from "./utils/telegram";

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

    // Состояния
    const [telegramConfigured, setTelegramConfigured] = useState(false);
    const [showTelegramSetup, setShowTelegramSetup] = useState(false);
    const [checkingConfig, setCheckingConfig] = useState(true);
    const [showRiddle, setShowRiddle] = useState(false);
    const [currentGift, setCurrentGift] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    // Ref чтобы не повторять эффекты
    const telegramConfiguredRef = useRef(telegramConfigured);
    const showToastRef = useRef(false);
    const notificationSentRef = useRef(false);
    const finalNotificationSentRef = useRef(false);

    // Обновляем refs
    useEffect(() => {
        telegramConfiguredRef.current = telegramConfigured;
    }, [telegramConfigured]);

    useEffect(() => {
        showToastRef.current = progress.opened;
    }, [progress.opened]);

    // Проверка настроек Telegram с сервера
    useEffect(() => {
        checkTelegramConfig();
    }, []);

    const checkTelegramConfig = async () => {
        try {
            const result = await getServerTelegramConfig();
            
            if (result.config && result.config.botToken && result.config.chatId) {
                setTelegramConfigured(true);
                
                // Если пользователь еще не начал, отправляем приветственное уведомление
                if (!progress.started) {
                    sendTelegramNotification(formatWelcomeNotification());
                }
            }
        } catch (err) {
            console.error("Ошибка проверки настроек Telegram:", err);
        } finally {
            setCheckingConfig(false);
        }
    };

    // Отправка уведомления при открытии подарка
    useEffect(() => {
        if (progress.opened && telegramConfiguredRef.current && !notificationSentRef.current) {
            setToastMessage("Подарок открыт! Можно забрать!");
            setShowToast(true);
            
            const gift = gifts.find(g => g.id === progress.currentGift);
            if (gift) {
                sendTelegramNotification(formatGiftNotification(gift)).then(() => {
                    notificationSentRef.current = true;
                });
            }
        }
    }, [progress.opened]);

    // Отправка финального уведомления
    const allGiftsOpened = progress.currentGift > gifts.length;

    useEffect(() => {
        if (allGiftsOpened && telegramConfiguredRef.current && !finalNotificationSentRef.current) {
            sendTelegramNotification(formatFinalNotification());
            finalNotificationSentRef.current = true;
        }
    }, [allGiftsOpened]);

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

    const handleTelegramSetupOpen = useCallback(() => {
        setShowTelegramSetup(true);
    }, []);

    const handleTelegramSetupComplete = useCallback((configured) => {
        setTelegramConfigured(configured);
        setShowTelegramSetup(false);
        
        if (configured) {
            // Если настройки сохранены, отправляем приветственное уведомление
            if (!progress.started) {
                sendTelegramNotification(formatWelcomeNotification());
            }
        }
        
        start();
    }, [start, progress.started]);

    // Пользователь еще не начал
    if (!progress.started) {
        return (
            <>
                <Welcome onStart={start} onOpenTelegramSetup={handleTelegramSetupOpen} />
                {showToast && (
                    <ToastNotification 
                        message={toastMessage} 
                        onClose={handleCloseToast} 
                    />
                )}
            </>
        );
    }

    // Все подарки открыты
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
