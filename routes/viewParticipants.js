const ObjectId = require('mongodb').ObjectId;

module.exports = (db, config) => async (request, response) => {
    const eventId = request.session.eventId;
    const event = await db.collection('events').findOne({'_id': ObjectId(eventId)});
    event.participants = event.participants.filter((participant) => (participant.round >= event.currentRound));
    response.render('participantsList', {event});
};