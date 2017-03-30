'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 3000, () => {
	console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

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
	"https://media.giphy.com/media/93rI3szziYMYo/giphy.gif",
	"http://gifsec.com/wp-content/uploads/GIF/2014/03/GIF-angry-eating-Jim-Carrey-GIF.gif",
	"https://media.giphy.com/media/CFJqC6fgQF4pG/giphy.gif",
	"http://i.amz.mshcdn.com/oQBfuMbLt2T-lrKgOea8_5Va9gQ=/fit-in/1200x9600/http%3A%2F%2Fmashable.com%2Fwp-content%2Fuploads%2F2013%2F06%2FPuck.gif",
	"https://media.giphy.com/media/IBrEuWDXv8YFi/giphy.gif",
	"http://replygif.net/i/508.gif",
	"https://m.popkey.co/2773f7/x0gW_f-maxage-0_s-200x150.gif",
	"https://media.giphy.com/media/86z85o67IlrfW/giphy.gif",
	"http://www.reactiongifs.com/wp-content/uploads/2013/08/When-people-who-ordered-after-you-get-their-food-first.gif",
	"https://media.tenor.co/images/c644bc371503281b2cbdf27e8e519bb6/tenor.gif",
	"https://media.giphy.com/media/bMPByeN1wNfG0/giphy.gif",
	"https://media.giphy.com/media/Ons20c6l2kbqE/giphy.gif",
	"https://media.giphy.com/media/11tTNkNy1SdXGg/giphy.gif",
	"http://i.imgur.com/T91p2.gif",
	"https://media.giphy.com/media/BcBywHkNgAvCg/giphy.gif",
	"https://media.giphy.com/media/y1WDIwAZRSmru/giphy.gif",
	"https://media.giphy.com/media/l3978hPCi5iREQk5W/giphy.gif",
	"http://media0.giphy.com/media/q36qdXIrZW7w4/giphy.gif",
	"http://www.reactiongifs.com/r/2013/12/angry.gif",
	"https://media.giphy.com/media/pgHJTBBlrNXEs/giphy.gif",
	"http://now-here-this.timeout.com/wp-content/uploads/2014/01/anigif_enhanced-buzz-30742-1380680075-0.gif",
	"https://media.tenor.co/images/e10e5308ce2367190c42d1f1d0961b45/tenor.gif",
	"https://media.giphy.com/media/d7ocRlySc8dxe/giphy.gif",
	"http://i2.cdn.turner.com/money/dam/assets/150529155406-facebook-gif-7-custom-1.gif",
	"http://stream1.gifsoup.com/view3/2176641/shirley-temple-angry-o.gif",
	];
