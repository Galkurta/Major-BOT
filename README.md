# Major Automation Project

This project automates interactions with the Major platform, including daily check-ins, roulette spins, coin holding, task completions, and Durov puzzle solving.

## Features

- Automated authentication
- Daily check-ins
- Roulette spins
- Coin holding and swiping
- Task completion
- Durov puzzle solving
- Multi-account support

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (version 12.x or higher recommended)
- npm (Node Package Manager) installed

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

4. Create a `durov.json` file in the project root directory with the following structure:

   ```json
   {
     "date": "DD/MM/YYYY",
     "tasks": [
       {
         "choice_1": 0,
         "choice_2": 0,
         "choice_3": 0,
         "choice_4": 0
       }
     ]
   }
   ```

   Replace the zeros with the correct puzzle choices and update the date accordingly.

## Usage

To run the automation script:

```
node main.js
```

The script will process all accounts listed in `data.txt` and repeat the process approximately every 8 hours.

### Updating Durov Puzzle Choices

To update the Durov puzzle choices:

1. Open the `durov.json` file.
2. Update the "date" field to the current date in DD/MM/YYYY format.
3. Modify the "choice_1" through "choice_4" values in the "tasks" array with the correct puzzle choices.
4. Save the file.

The script will automatically use these choices when attempting to solve the Durov puzzle.

## Registration

To use this automation, you need a Major account. If you don't have one, you can register using the following link:

[Register for Major](https://t.me/major/start?startapp=6944804952)

## Disclaimer

This project is for educational purposes only. Use at your own risk. The authors are not responsible for any consequences resulting from the use of this software.

## Contributing

Contributions to this project are welcome. Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
