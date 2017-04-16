const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const express = require('express');
const app = express();
const url = 'http://localhost:3000/hello.json';
const req = new XMLHttpRequest();
req.open('GET', url, true);
req.addEventListener('load', function() {
	if (req.status >= 200 && req.status < 400) {
		const messages = JSON.parse(req.responseText);
		messages.forEach(function(obj) {
			document.body.appendChild(
				document.createElement('div')).
				textContent = obj.message;
		});
	}
});
req.send();
app.listen(process.env.PORT || 3000);
