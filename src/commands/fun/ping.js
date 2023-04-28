module.exports = {
	name: 'ping',
	description: 'Gets my ping',
	callback: (client, interaction) => {
		interaction.reply(`📡 My ping is at **${client.ws.ping}ms**`);
	},
};
