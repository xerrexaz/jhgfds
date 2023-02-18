
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const discord = require("discord.js");
let AuthDB = require(`../../database/AuthDB`)
module.exports = {
  name: "users",
  description: "Donne le nombre total d'utilisateurs dans la db.",
  options: null,

  type: ApplicationCommandType.ChatInput,
  run: async (client, interaction, args) => {



    let embed1 = new discord.EmbedBuilder()
      .setTitle(`Utilisateurs Totaux`)
      .setColor('#36393e')
      .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`Vous avez **${await client.tokenCount()}** utilisateurs dans votres db.`)


    await interaction.reply({
        embeds: [embed1]
      })
   
  },
};