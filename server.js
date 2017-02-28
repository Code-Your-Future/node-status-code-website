const express = require('express');
const fetch = require('isomorphic-fetch');
const path = require('path');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

// add your routes here :)
app.get('/:code', (req,res)=>{
	const status = req.params.code;

    const p1 = `http://localhost:8080/code/${status}`;
    fetch(p1)
    .then(function(response) {
    	console.log(response);
      return response.json();

    })
    .then(function(response){
    	res.render('code',response);
    })

    .catch(function(){
    	console.log("Rejected promise")
    })

	
});

app.get('/', (req,res)=>{
	
    const p1 = `http://localhost:8080/code`;
    fetch(p1)
    .then(function(response) {
    	console.log(response);
      return response.json();

    })
    .then(function(response){
    	res.render('index',{'content':response});
    })

    .catch(function(){
    	console.log("Rejected promise")
    })

	
});

app.listen(4000);

module.exports = app;


