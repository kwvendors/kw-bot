// Your keep-alive Express stuff stays the same...

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
  // Handle slash commands
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

    else if (interaction.commandName === 'ask') {
      const question = interaction.options.getString('question').toLowerCase();

      let answer;

      if (question.includes('start') || question.includes('beginner')) {
        answer = `To start reselling, begin by researching popular items in your niche. Use platforms like eBay, Poshmark, or Facebook Marketplace. Start small, learn how to list effectively, and focus on customer service.`;
      } 
      else if (question.includes('shipping') || question.includes('ship')) {
        answer = `Shipping is key! Always use tracked shipping to protect yourself and your buyers. Pack items securely to avoid damage, and consider offering free shipping as a selling point.`;
      } 
      else if (question.includes('profit') || question.includes('make money') || question.includes('earn')) {
        answer = `Profit comes down to buying low and selling high. Factor in fees, shipping, taxes, and your time. Use pricing research tools to find good deals and avoid overpaying.`;
      } 
      else if (question.includes('best items') || question.includes('popular items') || question.includes('what to sell')) {
        answer = `Popular reselling items include branded sneakers, electronics, collectibles, vintage clothing, and limited-edition items. Keep an eye on trends and what's in demand.`;
      } 
      else if (question.includes('platforms') || question.includes('where to sell')) {
        answer = `Great platforms to sell on include eBay, Poshmark, Depop, Facebook Marketplace, and Mercari. Choose based on your item type and audience.`;
      }
      else if (question.includes('fees') || question.includes('costs')) {
        answer = `Every platform charges fees — eBay, for example, takes about 10-12% of the sale. Always factor these fees into your pricing so you don't lose money.`;
      }
      else if (question.includes('scams') || question.includes('fraud')) {
        answer = `Beware of scams! Only accept payments through secure methods offered by the platform, and never ship before payment clears. Communicate clearly with buyers.`;
      }
      else if (question.includes('tax') || question.includes('taxes')) {
        answer = `Depending on your country, reselling income might be taxable. Keep good records of your sales and expenses, and check local tax laws or consult a professional.`;
      }
      else if (question.includes('returns') || question.includes('refund')) {
        answer = `Have a clear returns policy. Decide if you accept returns or refunds and communicate it clearly to avoid disputes. Good customer service builds trust.`;
      }
      else if (question.includes('inventory') || question.includes('stock')) {
        answer = `Manage your inventory carefully. Keep track of what you have, what’s sold, and reorder popular items to avoid running out.`;
      }
      else {
        answer = "Sorry, I don't have an answer for that yet. Try asking about starting, shipping, profit, best items, platforms, fees, scams, taxes, or returns!";
      }

      await interaction.reply(`❓ You asked: **${question}**\n💡 Here's my reselling advice:\n${answer}`);
    }
  } 

  // Handle dropdown select menu for scripts
  else if (interaction.isStringSelectMenu()) {
    const selected = interaction.values[0];
    const script = scripts[selected];
    if (script) {
      await interaction.user.send(`Here’s your **${selected}** script:\n\`\`\`lua\n${script}\n\`\`\``);
      await interaction.reply({ content: '✅ Script sent to your DMs!', ephemeral: true });
    }
  }
});

client.login(process.env.TOKEN);
