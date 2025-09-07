const axios = require('axios')

let handler = async (m, {
	jerofc,
	text,
	reply,
	prefix,
	command,
	quoted
}) => {
	if (!text) return reply(`Please enter the url\n\nExample: ${prefix + command} https://v.douyin.com/ikq8axJ/`)
	try {
		let response = await axios.get(`https://jerofc.my.id/api/douyin?url=${text}&apikey=${jerapi}`)
		const nowm = response.data.result.nowmHD
		jerofc.sendMessage(m.chat, {
			video: {
				url: nowm
			},
			caption: "DONE"
		}, {
			quoted: m
		});
	} catch (e) {
		console.log(e)
		reply("EROR")
	}
}

handler.command = ["douyin"]

module.exports = handler