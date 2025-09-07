const fs = require("fs")

let handler = async (m, { jerofc, isCreator, text, reply }) => {
if (!isCreator) return reply(global.mess.owner)
if (!text) return reply("namafile & reply code")
if (!m.quoted || !m.quoted.text) return reply("namafile & reply code")
if (!text.endsWith(".js")) return m.reply("Nama file harus berformat .js")
let kondisi = "mengedit"
if (!fs.existsSync("./plugins/" + text.toLowerCase())) return m.reply("File plugins tidak ditemukan!")
let teks = m.quoted.text
await fs.writeFileSync("./plugins/" + text, teks)
return m.reply(`Berhasil ${kondisi} file plugins *${text}*`)
}

handler.command = ["sp", "svp", "saveplugins", "saveplugin"]

module.exports = handler