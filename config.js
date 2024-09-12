require("dotenv").config();

module.exports = {
  useTelegramBot: true, // Set to false if you don't want to use the Telegram bot
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || "",
  authorizedUsers: process.env.AUTHORIZED_USERS
    ? process.env.AUTHORIZED_USERS.split(",").map((id) => parseInt(id.trim()))
    : [],
};
