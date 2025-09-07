const fetch = require('node-fetch')

let handler = async (m, { jerofc, text, reply, loading, prefix, command, quoted }) => {
	if (!text) return reply(`Please enter the url\n\nExample: ${prefix + command} url`)
	await loading();
	try {
		let api = await fetch(`https://jerofc.my.id/api/poopdown?url=${text}&apikey=${jerapi}`)
		let result = await api.json();
		const {
			id,
			title,
			duration,
			size,
			upload_date,
			thumbnail,
			downloadLink
		} = result.data;
		
		let txt = "`[ POOP DOWNLOAD ]`\n\n"
		txt+= `*Id :* ${id}\n`
		txt+= `*Title :* ${title}\n`
		txt+= `*Duration :* ${duration}\n`
		txt+= `*Size :* ${size}\n`
		txt+= `*Upload :* ${upload_date}\n\n`
		txt+= `*DownloadLink :* ${downloadLink}`
		
		await jerofc.sendMessage(m.chat, {
			text: txt,
			contextInfo: {
				"externalAdReply": {
					"showAdAttribution": true,
					"renderLargerThumbnail": true,
					"title": title,
					"containsAutoReply": true,
					"mediaType": 1,
					"thumbnailUrl": thumbnail,
					"mediaUrl": `${text}`,
					"sourceUrl": `${text}`
				}
			}
		}, {
			quoted: m
		});
		await jerofc.sendMessage(m.chat, {
			video: { url: downloadLink },
			caption: "DONE"
		}, {
			quoted: m
		});
	} catch (e) {
		throw e
	}
}

handler.command = ["poop", "poopdown", "poopdl"]

module.exports = handler