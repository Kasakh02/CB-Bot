const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const weather = require('weather-js');

module.exports = {
	name: 'weather',
	description: 'Get the weather of a given area',
	options: [
		{
			name: 'location',
      description: 'The location you want to get the weather of',
      type: ApplicationCommandOptionType.String,
      required: true
		},
		{
			name: 'unit',
      description: 'The unit you want to get the weather of',
			choices: [
				{
					name: 'fahrenheit',
					value: 'F',
				},
				{
					name: 'Celsius',
					value: 'C',
				},
			],
      type: ApplicationCommandOptionType.String,
      required: true
		}
	],

	callback: async (client, interaction) => {
		
		const location = interaction.options.getString('location');
		const unit = interaction.options.getString('unit');

		await interaction.reply({ content: ':low_battery: Gathering your weather data...' });
		await weather.find({ search: `${location}`, degreeType: `${unit}` }, async function(err, result) {
			
			setTimeout(() => {
				if (err) {
					console.log(err);
					interaction.editReply({ content: ':battery: Gathering your weather data...' })
					setTimeout(() => {
						interaction.editReply({ content: "Invalid location! It can sometimes timeout... Try again" });
					}, 1000);
					setTimeout(() => {
						interaction.deleteReply()
					}, 10000);
				} else {
					if (result.length === 0) {
						interaction.editReply({ content: ':battery: Gathering your weather data...' })
						setTimeout(() => {
							interaction.editReply({ content: `Could not find the weather for ${location}` });
						}, 1000);
					} else {
						const temp = result[0].current.temperature;
						const type = result[0].current.skytext;
						const name = result[0].location.name;
						const feel = result[0].current.feelslike;
						const icon = result[0].current.imageUrl;
						const wind = result[0].current.winddisplay;
						const day = result[0].current.day;
						const alert = result[0].location.alert | 'None';

						const embed = new EmbedBuilder()
						.setColor('Blue')
						.setTitle(`Current weather of ${name}`)
						.addFields({name: 'Temperature', value: `${temp}`})
						.addFields({name: 'Feels Like', value: `${feel}`})
						.addFields({name: 'Weather', value: `${type}`})
						.addFields({name: 'Current Alerts', value: `${alert}`})
						.addFields({name: 'Week Day', value: `${day}`})
						.addFields({name: 'Wind Speed & Direction', value: `${wind}`})
						.setThumbnail(icon)

						interaction.editReply({ content: ':battery: Gathering your weather data...' });
						setTimeout(() => {
							interaction.editReply({ content: '', embeds: [embed] });
						}, 1000);
					}
				}
			}, 2000)
		})
	},
};