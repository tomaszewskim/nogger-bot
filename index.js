require('dotenv').config();
const Discord = require('discord.js');
const { prefix } = require('./config.json');
const fs = require('fs');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  bot.commands.set(command.name, command);
}

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(' ').filter(word => word);
  const command = args.shift().toLowerCase();

  await bot.commands.get(command).execute(message, args);
});

bot.login(process.env.TOKEN);