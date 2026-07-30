# 🎁 Birthday Gift

Интерактивный веб-сайт-поздравление с Днём рождения. 6 подарков, каждый из которых закрыт ребусом. После разгадывания пользователь получает уведомление в Telegram, а следующий подарок открывается по таймеру.

## 🚀 Технологии

- **React 19** — UI
- **Vite 8** — сборщик и dev-сервер
- **Upstash Redis** — серверное хранение (настройки Telegram)
- **Vercel** — деплой

## 📦 Установка

```bash
npm install
```

## 🔧 Запуск

```bash
npm run dev
```

Откроется на `http://localhost:5173`

## 🏗️ Сборка

```bash
npm run build
```

## 📁 Структура проекта

```
├── api/                          # Vercel serverless functions
│   └── index.js                  # API для Telegram (сохранение/отправка)
├── public/                       # Статические файлы
│   └── images/                   # Изображения подарков и ребусов
├── src/
│   ├── components/               # React-компоненты
│   │   ├── GiftScreen.jsx        # Карточка подарка
│   │   ├── RiddleScreen.jsx      # Ребус с полем ввода
│   │   ├── WaitingScreen.jsx     # Экран ожидания (таймер)
│   │   ├── SuccessScreen.jsx     # Финальный экран
│   │   ├── ProgressIndicator.jsx # Индикатор прогресса
│   │   ├── Welcome.jsx           # Экран приветствия
│   │   └── TelegramSetup.jsx     # Настройка Telegram-бота
│   ├── data/
│   │   └── gifts.js              # Данные подарков и ребусов
│   ├── hooks/
│   │   └── useProgress.js        # Управление состоянием прогресса
│   ├── utils/
│   │   ├── storage.js            # LocalStorage
│   │   ├── telegram.js           # Telegram API
│   │   └── timer.js              # Таймеры
│   ├── App.jsx                   # Корневой компонент
│   └── App.css                   # Глобальные стили (glassmorphism)
├── vercel.json                   # Конфигурация Vercel
└── vite.config.js
```

## ⚙️ Настройка Telegram-бота

1. Написать **@BotFather** в Telegram → `/newbot` → получить токен
2. Написать боту любое сообщение
3. Получить Chat ID: **@myidbot**
4. В приложении нажать **«Настроить уведомления»** → ввести токен и chat ID → **«Сохранить и начать»**

Настройки сохраняются в **Upstash Redis** на сервере Vercel.

## 🔑 Переменные окружения (Vercel)

Необходимы для работы Upstash Redis:

| Переменная | Описание |
|---|---|
| `UPSTASH_REDIS_REST_URL` | URL Redis-базы |
| `UPSTASH_REDIS_REST_TOKEN` | Токен доступа к Redis |

## 🎨 Дизайн

Glassmorphism UI в морской голубой теме (`#0095B6`).
