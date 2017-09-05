module.exports = (db, config) => async (request, response) => {
    const allEvents = await db.collection('events').find({}).toArray();
    response.render('admin', {events: allEvents});
};