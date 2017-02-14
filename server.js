const express = require('express');
const fetch = require('isomorphic-fetch');
const path = require('path');
const request = require('request');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

// add your routes here :)
app.get('/:code', (req, res) => {

  const { code } = req.params;

  request(`http://localhost:8080/code/${code}`, (error, response, body)=>{
    console.log('requested', {error, body});
    if(!error && response.statusCode === 200) {
      const parsed = JSON.parse(body);
      if(parsed === {}) {return}
      return res.render('code', parsed);
    }
  })
  });

app.listen(4000);

module.exports = app;
