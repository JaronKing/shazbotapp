'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 3000, () => {
	console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

var phrasees = [
    "What the fu-la la la la….",
    "Mother Function",
    "Fork my life",
    "Oh, sheep",
    "Oh ship",
    "Heck and double heck",
    "H E double hockey sticks!",
    "Great Scott",
    "Son of a biscut",
    "Aw, duck water",
    "Oh, snap!",
    "Cheeses",
    "Shnookerdookies",
    "Fudge nuggets",
    "Cheese and rice",
    "Sugar",
    "God bless America",
    "Poo",
    "Snickerdoodle",
    "Banana shenanigans",
    "Six and two is eight",
    "God bless it",
    "Barbara Streisand",
    "Fiddlesticks",
    "Jiminy Crickets",
    "Son of a gun",
    "Egad",
    "Great Scott",
    "Caesar’s ghost",
    "Merlin’s beard",
    "Merlin’s pants",
    "Shucks",
    "Darn",
    "Dagnabbit",
    "Dang rabbit",
    "Dadgummit",
    "Jumpin’ Jiminy",
    ];

// Auth

app.get('/slack', function(req, res){
	var data = {form: {
		client_id: process.env.SLACK_CLIENT_ID,
		client_secret: process.env.SLACK_CLIENT_SECRET
	}};
	request.post('https://slack.com/api/oauth.access', data, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			// Get an auth token
			let token = JSON.parse(body).access_token;

			// Get the team domain name to redirect to the team URL after auth
			request.post('https://slack.com/api/team.info', {form: {token: token}}, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					if(JSON.parse(body).error == 'missing_scope') {
						res.send('HTTP Status Cats has been added to your team!');
					} else {
						let team = JSON.parse(body).team.domain;
						res.redirect('http://' +team+ '.slack.com');
					}
				}
			});
		}
	})
});


app.get('/', (req, res) => {
	let text = req.body.text;

	var phrase = phrasees[Math.floor(Math.random() * phrasees.length)];
	res.send(phrase)
});
