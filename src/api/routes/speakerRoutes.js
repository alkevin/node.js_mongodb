module.exports = function(app){
    const speaker = require('../controllers/speakerController');

    // Routes

    app.route('/speakers')
    .get(speaker.list_all_speakers)
    .post(speaker.create_speaker)
    .delete(speaker.delete_all_speakers);

    app.route('/speakers/:id')
    .get(speaker.get_speaker)
    .put(speaker.update_speaker)
    .delete(speaker.delete_speaker);
}