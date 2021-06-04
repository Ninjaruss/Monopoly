const db = require("./connection.js");
const bcrypt = require("bcrypt");

const CREATE_SQL = "INSERT INTO users (name, password) VALUES($1, $2) RETURNING uid, name"
const create = (name, password) =>
    db.one(CREATE_SQL, [name.toLowerCase(), bcrypt.hashSync(password)]);

const FIND_BY_ID_SQL = "SELECT uid, name, password FROM users WHERE uid=$1"
const findById = (uid) =>
    db.one(FIND_BY_ID_SQL, [uid]);

const FIND_BY_NAME_SQL = 'SELECT * FROM users WHERE name=$1';
const findByName = name => db.any(FIND_BY_NAME_SQL, [name]);

const FIND_ID_BY_NAME_SQL = "SELECT uid FROM users WHERE name=$1"
const findIdByName = (name) =>
    db.one(FIND_ID_BY_NAME_SQL, [name]);

const FIND_BY_CREDS_SQL = "SELECT uid, name FROM users WHERE name=${name} and password=${password}"
const findByNameAndPassword = (name, password) =>
    db.one(FIND_BY_CREDS_SQL, { name, password });

module.exports = {
    create,
    findById,
    findByName,
    findByNameAndPassword,
    findIdByName
};