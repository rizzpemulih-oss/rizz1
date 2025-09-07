const fetch = require('node-fetch')

let handler = async (m, { jerofc, text, reply, prefix, command }) => {
	if (!text) return reply(`Example : ${prefix + command} Hello`)
	let api = await fetch(`https://jerofc.my.id/api/gemini?text=${text}&apikey=${jerapi}`)
	let res = await api.json();
	try {
		reply(res.data.message)
	} catch (e) {
		console.log(e)
	}
}

handler.command = ["gemini"]

module.exports = handler