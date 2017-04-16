var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const url = 'http://localhost:3000/westbrook.json';
const req = new XMLHttpRequest();
req.open('GET', url, true);
