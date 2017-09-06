module.exports = (db, config) => async (request, response) => {
    const eventId = request.params.id;
    const event = await db.collection('events').findOne({'_id': eventId});
    event.participants = event.participants
        .filter((participant) => (participant.round >= event.currentRound))
        .map((participant) => {
            participant.delivered = participant.status === 'D';
            return participant;
        })
        .sort((participant) => participant.delivered ? 1 : 0);
    const isFinalRound = event.currentRound >= event.maxRounds;
    response.render('participantsList', {event, isFinalRound});
};