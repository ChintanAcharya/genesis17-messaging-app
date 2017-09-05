module.exports = (db, config) => async (request, response, next) => {
    const {username, password} = request.body;

    if (!request.session.isLoggedIn) {
        return response.redirect('/login');
    }

    if (request.session.isAdmin) {
        return next();
    }

    const path = request.route.path;
    const eventId = request.session.eventId;

    if (eventId != null && !path.startsWith('/admin')) {

        if (path.startsWith('/viewParticipants') || path.startsWith('/promote')) {
            if (eventId === request.params.id) {
                next();
            }
            else {
                response.render('notAllowed');
            }
        }
    }
    else {
        request.session.error = "You are not logged in. Please log in to continue.";
        response.render('notAllowed');
    }
};