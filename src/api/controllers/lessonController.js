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

exports.create_lesson = function(res, req){
    var new_lesson = new Lesson(req.body);
    console.log(req.body);
    Lesson.findOne({})
        .then( lesson => {
            console.log(lesson);
            if(!lesson){
                new_lesson.save(function(err, lesson){
                    if(err){
                        res.status(400).send({
                            status: '400',
                            message: 'Bad Request. Could not create a lesson !',
                            lesson: lesson
                        })
                    }
                    else {
                        res.status(201).send({
                            status: '201',
                            message: 'Lesson created !',
                            lesson: lesson
                        })
                    }
                });
            }
            else {
                res.status(403).send({
                    status: '403',
                    message: 'Lesson already exist ! ',
                    lesson: req.body
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                status: '500',
                message: 'Something wrong created lesson.'
            })
        })
}