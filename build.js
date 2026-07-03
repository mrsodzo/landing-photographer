const fs = require('fs');
const path = require('path');

const botToken = process.env.TELEGRAM_BOT_TOKEN || '';
const chatId = process.env.TELEGRAM_CHAT_ID || '';

const configDir = path.join(__dirname, 'js');
const configPath = path.join(configDir, 'config.js');

if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

const configContent = `window.LANDING_CONFIG = {
  telegram: {
    botToken: '${botToken}',
    chatId: '${chatId}'
  }
};
`;

fs.writeFileSync(configPath, configContent, 'utf8');
console.log('Generated js/config.js');
