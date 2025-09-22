const axios = require("axios");

const { UploadImg } = require("../lib/uploader");

let handler = async (m, { jerofc, quoted, reply, prefix, command }) => {
  const mime = (quoted.msg || quoted).mimetype || "";
  if (!quoted)
    return reply(`Send/Reply Foto Dengan Caption ${prefix + command}`);
  if (!/image/.test(mime))
    return reply(`Send/Reply Foto Dengan Caption ${prefix + command}`);
  try {
    const options = ["hitam"]; // opsi ada nerd, coklat, hitam kalo mau ubah warna ubah opsi hitam jadi coklat atau nerd
    let buffer = await quoted.download();
    let upload = await UploadImg(buffer);
    let response = await axios.get(
      `https://jerofc.my.id/api/tools/tohitam?url=${upload}&filter=hitam&apikey=${jerapi}`,
      { responseType: "arraybuffer" }
    );
    let image = Buffer.from(response.data, "binary");
    jerofc.sendMessage(
      m.chat,
      {
        image: image,
      },
      { quoted: m }
    );
  } catch (e) {
    console.log(e);
    reply("EROR");
  }
};

handler.command = ["tohitam", "hitam"];

module.exports = handler;
