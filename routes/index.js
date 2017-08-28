module.exports = (db, config) => (req, res) => {
    res.render('index', {title: 'Express'});
};