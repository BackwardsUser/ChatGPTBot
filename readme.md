# ChatGPT Discord Bot
Quite simply; I put ChatGPT in a Discord Bot.

![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/BackwardsUser/ChatGPTBot/main) ![GitHub](https://img.shields.io/github/license/BackwardsUser/ChatGPTBot) ![GitHub issues](https://img.shields.io/github/issues-raw/BackwardsUser/ChatGPTBot)

## IMPORTANT
As of June 5<sup>th</sup> 2023, the bot may not work. My free trial ran out and am not interested in buying a plan, so use at your own risk.

## Installation
#### Requirements
[NodeJS](https://nodejs.org)  
#### Running
1. Clone the repository.
2. Create a `.env` file.

Your .env file should look like the following:
```js
TOKEN="YOUR_DISCORD_BOT_TOKEN"
OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
```

3. Run the command `npm test` in terminal.

#### After install information

This bot will search for channels who's name includes `gpt`. feel free to change that on line `82`  
All conversations will be reset whenever the bot restarts. If you know how, feel free to change that, I do plan on adding it in the future.  
the max tokens is 2048, feel free to change that on line `88`

## Contributions
Be sure to fork this repository and make a pull request when you're done!
