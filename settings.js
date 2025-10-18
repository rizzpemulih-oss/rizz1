const fs = require("fs");
const chalk = require("chalk");

global.APIs = {
  jerapi: "https://jerofc.my.id",
};

// SETTINGS API (WAJIB)

global.APIKeys = {
  "https://jerofc.my.id": "YOUR_KEY", // WAJIB ISI
};

global.jerapi = "YOUR_KEY"; // WAJIB ISI

global.owner = ["6289529382858"]; //ganti nomor owner hp kalian
global.namabot = "JER OFC";
global.namaowner = "JER OFC";
global.sessionName = "session";
global.pp_bot = fs.readFileSync("./image/menu.jpg");

global.packname = "© JERONE-BOT"; //sticker wm ubah
global.author = "Di Buat Oleh JER OFC"; //sticker wm ganti nama kalian

global.limitCount = 50;
global.gcount = {
  prem: Infinity,
  user: 15,
};

// SET
global.onlygrub = false;

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
