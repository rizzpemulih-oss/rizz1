const fetch = require("node-fetch");

let handler = async (m, { jerofc, text, reply, prefix, command }) => {
  if (!text)
    return reply(
      `Please enter username\n\nExample: ${prefix + command} jokowi`
    );
  try {
    let api = await fetch(
      `https://jerofc.my.id/api/stalk/twitter?username=${text}&apikey=${jerapi}`
    );
    let data = await api.json();
    const {
      nickname,
      username,
      verified,
      bio,
      location,
      created_at,
      count_tweets,
      following,
      followers,
      totalLikes,
      totalPosts,
      profile_pic,
      banner_pic
    } = data.result;

    let txt = "`[ TWITTER STALK ]`\n\n";
    txt += `Nickname : ${nickname}\n`;
    txt += `Username : ${username}\n`;
    txt += `Bio : ${bio}\n`;
    txt += `Followers : ${followers}\n`;
    txt += `Following : ${following}\n`;
    txt += `Total Posts : ${totalPosts}\n`;
    txt += `Total Likes: ${totalLikes}\n`
    txt += `Verified : ${verified ? '✅' : '❌'}\n`;
    txt += `Location: ${location}\n`;
    txt += `Create : ${created_at}`;
    jerofc.sendMessage(
      m.chat,
      {
        image: { url: profile_pic },
        caption: txt,
      },
      {
        quoted: m,
      }
    );
  } catch (e) {
    console.log(e);
    reply(`EROR`);
  }
};

handler.command = ["stalktwit", "twitstalk", "stalktwiter", "stalktwitter"];

module.exports = handler;