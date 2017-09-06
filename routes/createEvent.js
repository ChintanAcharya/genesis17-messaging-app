const passwordUtils = require('../utils/passwordUtils');
const crypto = require('crypto');

module.exports = (db, config) => async (request, response) => {
    const {username, password} = request.body;
    console.log({username, password});
    const salt = crypto.randomBytes(128).toString('base64');
    const iterations = Math.floor(Math.random() * 500) + 500;
    try {
        await db.collection('events').insertOne({
            _id: "TEST",
            username,
            password: {
                salt,
                iterations,
                hash: passwordUtils.encrypt(password, salt, iterations)
            }
        });
        response.json({success: true});
    }
    catch (error) {
        response.json(error);
    }
};