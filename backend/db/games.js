const db = require("./connection.js");

const addGame = (cur_player,p1,p2,p3,p4) =>
    db.one(
        "INSERT INTO game (current_player,player_one,player_two,player_three,player_four) VALUES(cur_player,$1,$2,$3,$4) RETURNING gid",
        [cur_player,p1,p2,p3,p4]
    );

const getGame = (gid) =>
    db.one("SELECT * FROM users WHERE gid=$1", [gid]);

const addPropertyTxn = (property_id, pid, gid) =>
    db.one(
        "INSERT INTO game (property_id, pid, gid) VALUES($1,$2,$3) RETURNING property_id",
        [property_id, pid, gid]
    );

module.exports = {
    addGame,
    getGame,
    addPropertyTxn
};