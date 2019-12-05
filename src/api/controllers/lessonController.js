const mongoose = require('mongoose');
Lesson = mongoose.model('Lesson');

exports.list_all_lessons = function(res, req){
    Lesson.find({})
        .then( lesson => {
            if( !lesson ){
                res.status(404);
                return res.json({
                    status: "404",
                    message: "Could not find any lessons",
                    lesson: lesson
                });
            } else {
                res.status(200);
                return res.json({
                    status: "200",
                    message: "Lesson fetch successfully.",
                    lesson
                });
            }
        })
        .catch( err => {
            res.status(500);
            return res.json({
                status: "500",
                message: "Something wrong fetched lessons."
            })
        })
}