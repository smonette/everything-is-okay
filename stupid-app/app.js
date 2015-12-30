var fs = require("fs");
var config = require("./config.json");
var lastrun = new Date();
var archive = require(config.archive_filename);

function refreshFile() {
    /*
        Refreshes the archive so you don't have to restart the server if/when everything-is-okay.json changes.
        I'm sure there's better ways to do this, but I'm not really interested in making `npm install explosions` a dependency or whatever
        Don't judge me.
    */
    fs.readFile(config.archive_filename, "utf8", function (err, data) {
        if(err) {
           throw err;
        }

        archive = JSON.parse(data);
    });

    console.log("Archive refreshed at:" + (new Date()).toISOString());
}

function returnLink() {
    var currentTime = new Date();

    if( (currentTime - lastrun) > config.update_interval ) {
        /*
            This works. Shut up.
        */
        lastrun = currentTime;
        refreshFile();
    }

    var keys = Object.keys(archive);
    var category = keys[Math.floor(Math.random() * keys.length)];
    return archive[category][Math.floor(Math.random() * archive[category].length)];
}


var http = require("http").createServer((req, res) => {
    var link = returnLink();

    if(config.slack_response) {
        var payload = {
            response_type: "in_channel",
            text: link.url,
            attachments: [
                {
                    text: link.title
                }
            ]
        };

        res.writeHead(200, {"Content-Type":"application/json"});
        res.end(JSON.stringify(payload));
    } else {
        res.writeHead(200, {"Content-Type":"text/plain"});
        res.end(link.url);
    }
});

http.listen(config.port, config.hostname, () => {
    console.log("Created at " + config.hostname + ":" + config.port);
});