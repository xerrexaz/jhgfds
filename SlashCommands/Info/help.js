const discord = require("discord.js");

module.exports = {
  name: "help",
  description: "shows bot commands.",
  default_permission: false,
  timeout: 30000,
  
  run: async (client, interaction, args) => {
    const embed = new discord.EmbedBuilder()
    .setTitle(` `)
    .setDescription(`        `)
    .addFields(
      { name: `\`/users\``, value: 'Number of users in the database', inline: true  },
      { name: `\`/joinall\``, value: 'Brings all members back to the server', inline: true  },
      { name: `\`/join [amount]\``, value: 'Returns a specific amount to the server', inline: true },
      { name: `\`/refresh\``, value: 'Refresh data base (owner)', inline: true },
      { name: `\`/clean\``, value: 'Clean data base (owner)', inline: true },
      { name: `\`/wl [add/remove/list]\``, value: 'Add, remove, view whitelist list', inline: true },
      { name: `\`/leave\``, value: 'Leave a server', inline: true },
      { name: `\`/links\``, value: 'Bot invite / auth link', inline: true },
      { name: `\`/giveaway\``, value: 'Verification AUTH Giveaway', inline: true },
      { name: `\`/nsfw\``, value: 'Verification AUTH NSFW', inline: true },
      { name: `\`/verification\``, value: 'Fake verification for AUTH', inline: true },
      { name: `\`/help\``, value: 'All commands', inline: true },
      )
      .setColor('#36393e')
      .setFooter({ text: `© 2023 - OauthIndustries`})
    await interaction.reply({embeds: [embed]})
  }
}