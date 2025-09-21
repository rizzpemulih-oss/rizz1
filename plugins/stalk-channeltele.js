const fetch = require("node-fetch");

let handler = async (m, { jerofc, command, text, prefix }) => {
  if (!text) return reply(`Example:\n${prefix + command} jerofcscript`);
  try {
    let res = await fetch(
      `https://jerofc.my.id/api/stalk/channeltele?username=${text}&apikey=${jerapi}`
    );
    if (!res.ok) throw await res.text();
    let json = await res.json();
    if (json.status == false) return reply(json.result);
    let caption = `*Channel Telegram*\n\n`;
    caption += `⭔ Name: ${json.result.name}\n`;
    caption += `⭔ Username: ${json.result.username}\n`;
    caption += `⭔ Followers: ${json.result.followers}\n`;
    caption += `⭔ Link: ${json.result.channelUrl}\n`;
    caption += `⭔ Description: ${json.result.description}\n`;

    jerofc.sendFile(m.chat, json.result.profile_pic, "error.jpg", caption, m);
  } catch (e) {
    m.reply("Error!");
    console.log(e);
  }
};

handler.command = ["stalkchanneltele", "stalkchanneltelegram", "stalkchtele", "stalkctelegram"];

module.exports = handler;