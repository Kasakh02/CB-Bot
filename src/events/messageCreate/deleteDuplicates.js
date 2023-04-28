let i = 0;
module.exports = (client, message) => {
	if (message.author.bot && message.content === 'Salada Lovers is ON!!') {
		i++;
		if (i === 2) {
			message.delete();
			i = 0;
		}
	}
}