const express = require('express');
const fetch = require('isomorphic-fetch');
const path = require('path');

const badCode = ['203','205','226','407','501','505','308','102','428'];

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/search/', (req, res) => {
  const query = req.query.phrase;  
  fetch(`http://localhost:3000/search/${query}`)
  .then(response => response.json())
  .then((codes) => {
    const queryResult = codes.filter(({ code, phrase, description }) => (
      { code, phrase, description }));
    res.render('queryResult', { result: queryResult })
  })
  .catch(() => res.send('<h3>Invalid Query, Page not found !<h3>'));
});

app.get('/:code', (req, res) => {
  const code = req.params.code;
  const promise1 = fetch(`http://localhost:3000/code/${code}`)
  .then(response => response.json());
  const promise2 = fetch(`http://numbersapi.com/${code}`)
  .then(response => response.text());

  Promise.all([promise1, promise2])
  .then((arr) => {
    res.render('code', {  'code': arr[0].code, 
                          'phrase': arr[0].phrase,
                          'description': arr[0].description, 
                          'fact': arr[1] 
                        });
  }).catch(() => res.send('<h3>Invalid Query, Page not found !<h3>'));
});

app.get('/', (req, res) => {
  const rootEndPoint= 'http://localhost:3000/';
  fetch(`${rootEndPoint}code`)
  .then(response => response.json())
  .then((allCode) => {    
    const filterCode = allCode.filter((status) => {
      const pruneCode = status.code.substring(1);
      const matchResult = badCode.indexOf(status.code);
      return matchResult === -1 && pruneCode != 'xx'; 
    });  
    res.render('index', {'rootEndPoint' : rootEndPoint, 'content' : filterCode });
  }).catch(() => res.send('<h3> Page not found </h3>'));
});

app.listen(4000);

module.exports = app;
