const assert = require('assert');

module.exports = () => (request, response) => {
    request.session.destroy((err) => {
        assert.equal(err, null, 'An error occured during session destruction');
        response.redirect('/');
    });
};