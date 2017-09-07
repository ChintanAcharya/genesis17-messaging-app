module.exports = (db, config) => async (request, response) => {
    const eventId = request.params.id;
    const event = await db.collection('events').findOne({'_id': eventId});
    event.participants = event.participants
        .filter((participant) => (participant.round >= event.currentRound))
        .map((participant) => {
            participant.delivered = participant.status === 'D';
            return participant;
        })
        .sort((a, b) => a.name > b.name ? 1 : -1);
        // .sort((participant) => participant.delivered ? 1 : -1);
    const isFinalRound = event.currentRound >= event.maxRounds;
    response.render('participantsList', {event, isFinalRound});
};