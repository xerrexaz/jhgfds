const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const discord = require("discord.js");
let AuthDB = require(`../../database/AuthDB`);
const users = require('../../models/users');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  name: "joinall",
  description: "Ajoute tous les utilisateurs à votre serveur.",
  options: [
    {
      name: 'time',
      description: "Temps d'attente entre chaque utilisateur (en millisecondes).",
      type: "INTEGER",
      required: false
    }
  ],

  run: async (client, interaction, args) => {
    const time = interaction.options.getInteger("time");
    const data = await users.find();
    let error = 0;
    let success = 0;
    let alreadyJoined = 0;

    await interaction.reply({ content: "Processus en cours..." });
    const msg = await interaction.fetchReply();
    const inter = setInterval(async () => {
      await msg.edit(`**Utilisateurs...** \`${success}\`/\`${data.length}\``);
    }, 1000);

    for (const i of data) {
      if (i.accessToken) {
        try {
          const user = await client.users.fetch(i.userId);
          const member = await interaction.guild.members.fetch(i.userId);
          alreadyJoined++;
          console.log(`✔️ ${i.username}`);
        } catch {
          try {
            const user = await client.users.fetch(i.userId);
            await interaction.guild.members.add(user, { accessToken: i.accessToken });
            success++;
            console.log(`✔️ ${i.username}`);
          } catch {
            error++;
            console.log(`❌ ${i.username}`);
          }
        }
        time ? await sleep(time) : null;
      }
    }

    clearInterval(inter);
    await interaction.editReply({
      content: 'Terminé !',
      embeds: [
        {
          title: `${client.user.username} > Joinall`,
          description: `\n**Utilisateurs ajoutés** : ${success}\n**Utilisateurs déjà sur le serveur** : ${alreadyJoined}\n**Erreurs** : ${error}`,
        }
      ]
    });
  }
};
