const axios = require("axios");

let handler = async (m, { jerofc, args, reply, prefix, command, quoted }) => {
  if (!args[0])
    return reply(
      `Silahkan Input Url Dari Youtube\n\n${
        prefix + command
      } https://youtu.be/c8ciDyBMZ6M?si=ak8FJrzhVVKQM9Qx`
    );
  try {
    const response = await axios.get(
      `https://jerofc.my.id/api/ytmp3?url=${args[0]}&apikey=${global.jerapi}`
    );
    const result = response.data.data;
    jerofc.sendMessage(
      m.chat,
      {
        audio: {
          url: result.mp3,
        },
        mimetype: "audio/mpeg",
        ptt: false,
        contextInfo: {
          externalAdReply: {
            title: result.info.title,
            body: "YOUTUBE DOWNLOAD MP3",
            previewType: "PHOTO",
            thumbnailUrl: result.info.thumbnail,
            mediaType: 1,
            renderLargerThumbnail: true,
            sourceUrl: args[0],
          },
        },
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

handler.command = ["ytmp3", "ytaudio"];

module.exports = handler;
