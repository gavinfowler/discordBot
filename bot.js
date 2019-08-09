const Discord = require('discord.js');
const client = new Discord.Client();

var voiceConnection = null

client.login('NjA5MTk3MjMzODkxNDQyNzE5.XU23dQ.gC56BXiuygCY1Ha9mhsBh-hxD0s');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

function PlayAudioFile(msg, channel) {
	if (!channel) return console.error("The channel does not exist!");
	if (msg.content == '++play-audio-file') {
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

function connectToVoiceGuild(channel) {
	if (!channel) return console.error("The channel does not exist!");
	voiceConnection = channel.join()
		.then(() => console.log('Connected to voice'))
}

function disconnectFromVoiceGuild(channel) {
	if (!channel) return console.error("The channel does not exist!");
	voiceConnection = channel.leave();
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
		console.log('-----New Command-----')
		// console.log(`message: ${message}`)
		// console.log(`beginning: ${beginning}`)
		console.log(`Command: ${command}`)
		console.log(`args: ${args}`)
		// console.log(msg.channel)
		// msg.channel.send('hello!')
		// 	.then(message => console.log(`Sent message: ${message.content}`))
		// 	.catch(console.error);
		const channel = client.channels.get(msg.member.voiceChannelID);
		switch (command) {
			case 'repeat':
				msg.channel.send(args)
					.catch(console.error);
				break;
			case 'connect':
				console.log('Connecting to voice')
				connectToVoiceGuild(channel);
				msg.channel.send('Connected to voice')
					.catch(console.error);
				break;
			case 'disconnect':
				console.log('Disconnecting From voice')
				msg.channel.send('Disconnecting')
					.catch(console.error);
				disconnectFromVoiceGuild(channel);
				break;
			default:
				msg.channel.send('Unknown command.')
					.catch(console.error);
		}
	}
});