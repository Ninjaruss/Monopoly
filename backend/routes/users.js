const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken")
const UsersDB = require("../db").UsersDB;

const jwtKey = "my_secret_key"
const jwtExpirySeconds = 300


router.post('/login', (request, response) => {
    const { username, password } = request.body;
    const user = UsersDB.findByName(username)
    const uid = UsersDB.findIdByName(username)

    if (!username || !password || user.password !== password) {
        // return 401 error is username or password doesn't exist, or if password does
        // not match the password in our records
        return response.status(401).end();
    }

    // Create a new token with the username in the payload
    // and which expires 300 seconds after issue
    const token = jwt.sign({ username }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
    });
    console.log("token:", token);

    // set the cookie as the token string, with a similar max age as the token
    // here, the max age is in milliseconds, so we multiply by 1000
    response.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 });
    response.send({ token })
    response.send({ uid})
    response.end();
});

router.post('/register', (request, response) => {
    const { username, password } = request.body;

    response.json({ error: err.message });


    UsersDB.findByName(username)
        // TODO: need to migrate users table
        .then(users => {
            if (users.length !== 0) {
                throw new Error('A user is already registered with that username');
            }
        })
        .then(() => {
            return UsersDB.create(username, password);
        })
        .then(user => {
            request.login(request.body, error => {
                if (error) {
                    throw error;
                }
            });
        })
        .catch(function(err) {
            response.json({ error: err.message });
            return response.status(400).end();
        });
});

router.get('/welcome', (request, response) => {
    // We can obtain the session token from the requests cookies, which come with every request
    const token = request.cookies.token;

    // if the cookie is not set, return an unauthorized error
    if (!token) {
        return response.status(401).end()
    }

    var payload;
    try {
        // Parse the JWT string and store the result in `payload`.
        // Note that we are passing the key in this method as well. This method will throw an error
        // if the token is invalid (if it has expired according to the expiry time we set on sign in),
        // or if the signature does not match
        payload = jwt.verify(token, jwtKey);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            // if the error thrown is because the JWT is unauthorized, return a 401 error
            return response.status(401).end()
        }
        // otherwise, return a bad request error
        return response.status(400).end()
    }

    // Finally, return the welcome message to the user, along with their
    // username given in the token
    response.send(`Welcome ${payload.username}!`)
});

module.exports = router;