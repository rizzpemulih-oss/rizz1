const axios = require("axios");

let handler = async (m, { jerofc, text, reply, prefix, command, quoted }) => {
  if (!text)
    return reply(
      `Please enter the url\n\nExample: ${
        prefix + command
      } https://open.spotify.com/track/5pAZ7WHPqEAh5ctaXAeUrL?si=bKb44akPQ0m6u4OJpbJ1aQ`
    );
  try {
    let response = await axios.get(
      `https://jerofc.my.id/api/download/spotifydl?url=${text}&apikey=${jerapi}`
    );
    const result = response.data.data;
    jerofc.sendMessage(
      m.chat,
      {
        audio: {
          url: result.downloadLink,
        },
        mimetype: "audio/mpeg",
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

handler.command = ["spotify"];

module.exports = handler;
