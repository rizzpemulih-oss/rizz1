const fs = require("fs")

let handler = async (m, { jerofc, isCreator, reply, text, prefix }) => {
if (!isCreator) return reply(global.mess.owner)
if (!text) return reply(`Masukan nama plugins nya\n\nExample: ${prefix}downloader-tiktok.js`)
if (!text.endsWith(".js")) return reply("Nama file harus berformat .js")
if (!fs.existsSync("./plugins/" + text.toLowerCase())) return m.reply("File plugins tidak ditemukan!")
let res = await fs.readFileSync("./plugins/" + text.toLowerCase())
return reply(`${res.toString()}`)
}

handler.command = ["getp", "gp", "getplugins", "getplugin"]

module.exports = handler