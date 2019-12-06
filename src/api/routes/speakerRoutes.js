module.exports = function(app){
    const speaker = require('../controllers/speakerController');

    // Routes

    app.route('/speakers')
    .get(speaker.list_all_speakers)
    .post(speaker.create_speaker);
<<<<<<< HEAD
    
    app.route('/speakers/:id')
    .get(speaker.get_speaker);
=======

    app.route('/speakers/:id')
    .get(speaker.get_speaker)
    .put(speaker.update_speaker)
    .delete(speaker.delete_speaker);
>>>>>>> 53a244f2365f61180c790e6256bfbe9cd760f5ab
}