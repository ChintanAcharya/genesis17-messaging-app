module.exports = (db, config) => async (request, response, next) => {

    const path = request.route.path;
    const eventId = request.session.eventId;

    if (!request.session.isLoggedIn && path === '/login') {
        return next();
    }

    if (!request.session.isLoggedIn && path !== '/login') {
        return response.redirect('/login');
    }

    if (request.session.isAdmin) {
        if (path === '/' || path === '/login') {
            return response.redirect(`/admin`);
        }
        return next();
    }

    if (eventId != null && !path.startsWith('/admin')) {

        if (path.startsWith('/viewParticipants') || path.startsWith('/promote')) {
            if (eventId === request.params.id) {
                return next();
            }
            else {
                return response.render('notAllowed');
            }
        }

        if (path === '/' || path === '/login') {
            return response.redirect(`/viewParticipants/${eventId}`);
        }
    }
    else {
        request.session.error = "You are not logged in. Please log in to continue.";
        return response.render('notAllowed');
    }
    return;
};