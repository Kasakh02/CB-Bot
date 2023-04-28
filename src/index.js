require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');
const errorHandler = require('./handlers/errorHandler');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.GuildPresences,
		IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.MessageContent,
  ],
});

(async () => {
  try {

    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to DB!');

    eventHandler(client);

		client.on('presenceUpdate', (oldPresence, newPresence) => {
				let member = newPresence.member;
				if (member.id === process.env.SALADINHA_ID) {
						const now = Date.now();
						let vc = member.guild.channels.cache.get(process.env.SALADA_VC_ID);
						if (newPresence.status === 'online' && vc) {
								member.guild.channels.cache.get(process.env.GENERAL_CHAT_ID).send('Salada Lovers is ON!!');
								vc.setName('SaladaLovers: ON');
						} else if (newPresence.status === 'offline' && vc) {
								vc.setName('SaladaLovers: OFF');
						}
				}
		});

		setInterval(() => {
			client.on("ready", () => {
				const guild = client.guilds.resolve(process.env.CREW_BLAX_ID);
				const generalChat = guild.channels.cache.get(process.env.GENERAL_CHAT_ID);
				const consoleChat = guild.channels.cache.get(process.env.CONSOLE_ID);
				const vc = guild.channels.cache.get(process.env.SALADA_VC_ID);
				const members = guild.roles.cache.get(process.env.CHADS_ID).members;

				if (guild.members.cache.get(process.env.SALADINHA_ID).presence.status === 'online') vc.setName('SaladaLovers: ON');
				else vc.setName('SaladaLovers: OFF');

				for (const member of members) {
					if (member) {
						const presence = guild.presences.cache.get(member[0]);
						if (presence) {
							const activities = presence.activities;
							for (const activity of activities) {
								if (activity.timestamps) {
									const startTime = activity.timestamps.start;
									const timePlayed = Date.now() - startTime;
									let totalSeconds = Math.floor(timePlayed / 1000);
									let minutes = Math.floor(totalSeconds / 60);
									let hours = Math.floor(minutes / 60);
									let remainingMinutes = minutes % 60;

									//console.log(`${guild.members.cache.get(`${member[0]}`).user.username} ${activity.name} ${timePlayed} ${hours}h${remainingMinutes}m`);

									if (activity.name === 'Minecraft') {
										let name = `${guild.members.cache.get(`${member[0]}`).user.username}`;
										if (name === 'GaivotaPlays') name = 'gullsi';
										if (name === 'Andrew Tate') name = 'xelula';
										if (name === 'Ieo') name = 'Devaxtion';
										if (name === 'Papi Incredibilis') name = 'xXTWNGXx';
										if (name === 'Tiago') name = '';

										if (timePlayed > 10800000 && timePlayed < 23400000 && minutes % 60 === 0) {
											generalChat.send(`${member[1]} you're playing ${activity.name} for ${hours}h${remainingMinutes}m. How embarrassing! You should get a life...!`);
											consoleChat.send(`say ${name} you're playing for ${hours}h${remainingMinutes}m. How embarrassing! You should get a life...!`)
										}
										if (timePlayed > 23400000) {
											generalChat.send(`${member[1]} you're playing ${activity.name} for ${hours}h${remainingMinutes}m. Like, I don't even know what to say... Seriously??? ${hours}h${remainingMinutes}m playing fucking ${activity.name}. Son, you will soon degenerate, I'm warning you! If this continues like that I will have to shut your stupid game down...`);
											consoleChat.send(`say ${name} you're playing for ${hours}h${remainingMinutes}m. Like, I don't even know what to say... Seriously??? Son, you will soon degenerate, I'm warning you! If this continues like that I will have to shut your stupid game down...`);
										}
									}
									if (activity.name === 'League of Legends') {
										if (timePlayed > 2400000 && hours === 0 && minutes === 40) {
											generalChat.send(`${member[1]} you're playing ${activity.name} for ${hours}h${remainingMinutes}m. That LoL game is taking forever...! Stop feeding!!`);
										}
									}
									if (activity.name === 'VALORANT') {
										if (timePlayed > 3000000 && hours === 0 && minutes === 50) {
											generalChat.send(`${member[1]} you're playing ${activity.name} for ${hours}h${remainingMinutes}m. That Valorant game is taking forever...! You're throwing my friend...`);
										}
									}
								}
							}
						}
					}
				}
			})
		}, 1000);

		client.login(process.env.TOKEN);
  } catch (error) {
    errorHandler(client, error);
  }
})();
