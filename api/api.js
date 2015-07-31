var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/user.js');
var jwt = require('./services/jwt.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');

var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	next();
});

var loginStrategy = new LocalStrategy({
	usernameField: 'email'
}, function (email, password, done) {
	var searchUser = {
		email: email
	};

	User.findOne(searchUser, function (err, user) {
		if (err) {
			return done(err);
		}

		if (!user) {
			return done(null, false, {message: 'Wrong email/password'}); 
		}

		user.comparePasswords(password, function (err, isMatch) {
			if (err) {
				return done(err);
			}

			if (!isMatch) {
				return done(null, false, {message: 'Wrong email/password'}); 
			}

			return done(null, user);
		});
	});
});

var registerStrategy = new LocalStrategy({
	usernameField: 'email'
}, function (email, password, done) {
	var searchUser = {
		email: email
	};

	User.findOne(searchUser, function (err, user) {
		if (err) {
			return done(err);
		}

		if (user) {
			return done(null, false, {message: 'User allready exists'}); 
		}

		var newUser = new User({
			email: email,
			password: password
		});

		newUser.save(function (err) {
			if (err) {
				return done(err);
			}

			return done(null, newUser);
		});
	});
});

passport.use('local-register', registerStrategy);
passport.use('local-login', loginStrategy);

app.post('/api/register', passport.authenticate('local-register'), function (req, res) {
	createAndSendToken(req.user, res);
});

app.post('/api/login', passport.authenticate('local-login'), function (req, res) {
	createAndSendToken(req.user, res);
});

function createAndSendToken (user, res) {
	var payload = {
		sub: user.id
	};

	var token = jwt.encode(payload, 'LKJLK&&*DSJF&*(');

	res.status(200).send({
		user: user.toJSON(),
		token: token
	});
}

var jobs = [
	'Cook',
	'SuperHero',
	'Toast Inspector'
];

app.get('/api/jobs', function (req, res) {
	if (!req.headers.authorization) {
		return res.status(401).send({message: 'You are not authorized'});
	}

	var token = req.headers.authorization.split(' ')[1];
	var payload = jwt.decode(token, 'LKJLK&&*DSJF&*(');

	if (!payload.sub) {
		return res.status(401).send({message: 'Authentication failed'});
	}  

	res.json(jobs);
});

app.post('/api/auth/google', function (req, res) {
	var params = {
		code: req.body.code,
		client_id: req.body.clientId, // '958858990567-cvvik866sm852s3virfe4jqi4ucti4mv.apps.googleusercontent.com',
		client_secret: '7p5ibRZSgk-rEpYfgKtcy5qJ',
		redirect_uri: req.body.redirectUri, // 'http://localhost:9000/',
		grant_type: 'authorization_code'
	};

	var url = 'https://www.googleapis.com/oauth2/v3/token';
	var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect'; // userId?access_token=1/fFBGRNJru1FQd44AzqT3Zg


	request.post(url, {
		json: true,
		form: params
	}, function (err, response, token) {
		var accessToken = token.access_token;
		var headers = {
			Authorization: 'Bearer ' + accessToken
		};
		var userId = token.user_id;

		request.get(apiUrl, {
			headers: headers,
			json: true
		}, function (err, response, profile) {
			User.findOne({
				googleId: profile.sub
			}, function (err, foundUser) {
				if (foundUser) {
					return createAndSendToken(foundUser, res);
				} else {
					var newUser = new User({
						email: profile.email,
						googleId: profile.sub,
						displayName: profile.name
					});

					newUser.save(function (err) {
						return createAndSendToken(newUser, res);
					});
				}
			});
		});
	});
});

mongoose.connect('mongodb://localhost/psjwt');

var server = app.listen(3000, function () {
	console.log('listening on', server.address().port);
});

// console.log(jwt.encode('hi', 'secret'));
