var readline = require('readline');
var fs = require('fs');
var rl = readline.createInterface({
  input: fs.createReadStream('README.md')
});

var current_category = "";
var obj = {};

rl.on('line', function (line) {
    var category_match = line.match(/### (.+)/);
    var item_match = line.match(/\* \[(.+)\]\((.+)\)/);

    if(category_match) {
        current_category = category_match[1];
        obj[current_category] = [];
    }

    if(item_match) {
        var item = {};
        item.title = item_match[1];
        item.url = item_match[2];
        obj[current_category].push(item);
    }
}).on('close', () => {
  fs.writeFile("everything-is-okay.json", JSON.stringify(obj, null, 4), (err) => {
    if (err) throw err;
    console.log("JSON file regenerated");
  });
});