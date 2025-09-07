const axios = require('axios')

let handler = async (m, {
	jerofc,
	text,
	reply,
	prefix,
	command
}) => {
	if (!text) return reply('Masukan Wilayah Atau Kota / Kecamatan Kamu')
	try {
		let response = await axios.get(`https://jerofc.my.id/api/kodepos?text=${text}&apikey=${jerapi}`);
		let data = response.data.data;
		let txt = ''
		data.forEach(function (i) {
			txt += '\n\n*[ KODE POS ]*\n\n'
			txt += `*PROVINSI :* ${i.province}\n`
			txt += `*KOTA :* ${i.regency}\n`
			txt += `*DAERAH :* ${i.district}\n`
			txt += `*TEMPAT :* ${i.village}\n`
			txt += `*WAKTU :* ${i.timezone}\n`
			.trim();
		});
		reply(txt)
	} catch (e) {
		console.log(e)
		reply('EROR')
	}
}

handler.command = ["kodepos"]

module.exports = handler