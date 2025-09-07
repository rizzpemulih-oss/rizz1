const fetch = require("node-fetch");

let handler = async (m, { jerofc, text, prefix, command, reply, quoted }) => {
  if (!text)
    return reply(
      `Contoh penggunaan : ${prefix + command} https://jerofc.my.id`
    );
  let api = await fetch(
    `https://jerofc.my.id/api/ssweb?url=${text}&apikey=${jerapi}`
  );
  let arrayBuffer = await api.arrayBuffer();
  let buffer = Buffer.from(arrayBuffer);
  jerofc.sendMessage(
    m.chat,
    {
      image: buffer,
      caption: "DONE",
    },
    {
      quoted: m,
    }
  );
};

handler.command = ["ssweb"];

module.exports = handler;
