const { ApplicationCommandOptionType, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js'); 
const errorHandler = require('../../handlers/errorHandler');

module.exports = {
	name: 'suggest', 
	description: 'Report a bug, suggest changes or make a suggestion',
	deleted: false,

	callback: async (client, interaction) => {
		const modal = new ModalBuilder()
		.setCustomId('modal')
		.setTitle('Suggestion')

		const name = new TextInputBuilder()
		.setCustomId('name')
		.setLabel('Your Name')
		.setRequired(true)
		.setPlaceholder("John Smith")
		.setStyle(TextInputStyle.Short)

		const bug = new TextInputBuilder()
		.setCustomId('bug')
		.setLabel('Bug')
		.setRequired(false)
		.setPlaceholder("The bot doesn't work! 😔")
		.setStyle(TextInputStyle.Paragraph)
		.setMaxLength(4000)

		const change = new TextInputBuilder()
		.setCustomId('change')
		.setLabel('Change')
		.setRequired(false)
		.setPlaceholder("This bot could be better! 🧐")
		.setStyle(TextInputStyle.Paragraph)
		.setMaxLength(4000)

		const suggestion = new TextInputBuilder()
		.setCustomId('suggestion')
		.setLabel('Suggestion')
		.setRequired(false)
		.setPlaceholder("The bot could make me a coffee! ☕️")
		.setStyle(TextInputStyle.Paragraph)
		.setMaxLength(4000)

		modal.addComponents(
			new ActionRowBuilder().addComponents(name),
			new ActionRowBuilder().addComponents(bug),
			new ActionRowBuilder().addComponents(change),
			new ActionRowBuilder().addComponents(suggestion),
		)
		
		try {
			await interaction.showModal(modal);
		} catch (error) {
			interaction.reply("There was an error while trying to show the modal. Please try again later.");
			errorHandler(client, error);
			setTimeout(() => interaction.delete(), 10000);
		}
	},
};
