const fs = require("fs");

const contents = fs.readdirSync(__dirname + "/src/assets/gallery");

fs.writeFileSync(__dirname + "/src/gallery.json", JSON.stringify(contents));
