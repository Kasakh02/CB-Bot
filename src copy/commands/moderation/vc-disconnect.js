const {
	ApplicationCommandOptionType,
	GuildVoiceStates,
	PermissionFlagsBits,
} = require('discord.js');

module.exports = {
    name: 'vc-disconnect',
    description: 'Disconnects {user} or everyone from a specific {channel} after {timer} minutes',
		//devOnly: Boolean,
		//testOnly: true,
		//deleted: true,
		options: [
			{
				name: 'timer',
				description: '{timer} minutes till disconnection',
				type: ApplicationCommandOptionType.Integer,
				minValue: 1,
				maxValue: 120,
				required: true,
			},
			{
				name: 'channel',
				description: '{channel} to disconnect everyone from',
				type: ApplicationCommandOptionType.Channel,
				//channelTypes: ['GUILD_VOICE'],
				required: false,
			},
			{
				name: 'user',
				description: '{user} to be disconnected',
				type: ApplicationCommandOptionType.User,
				required: false,
			},
		],
		permissionsRequired: [PermissionFlagsBits.SendMessages],
		botPermissions: [PermissionFlagsBits.SendMessages],
		//deleted: true,

		callback: (client, interaction) => {
			if ((interaction.options.get('channel') && interaction.options.get('user')) || (!interaction.options.get('channel') && !interaction.options.get('user'))) 
				return interaction.reply({
					content: 'Select a user or a channel!',
					ephemeral: true,
				});
			
			if (interaction.options.get('user')) {
				interaction.reply(`Disconnecting {${interaction.options.get('user').user.username}} in {${interaction.options.get('timer').value} minutes}...`);
				
				const connection = interaction.options.get('user').member.voice;
				console.log(connection);
				setTimeout(() => connection.disconnect(), interaction.options.get('timer').value * 6 * 10000);
			
			} else {
				if (interaction.options.get('channel').channel.type != 2) {
					return interaction.reply({
						content: 'You must specify a voice channel!',
						ephemeral: true,
					});
				}
				interaction.reply(`Disconnecting everyone from {${interaction.options.get('channel').channel.name}} in {${interaction.options.get('timer').value} minutes}...`);
				
				const members = interaction.options.get('channel').channel.guild.members.cache;
				setTimeout(() => {
					for (const [memberID, member] of members) {
						if (member.voice.channel === interaction.options.get('channel').channel) {
							member.voice.disconnect();
						}
					}
				}, interaction.options.get('timer').value * 6 * 10000);
			}

			setTimeout(() => interaction.deleteReply(), interaction.options.get('timer').value * 6 * 10000);
		},
};
