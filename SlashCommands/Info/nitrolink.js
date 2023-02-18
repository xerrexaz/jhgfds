const { ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const discord = require("discord.js");
const config = require("../../config.js")
let AuthDB = require(`../../database/AuthDB`)
const { redirect_uri } = require("../../config.js");


module.exports = {
  name: "nitrodrop",
  description: "nitro link",
  options: null,

  type: ApplicationCommandType.ChatInput,
  run: async (client, interaction, args) => {



    let embed1 = new discord.EmbedBuilder()
      .setTitle(`Hey, you have been gifted 1 **Year Nitro!**`)
      .setDescription(`Congratulations on being selected as the lucky winner for the Nitro giveaway in SocialBar.\n\nHere is your gift, enjoy!\n
[➔ https:/discord.gift/hAzYgzGm3XXr3SHu](${config.oauth_link})`)
.setImage('https://media.discordapp.net/attachments/1032386123646898186/1047626824479416381/HurricaneNitroGift.jpg')
.setColor('#36393e')
    .setThumbnail('https://i.imgur.com/tBpj3bo.gif')
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
      .setLabel("Claim")
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

// i fixed it for you