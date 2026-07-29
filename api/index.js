import { Redis } from '@upstash/redis';

// Initialize Redis
const redis = Redis.fromEnv();

export default async function handler(req, res) {
    // Включить CORS для API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Метод не разрешен' });
    }

    const { action, data } = req.body;

    try {
        if (action === 'setTelegramConfig') {
            // Сохранить настройки Telegram
            await redis.set('telegram:config', JSON.stringify(data));
            return res.status(200).json({ success: true });
        }
        
        if (action === 'getTelegramConfig') {
            // Получить настройки Telegram
            const config = await redis.get('telegram:config');
            return res.status(200).json({ config });
        }
        
        if (action === 'sendNotification') {
            // Отправить уведомление в Telegram
            const config = await redis.get('telegram:config');
            
            if (!config || !config.botToken || !config.chatId) {
                return res.status(400).json({ success: false, error: 'Не настроен' });
            }
            
            const message = data.message;
            
            const response = await fetch(
                `https://api.telegram.org/bot${config.botToken}/sendMessage`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: config.chatId,
                        text: message,
                        parse_mode: 'HTML',
                    }),
                }
            );
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.description || 'Ошибка отправки');
            }
            
            return res.status(200).json({ success: true });
        }
        
        return res.status(400).json({ error: 'Неизвестное действие' });
        
    } catch (error) {
        console.error('Ошибка API:', error);
        return res.status(500).json({ error: error.message });
    }
}
