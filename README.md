# Лендинг — Свадебный фотограф

Визуальный лендинг-портфолио для фотографа с формой бронирования даты. Цель сайта — показать работы, вызвать эмоциональный отклик и получить заявку через форму.

## Что внутри

- Полноэкранный hero с параллаксом
- Портфолио с masonry-сеткой, фильтрами и lightbox
- Блок услуг (3 тарифа)
- Раздел «Обо мне» с видео
- Слайдер отзывов с авто-прокруткой
- Форма бронирования с маской телефона и отправкой в Telegram
- Instagram-сетка и футер

## Использованные технологии

- HTML5 + CSS3 + Vanilla JS
- CSS Grid / Flexbox / columns (masonry)
- IntersectionObserver для анимаций появления
- Нативный `<input type="date">`
- Telegram Bot API для уведомлений о заявках
- Google Fonts: Cormorant Garamond, Inter
- Стоковые фото: Unsplash

## Установка / запуск

Проект статический, без сборки и зависимостей.

1. Клонируйте или скопируйте файлы.
2. Откройте `index.html` в браузере.

**Локальный сервер (рекомендуется, чтобы корректно работал iframe YouTube):**
```bash
npx serve .
```
или
```bash
python -m http.server 8080
```

## Деплой на Netlify

Сайт развернут по адресу: https://landing-photographer.netlify.app

### Настройка Telegram бота на Netlify

1. В панели управления Netlify перейдите в **Site settings > Build & deploy > Environment**
2. Добавьте переменные окружения:
   - `TELEGRAM_BOT_TOKEN` — токен бота от @BotFather
   - `TELEGRAM_CHAT_ID` — ID чата (личного или группового), куда отправлять заявки
3. Настройте сборку: **Build command**: `node build.js`
4. В репозитории должен быть файл `build.js`, который генерирует `js/config.js` из переменных окружения:
   ```js
   const fs = require('fs');
   const config = {
     telegram: {
       botToken: process.env.TELEGRAM_BOT_TOKEN,
       chatId: process.env.TELEGRAM_CHAT_ID
     }
   };
   fs.writeFileSync('js/config.js', 'window.LANDING_CONFIG = ' + JSON.stringify(config, null, 2) + ';');
   ```

> Важно: `js/config.js` добавлен в `.gitignore` и не попадает в репозиторий.

## Конфигурация Telegram (локально)

1. Создайте бота через [@BotFather](https://t.me/BotFather) и получите `BOT_TOKEN`.
2. Узнайте `CHAT_ID` (личный или групповой), куда должны приходить заявки.
3. Заполните `js/config.js`:

```js
window.LANDING_CONFIG = {
  telegram: {
    botToken: 'YOUR_BOT_TOKEN',
    chatId: 'YOUR_CHAT_ID'
  }
};
```

> `js/config.js` добавлен в `.gitignore` и не попадает в репозиторий.

## Лицензия

Проект создан как демонстрационный лендинг-портфолио.
