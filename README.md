# Major Automation Project

This project automates interactions with the Major platform, including daily check-ins, roulette spins, coin holding, task completions, and Durov puzzle solving. It now includes a Telegram bot for easier management and updates.

## Features

- Automated authentication
- Daily check-ins
- Roulette spins
- Coin holding and swiping
- Task completion
- Durov puzzle solving
- Multi-account support
- Telegram bot integration for remote management

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (version 12.x or higher recommended)
- npm (Node Package Manager) installed
- A Telegram bot token (obtain from BotFather on Telegram)

## Installation

1. Clone this repository:

   ```
   git clone https://github.com/Galkurta/Major-BOT.git
   cd Major-BOT
   ```

2. Install the required dependencies:

   ```
   npm install
   ```

3. Edit `data.txt` file in the project root directory and add your Major authentication data, one per line.

4. Create a `.env` file in the project root and add your Telegram bot token:

   ```
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   AUTHORIZED_USERS=your_telegram_user_id
   ```

   Replace `your_bot_token_here` with your actual bot token and `your_telegram_user_id` with your Telegram user ID.

5. Update `config.js` to enable or disable the Telegram bot:

   ```javascript
   useTelegramBot: true, // Set to false if you don't want to use the Telegram bot
   ```

## Usage

To run the automation script:

```
node main.js
```

The script will process all accounts listed in `data.txt` and repeat the process approximately every 8 hours. If the Telegram bot is enabled, it will start automatically.

### Telegram Bot Commands

- `/start` - Start the bot
- `/help` - Show available commands
- `/update DD/MM/YYYY choice1 choice2 choice3 choice4` - Update Durov puzzle data
- `/summary` - Get a summary of accounts and total balance

### Updating Durov Puzzle Choices

To update the Durov puzzle choices using the Telegram bot:

1. Start a chat with your bot on Telegram.
2. Send a message in the following format:

   ```
   /update DD/MM/YYYY choice1 choice2 choice3 choice4
   ```

   For example:

   ```
   /update 15/09/2024 7 4 12 5
   ```

3. The bot will update the `durov.json` file with the new puzzle choices for the specified date.

## Registration

To use this automation, you need a Major account. If you don't have one, you can register using the following link:

[Register for Major](https://t.me/major/start?startapp=6944804952)

## Disclaimer

This project is for educational purposes only. Use at your own risk. The authors are not responsible for any consequences resulting from the use of this software.

## Contributing

Contributions to this project are welcome. Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
