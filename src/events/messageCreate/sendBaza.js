const cooldown = 5 * 60 * 1000;
let lastMessageTime = 0;

module.exports = (client, message) => {
const regex = /^([bB])+([aA])+([zZ])+([aA])+$/;
	if (regex.test(message.content)) {
		const now = Date.now();
		if (!message.author.bot && now - lastMessageTime >= cooldown) {
			lastMessageTime = now;
			message.channel.send(`${message.content}`);
		}
	}
}
