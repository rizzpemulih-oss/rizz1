const fetch = require('node-fetch')

let handler = async (m, { jerofc, text, reply, prefix, command, quoted }) => {
	if (!text) return reply(`Please enter the url\n\nExample: ${prefix + command} https://www.capcut.com/t/Zs8U8JrQq/`)
	try {
		let api = await fetch(`https://jerofc.my.id/api/capcut?url=${text}&apikey=${jerapi}`);
		let result = await api.json();
		let data = result.data;
		let capt = "*[ CAPCUT DOWNLOADER ]*\n\n";
		capt +=`*TITLE :* ${data.title}`
		await jerofc.sendMessage(m.chat, {
			text: capt,
			contextInfo: {
				"externalAdReply": {
					"showAdAttribution": true,
					"renderLargerThumbnail": true,
					"title": data.title,
					"containsAutoReply": true,
					"mediaType": 1,
					"thumbnailUrl": data.thumbnail,
					"mediaUrl": `${text}`,
					"sourceUrl": `${text}`
				}
			}
		}, {
			quoted: m
		});
		await jerofc.sendMessage(m.chat, {
			video: { url: data.video },
			caption: "DONE"
		}, {
			quoted: m
		});
	} catch (e) {
		console.log(e)
		reply("EROR")
	}
}

handler.command = ["capcut", "capcutdl"]

module.exports = handler