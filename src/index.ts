// Import necessary modules and libraries
import 'dotenv/config';
import { ChannelType, Client, Events, GatewayIntentBits, Guild, Message } from "discord.js";
import { Configuration, OpenAIApi, Model, ChatCompletionRequestMessage } from "openai";

// Set up OpenAI configuration
const configuration: Configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai: OpenAIApi = new OpenAIApi(configuration);

// Variable to store messages for each guild (server)
var guild_messages: any = {};

// Name of the bot
var botName = "Rose"

// Initial system message
var messages: ChatCompletionRequestMessage[] = [
    { "role": "system", "content": `You are a language model called ${botName} who replies to messages while keeping previously given information. You are constantly learning.` }
]

// Function to process incoming messages
async function init() {
    await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 1,
        frequency_penalty: 0,
        n: 1,
        presence_penalty: 0,
        temperature: 0
    });
}

// Run Init function
init()

// Function to add guild (server) messages to the guild_messages object
function guildAdd(guild: Guild) {
    guild_messages[guild.id.toString()] = messages;
}

// Specify the intents (events) the bot is interested in
const intents: GatewayIntentBits[] = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]

// Create a new Discord client
const client: Client = new Client({
    intents: intents
})

// Event handler for when the client is ready
client.once(Events.ClientReady, () => {
    console.log(`Successfully Logged in as ${client.user.tag}!`);
});

// Event handler for when the bot joins a new guild (server)
client.on('guildCreate', guild => {
    if (guild_messages[guild.id]) guildAdd(guild);
    console.log(`I have joined the server ${guild.name}.`);
});

// Event handler for when the bot leaves a guild (server)
client.on("guildDelete", guild => {
    if (guild_messages[guild.id]) delete guild_messages[guild.id];
    console.log(`I have left the server ${guild.name}.`);
})

// Event handler for incoming messages
client.on('messageCreate', msg => {
    if (msg.author.bot) return; // Ignore messages from other bots
    if (!guild_messages[msg.guild.id]) guildAdd(msg.guild); // Create message history for new guilds
    if (msg.channel.type === ChannelType.DM) {
        msg.reply("We cannot have a conversation in DMs right now."); // Reply to DMs
        return;
    };
    if (!msg.channel.name.includes('gpt')) return; // Ignore messages from channels that don't include 'gpt' in their name
    const prompt = msg.content;
    guild_messages[msg.guild.id.toString()].push({ "role": "user", "content": prompt }); // Add user message to guild message history
    openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: guild_messages[msg.guild.id.toString()],
        max_tokens: 2048,
        frequency_penalty: 1,
        n: 1,
        presence_penalty: 0,
        temperature: 0.2
    }).then(res => {
        const return_message = res.data.choices[0].message;
        guild_messages[msg.guild.id.toString()].push(return_message); // Add bot's response to guild message history
        msg.reply(return_message.content) // Reply to the user with the bot's response
    }).catch(err => {
        msg.reply("Something went wrong... Please try again later."); // Reply with an error message if an error occurs
        console.error(err.response.data.error.message);
    })
})

// Log in the bot using the provided token
client.login(process.env.TOKEN)