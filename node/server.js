'use strict';

const path = require('path');
const express = require('express');

const PORT = 80;
const HOST = '0.0.0.0';

const app = express();

app.use('/', express.static(path.join(__dirname, './nuxt/dist')));

app.listen(PORT, HOST);
console.log(`Server listening on http://${HOST}:${PORT}`);

