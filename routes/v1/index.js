const express = require('express');
const searchRoute = require('./search.route');
const docsRoute = require('./docs.route');

const router = express.Router();

router.use('/search', searchRoute);
router.use('/docs', docsRoute);

module.exports = router;
