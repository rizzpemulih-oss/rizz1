const fs = require('fs');
const path = './database/autogc.json';

function loadAutoGcDB() {
    if (!fs.existsSync(path)) fs.writeFileSync(path, '{}');
    return JSON.parse(fs.readFileSync(path));
}

function saveAutoGcDB(data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = {
	loadAutoGcDB,
	saveAutoGcDB
}