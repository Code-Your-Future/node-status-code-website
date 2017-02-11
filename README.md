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
