const express = require('express');
const fetch = require('isomorphic-fetch');
const path = require('path');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

// add your routes here :)
app.get('/:code', function (req,res) {
	const url = 'http://localhost:8080/code/' + req.params.code;
	const url2 = 'http://numbersapi.com/' + req.params.code;
	const promise1 = fetch(url).then((res) => res.json());
	const promise2 = fetch(url2).then((res) => res.text());
	Promise.all([promise1,promise2])
	.then(function ([json,text]) {
		res.render('code', {code:json})
	})
	.catch(function (err) {
		console.error(err)
	});
});

app.listen(4000);

module.exports = app;
