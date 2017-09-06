module.exports = (db, config) => async (request, response) => {
    const {number, status, customID, datetime} = request.body;
    console.log(request.body);
    try {
        const result = await db.collection('events').findOneAndUpdate(
            {_id: customID, 'participants.number': number.slice(2)},
            {'$set': {'participants.$.status': status, 'participants.$.lastDelivered': datetime}}
        );
        response.json({});
    }
    catch (err) {
        console.log(err);
        response.json({});
    }
};