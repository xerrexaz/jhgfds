
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const discord = require("discord.js");
let AuthDB = require(`../../database/AuthDB`);
const { Prefix, Owners, client_id, redirect_uri, Token, oauth_link, Auth_log_channel, Error_log_channel, client_secret } = require("../../config.js");
module.exports = {
  name: "link",
  description: "Give the links of the bot",
  //type: ApplicationCommandType.ChatInput,
  

  

run: async (client, interaction, args) => {
  const embed = new discord.EmbedBuilder()
  .setTitle(` `)
  .setDescription(`**OAuth2 Link:** ${oauth_link}\n\`\`\`${oauth_link}\`\`\`\n**Bot Invite:** https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot\n \`\`\`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot\`\`\` `)
  .setColor('#36393e')
    .setFooter({ text: `© 2023 - OauthIndustries`})
  await interaction.reply({embeds: [embed]})
}
}