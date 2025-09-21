const axios = require("axios");

let handler = async (m, { jerofc, text, reply, prefix, command }) => {
  if (!text)
    return reply(`Silahkan input text\n\nExample: ${prefix + command} Hello`);
  let response = await axios.get(
    `https://jerofc.my.id/api/tools/brat?text=${encodeURIComponent(
      text
    )}&apikey=${jerapi}`,
    {
      responseType: "arraybuffer",
    }
  );
  try {
    let media = Buffer.from(response.data);
    jerofc.sendImageAsSticker(m.chat, media, m, {
      packname: global.packname,
      author: global.author,
    });
  } catch (e) {
    console.log(e);
    reply("EROR");
  }
};

handler.command = ["brat"];

module.exports = handler;
