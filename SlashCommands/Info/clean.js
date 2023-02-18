
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const discord = require("discord.js");
let AuthDB = require(`../../database/AuthDB`)
const { MessageEmbed } = require('discord.js');
const users = require('../../models/users');
const fetch = require('node-fetch');

module.exports = {
  name: "clean",
  description: "DB temizle",
  default_permission: true,
  timeout: 3000,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: true,

  async execute(interaction) {
    const data = await users.find();
    let count = 0;
    const permarr = data;
    const array_of_members = permarr;

    await interaction.reply({ embeds: [new MessageEmbed().setDescription(`**Invalid users are deleted...**`)] });

    for (let i = 0; i < array_of_members.length; i++) {
      try {
        const access_token = array_of_members[i].accessToken;

        const response = await fetch("https://discord.com/api/users/@me", { headers: { Authorization: `Porteur ${access_token}` } });
        const { status } = response;

        if (status === 401) {
          count++;
          await users.findOneAndDelete({ accessToken: access_token });
        }
        if (status === 429) {
          console.log("Ratelimited");
          console.log(parseInt(response.headers.get("retry-after")));
          await sleep(parseInt(response.headers.get("retry-after")));
        }
      } catch (e) {
        console.log(e);
      }
    }
    await sleep(10000);
    interaction.editReply({
      embeds: [{
        title: "Db Cleaned",
        description: `**${count} User Deleted**`,
      }],
    });
  }
};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
