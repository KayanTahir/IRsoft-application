var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var publicThings = require('./publicThings.js');
var users = require('./users.js');
var app;
var router;
var port = 3000;
app = express();

app.use(morgan('combined')); //logger
app.use(bodyParser.json());

router = express.Router();
router.get('/public_Things', publicThings.get);

app.use('/api', router);

app.listen(port, function() {
    console.log('Web server listening on localhost:' + port);
});