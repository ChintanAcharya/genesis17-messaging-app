module.exports = (db, config) => async (request, response) => {
    const eventId = request.params.id;
    const event = await db.collection('events').findOne({'_id': eventId});
    event.participants = event.participants.filter((participant) => (participant.round >= event.currentRound));
    response.render('participantsList', {event});
};