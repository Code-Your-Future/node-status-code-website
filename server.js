const express = require('express');
const fetch = require('isomorphic-fetch');
const path = require('path');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

// add your routes here :)

app.get('/:code', (req, res) => {
  const url = `http://localhost:8080/code/${req.params.code}`;
  const url2 = `http://numbersapi.com/${req.params.code}`;
  const promise1 = fetch(url).then(resp => resp.json());
  const promise2 = fetch(url2).then(resp => resp.text());
  Promise.all([promise1, promise2])
  .then(([json, txt]) => {
    res.render('code', { code: json, text: txt });
  })
  .catch((err) => {
    console.error(err);
  });
});

app.get('/', (req, res) => {
  const url = 'http://localhost:8080/code';
  fetch(url, {
    method: 'GET',
  })
  .then((apiRes) => {
    apiRes.json()
      .then((json) => {
        res.render('index', { codes: json });
      });
  })
  .catch((err) => {
    console.error(err);
  });
});

app.listen(4000);

module.exports = app;

