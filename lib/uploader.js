const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const {
	fromBuffer
} = require("file-type");
const fetch = require("node-fetch");
const fakeUserAgent = require("fake-useragent");

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
		let buffer;
		if (mediaPath.startsWith("http")) {
			const response = await axios.get(mediaPath, {
				responseType: "arraybuffer",
			});
			buffer = Buffer.from(response.data);
		} else {
			if (!fs.existsSync(mediaPath)) {
				throw new Error("File not found");
			}
			buffer = fs.readFileSync(mediaPath);
		}

		const {
			ext,
			mime
		} = (await fromBuffer(buffer)) || {};
		if (!ext || !mime) {
			throw new Error("Failed to determine file type.");
		}

		const form = new FormData();
		form.append("fileToUpload", buffer, {
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

const Ugu = async (input) => {
	try {
		const content = Buffer.isBuffer(input) ?
			input :
			await fetchBufferFromUrl(input);

		const {
			ext,
			mime
		} = (await fromBuffer(content)) || {};
		const formData = createFormData(content, "files[]", ext);

		const response = await fetch("https://uguu.se/upload.php", {
			method: "POST",
			body: formData,
			headers: {
				"User-Agent": fakeUserAgent(),
			},
		});

		if (!response.ok) throw new Error("Failed to upload the file to Uguu");
		const files = await response.json();

		return files.files[0].url;
	} catch (error) {
		console.error("Error uploading to Uguu:", error.message);
		throw error;
	}
};

const UploadImg = async (mediaPath) => {
  try {
    // Coba unggah ke Catbox
    return await Catbox(mediaPath);
  } catch (error) {
    console.log("Fallback to Ugu...");
    // Jika gagal, coba unggah ke Ugu
    return await Ugu(mediaPath);
  }
};

module.exports = {
	UploadImg
}