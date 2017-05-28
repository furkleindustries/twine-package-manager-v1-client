const express = require('express');
const compression = require('compression');
const next = require('next');
const { parse, } = require('url');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(express.static(path.join(__dirname, 'static')));

    server.use(compression());

    server.get('/service-worker.js', (req, res) => {
        res.sendFile(path.resolve('./.next/service-worker.js'));
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(3000, (err) => {
        if (err) {
            throw err;
        }
        
        console.log('> Ready on http://localhost:3000');
    });
})