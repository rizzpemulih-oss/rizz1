const fetch = require("node-fetch");

let handler = async (m, { jerofc, text, reply, prefix, command, quoted }) => {
  if (!text)
    return reply(
      `Please enter the url\n\nExample : ${
        prefix + command
      } https://videy.co/v?id=DyeHGqSE1`
    );
  try {
    let api = await fetch(
      `https://jerofc.my.id/api/download/videydl?url=${text}&apikey=${jerapi}`
    );
    let response = await api.json();
    jerofc.sendMessage(
      m.chat,
      {
        video: {
          url: response.data.video,
        },
        caption: "DONE",
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

handler.command = ["videy", "videydl"];

module.exports = handler;
