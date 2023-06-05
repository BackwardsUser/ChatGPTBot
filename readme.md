# ChatGPT Discord Bot
Quite simply; I put ChatGPT in a Discord Bot.

![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/BackwardsUser/ChatGPTBot/main) ![GitHub](https://img.shields.io/github/license/BackwardsUser/ChatGPTBot) ![GitHub issues](https://img.shields.io/github/issues-raw/BackwardsUser/ChatGPTBot)

## IMPORTANT
As of June 5^th^ 2023, the bot may not work. My free trial ran out and am not interested in buying a plan, so use at your own risk.

## Installation
#### Requirements
[NodeJS](https://nodejs.org)  
#### Running
1. Click the `Code` button
2. Click `Download as ZIP` button
3. Unzip the file
4. Inside the unzipped file, open a terminal
5. In the terminal run: `npm i`
6. than create a `.env` file.

Your .env file should look like the following:
```js
TOKEN="YOUR_DISCORD_BOT_TOKEN"
OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
```

7. Go back to the terminal
8. Run `npm test`

#### After install information

This bot will search for channels who's name includes `gpt`. feel free to change that on line `82`  
All conversations will be reset whenever the bot restarts. If you know how, feel free to change that, I do plan on adding it in the future.  
the max tokens is 2048, feel free to change that on line `88`

## Contributions
Be sure to fork this repository and make a pull request when you're done!