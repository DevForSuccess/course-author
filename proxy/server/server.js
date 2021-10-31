require('newrelic');
const express = require('express');
const cors = require('cors');
const path = require('path');

const axios = require('axios');
const redis = require('redis');
const redisClient = redis.createClient(6379);
redisClient.on('error', (err) => {
    console.log("Error " + err)
});

const app = express();
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const uiProxy = httpProxy.createProxyServer();

const authorAPIServers = ['http://3.188.57.115:8780', 'http://3.144.94.118:8080', 'http://3.15.228.199:4095'];
// const reviewsAPIServers = ['http://localhost:4001', 'http://localhost:4002'];
const UIServers = ['http://3.188.57.115:4095', 'http://3.144.94.118:4095', 'http://3.15.228.199:8080'];

const port = process.env.PORT || 5000;
app.use(express.static(__dirname + '/../client/public'));
app.use(cors());

/*app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'public', 'proxy.html'));
});*/

// app.get('/author?:authorId', function (req, res) {
let currentAuthorAPI = 0;
let currentReviewsAPI = 0;
let currentUIServer = 0;

require('events').EventEmitter.setMaxListeners(0);
app.get('/api/*', function (req, res) {
    const authorId = req.query.authorId;

    redisClient.get(authorId, (err, authorJson) => {
        if (err) {
            console.log('error from Cache: ', err);
        }

        if (authorJson) {
            return res.status(200).send(authorJson);
            // return res.json({ source: 'cache', data: JSON.parse(authorJson) })
        } else {
            const authorServer = authorAPIServers[currentAuthorAPI];
            currentAuthorAPI === (authorAPIServers.length - 1) ? currentAuthorAPI = 0 : currentAuthorAPI++;
            console.log(`proxying to Author API server: ${authorServer}`); // will affect load test
            // apiProxy.web(req, res, { target: authorServer });

            let option = {
                target: authorServer,
                selfHandleResponse: false
            };
            apiProxy.on('proxyRes', function (proxyRes, req, res) {
                let respData = [];
                proxyRes.on('data', function (chunk) {
                    respData.push(chunk);
                });
                proxyRes.on('end', function () {
                    respData = Buffer.concat(respData).toString();

                    // data expire time in 3600 seconds / 1 hr
                    redisClient.setex(authorId, 3600, respData);
                    // res.end("my response to cli");
                });
            });
            apiProxy.web(req, res, option);
            // when other API servers are available:
            /* const reviewsServer = reviewsAPIServers[currentAuthorAPI];
            currentAuthorAPI === (authorAPIServers.length - 1) ? currentAuthorAPI = 0 : currentAuthorAPI++;
            console.log(`proxying to Author API server: ${authorServer}`);
            apiProxy.web(req, res, { target: authorServer }); */
        }
    });
});

app.get('/*', function (req, res) {
    const server = UIServers[currentUIServer];
    currentUIServer === (UIServers.length - 1) ? currentUIServer = 0 : currentUIServer++;
    console.log(`proxying to Author UI server: ${server}`);
    uiProxy.web(req, res, { target: server });
});

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});