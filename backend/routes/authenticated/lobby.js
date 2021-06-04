const express = require('express');
const router = express.Router();


router.get('/', function(_, response) {
    // response.render('authenticated/lobby', { title: 'Express' });
});

module.exports = router;