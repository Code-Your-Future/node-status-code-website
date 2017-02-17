const express = require('express');
const fetch = require('isomorphic-fetch');
const path = require('path');

const app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

// add your routes here :)
app.get('/:code', function(req, res){
	const code = req.params.code;
	const fetchPromises = Promise.all([
		fetch('http://numbersapi.com/'+code), 
		fetch('http://localhost:8080/code/'+code)
	]);
		fetchPromises.then(responses => {
			return Promise.all([responses[0].text(), responses[1].json()]);
		})
		.then(responses =>{
			const viewData = responses[1];
			viewData.numberFact = responses[0];
			res.render('code', viewData);
		});
});

app.get('/', function(req, res){
	const APIRequest =`http://localhost:8080/code`;
	fetch(APIRequest)
		.then(response=>{
			return response.json();
		})

		.then(response=>{
			res.render('index',{'content':response});
		})

		.catch(function(){
			console.log('Oh Oh, You promised! But you failed to deliver!')
		})
});


app.listen(4000);

module.exports = app;
