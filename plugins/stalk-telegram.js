const fetch = require("node-fetch");

let handler = async (m, { jerofc, command, text, prefix }) => {
  if (!text) return reply(`Example:\n${prefix + command} namakujer`);
  try {
    let res = await fetch(
      `https://jerofc.my.id/api/stalk/telegram?username=${text}&apikey=${jerapi}`
    );
    if (!res.ok) throw await res.text();
    let json = await res.json();
    if (json.status == false) return reply("User not found");
    let caption = `*Telegram User Info*\n\n`;
    caption += `⭔ Name: ${json.result.name}\n`;
    caption += `⭔ Username: ${json.result.username}\n`;
    caption += `⭔ Bio: ${json.result.bio}\n`;
    caption += `⭔ Link: ${json.result.profileUrl}\n`;

    jerofc.sendFile(m.chat, json.result.avatarUrl, "error.jpg", caption, m);
  } catch (e) {
    m.reply("Error!");
    console.log(e);
  }
}

handler.command = ["stalktelegram", "stalktg", "stalktele", "telestalk", "stalktelegramuser"];

module.exports = handler;