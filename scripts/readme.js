var fs = require("fs");
var data = require("../everything-is-okay.json");
var readme = "README.md";
var content = `
# Everything is okay!

I promise.

Here's a selection of videos to help improve your terrible, no good day.

> Looking to contribute to this repo? Check out \`CONTRIBUTING.md\` for instructions!
`;

var keys = Object.keys(data);

for(var x = 0; x < keys.length; x++) {
    var category = keys[x];
    content += "\n### " + category + "\n";

    console.log("Processing: " + category);

    for(var y = 0; y < data[category].length; y++) {
        content += "* [" + data[category][y].title + "](" + data[category][y].url + ")\n";
    }
}

fs.writeFile(readme, content, (err) => {
    if (err) throw err;
    console.log("README regenerated");
});