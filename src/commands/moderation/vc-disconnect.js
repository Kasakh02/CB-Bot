const {
  ApplicationCommandOptionType,
  GuildVoiceStates,
  PermissionFlagsBits,
} = require('discord.js');
const errorHandler = require('../../handlers/errorHandler');

module.exports = {
  name: 'vc-disconnect',
  description:
    'Disconnects {user} or everyone from a specific {channel} after {timer} minutes',
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
      channelTypes: [2],
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

  callback: async (client, interaction) => {
    if (
      (interaction.options.get('channel') && interaction.options.get('user')) ||
      (!interaction.options.get('channel') && !interaction.options.get('user'))
    ) {
      return interaction.reply({
        content: 'Select a user or a channel!',
        ephemeral: true,
      });
    }

    if (interaction.options.get('user')) {
      const user = interaction.options.get('user').user.username;
      const timer = interaction.options.get('timer').value;
      interaction.reply(`Disconnecting {${user}} in {${timer} minutes}...`);
      let timeLeft = timer * 60;
      const interval = setInterval(() => {
        if (timeLeft > 3600) {
					timeLeft -= 3600;
					interaction.editReply(
            `Disconnecting everyone from {${channel.name}} in {${timeLeft / 3600} hours}...`
          );
				} else if (timeLeft > 60) {
          timeLeft -= 60;
          interaction.editReply(
            `Disconnecting {${user}} in {${timeLeft / 60} minutes}...`
          );
        } else if (timeLeft > 0) {
          timeLeft -= 1;
          interaction.editReply(`Disconnecting {${user}} in {${timeLeft} seconds}...`);
        } else {
					try {
						clearInterval(interval);
         		const connection = interaction.options.get('user').member.voice;
         		connection.disconnect();
         		interaction.deleteReply();
					} catch (error) {
						interaction.editReply("There was an error. Please try again.");
						errorHandler(client, error);
						setTimeout(() => interaction.deleteReply(), 10000);
					}
          
        }
      }, 1000);

    } else {
      const channel = interaction.options.get('channel').channel;
      if (channel.type !== 2) {
        return interaction.reply({
          content: 'You must specify a voice channel!',
          ephemeral: true,
        });
      }

      const timer = interaction.options.get('timer').value;
      interaction.reply(`Disconnecting everyone from {${channel.name}} in {${timer} minutes}...`);
			let timeLeft = timer * 60;
			const interval = setInterval(async () => {
				if (timeLeft > 3600) {
					timeLeft -= 3600;
					interaction.editReply(
            `Disconnecting everyone from {${channel.name}} in {${timeLeft / 3600} hours}...`
          );
				} else if (timeLeft > 60) {
					timeLeft -= 60;
					interaction.editReply(
						`Disconnecting everyone from {${channel.name}} in {${timeLeft / 60} minutes}...`
					);
				} else if (timeLeft > 0) {
					timeLeft -= 1;
					interaction.editReply(
						`Disconnecting everyone from {${channel.name}} in {${timeLeft} seconds}...`
					);
				} else {
					try {
						clearInterval(interval);
						const members = interaction.options.get('channel').channel.guild.members.cache;
						for (const [memberID, member] of members) {
							if (member.voice.channel === interaction.options.get('channel').channel) {
								setTimeout(() => member.voice.disconnect(), 500);
							}
						}
						interaction.deleteReply();
					} catch (error) {
						interaction.editReply("There was an error. Please try again.");
						errorHandler(client, error);
						setTimeout(() => interaction.deleteReply(), 10000);
					}
					
				}
			}, 1000);
		}
	}
}			
