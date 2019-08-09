const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	const channel = client.channels.get(msg.member.voiceChannelID);
	if (!channel) return console.error("The channel does not exist!");
	if (msg.message == 'smdhoes') {
		channel.join().then(connection => {
			// Yay, it worked!
			let dispatcher = connection.playFile('./audio.mp3')
			dispatcher.on('end', () => {
				connection.disconnect()
			})
		}).catch(e => {
			// Oh no, it errored! Let's log it to console :)
			console.error(e);
		});
	}
});

client.login('NjA5MTk3MjMzODkxNDQyNzE5.XU23dQ.gC56BXiuygCY1Ha9mhsBh-hxD0s');