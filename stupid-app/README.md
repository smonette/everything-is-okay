# A silly little web thinger

All this does is it pseudo-randomly selects an item from `everything-is-okay.json` and spits out a link.

## Running it

* Clone the repo
* `npm install`
* `npm start`

## Other things

* I threw this together pretty quickly, but I put some stuff in `config.json` for the purpose of configuration.
  * `hostname` -- this is kind of a misnomer, but you can bind to whatever network IP you specify here
  * `port` -- You can bind to whatever port you feel like
  * `archive_filename` -- In the event you want to use your own JSON archive, then specify the filename
  *  `update_interval` -- I didn't want to have to restart the server to update the archive, so the application will update itself upon a request after this value in seconds
  * `slack_response` -- set this to `true` if you want a JSON response that works in Slack.
