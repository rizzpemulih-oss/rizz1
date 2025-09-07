const fs = require("fs")
const chalk = require('chalk')

global.menunya = (prefix) => {
	let num = 1;
	return `*[ I N F O - U S E R ]*

*Number :* @${m.sender.split("@")[0]}

*Artificial Intelligence 🤖*

・${num++}.ai
・${num++}.deepseek
・${num++}.gemini

*DOWNLOADER ⏳*

・${num++}.capcut
・${num++}.douyin
・${num++}.facebook
・${num++}.instagram
・${num++}.pindl
・${num++}.poopdl
・${num++}.spotify
・${num++}.threads
・${num++}.tiktok
・${num++}.tiktokslide
・${num++}.videy
・${num++}.ytmp3
・${num++}.ytmp4

*GROUP 👥*

・${num++}.antilink
・${num++}.antilink2
・${num++}.antiwame
・${num++}.antiwame2
・${num++}.welcome
・${num++}.left
・${num++}.delete
・${num++}.linkgc
・${num++}.open
・${num++}.close
・${num++}.group open
・${num++}.group close
・${num++}.pinchat
・${num++}.unpin
・${num++}.kick
・${num++}.promote
・${num++}.demote
・${num++}.hidetag
・${num++}.totag
・${num++}.autogc
・${num++}.autogc status
・${num++}.autogc off

*OTHER ❔*

・${num++}.owner
・${num++}.speed
・${num++}.ping
・${num++}.script
・${num++}.afk
・${num++}.cekpremium

*OWNER 👤*

・${num++}.addplugins
・${num++}.delplugins
・${num++}.getplugins
・${num++}.listplugins
・${num++}.saveplugins
・${num++}.join
・${num++}.addcase
・${num++}.delcase
・${num++}.listcase
・${num++}.getcase
・${num++}.addsewa
・${num++}.delsewa
・${num++}.listsewa
・${num++}.addprem
・${num++}.delprem
・${num++}.listpremium

*RPG GAMES 🎮*

・${num++}.inventory
・${num++}.mining
・${num++}.buy 
・${num++}.sell
・${num++}.heal
・${num++}.hunt
・${num++}.adventure
・${num++}.luckyday
・${num++}.killslime
・${num++}.killgoblin
・${num++}.killdevil
・${num++}.killbehemoth
・${num++}.killdemon
・${num++}.killdemonking
・${num++}.joinrpg
・${num++}.sellikan
・${num++}.sellbesi
・${num++}.sellemas
・${num++}.jelajah
・${num++}.mancing
・${num++}.jualikan
・${num++}.jualcoal
・${num++}.lebur
・${num++}.jualstone
・${num++}.jualingot
・${num++}.jualkayu
・${num++}.nebang
・${num++}.goplanet
・${num++}.jualbahankimia

*RPG BALANCE 🎰*

・${num++}.topglobal
・${num++}.toplocal
・${num++}.buylimit
・${num++}.buyglimit
・${num++}.transfer
・${num++}.limit
・${num++}.balance

*STORE 🛒*

・${num++}.list
・${num++}.addlist
・${num++}.updatelist
・${num++}.dellist
・${num++}.jeda
・${num++}.tambah
・${num++}.kurang
・${num++}.kali
・${num++}.bagi
・${num++}.setproses
・${num++}.changeproses
・${num++}.delsetproses
・${num++}.setdone
・${num++}.changedone
・${num++}.delsetdone
・${num++}.proses
・${num++}.done
・${num++}.setwelcome
・${num++}.changewelcome
・${num++}.delsetwelcome
・${num++}.setleft
・${num++}.changeleft
・${num++}.delsetleft

*SEARCHING 🔍*

・${num++}.play
・${num++}.kodepos

*STALKER 👤*

・${num++}.ffstalk
・${num++}.igstalk
・${num++}.wastalk

*STICKER ❓*

・${num++}.brat
・${num++}.sticker
・${num++}.smeme
・${num++}.toimg

*TOOLS 🌐*

・${num++}.remini
・${num++}.remini2
・${num++}.removebg
・${num++}.safelinku
・${num++}.shortlink
・${num++}.ssweb
・${num++}.tourl
・${num++}.rvo
`
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});