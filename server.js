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
  const localhostUrl = `http://localhost:8080/code/${req.params.code}`;
  const numbersApiUrl = `http://numbersapi.com/${req.params.code}`;
  const localhostUrlPromise = fetch(localhostUrl).then(resp => resp.json());
  const numbersApiUrlPromise = fetch(numbersApiUrl).then(resp => resp.text());
  Promise.all([localhostUrlPromise, numbersApiUrlPromise])
  .then(([json, txt]) => {
    res.render('code', { code: json, text: txt });
  })
  .catch((err) => {
    console.error(err);
  });
});

app.get('/', (req, res) => {
  const localhostUrl = 'http://localhost:8080/code';
  fetch(localhostUrl, {
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

app.get('/search/:search', (req, res) => {
  const matching = req.params.search;
  const filtervalue = new RegExp(matching, 'i');
  const localhostUrl = 'http://localhost:8080/code';
  fetch(localhostUrl, {
    method: 'GET',
  })
  .then((apiRes) => {
    apiRes.json()
      .then((json) => {
        const data = json.filter(value => value.phrase.match(filtervalue));
        res.render('index', { codes: data });
      });
  })
  .catch((err) => {
    console.error(err);
  });
});

app.listen(4000);

module.exports = app;
