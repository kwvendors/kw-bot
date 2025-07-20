// 🌐 KEEP-ALIVE SECTION
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot is alive!');
});

app.listen(3000, () => {
  console.log('✅ Keep-alive server running');
});

// 🤖 DISCORD BOT SETUP
require('dotenv').config();
const { Client, GatewayIntentBits, ActionRowBuilder, StringSelectMenuBuilder, Events } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const scripts = {
  ff2: `loadstring(game:HttpGet("https://raw.githubusercontent.com/Dejaunisgood/Nnnn/refs/heads/main/obfuscated.lua%20(14).txt"))()`,
  ink: `loadstring(game:HttpGet('https://api.exploitingis.fun/loader', true))()`,
  brainrot: `loadstring(game:HttpGet("https://pastebin.com/raw/uT2f951K", true))() // key: midnight`,
  garden: `
repeat wait() until game:IsLoaded() and game.Players.LocalPlayer

local scripts = {
  [126884695634066] = "https://raw.githubusercontent.com/NoLag-id/No-Lag-HUB/refs/heads/main/Garden/Garden-V1.lua",
  [81440632616906] = "https://raw.githubusercontent.com/NoLag-id/No-Lag-HUB/refs/heads/main/DigEarth/V1.lua",
}

local url = scripts[game.PlaceId]
if url then
  loadstring(game:HttpGetAsync(url))()
  loadstring(game:HttpGetAsync("https://raw.githubusercontent.com/NoLag-id/No-Lag-HUB/refs/heads/main/untitled.lua"))()
end`
};

client.once(Events.ClientReady, () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'scripts') {
      if (interaction.channelId !== '1396029407860228167') {
        await interaction.reply({ content: '❌ You can only use this command in the 📜scripts📜 channel.', ephemeral: true });
        return;
      }

      const menu = new StringSelectMenuBuilder()
        .setCustomId('dropdown')
        .setPlaceholder('Choose a script')
        .addOptions([
          { label: 'FF2', value: 'ff2' },
          { label: 'Ink Game', value: 'ink' },
          { label: 'Steal a Brainrot', value: 'brainrot' },
          { label: 'Grow a Garden', value: 'garden' }
        ]);

      const row = new ActionRowBuilder().addComponents(menu);
      await interaction.reply({ content: 'Pick a script:', components: [row], ephemeral: true });
    }
  } else if (interaction.isStringSelectMenu()) {
    const selected = interaction.values[0];
    const script = scripts[selected];
    if (script) {
      await interaction.user.send(`Here’s your **${selected}** script:\n\`\`\`lua\n${script}\n\`\`\``);
      await interaction.reply({ content: '✅ Script sent to your DMs!', ephemeral: true });
    }
  }
});

client.login(process.env.TOKEN);

