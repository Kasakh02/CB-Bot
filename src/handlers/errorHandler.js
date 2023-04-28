module.exports = (client, error) => {
	client.on("ready", () => {
		const me = client.users.cache.get(process.env.MY_ID);
		me.send(error);
	});
}