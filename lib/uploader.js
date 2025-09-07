const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const {
	fromBuffer
} = require("file-type");
const fetch = require("node-fetch");

// Fungsi untuk membuat FormData
const createFormData = (content, fieldName, ext) => {
	const formData = new FormData();
	const filename = `upload.${ext || "bin"}`; // Nama default jika ekstensi tidak ditemukan
	formData.append(fieldName, content, filename);
	return formData;
};

// Fungsi untuk mendapatkan buffer dari URL
const fetchBufferFromUrl = async (url) => {
	const response = await fetch(url);
	if (!response.ok) throw new Error("Failed to fetch the image from the URL");
	return Buffer.from(await response.arrayBuffer());
};

// Fungsi unggah ke Catbox
const Catbox = async (mediaPath) => {
	try {
		const {
			ext,
			mime
		} = (await fromBuffer(mediaPath)) || {};
		if (!ext || !mime) {
			throw new Error("Failed to determine file type.");
		}

		const form = new FormData();
		form.append("fileToUpload", mediaPath, {
			filename: `tmp.${ext}`,
			contentType: mime,
		});
		form.append("reqtype", "fileupload");
		form.append("userhash", "");

		const response = await axios.post("https://catbox.moe/user/api.php", form, {
			headers: form.getHeaders(),
		});

		return response.data;
	} catch (error) {
		console.error("Upload to Catbox failed:", error.message);
		throw error; // Throw error to handle fallback to Ugu
	}
};

/**
 * Upload file to https://i.supa.codes
 * @returns {string|null|(string|null)[]}
 */
const Upload1 = async (buffer) => {
let { ext } = await fromBuffer(buffer);
    let bodyForm = new FormData();
    bodyForm.append("file", buffer, "file." + ext);
    let res = await fetch("https://i.supa.codes/api/upload", {
        method: "post",
        body: bodyForm,
    });
    let data = await res.json();
    let resultUrl = data
    return resultUrl.link
}

const UploadImg = async (mediaPath) => {
  try {
    // Coba unggah ke Catbox
    return await Catbox(mediaPath);
  } catch (error) {
    console.log("Fallback to Supa...");
    // Jika gagal, coba unggah ke Ugu
    return await Upload1(mediaPath);
  }
};

module.exports = {
	UploadImg
}