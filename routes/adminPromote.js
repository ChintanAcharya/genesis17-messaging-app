module.exports = (db, config) => (request, response) => {
    const {idList, dateTime, venue, id} = request.body;
    console.log({idList, dateTime, venue, id});
    response.json({});
};