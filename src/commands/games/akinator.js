const discord = require('discord.js');
const akinator = require("discord.js-akinator");
const errorHandler = require('../../handlers/errorHandler');

module.exports = {
	name: 'akinator',
  description: 'Akinator guesses who you thinking about',
	options: [
		{
			name: 'game-type',
			description: 'Choose the game type',
			required: true,
			type: 3,
			choices: [
				{
					name: 'Character',
          value: 'character'
				},
				{
					name: 'Objects',
          value: 'object'
				},
				{
					name: 'Animals',
          value: 'animal'
				},
			],
		},
	],
  callback: async (client, interaction, args) => {
		const language = "en";
		const childMode = true;
		const gameType = `${interaction.options.getString('game-type')}`;
		const useButtons = true;
		const embedColor = "Blue";

		try {
			await akinator(interaction, {
				language: language,
				childMode: childMode,
				gameType: gameType,
				useButtons: useButtons,
				embedColor: embedColor,
			});
		} catch (error) {
			interaction.deleteReply("There was an error. Please try again later.");
			errorHandler(client, error);
			setTimeout(() => interaction.deleteReply(), 10000);
		}
		

		setTimeout(() => {
			interaction.deleteReply();
		}, 10000);
	},
};
