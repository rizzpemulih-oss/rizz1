const fetch = require("node-fetch");

let handler = async (m, { jerofc, text, reply, prefix, command, quoted }) => {
  if (!text)
    return reply(
      `Please enter the url\n\nExample : ${
        prefix + command
      } https://pin.it/4CVodSq`
    );
  try {
    const api = await fetch(
      `https://jerofc.my.id/api/download/pindl?url=${text}&apikey=${jerapi}`
    );
    let results = await api.json();
    let media = results.data;
    jerofc.sendFile(m.chat, media.result, null, "DONE", m);
  } catch (e) {
    console.log(e);
    reply("EROR");
  }
};

handler.command = ["pindl", "pinterestdl"];

module.exports = handler;
