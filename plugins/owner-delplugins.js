const fs = require("fs")

let handler = async (m, { jerofc, isCreator, text, reply }) => {
if (!isCreator) return reply("Khusus Owner")
if (!text) return reply(`Masukan nama plugins\n\n${prefix+command} downloade-tiktok.js`)
if (!text.endsWith(".js")) return reply("Nama file harus berformat .js")
if (!fs.existsSync("./plugins/" + text.toLowerCase())) return reply("File plugins tidak ditemukan!")
await fs.unlinkSync("./plugins/" + text.toLowerCase())
return reply(`Berhasil menghapus file plugins *${text.toLowerCase()}*`)
}

handler.command = ["delplugins", "delplugin"]

module.exports = handler