const fs = require("fs")
const path = require('path');

let handler = async (m, { jerofc, isCreator, text, reply }) => {
if (!isCreator) return reply("Khusus Owner")
let dir = fs.readdirSync('./plugins')
if (dir.length < 1) return reply("Tidak ada file plugins")
let teks = "\n"
for (let e of dir) {
teks += `* ${e}\n`
}
m.reply(teks)
}

handler.command = ["listplugin", "listplugins"]

module.exports = handler