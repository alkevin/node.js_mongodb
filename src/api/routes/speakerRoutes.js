module.exports = function(app){
    const speaker = require('../controllers/speakerController');

    // Routes

    app.route('/speakers')
    .get(speaker.list_all_speakers)
    .post(speaker.create_speaker);
}