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
      `https://jerofc.my.id/api/ytmp4?url=${text}&apikey=${global.jerapi}`
    );
    const result = response.data.data;
    jerofc.sendMessage(
      m.chat,
      {
        document: {
          url: result.mp4,
        },
        fileName: result.info.title + ".mp4",
        mimetype: "video/mp4",
        caption: result.info.title,
        ptt: false,
        contextInfo: {
          externalAdReply: {
            title: result.info.title,
            body: "YOUTUBE DOWNLOAD MP4",
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

handler.command = ["ytmp4", "ytvideo", "ytvid"];

module.exports = handler;
