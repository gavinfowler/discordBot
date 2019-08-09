const Discord = require('discord.js');
const client = new Discord.Client();

client.login('NjA5MTk3MjMzODkxNDQyNzE5.XU23dQ.gC56BXiuygCY1Ha9mhsBh-hxD0s');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

function smdhoes(msg, channel) {
	if (!channel) return console.error("The channel does not exist!");
	if (msg.content == '++smdhoes') {
		channel.join().then(connection => {
			let dispatcher = connection.playFile('./audio.mp3')
			// this is not working well on heroku.
			// think about using commands to connect and disconnect
			dispatcher.on('speaking', (value) => {
				if (value == false)
					connection.disconnect()
			})
		}).catch(e => {
			console.error(e);
		});
	}
}

client.on('message', msg => {
	if (msg.author.bot == false) {
		var message = msg.content
		var beginning = message.substring(0, 2)
		if (beginning != "++") {
			return;
		}
		var command = message.substring(2, message.indexOf(' '))
		var args = message.substring(message.indexOf(' '))
		if (command == beginning) {
			command = message.substring(2, message.length)
			args = null
		}
		console.log('-----New-----')
		console.log(`message: ${message}`)
		console.log(`beginning: ${beginning}`)
		console.log(`Command: ${command}`)
		console.log(`args: ${args}`)
		// console.log(msg.channel)
		// msg.channel.send('hello!')
		// 	.then(message => console.log(`Sent message: ${message.content}`))
		// 	.catch(console.error);
		switch (command) {
			case 'repeat':
				msg.channel.send(args)
					.catch(console.error);
				break;
			case 'connect':
				const channel = client.channels.get(msg.member.voiceChannelID);
				console.log('connecting')
				smdhoes(msg, channel);
				break;
			default:
				msg.channel.send('Unknown command.')
					.catch(console.error);
		}
	}
});