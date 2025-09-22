const axios = require("axios");

let handler = async (m, { jerofc, text, reply, prefix, command }) => {
  if (!text)
    return reply(`Please enter id\n\nExample: ${prefix + command} 637627282`);
  if (!Number(text)) return reply("Hanya angka yang di perbolehkan !");
  try {
    let result = await axios.get(
      `https://jerofc.my.id/api/stalk/ffstalk?id=${text}&apikey=${jerapi}`
    );
    const { id, nickname } = result.data.data;
    let capt = "`[ FF STALK ]`\n\n";
    capt += `*ID :* ${id}\n`;
    capt += `*NICKNAME :* ${nickname}`;
    reply(capt);
  } catch (e) {
    console.log(e);
    reply("EROR");
  }
};

handler.command = ["stalkff", "ffstalk"];

module.exports = handler;
