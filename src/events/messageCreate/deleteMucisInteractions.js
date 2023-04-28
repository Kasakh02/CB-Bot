module.exports = (client, message) => {
	if (message.content.startsWith("-"))
		setTimeout(() => message.delete(), 1000);
	if (message.author.id === process.env.VXERA_ID || message.author.id === process.env.NERO_BOT_ID)
		setTimeout(() => message.delete(), 5000);
	return;
};
