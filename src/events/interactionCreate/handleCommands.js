const getLocalCommands = require('../../utils/getLocalCommands');
const suggestion_db = require('../../formularies/suggest');
const errorHandler = require('../../handlers/errorHandler');

module.exports = async (client, interaction) => {

	if (interaction.isModalSubmit()) {
		const name_answer = interaction.fields.getTextInputValue('name');
		const bug_answer = interaction.fields.getTextInputValue('bug');
		const change_answer = interaction.fields.getTextInputValue('change');
		const suggestion_answer = interaction.fields.getTextInputValue('suggestion');

		if (bug_answer) {
			const newSuggestion = new suggestion_db({
				user: interaction.user.username,
				name: name_answer,
				suggestion: bug_answer,
				type: 'bug',
				fixed: false,
			});
			await newSuggestion.save();
		}
		if (change_answer) {
			const newSuggestion = new suggestion_db({
				user: interaction.user.username, 
				name: name_answer,
				suggestion: change_answer,
				type: 'change',
				fixed: false,
			});
			await newSuggestion.save();
		}
		if (suggestion_answer) {
			const newSuggestion = new suggestion_db({
				user: interaction.user.username, 
				name: name_answer,
				suggestion: suggestion_answer,
				type:'suggestion',
				fixed: false,
			});
			await newSuggestion.save();
		}
		if (!bug_answer && !change_answer && !suggestion_answer) {
			interaction.reply({
				content: 'You need to specify at least a bug, change or suggestion!',
				ephemeral: true,
			});
			setTimeout (() => {
				interaction.deleteReply();
			}, 5000)
		}
		interaction.reply({
			content: 'Your suggestion has been sent! Thank you!',
			ephemeral: false,
		});
		setTimeout (() => {
			interaction.deleteReply();
		}, 10000)
	}

	if (!interaction.isChatInputCommand()) return;

	const localCommands = getLocalCommands();

	try {
		const commandObject = localCommands.find(
			(cmd) => cmd.name === interaction.commandName
		);

		if (!commandObject) return;

		if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          interaction.reply({
            content: 'Not enough permissions.',
            ephemeral: true,
          });
          return;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;

        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: "I don't have enough permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }

		await commandObject.callback(client, interaction);
	} catch (error) {
		errorHandler(client, error);
	}
};
