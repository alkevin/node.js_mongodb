module.exports = function(app){
    const lesson = require('../controllers/lessonController');

    // Routes
    app.route('/lessons')
    .get(lesson.list_all_lessons)
    .post(lesson.create_lesson)
    .delete(lesson.delete_all_lessons);
    
    app.route('/lessons/:id')
    .get(lesson.get_lesson)
    .put(lesson.update_lesson)
    .delete(lesson.delete_lesson);
    
}