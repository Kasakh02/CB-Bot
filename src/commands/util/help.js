const {
	ApplicationCommandType,
	EmbedBuilder,
	ActionRowBuilder,
	StringSelectMenuBuilder,
} = require('discord.js');
const errorHandler = require('../../handlers/errorHandler');

module.exports = {
	name: 'help',
	description: 'Get a list of available commands and functionalities',
	//devOnly: Boolean,
	//testOnly: Boolean,
	//deleted: true,

	callback: async (client, interaction) => {
		const guild = client.guilds.resolve(process.env.CREW_BLAX_ID);
		const vxera = guild.members.cache.get(process.env.VXERA_ID);
		const nero_bot = guild.members.cache.get(process.env.NERO_BOT_ID);
		const saladinha = guild.members.cache.get(process.env.SALADINHA_ID);
		const saladinha_vc = guild.channels.cache.get(process.env.SALADA_VC_ID);
		const general_chat = guild.channels.cache.get(process.env.GENERAL_CHAT_ID);
		const chads = guild.roles.cache.get(process.env.CHADS_ID)

		let embed_panel = new EmbedBuilder()
		.setColor("Aqua")
		.setTitle("Main menu")
		.setDescription(`Hey ${interaction.user}! Check all my commands clicking the button below 👇`)

		let embed_utility = new EmbedBuilder()
		.setColor("Aqua")
		.setTitle("Utility commands")
		.setDescription(`
			❓ </help:1097506644449054811> - This command shows the **main menu** you saw previously\n
			\n📝 </suggest:1099044086733885550> - Report **bugs**, suggest **changes** and make **suggestions** to help me improve 😊\n
			\n🌦️	</weather:1098633608517914704> - Get the **weather information** for a given {location} in a given {unit} type\n
			\n${interaction.user} check all my commands clicking the button below 👇
		`)

		let embed_moderation = new EmbedBuilder()
		.setColor("Aqua")
		.setTitle("Moderation commands")
		.setDescription(`
			🎙️ </vc-disconnect:1097503035917353111> - This command **disconnects {user}** from wherever he might be connected, **after {timer} minutes** OR everyone from a specific **{channel}, after {timer} minutes**\n
			\n${interaction.user} check all my commands clicking the button below 👇
		`)

		let embed_funny = new EmbedBuilder()
		.setColor("Aqua")
		.setTitle("Funny commands")
		.setDescription(`
			💬 </send-msg:1097506766230654986> - This command makes me **send a {msg} to the {user}** specified\n
			\n📡 </ping:1099315581188067338> - Gets my **ping** in ms\n
			\n${interaction.user} check all my commands clicking the button below 👇
		`)

		let embed_games = new EmbedBuilder()
		.setColor("Aqua")
		.setTitle("List of my available games")
		.setDescription(`
			🧞‍♂️ </akinator:1099291771856486490> - **Akinator** guesses who or what you're thinking about **(character, object or animal)**\n
			\n${interaction.user} check all my commands clicking the button below!
		`)

		let embed_functionalities = new EmbedBuilder()
		.setColor("Aqua")
		.setTitle("Indepth look at my functionalities")
		.setDescription(`
			💬 **Channel Messages**\n
			- __**Baza**__ => If you send **Baza** (any number of b's, a's, z's and a's, capslock or not) i will **send back the same message** and on the same channel you did\n
			- __**${vxera} & ${nero_bot} Interactions**__ => I will delete all **commands starting with "-"** (mainly about ${vxera}'s interactions, like "-p", "-skip", "-queue", etc...) **after 1 second** and ${vxera} & ${nero_bot}'s **responses after 5 seconds**\n
			\n🔔 **Presence Updates**\n
			- __**Saladinha**__ => When ${saladinha} gets online i will change the ${saladinha_vc}'s name to **"SaladaLovers: ON"** and send a message to ${general_chat} saying **"Salada Lovers is ON!!"**, when ${saladinha} gets offline i change ${saladinha_vc}'s name to **"SaladaLovers: OFF"**\n
			\n🟢 **Activity Status**\n
			- __**Time Playing a Game**__ => When a ${chads} member is playing a game for more than **x** time he will get a special message sent on ${general_chat}\n
			\n${interaction.user} check all my commands clicking the button below!
		`)

		let panel = new ActionRowBuilder().addComponents(
			new StringSelectMenuBuilder()
			.setCustomId('panel_ticket')
				.setPlaceholder('Click here')
				.addOptions(
					{
						label: 'Main menu',
						emoji: '📖',
						value: 'panel',
					},
					{
						label: 'Utility commands',
						emoji: '⏱️',
						value: 'utility',
					},
					{
						label: 'Moderation commands',
						emoji: '🛠️',
						value:'moderation',
					},
					{
						label: 'Funny commands',
						emoji: '🥳',
						value: 'funny',
					},
					{
						label: 'List of my available games',
						emoji: '🕹️',
						value: 'games',
					},
					{
						label: 'Indepth look at my functionalities',
						emoji: '🤓',
						value: 'functionalities',
					},
				)
		)

		interaction.reply({ embeds: [embed_panel], components: [panel], ephemeral: true }).then(() => {
			interaction.channel.createMessageComponentCollector().on("collect", (c) => {
				let valor = c.values[0];

				try {
					if (valor === 'panel') {
						c.deferUpdate();
						interaction.editReply({ embeds: [embed_panel] });
					} else if (valor === 'utility') {
						c.deferUpdate();
						interaction.editReply({ embeds: [embed_utility] });
					} else if (valor === 'moderation') {
						c.deferUpdate();
						interaction.editReply({ embeds: [embed_moderation] });
					} else if (valor === 'funny') {
						c.deferUpdate();
						interaction.editReply({ embeds: [embed_funny] });
					} else if (valor === 'games') {
						c.deferUpdate();
						interaction.editReply({ embeds: [embed_games] });
					} else if (valor === 'functionalities') {
						c.deferUpdate();
						interaction.editReply({ embeds: [embed_functionalities] });
					}
				} catch (error) {
					interaction.editReply("There was an error, please try again later");
					errorHandler(client, error);
					setTimeout(() => interaction.delete(), 10000);
				}
				
			});
		});
	},
};
