const fetch = require("node-fetch");

let handler = async (m, { jerofc, text, reply, prefix, command }) => {
  if (!text) return reply(`Example : ${prefix + command} Hello`);
  let api = await fetch(
    `https://jerofc.my.id/api/ai/deepseek?prompt=${text}&apikey=${jerapi}`
  );
  let data = await api.json();
  try {
    reply(data.result.message);
  } catch (e) {
    console.log(e);
  }
};

handler.command = ["deepseek", "deepai", "aideep", "deep"];

module.exports = handler;