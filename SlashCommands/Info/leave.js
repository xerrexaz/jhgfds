const discord = require('discord.js')
// const users = require('../../models/users');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const config = require('../../config.js')
module.exports = {
  name: "leave",
  description: "Makes bot leave",
  default_permission: true,
  timeout: 30000,
  


run: async (client, interaction, args) => {
  const embed = new discord.EmbedBuilder()
  .setTitle(`The bot left the server.`)
  .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
  .setDescription(` Your Invite Link:
  \`\`\`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot\`\`\` `)
  .setThumbnail(client.user.displayAvatarURL())
  .setColor('#36393e')
    .setFooter({ text: `© 2023 - OauthIndustries`})
  await interaction.reply({embeds: [embed]})
  interaction.guild.leave()

  }
  }