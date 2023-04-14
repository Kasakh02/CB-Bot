require('dotenv').config();

const { Client, IntentsBitField, ActivityType } = require('discord.js');
const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
});

client.once('ready', (c) => {
	console.log(`✅ ${c.user.tag} is online!`);
	client.user.setActivity({
		name: 'Kasakh tests',
		type: ActivityType.Playing
	})
});

client.on('messageCreate', (message) => {	
	if (message.content.startsWith("-"))
		setTimeout(() => message.delete(), 1000);
	if (message.author.id === process.env.VXERA_ID)
		setTimeout(() => message.delete(), 5000);
	return;
});

client.login(process.env.TOKEN);
