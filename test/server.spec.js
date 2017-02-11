const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const nock = require('nock');
const cheerio = require('cheerio');
const server = require('../server.js');

describe('HTML serving app', () => {

  // set up some mock endpoints using `nock`
	beforeEach(() => {
    // valid api endpoint, ok:
    nock('http://localhost:8080')
      .get('/code/200')
      .reply(200, {
        "code": "200",
        "phrase": "OK",
        "description": "\"indicates that the request has succeeded.\"",
        "spec_title": "RFC7231#6.3.1",
        "spec_href": "https://tools.ietf.org/html/rfc7231#section-6.3.1"
      });

    // invalid endpoint, not found:
    nock('http://localhost:8080')
      .get('/code/600')
      .reply(404);
	});

  afterEach(() => {
    nock.cleanAll();
  })

	it('has a \'/:code\' route', () => {
		return request(server)
			.get('/200')
			.expect(200);
	});

	it('calls the api with the correct code', () => {
		return request(server)
			.get('/200')
			.expect(200)
			.expect(() => {
				expect(nock.isDone());
			});
	});

	it('returns a 404 if there is no such code in the api', () => {
		return request(server)
			.get('/600')
			.expect(404)
			.expect(() => {
				expect(nock.isDone())
			});
	});


	it('renders templates that live in the views directory, and correctly renders the data into the view, too', () => {
    return request(server)
			.get('/200')
			.expect(200)
			.expect((res) => {
        const $ = cheerio.load(res.text);
        expect($('h1').text()).to.equal('200');
        expect($('h2').text()).to.equal('OK');
        expect($('.description').text()).to.equal('"indicates that the request has succeeded."');
        expect(nock.isDone());
      });
	});
});
