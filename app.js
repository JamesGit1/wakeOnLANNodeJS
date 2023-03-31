const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = 3000;
var wol = require('wake_on_lan');


app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	next();
});

//pre-flight requests
app.options('*', function(req, res) {
	res.send(200);
});

server.listen(port, (err) => {
	if (err) {
		throw err;
	}
	/* eslint-disable no-console */
	console.log('Node Endpoints working :), open on port http://localhost:3000');
});

module.exports = server;

app.get('/', (err, res) => {
    res.json(200);
	res.status(200);
    console.log("/liveness request");// handle error
	res.end();
});

app.get('/wol', (err, res) => {
	res.status(200);
    wol.wake('2C:F0:5D:DB:83:F0', { address: "192.168.0.255" }, function(error) {
        if (error) {
            err = error;
            console.log("Failed to send packets");// handle error
        } else {
            console.log("Packets sent");// done sending packets
        }
    });
	res.end();
});