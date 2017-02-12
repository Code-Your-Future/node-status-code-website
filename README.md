# Node status code webiste

### Get started:
```bash
git clone https://github.com/Code-Your-Future/node-status-code-website.git
npm install
npm test
```

## Goal

The goal is to write a web application that displays information about different HTTP status codes. When you navigate to http://localhost:4000/200, you should see a web page that tells you that the HTTP status code `200` means `OK`.

You need to fetch the information from an API, which you have built yourself. The repository for the status code API is [Code-Your-Future/node-status-code-api](https://github.com/Code-Your-Future/node-status-code-api).

### Steps

To achieve this goal, you'll have to complete the following steps.

1. Make an Express route that accepts a status code as a parameter.
2. In the route endpoint, fetch the status code data from the API
3. Render the page using the [Handlebars](http://handlebarsjs.com/) template in [views/code.hbs](views/code.hbs). The Handlebars [renderer](https://expressjs.com/en/api.html#app.render) has been already configured.

### TDD

This repository contains a set of tests, which check that the app works correctly. Run `npm test` to check if things work as expected. When the application works correctly, you should see something like:
```
HTML serving app
  ✓ has a '/:code' route
  ✓ calls the api with the correct code
  ✓ renders templates that live in the views directory, and correctly renders the data

3 passing (121ms)
```

## Homework

Currently, when you navigate to http://localhost:4000, you're greeted with a rude `Cannot GET /`. Your job is to make an index page that lists all the available status codes... as cats.

![ok](https://http.cat/200)

### Steps

#### 1. New API: `/code`

Create a new endpoint http://localhost:8080/code in [Code-Your-Future/node-status-code-api](https://github.com/Code-Your-Future/node-status-code-api) that returns a list of status `code`s and `phrase`s. For each status code object in the list, dynamically add a new field `image`, that points to the corresponding status code in the https://http.cat service, so that the response becomes: 

```js
[
  {
    "code": "200",
    "phrase": "OK",
    "image": "https://http.cat/200"
  },
  {
    "code": "201",
    "phrase": "Created",
    "image": "https://http.cat/201"
  },
  ...
]
```

#### 2. New template: `index`

Create a new [Handlebars](http://handlebarsjs.com/) template in the website repository that displays the code, phrase and the cat image for each object in the response. Clicking the cat should take the user to the corresponding status detail page.

#### 3. New Website Route: `/`:

Create a new route `/` in the website that fetches the cats from the new API endpoint defined in step 1, and renders them using the template created in step 2.

## Stretch goals

To make the website doubly awesome, consider doing one or more of the following stretch homework goals:

1. Write tests for the new API endpoint and the website route
2. Make the cat index page into a responsive grid using Flexbox CSS
3. Write a `/search/?query=...` endpoint that receives a query parameter and returns a list of all status codes whose `phrase` partially matches the query, e.g. `/search/?query=bad` should return `400 Bad Request` and `503 Bad Gateway`.
