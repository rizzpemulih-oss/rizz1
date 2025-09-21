const axios = require("axios");

const { UploadImg } = require("../lib/uploader");

let handler = async (m, { jerofc, prefix, command, reply, quoted }) => {
  const mime = (quoted.msg || quoted).mimetype || "";
  if (!quoted)
    return reply(`Send/Reply Foto Dengan Caption ${prefix + command}`);
  if (!/image/.test(mime))
    return reply(`Send/Reply Foto Dengan Caption ${prefix + command}`);
  try {
    let buffer = await quoted.download();
    let upload = await UploadImg(buffer);
    let response = await axios.get(
      `https://jerofc.my.id/api/tools/remini2?url=${upload}&apikey=${jerapi}`
    );
    jerofc.sendMessage(
      m.chat,
      {
        image: {
          url: response.data.data.image,
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

handler.command = ["remini2", "hd2", "hdr2"];

module.exports = handler;
