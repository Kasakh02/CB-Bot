const cooldown = 5 * 60 * 1000;
let lastMessageTime = 0;

module.exports = (client, message) => {
	if (message.content.startsWith("-"))
		setTimeout(() => message.delete(), 1000);
	const vxera = process.env.VXERA_ID;
	if (message.author.id === process.env.VXERA_ID)
		setTimeout(() => message.delete(), 5000);

	const regex = /^([bB])+([aA])+([zZ])+([aA])+$/;
	if (regex.test(message.content)) {
		const now = Date.now();
		if (!message.author.bot && now - lastMessageTime >= cooldown) {
			lastMessageTime = now;
			message.channel.send(`${message.content}`);
		}
	}
	return;
};
