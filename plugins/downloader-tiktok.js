const axios = require("axios");

let handler = async (m, { jerofc, text, reply, prefix, command, quoted }) => {
  if (!text)
    return reply(
      `Please enter the url\n\nExample: ${
        prefix + command
      } https://vt.tiktok.com/ZS6vQm1PN/`
    );
  try {
    let response = await axios.get(
      `https://jerofc.my.id/api/download/tiktokslide?url=${text}&apikey=${global.jerapi}`
    );
    let data = response.data.data;

    // INFO VIDEO
    const {
      region,
      title,
      cover,
      play,
      duration,
      play_count,
      comment_count,
      share_count,
      download_count,
      images,
    } = data;

    // INFO AUTHOR
    const { unique_id, nickname } = data.author;

    let capt = "*[ TIKTOK DOWNLOAD ]*\n\n";
    capt += `*USERNAME :* ${unique_id}\n`;
    capt += `*NICKNAME :* ${nickname}\n`;
    capt += `*DURATION :* ${duration}\n`;
    capt += `*REGION :* ${region}\n`;
    capt += `*VIEWS :* ${play_count}\n`;
    capt += `*TOTAL COMMENT :* ${comment_count}\n`;
    capt += `*TOTAL SHARE :* ${share_count}\n`;
    capt += `*TOTAL DOWNLOAD :* ${download_count}\n`;
    capt += `*TITLE :* ${title}\n\n`;
    capt += `*[ MUSIC INFO ]*\n\n`;
    capt += `*TITLE :* ${data.music_info.title}\n`;
    capt += `*ALBUM :* ${data.music_info.album}\n`;
    capt += `*DURATION :* ${data.music_info.duration}`;
    await jerofc.sendMessage(
      m.chat,
      {
        text: capt,
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            renderLargerThumbnail: true,
            title: data.author.nickname,
            mediaType: 1,
            thumbnailUrl: cover,
            mediaUrl: `${text}`,
            sourceUrl: `${text}`,
          },
        },
      },
      {
        quoted: m,
      }
    );

    if (images && images.length > 0) {
      if (m.isGroup) {
        reply("Media Akan Di Kirim Di Pribadi Chat");
      }
      for (let img of data.images) {
        await jerofc.sendFile(m.sender, img, null, null, m);
      }
      await jerofc.sendMessage(
        m.sender,
        {
          audio: {
            url: data.music_info.play,
          },
          mimetype: "audio/mpeg",
        },
        {
          quoted: m,
        }
      );
    } else if (play) {
      await jerofc.sendFile(m.chat, play, null, "DONE", m);
      await jerofc.sendMessage(
        m.chat,
        {
          audio: {
            url: data.music_info.play,
          },
          mimetype: "audio/mpeg",
        },
        {
          quoted: m,
        }
      );
    } else {
      reply("Media Not Found");
    }
  } catch (e) {
    console.log(e);
    reply("EROR KAK");
  }
};

handler.command = ["tt", "tiktok", "ttimg", "tiktokslide"];

module.exports = handler;
