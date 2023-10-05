'use strict';

let express = require('express');
let router = express.Router();
const transaction = require('./transaction');
const fruits = require('./fruits');

router.use('/transaction', transaction);
router.use('/fruits', fruits);

module.exports = router;