const express = require('express');
const path = require('path');
const app = module.exports = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

// add your routes here :)
const fetch = require('isomorphic-fetch');

app.get('/:code', function(req, res, next) {
  const code = req.params.code;
  fetch(`http://localhost:8080/code/${code}`)
    .then(response => {
      if (response.status === 404) {
        res.status(404).end()
      } else {
        return response.json().then(data => {
          res.render('code', {
            title: 'Express',
            code: data.code,
            phrase: data.phrase,
            description: data.description
          });
        });
      }
    })
});

app.listen(4000);
