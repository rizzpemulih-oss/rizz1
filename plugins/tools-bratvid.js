const axios = require('axios')
const path = require('path')
const fs = require('fs')
const {
	execSync
} = require('child_process')

let handler = async (m, {
	jerofc,
	text,
	reply,
	prefix,
	command
}) => {
	if (!text) return m.reply(`Contoh: ${prefix + command} hello`)
	if (text.length > 250) return m.reply(`Karakter terbatas, max 250!`)

	const words = text.split(" ")
	const tempDir = path.join(process.cwd(), 'x-system')

	// Ensure the temporary directory exists
	if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, {
		recursive: true
	})

	const framePaths = []
	try {
		for (let i = 0; i < words.length; i++) {
			const currentText = words.slice(0, i + 1).join(" ") // Correct: Build text progressively
			const encodedText = encodeURIComponent(currentText) // Encode the current text
			const apiUrl = `https://jerofc.my.id/api/brat?text=${encodedText}&apikey=${jerapi}` // Use encoded currentText

			const res = await axios.get(apiUrl, {
				responseType: "arraybuffer"
			}).catch((e) => {
				console.error(`Error fetching frame for text "${currentText}":`, e.response ? e.response.data.toString() : e.message)
				throw new Error(`Failed to fetch frame for "${currentText}".`) // Propagate error
			})

			const framePath = path.join(tempDir, `frame${i}.mp4`)
			fs.writeFileSync(framePath, res.data)
			framePaths.push(framePath)
		}

		const fileListPath = path.join(tempDir, "filelist.txt")
		let fileListContent = ""
		for (let i = 0; i < framePaths.length; i++) {
			fileListContent += `file '${framePaths[i]}'\n`
			fileListContent += `duration 0.5\n` // Duration for each intermediate frame
		}
		// Add the last frame with a longer duration
		fileListContent += `file '${framePaths[framePaths.length - 1]}'\n`
		fileListContent += `duration 1.5\n` // Longer duration for the final frame

		fs.writeFileSync(fileListPath, fileListContent)

		const outputVideoPath = path.join(tempDir, "output.mp4")
		// Use -r 30 instead of -vf "fps=30" for better control over output frame rate
		execSync(
			`ffmpeg -y -f concat -safe 0 -i ${fileListPath} -r 30 -c:v libx264 -preset superfast -pix_fmt yuv420p ${outputVideoPath}`
		)

		// Send the generated video as a sticker
		await jerofc.sendImageAsSticker(m.chat, outputVideoPath, m, {
			packname: global.packname,
			author: global.author
		});

	} catch (err) {
		console.error("Error in brat video generation:", err)
		m.reply('Terjadi kesalahan saat membuat video: ' + err.message)
	} finally {
		// Clean up temporary files
		framePaths.forEach((frame) => {
			if (fs.existsSync(frame)) fs.unlinkSync(frame)
		})
		const fileListPath = path.join(tempDir, "filelist.txt")
		if (fs.existsSync(fileListPath)) fs.unlinkSync(fileListPath)
		const outputVideoPath = path.join(tempDir, "output.mp4")
		if (fs.existsSync(outputVideoPath)) fs.unlinkSync(outputVideoPath)

		// Optionally, remove the tempDir if it's empty
		try {
			if (fs.readdirSync(tempDir).length === 0) {
				fs.rmdirSync(tempDir)
			}
		} catch (e) {
			console.error("Error removing temporary directory:", e)
		}
	}
}

handler.command = ["bratvid", "bratvideo"]

module.exports = handler