const fetch = require("node-fetch");

let handler = async (m, { jerofc, text, reply, prefix, command }) => {
  if (!text)
    return reply(
      `Please enter username\n\nExample: ${prefix + command} jerx_2`
    );
  try {
    const api = await fetch(
      `https://jerofc.my.id/api/stalk/igstalk?username=${text}&apikey=${jerapi}`
    );
    const data = await api.json();
    const {
      username,
      nickname,
      biodata,
      followers,
      following,
      totalPosts,
      verified,
      private,
      busisness_account,
      profileUrl,
      profile_pic
    } = data.result;

    let txt = "`[ INSTAGRAM STALK ]`\n\n";
    txt += `Nickname : ${nickname}\n`;
    txt += `Username : ${username}\n`;
    txt += `Bio : ${biodata}\n`;
    txt += `Followers : ${followers}\n`;
    txt += `Following : ${following}\n`;
    txt += `Total Posts : ${totalPosts}\n`;
    txt += `Verified : ${verified ? '✅' : '❌'}\n`;
    txt += `Private : ${private ? '✅' : '❌'}\n`;
    txt += `Business Account : ${busisness_account ? '✅' : '❌'}\n`;
    txt += `Profile : ${profileUrl}`;
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
    reply("EROR");
  }
};

handler.command = ["igstalk", "stalkig"];

module.exports = handler;
