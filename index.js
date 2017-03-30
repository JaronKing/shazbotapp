'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 3000, () => {
	console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

var phrases = [
    "What the fu-la la la la…",
    "Mother Function!",
    "Fork my life!",
    "Oh, sheep!",
    "Oh ship!",
    "Heck and double heck!",
    "H E double hockey sticks!!",
    "Great Scott!",
    "Son of a biscut!",
    "Aw, duck water!",
    "Oh, snap!!",
    "Cheeses!",
    "Shnookerdookies!",
    "Fudge nuggets!",
    "Cheese and rice!",
    "Sugar!",
    "God bless America!",
    "Poo!",
    "Snickerdoodle!",
    "Banana shenanigans!",
    "God bless it!",
    "Barbara Streisand!",
    "Fiddlesticks!",
    "Jiminy Crickets!",
    "Son of a gun!",
    "Egad!",
    "Great Scott!",
    "Caesar’s ghost!",
    "Merlin’s beard!",
    "Merlin’s pants!",
    "Shucks!",
    "Darn!",
    "Dagnabbit!",
    "Dang rabbit!",
    "Dadgummit!",
    "Jumpin’ Jiminy!",
    ];

var gifs = [
	"https://media.giphy.com/media/6xgslyYQCyLa8/giphy.gif",
	"https://68.media.tumblr.com/2b682a0442036ac269add89eb7cd4298/tumblr_nfwlqxsnAW1rdhesho1_500.gif",
	"https://media.tenor.co/images/b2c7523fc03acb3fe72cd25cb508a0e4/tenor.gif",
	"http://www.gifimagesdownload.com/wp-content/uploads/2015/12/in-office-angry-gif.gif",
	"https://media.giphy.com/media/3o7btNRTJ700Vzmn5e/giphy.gif",
	"http://i.amz.mshcdn.com/DeI57VKBfipUr6JjqZzIFXihsGQ=/fit-in/1200x9600/http%3A%2F%2Fmashable.com%2Fwp-content%2Fuploads%2F2013%2F06%2FGlee1.gif",
	"https://media.giphy.com/media/3t7RAFhu75Wwg/giphy.gif",
	"https://media.giphy.com/media/Vi4MRwWi9sYpi/giphy.gif",
	"https://media.tenor.co/images/06b541ddcc394662ce464b76fd244723/raw",
	"https://media.tenor.co/images/a9ec8aa4116064b54546caebf893983c/raw",
	"http://i.amz.mshcdn.com/FCP-M5EriZwBy9jJnZnVh7Liuak=/fit-in/1200x9600/http%3A%2F%2Fmashable.com%2Fwp-content%2Fuploads%2F2013%2F06%2FJack-Nicholson.gif",
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

	var phrase = phrases[Math.floor(Math.random() * phrases.length)];
	var gif = gifs[Math.floor(Math.random() * gifs.length)];
	let data = {
		response_type: 'in_channel',
		text: phrase,
		attachments:[{
			image_url: gif
		}]
	};
	res.send(data);
});

app.post('/', (req, res) => {
	let text = req.body.text;

	var phrase = phrases[Math.floor(Math.random() * phrases.length)];
	var gif = gifs[Math.floor(Math.random() * gifs.length)];
	let data = {
		response_type: 'in_channel',
		text: phrase,
		attachments:[{
			image_url: gif
		}]
	};
	res.send(data);
});
