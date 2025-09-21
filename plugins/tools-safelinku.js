const fetch = require("node-fetch");

let handler = async (m, { jerofc, text, reply, prefix, command }) => {
  if (!text)
    return reply(
      `Silahkan input url yang ingin di short\n\nExample: ${
        prefix + command
      } https://jerofc.my.id`
    );
  try {
    let api = await fetch(
      `https://jerofc.my.id/api/tools/safelinku?text=${text}&apikey=${jerapi}`
    );
    let result = await api.json();
    let txt = "`[ SHORT SAFELINKU ]`\n\n";
    txt += `*URL :* ${result.data.url}\n`;
    txt += `*NO EXPIRED*`;
    jerofc.sendMessage(
      m.chat,
      {
        text: txt,
      },
      {
        quoted: m,
      }
    );
  } catch (e) {
    console.log(e);
    reply("EROR");
  }
};

handler.command = ["safelinku"];

module.exports = handler;
