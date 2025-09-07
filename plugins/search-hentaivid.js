const axios = require('axios')
const cheerio = require('cheerio')

let handler = async (m, { text, jerofc, prefix, command }) => {
    let result = await xhentai(text);
    let random = result[Math.floor(Math.random(), result.length)]
    let vap = `
⭔ Title : ${random.title}
⭔ Category : ${random.category}
⭔ Mimetype : ${random.type}
⭔ Views : ${random.views_count}
⭔ Shares : ${random.share_count}
⭔ Source : ${random.link}
⭔ Media Url : ${random.video_1}
`
jerofc.sendMessage(m.sender, { video: { url: random.video_1 }, caption: vap }, { quoted: m})
};

handler.command = ["hentai", "hentaivid", "hentaivideo"]

module.exports = handler

async function xhentai(page) {
    return new Promise((resolve, reject) => {
    const page = Math.floor(Math.random() * 1153)
        axios.get('https://sfmcompile.club/page/' + page)
            .then((data) => {
                const $ = cheerio.load(data.data);
                const hasil = [];
                $('#primary > div > div > ul > li > article').each(function (a, b) {
                    hasil.push({
                        title: $(b).find('header > h2').text(),
                        link: $(b).find('header > h2 > a').attr('href'),
                        category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
                        share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
                        views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
                        type: $(b).find('source').attr('type') || 'image/jpeg',
                        video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
                        video_2: $(b).find('video > a').attr('href') || ''
                    });
                });
                resolve(hasil);
            })
            .catch(reject);
    });
}