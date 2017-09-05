const httpRequest = require('request-promise-native');

module.exports = (db, config) => async (request, response) => {
    const eventId = request.params.id;
    const idList = request.body.idList.split(',').map(e => +e);
    const {venue, dateTime} = request.body;
    const event = await db.collection('events').findOne({'_id': eventId});
    if (event == null) {
        return response.render('error');
    }
    const {test, username, hash, sender} = config.sms;
    const participants = event.participants;

    idList.forEach((id) => {
        participants[id].round += 1;
        participants[id].status = '?';
    });

    const message = `Dear participant, please be present for round ${event.currentRound + 1} of ${event.name}at ${venue}, ${dateTime}.`;
    console.log(message);
    const numbers = participants.filter(p => p.round === event.currentRound + 1).map(p => p.phone).join(',');
    console.log(numbers);
    const responseBody = await httpRequest.post({
        url: 'http://api.textlocal.in/send',
        form: {
            numbers,
            test,
            username,
            hash,
            sender,
            custom: event._id,
            receipt_url: config.receipt_url,
            message
        }
    });
    console.log(responseBody);
    await db.collection('events').updateOne(
        {'_id': eventId},
        {
            '$set': {
                participants: participants
            },
            '$inc': {
                currentRound: 1
            }
        }
    );
    if (request.session.isAdmin) {
        response.redirect('/admin');
    }
    else {
        response.redirect(`/viewParticipants/${eventId}`);
    }
};