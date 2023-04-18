const {
	PermissionFlagsBits,
} = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Get a list of available commands',
		//devOnly: Boolean,
		//testOnly: Boolean,
		//deleted: true,
		botPermissions: [PermissionFlagsBits.SendMessages],

		callback: (client, interaction) => {
			interaction.reply('Under development...');
			//interaction.reply('Check your private messages for a list of my available commands!');
			setTimeout(() => interaction.deleteReply(), 10000);
		},
};
