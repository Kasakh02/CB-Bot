const {
	ApplicationCommandOptionType,
	PermissionFlagsBits,
} = require('discord.js');

module.exports = {
    name: 'send-msg',
    description: 'Sends {message} to {user}',
		//devOnly: Boolean,
		//testOnly: true,
		//deleted: true,
		options: [
			{
				name: 'user',
				description: 'User to send the message to',
				type: ApplicationCommandOptionType.User,
				required: true,
			},
			{
				name: 'msg',
				description: 'Message to be sent to {user}',
				type: ApplicationCommandOptionType.String,
				required: true,
			},
		],
		permissionsRequired: [PermissionFlagsBits.SendMessages],
		botPermissions: [PermissionFlagsBits.SendMessages],

		callback: (client, interaction) => {
			interaction.reply('OK!');
			interaction.deleteReply();
			interaction.channel.send(`${interaction.options.get('user').user}! Message from ${interaction.user.username}:\n ${interaction.options.get('msg').value}`);	
		},
};
