const discord = require("discord.js");
const userwl = require('../../models/whitelist');
const { paginacion } = require(`../../handlers/functions`);

module.exports = {
  name: 'wl',
  description: 'Whitelist',
  default_permission: true,
  options: [
    {
      name: 'add',
      description: 'Ajouter un utilisateur à la whitelist.',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'user',
          description: 'L\'utilisateur à ajouter.',
          type: 'USER',
          required: true,
        },
      ],
    },
    {
      name: 'remove',
      description: 'Retirer un utilisateur de la whitelist.',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'user',
          description: 'L\'utilisateur à retirer.',
          type: 'USER',
          required: true,
        },
      ],
    },
    {
      name: 'list',
      description: 'Afficher la liste des utilisateurs de la whitelist.',
      type: 'SUB_COMMAND',
    },
  ],
  timeout: 3000,
  category: 'whitelist',
  userPerms: ['SEND_MESSAGES'],
  ownerOnly: true,

  async execute(interaction) {
    const subCommand = interaction.options.getSubcommand();

    if (subCommand === 'add') {
      const user = interaction.options.get('user').user;

      const users = await userwl.findOne({ userId: user.id });
      if (!users) {
        await userwl.create({ userId: user.id });
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setDescription(`**${user.tag}** a été ajouté à la whitelist.`),
          ],
        });
      } else {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setDescription('Cet utilisateur est déjà dans la whitelist !')
              .setColor('RED'),
          ],
        });
      }
    } else if (subCommand === 'remove') {
      const user = interaction.options.get('user').user;

      const users = await userwl.findOne({ userId: user.id });
      if (!users) {
        return interaction.reply({
          embeds: [
            new MessageEmbed()
              .setTitle('⛔ ǀ ERREUR')
              .setDescription(`Je n'ai pas pu ajouter cet utilisateur à la whitelist.`),
          ],
        });
      }
      await userwl.deleteOne({ userId: user.id });
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setDescription(`${user.tag} a été retiré de la whitelist.`),
        ],
      });
    } else if (subCommand === 'list') {
      const total = await userwl

      let content = "";
      const blrank = total.filter((data) => data.userId).sort((a, b) => b.data - a.data);
      
      for(let i in blrank) {
        if(blrank[i].data === null) blrank[i].data = 0;
        content +=  `\`${parseInt(i) + 1}\` ${blrank[i].userId} (${blrank[i].userId})\n`;
      }

      interaction.reply({embeds: [{
        title: "Whitelist Users",
        description: `${content}`,
      }]});
    }
  }
};
