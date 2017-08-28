const passwordUtils = require('../utils/passwordUtils');

module.exports = (db, config) => async (request, response) => {
    const {username, password} = request.body;
    const renderLoginError = () => {
        response.locals.error = 'Invalid username or password';
        response.render('login');
    };
    try {
        const event = await db.collection('events').findOne({username});
        if (event === null) {
            renderLoginError();
        }
        else {
            const {hash, salt, iterations} = event.password;
            if (hash === passwordUtils.encrypt(password, salt, iterations)) {
                request.session.eventId = event._id;
                response.redirect('/viewParticipants');
            }
            else {
                renderLoginError();
            }
        }
    }
    catch (error) {
        console.log(error);
        response.render('error');
    }
};