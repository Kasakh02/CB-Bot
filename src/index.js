require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
		IntentsBitField.Flags.GuildPresences,
		IntentsBitField.Flags.GuildVoiceStates,
	],
});

eventHandler(client);

client.on('presenceUpdate', (oldPresence, newPresence) => {
	let member = newPresence.member;
	if (member.id === process.env.SALADINHA_ID) {
		let vc = member.guild.channels.cache.get(process.env.SALADA_VC);
		if (newPresence.status === 'online' && vc) {
			member.guild.channels.cache.get(process.env.GENERAL_CHAT_ID).send('Salada Lovers is ON!!');
			setTimeout(() => {
				vc.setName('SaladaLovers: ON');
			}, 5);
		}
		else if (newPresence.status === 'offline' && vc) {
			vc.setName('SaladaLovers: OFF');
		}
	}
});

client.login(process.env.TOKEN);
