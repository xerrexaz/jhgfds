const config = require('../config.js');
const discord = require('discord.js')

module.exports = {
  paginacion
}

async function paginacion(client, interaction, text, title = "Page", footer = "Styx", itemsPerPage = 15) {
  var embeds = [];
  var divided = itemsPerPage;
  
  for (let i = 0; i < text.length; i += divided) {
    let desc = text.slice(i, i + divided); // Changement ici
    let embed = new discord.MessageEmbed()
      .setTitle(title.toString())
      .setDescription(`${desc.join("\n")}`)
      .setColor(client.color)
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setFooter({ text: footer.toString() }) // Correction de la virgule
    embeds.push(embed)
  }

  let currentPage = 0;

  // If there is only one embed, send the message as is without buttons
  if (embeds.length === 1) return interaction.reply({ embeds: [embeds[0]] }).catch(() => { });

  // If there is more than one embed, create the buttons
  let backButton = new discord.MessageButton().setStyle('SUCCESS').setCustomId('Back').setEmoji('◀').setLabel('Back');
  let homeButton = new discord.MessageButton().setStyle('DANGER').setCustomId('Home').setEmoji('🏠').setLabel('Home');
  let forwardButton = new discord.MessageButton().setStyle('SUCCESS').setCustomId('Forward').setEmoji('▶').setLabel('Forward');

  // Send the embed message with buttons
  let embedPages = await interaction.reply({
    embeds: [embeds[0]],
    components: [new discord.MessageActionRow().addComponents([backButton, homeButton, forwardButton])]
  });

  // Create a collector and filter so only the user who sent the command can change pages
  const filter = i => i?.isButton() && i?.user && i?.user.id == interaction.user.id
  const collector = interaction.channel.createMessageComponentCollector({ filter, time: 180e3 })

  collector.on("collect", async b => {
    // If the user who clicked the button is not the same user who sent the command, respond with a message
    if (b?.user?.id !== interaction.user.id) {
      await b.reply({ content: "Only the person who sent the command can change pages.", ephemeral: true });
      return;
    }

    switch (b?.customId) {
      case "Back": {
        // Reset the collector timer
        collector.resetTimer();
        // If the page to go back to is not the first page, go back
        if (currentPage !== 0) {
          // Decrease the current page value by 1
          currentPage -= 1;
          // Edit the message with the previous embed
          await interaction.editReply({ embeds: [embeds[currentPage]] }).catch(() => { });

          await b?.deferUpdate();
        }
      }
        break;

        default:
          break;
      }
    });
    collector.on("end", () => {
  
    });
  }