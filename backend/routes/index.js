const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(_request, response) {
  response.render('unauthenticated/index', {
    unauthenticatedRoutes: [
      { name: 'Site Landing', uri: '/' },
      { name: 'User Registration', uri: '/users/register' },
      { name: 'User Login', uri: '/users/login' }
    ],
    authenticatedRoutes: [
      { name: 'Lobby', uri: '/lobby' },
      { name: 'Game Lobby 5 (Authenticated)', uri: '/games/5' }
    ]
  });
});

module.exports = router;
