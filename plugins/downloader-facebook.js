const axios = require("axios");

let handler = async (m, { jerofc, text, reply, prefix, command, quoted }) => {
  if (!text)
    return reply(
      `Please enter the url\n\nExample: ${
        prefix + command
      } https://www.facebook.com/share/r/RYfwYCmzFYckTUAf/?mibextid=xCPwDs`
    );
  try {
    let response = await axios.get(
      `https://jerofc.my.id/api/download/fbdl?url=${text}&apikey=${global.jerapi}`
    );
    let video = response.data.result;
    jerofc.sendMessage(
      m.chat,
      {
        video: {
          url: video.HD,
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

handler.command = ["facebook", "fbvideo", "fb", "fbdl", "fbvid"];

module.exports = handler;
