const express = require('express');
const fetch = require('isomorphic-fetch');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/:code', (req, res) => {
  const code = req.params.code;
  const promise1 = fetch('http://localhost:3000/code/' + code)
  .then(response => response.json());
  const promise2 = fetch('http://numbersapi.com/' + code)
  .then(response => response.text());

  Promise.all([promise1, promise2])
  .then((arr) => {
    res.render('code', { 
      'code': arr[0].code, 
      'phrase': arr[0].phrase,
      'description': arr[0].description, 
      'fact': arr[1] 
    });
  })
  .catch(() => {
    res.send('Invalid Query, Page not found !');
  });
});

app.get('/', (req, res) => {
  fetch('http://localhost:3000/code')
  .then(response => response.json())
  .then((allCode) => {
    //res.send(allCode);
    res.render('index', { 'content': allCode });
  });
});

app.listen(4000);

module.exports = app;
