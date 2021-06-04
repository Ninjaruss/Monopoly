const db = require("./connection.js");

const addPlayer = (gid,uid,balance,position,property_id) =>
    db.one(
        "INSERT INTO player (gid,uid,balance,position,jail_cards) VALUES($1, $2, $3, $4, $5) RETURNING pid",
        [gid,uid,balance,position,property_id]
    );

const findByPid = (pid) =>
    db.one("SELECT * FROM player WHERE pid=$1", [pid]);

const findPositionByPidAndGid = (pid, gid) => {
    db.one(
        "SELECT position FROM player WHERE pid=${pid} and gid=${gid}",
        { pid, gid }
    );
};

const findBalanceByPidAndGid = (pid, gid) =>
    db.one(
        "SELECT balance FROM player WHERE pid=${pid} and gid=${gid}",
        { pid, gid }
    );

const setBalanceByGidAndPid = (gid, pid, balance) =>
    db.one(
        "UPDATE player SET balance = ${balance} WHERE pid=${pid} and gid=${gid}",
        { gid, pid, balance}
    );

const findPropertylistByPidAndGid = (pid, gid) => {
    return db
        .any("SELECT property_id FROM property_txn WHERE pid=${pid} and gid=${gid} ", [pid, gid])
        .then((rows) => {
            if (rows.length === 0) {
                return Promise.reject(`There is no property for PID =  ${pid} and GameID =  ${gid}`);
            } else {
                return rows[0];
            }
        })
        .catch((error) => {
            throw error;
        });
};

module.exports = {
    addPlayer,
    findByPid,
    findPositionByPidAndGid,
    findBalanceByPidAndGid,
    setBalanceByGidAndPid,
    findPropertylistByPidAndGid
};