module.exports = (db, config) => async (request, response, next) => {
    const {username, password} = request.body;

    if(request.session.eventId === null || request.session.eventId === undefined) {
        request.session.error = 'You are not logged in. Please log in to continue.';
        response.redirect('/login');
    }
    else {
        next();
    }
};