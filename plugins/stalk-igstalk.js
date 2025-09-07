const fetch = require('node-fetch')

let handler = async (m, {
	jerofc,
	text,
	reply,
	prefix,
	command
}) => {
	if (!text) return reply(`Please enter username\n\nExample: ${prefix + command} jerx_2`)
	try {
		const api = await fetch(`https://jerofc.my.id/api/igstalk?username=${text}&apikey=${jerapi}`);
		const result = await api.json();
		const {
			nickname,
			username,
			bio,
			followers,
			following,
			profile,
			profileUrl
		} = result.data
		let txt = "`[ INSTAGRAM STALK ]`\n\n";
		txt +=`Nickname : ${nickname}\n`
		txt +=`Username : ${username}\n`
		txt +=`Bio : ${bio}\n`
		txt +=`Followers : ${followers}\n`
		txt +=`Following : ${following}\n`
		txt +=`Profile : ${profile}`
		jerofc.sendMessage(m.chat, {
			image: { url: profileUrl },
			caption: txt
		}, {
			quoted: m
		});
	} catch (e) {
		console.log(e)
		reply("EROR")
	}
}

handler.command = ["igstalk", "stalkig"]

module.exports = handler