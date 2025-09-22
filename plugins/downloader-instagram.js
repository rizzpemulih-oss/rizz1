const fetch = require("node-fetch");

let handler = async (m, { jerofc, text, reply, command, prefix, quoted }) => {
  if (!text)
    return reply(
      `Please enter the url\n\nExample: ${
        prefix + command
      } https://www.instagram.com/reel/DFcoYF5STbs/?igsh=MTJsOXJqNHN1bHgzcQ==`
    );
  try {
    const { igdl } = require("jer-api");
    let api = await fetch(
      `https://jerofc.my.id/api/download/igdl?url=${text}&apikey=${jerapi}`
    );
    let response = await api.json();
    for (let i of response.media) {
      jerofc.sendFile(m.chat, i.url, null, "DONE", m);
    }
  } catch (e) {
    console.log(e);
    reply("EROR");
  }
};

handler.command = ["ig", "igvideo", "instagram", "igvid"];

module.exports = handler;
