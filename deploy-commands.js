require('dotenv').config();             const { REST, Routes } = require('discord.js');

const token = process.env.TOKEN; // Your bot token from .env
const clientId = '1396036860517548042'; // Get this from Discord Developer Portal > General Information
const guildId = '1394922544020324434';   // Your Discord server ID (right-click server icon > Copy ID, enable Developer Mode in Discord settings)

const commands = [
  {
    name: 'scripts',
    description: 'Show Roblox scripts dropdown menu',
  },
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
