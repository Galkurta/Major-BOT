const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs").promises;
const config = require("./config");

if (!config.useTelegramBot) {
  console.log("Telegram bot is disabled in config. Exiting.");
  process.exit(0);
}

const token = config.telegramBotToken;
if (!token) {
  console.error(
    "Telegram bot token not found. Please set it in the .env file or config.js"
  );
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

// Authentication middleware
const authenticate = (msg, action) => {
  const userId = msg.from.id;
  if (!config.authorizedUsers.includes(userId)) {
    bot.sendMessage(msg.chat.id, "You are not authorized to use this bot.");
    return false;
  }
  return true;
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Welcome to the Major Bot. Use /help to see available commands."
  );
});

bot.onText(/\/help/, (msg) => {
  if (!authenticate(msg)) return;
  const chatId = msg.chat.id;
  const helpMessage = `
Available commands:
/update DD/MM/YYYY choice1 choice2 choice3 choice4 - Update Durov puzzle data
/summary - Get a summary of accounts and total balance
  `;
  bot.sendMessage(chatId, helpMessage);
});

bot.onText(/\/update (.+)/, async (msg, match) => {
  if (!authenticate(msg)) return;
  const chatId = msg.chat.id;
  const input = match[1].split(" ");

  if (input.length !== 5) {
    bot.sendMessage(
      chatId,
      "Invalid format. Please use: /update DD/MM/YYYY choice1 choice2 choice3 choice4"
    );
    return;
  }

  const [date, ...choices] = input;
  const choicesNum = choices.map(Number);

  if (choicesNum.some(isNaN)) {
    bot.sendMessage(chatId, "Choices must be numbers.");
    return;
  }

  try {
    let durovData = await fs
      .readFile("durov.json", "utf8")
      .then(JSON.parse)
      .catch(() => []);

    // Ensure durovData is an array
    if (!Array.isArray(durovData)) {
      durovData = [];
    }

    const existingIndex = durovData.findIndex((item) => item.date === date);
    const newData = {
      date,
      tasks: [
        {
          choice_1: choicesNum[0],
          choice_2: choicesNum[1],
          choice_3: choicesNum[2],
          choice_4: choicesNum[3],
        },
      ],
    };

    if (existingIndex !== -1) {
      durovData[existingIndex] = newData;
    } else {
      durovData.push(newData);
    }

    await fs.writeFile("durov.json", JSON.stringify(durovData, null, 2));
    bot.sendMessage(chatId, `Updated Durov puzzle data for ${date}`);
  } catch (error) {
    console.error("Error updating durov.json:", error);
    bot.sendMessage(chatId, "An error occurred while updating the data.");
  }
});

bot.onText(/\/summary/, async (msg) => {
  if (!authenticate(msg)) return;
  const chatId = msg.chat.id;

  try {
    const summaryData = await fs
      .readFile("summary.json", "utf8")
      .then(JSON.parse)
      .catch(() => null);

    if (summaryData) {
      const message = `[ Summary Major ]\n‣ Total Accounts: ${summaryData.totalAccounts}\n‣ Total Balance: ${summaryData.totalBalance}`;
      bot.sendMessage(chatId, message);
    } else {
      bot.sendMessage(
        chatId,
        "Summary data not available. Please run the main script first."
      );
    }
  } catch (error) {
    console.error("Error reading summary.json:", error);
    bot.sendMessage(
      chatId,
      "An error occurred while fetching the summary data."
    );
  }
});
// Removed the general message logging

console.log("Telegram bot is running...");
