const fetch = require("node-fetch");

let handler = async (m, { jerofc, text, reply, prefix, command, quoted }) => {
  if (!text)
    return reply(
      `Input Parameter Url Dari ${command}\n\nExample : ${
        prefix + command
      } https://www.threads.com/@jkt48.delynn/post/DI3npzryOR0?xmt=AQGzIXuNcEwjnYBMunQO31XrHGl7faOg-OftFkqnI-a7Yg`
    );
  let api = await fetch(
    `https://jerofc.my.id/api/download/threads?url=${text}&apikey=${jerapi}`
  );
  let result = await api.json();
  try {
    for (let i of result.data.video_urls) {
      await jerofc.sendFile(m.chat, i.download_url, null, "DONE", m);
    }
  } catch (e) {
    console.log(e);
  }
  try {
    for (let i of result.data.image_urls) {
      await jerofc.sendFile(m.chat, i, null, "DONE", m);
    }
  } catch (e) {
    console.log(e);
  }
};

handler.command = ["threads", "threadsdl"];

module.exports = handler;
