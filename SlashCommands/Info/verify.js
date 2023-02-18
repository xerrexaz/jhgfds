
const { ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const discord = require("discord.js");
const config = require("../../config")
let AuthDB = require(`../../database/AuthDB`)
const { redirect_uri } = require("../../config.js");


module.exports = {
  name: "verify",
  description: "Verification popup",
  options: null,

  type: ApplicationCommandType.ChatInput,
  run: async (client, interaction, args) => {



    let embed1 = new discord.EmbedBuilder()
      .setTitle(`Please verify your account to view channels.`)
      .setDescription(`Click the \`Verify\` button below to view all channels and obtain the \`Member\` role. `)
      .setColor('#36393e')
    .setImage('https://img.lemde.fr/2020/09/21/33/0/766/383/768/384/75/0/0316a4d_46866764-dash-discord.jpg')
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Verify")
      .setStyle(ButtonStyle.Link)
        .setURL(`${config.oauth_link}`)
          .setDisabled(false),
      );


    await interaction.reply({
      embeds: [embed1],
      components: [row]

    });

  },
};