const express = require('express');
const router = express.Router();

const socket = require('../../socket');
const GamesDB = require('../../db').GamesDB;
const PlayersDB = require('../../db').PlayersDB;


router.get('/', (_, response) => {
    GamesDB.findAll()
        .then(games => response.json(games))
        .catch(error => response.json({ error }));
});

router.post('/create', (request, response) => {
    GamesDB.create(request.user.id)
});

const checkIfInGame = (users, userId) => users.find(user => user.id === userId);

router.get('/:id', function(request, response) {
    const { id: gameId } = request.params;
    const { id: userId } = request.user;

    GamesDB.find(gameId).then(({ users }) => {
        if (checkIfInGame(users, userId)) {
            response.render('authenticated/games/index', { id: gameId, users });
        } else if (users.length === 2) {
            // Two people are already in this game
            response.redirect('/lobby');
        } else {
            GamesDB.join(gameId, userId).then(({ users }) =>
                response.render('authenticated/games/index', { id: gameId, users })
            );
        }
    });
});

module.exports = router;